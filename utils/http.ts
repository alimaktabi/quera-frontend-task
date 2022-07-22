import axios from "axios"

const http = axios.create({
  headers: {
    token: process.env.GITHUB_API_TOKEN ?? "",
  },
})

export default http
