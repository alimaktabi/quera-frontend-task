import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import axios from "axios"
import { User } from "../../types/User"

import { MdLocationPin } from "react-icons/md"
import { Repository } from "../../types/Repository"
import Repositories from "../../components/pages/repositories"
import http from "../../utils/http"
import NotFound from "./not-found"
import Image from "next/image"
import Styles from "./styles.module.sass"

const Profile: NextPage<{ user?: User; repositories: Repository[] }> = ({
  user,
  repositories: repos,
}) => {
  const router = useRouter()

  if (!user) return <NotFound />

  return (
    <div className={`h-screen overflow-x-hidden w-screen ${Styles.container}`}>
      <div className="container mx-auto">
        <div className="m-4 mt-6 p-3">
          <div className="flex lg:flex-row flex-col gap-10">
            <div className="bg-white w-60 mx-auto p-4 text-center rounded border border-gray-400">
              <Image
                src={user.avatar_url}
                alt={user.login}
                width={200}
                height={200}
                className="mx-auto rounded-full border-2 border-gray-600"
              />
              <h3 className="text-xl mt-5">{user.login}</h3>

              <p className="flex text-gray-500 justify-center mt-5 items-center">
                <MdLocationPin />
                <span className="ml-2">
                  {user.location ? user.location : "N/A"}
                </span>
              </p>
              <p className="mt-5">
                followers: {user.followers} | following: {user.following}
              </p>
            </div>
            <div className="bg-white flex-1 p-4 rounded border border-gray-400">
              <p className="text-lg mt-5">Name: {user.name}</p>
              <hr className="mt-5" />
              <p className="text-lg mt-5">
                Company: {user.company ? user.company : "N/A"}
              </p>
              {user.blog && (
                <>
                  <hr className="mt-5" />
                  <p className="text-lg mt-5">
                    Blog:{" "}
                    <a className="text-blue-600 underline" href={user.blog}>
                      {user.blog}
                    </a>
                  </p>
                </>
              )}

              <hr className="mt-5" />
              <p className="text-lg mt-5">Bio: {user.bio ? user.bio : "N/A"}</p>
              <hr className="mt-5" />
            </div>
          </div>

          <Repositories repos={repos} />
        </div>
      </div>
    </div>
  )
}

const url = process.env.GITHUB_API_URL + "/users/"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const res = await http.get<User>(url + ctx.query.username)

    const repositories = await http.get<Repository[]>(res.data.repos_url)

    // sort by updated_at
    repositories.data.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )

    return {
      props: {
        user: res.data,
        repositories: repositories.data,
      },
    }
  } catch (e: any) {
    console.log(e)
    return {
      props: {
        user: null,
      },
    }
  }
}

export default Profile
