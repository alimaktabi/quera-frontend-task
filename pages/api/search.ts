import { NextApiHandler } from "next"
import axios from "axios"

// documentation: $ curl -i -u your_username:$token https://api.github.com/users/octocat

const url = process.env.GITHUB_API_URL + "/users/"

const Search: NextApiHandler = async (req, res) => {
  const { username } = req.query

  try {
    const response = await axios.get(url + username)

    res.json(response.data)
  } catch (e: any) {
    res.status(404).json({ error: "user not found" })
  }
}

export default Search
