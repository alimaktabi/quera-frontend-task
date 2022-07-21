import type { NextPage } from "next"
import { useForm } from "react-hook-form"
import Text from "../components/Form/Text"
import Button from "../components/Button"
import Styles from "./index.module.sass"
import { useCallback, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const { control, setError, handleSubmit } = useForm()

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const search = useCallback(
    (data: any) => {
      setLoading(true)

      axios
        .post("/api/search?username=" + data.search)
        .then(() => {
          router.push("/" + data.search)
        })
        .catch((e) => {
          setError("search", { message: "User not found", type: "required" })
          setLoading(false)
        })
    },
    [setLoading]
  )

  return (
    <>
      <aside className={Styles.area}>
        <ul className={Styles.circles}>
          {Array.from(new Array(10)).map((_, key) => (
            <li key={key} />
          ))}
        </ul>
      </aside>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="p-5 w-96 max-w-screen-sm  border border-gray-300 rounded-md shadow-md bg-white">
          <h1 className="text-center mb-10 text-2xl">Github Profile viewer</h1>

          <div>
            <Text name="search" control={control} label="Username" />

            <div className="text-right mt-5">
              <Button
                loading={loading}
                onClick={handleSubmit(search)}
                size="sm"
                variant="container"
                color="primary"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
