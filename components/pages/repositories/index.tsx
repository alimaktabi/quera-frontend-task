import { NextPage } from "next"
import { Repository } from "../../../types/Repository"
import { useState } from "react"
import Button from "../../../components/Button"
import Image from "next/image"

const perPage = 6

const Repositories: NextPage<{ repos: Repository[] }> = ({ repos }) => {
  const [page, setPage] = useState(0)

  return (
    <div className="mt-10">
      <h1 className="text-lg font-semibold">Repositories</h1>

      <div className="mt-5">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-3">
          {repos.slice(perPage * page, perPage * page + perPage).map((repo) => (
            <div
              key={repo.id}
              className="flex bg-white border p-3 rounded border-gray-300 items-center"
            >
              <div className="w-40">
                <Image
                  width={100}
                  height={100}
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  className="rounded-full border-2 border-gray-600"
                />
              </div>
              <div className="w-60">
                <a
                  href={repo.html_url}
                  className="text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
                <p className="text-gray-500 mt-2">
                  {repo.description ? repo.description : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex mt-5 justify-between">
          <Button
            color="secondary"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Prev
          </Button>
          <Button
            color="secondary"
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(repos.length / perPage) - 1}
          >
            Next
          </Button>
        </div>
      </div>

      <small>Total: {repos.length}</small>
    </div>
  )
}

export default Repositories
