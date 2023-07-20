import SuperJSON from "superjson"
import { prismaClient } from "../../db/client"

export default defineEventHandler(async (event) => {
	const id = event.context.params!.id
	const post = await prismaClient.blogPost.findFirst({where: {id}})
	
	if(!post) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid ID",
		})
	}
	console.log(post)
	return SuperJSON.stringify(post) as unknown as typeof post
})
