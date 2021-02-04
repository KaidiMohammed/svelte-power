export default async function getRepos(repoLang: string) {
  repoLang = repoLang.replace(/\s/g, "");
  const response = await fetch(
    "https://api.github.com/search/repositories?q=language=" +
      repoLang +
      "&s=stars"
  );
  if (response.ok) {
    return response.json();
  } else throw new Error();
}
