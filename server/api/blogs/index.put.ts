import { prismaClient } from "../../db/client"
import type { CreateBlogBody } from "../../models/blog"

export default defineEventHandler(async (event) => {
	const body = await readBody<CreateBlogBody>(event)
	await prismaClient.blogPost.create({
		data: {
			id: body.id,
			title: body.title,
			content: body.content,
			description: body.description,
			published: body.published,
			author: body.author
		}
	})
	return {
		message: "Successfully created blog post"
	}
})
