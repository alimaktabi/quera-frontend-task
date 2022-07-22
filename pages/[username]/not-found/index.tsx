import { NextPage } from "next"
import { useRouter } from "next/router"
import Button from "../../../components/Button"

const NotFound: NextPage = () => {
  const router = useRouter()
  return (
    <div className="w-screen bg-gray-100 h-screen flex justify-center items-center">
      <div className="border bg-white border-gray-300 shadow-lg rounded-md p-5">
        <h3 className="font-semibold text-lg">Not Found</h3>

        <p className="mt-10">
          User with the username: <strong>{router.query.username}</strong> was
          not found.
        </p>

        <Button
          color="secondary"
          size="sm"
          className="mt-10"
          onClick={() => router.push("/")}
        >
          Go back to the home page
        </Button>
      </div>
    </div>
  )
}

export default NotFound
