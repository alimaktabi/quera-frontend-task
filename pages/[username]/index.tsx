import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import axios from "axios"
import { User } from "../../types/User"

import { MdLocationPin } from "react-icons/md"
import { Repository } from "../../types/Repository"
import Repositories from "./repositories"
import http from "../../utils/http"
import NotFound from "./not-found"

const Profile: NextPage<{ user?: User; repositories: Repository[] }> = ({
  user,
  repositories: repos,
}) => {
  const router = useRouter()

  if (!user) return <NotFound />

  return (
    <div>
      <div className="m-4 mt-6 p-3">
        <div className="flex container gap-10">
          <div className="bg-gray-50 w-60 p-4 text-center rounded border border-gray-400">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-36 h-36 mx-auto rounded-full border-2 border-gray-600"
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
          <div className="bg-gray-50 flex-1 p-4 rounded border border-gray-400">
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
    return {
      props: {
        user: null,
      },
    }
  }
}

export default Profile
