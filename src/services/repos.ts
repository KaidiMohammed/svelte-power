export default async function getRepos(repoLang: string) {
  console.log(repoLang);
  repoLang = repoLang.replace(/\s/g, "");
  const response = await fetch(
    "https://api.github.com/search/repositories?q=language=" +
      repoLang +
      "&sort=stars&order=desc"
  );
  if (response.ok) {
    return response.json();
  } else throw new Error();
}
