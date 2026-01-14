export const useGithubUsername = async (username: string) => {
  const { data, status, error } = await useFetch<GithubUserResponse>(`https://api.github.com/users/${username}`, { key: `github-user-${username}` })
  if (error.value) {
    throw createError({ statusCode: 400, statusMessage: error.value.message || 'Author not found.' })
  }
  return { author: data, status }
}
