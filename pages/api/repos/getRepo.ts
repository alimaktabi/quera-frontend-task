import {NextApiHandler} from "next"


export const url = process.env.GITHUB_API_URL + "/repos/"


const GetRepo: NextApiHandler = async (req, res) => {

}


export default GetRepo