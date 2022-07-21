import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import axios from "axios"

const Profile: NextPage<{ user: any }> = ({ user }) => {
  const router = useRouter()

  return (
    <div>
      <div>salam {router.query.username}</div>
    </div>
  )
}

const url = process.env.GITHUB_API_URL + "/users/"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const res = await axios.get(url + ctx.query.username)

    return {
      props: {
        user: res.data,
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
