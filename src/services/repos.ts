export default async function getRepos(repoLang: string, page: number) {
  repoLang = repoLang.replace(/\s/g, "");
  const response = await fetch(
    `https://api.github.com/search/repositories?q=language:${repoLang}&sort=stars&order=desc&per_page=30&page=${
      page + 1
    }`
  );
  if (response.ok) {
    return response.json();
  } else throw new Error();
}
