import SuperJSON from "superjson"
import { prismaClient } from "../../db/client"

export default defineEventHandler(async (event) => {
	const posts = await prismaClient.blogPost.findMany()
	console.log(posts)
	return SuperJSON.stringify(posts) as unknown as typeof posts
})
