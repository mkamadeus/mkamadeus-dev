export const useGithubUsername = async (username: string) => {
  const { data, pending } = await useFetch<GithubUserResponse>(`https://api.github.com/users/${username}`, { key: `github-user-${username}` })
  if (!pending.value && !data.value) {
    throw createError({ statusCode: 400, statusMessage: 'Author not found.' })
  }
  return { author: data, isPending: pending }
}
