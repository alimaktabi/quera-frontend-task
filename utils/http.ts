import axios from "axios"

const http = axios.create({
  headers: {
    Authorization: `${process.env.GITHUB_API_TOKEN}`,
  },
})

export default http
