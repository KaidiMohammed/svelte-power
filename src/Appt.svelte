<!-- App.svelte -->
<script>
  import { Button, Spinner } from "sveltestrap";

  import Repo from "./components/Repo.svelte";

  let repoLang = "java";
  let reposMap = new Map();
  let isSearching = false;

  async function getRepos() {
    repoLang = repoLang.replace(/\s/g, "");
    const response = await fetch(
      "https://api.github.com/search/repositories?q=language=" + repoLang
    );
    if (response.ok) {
      return response.json();
    } else throw new Error();
  }

  const getReposByLang = async () => {
    isSearching = true;
    if (reposMap.has(repoLang)) {
      isSearching = false;
      return;
    }
    await getRepos().then((res) => {
      console.log(reposMap);
      reposMap.set(repoLang, res.items);
      isSearching = false;
    });
  };

  getReposByLang();
</script>

<div
  class="App"
  style="display: flex;flex-direction: column; align-items: center;"
>
  <header class="App-header">
    <img src="/logo_github.png" class="App-logo" alt="logo" />
    <br />
    <form on:submit|preventDefault={getReposByLang}>
      <input bind:value={repoLang} class="form-control" />
      {repoLang}

      <Button type="submit" active class="btn btn-info mb-4 mt-1"
        >Search for the repos</Button
      >
    </form>

    {repoLang}
    {isSearching}
    {#if isSearching === false}
      {#each reposMap.get(repoLang) as repo}
        <Repo {repo} />
      {/each}
    {:else}
      <div>... loading</div>
      <Spinner type="success" />
    {/if}
  </header>
</div>

<style>
  .App-logo {
    height: 36vmin;
    pointer-events: none;
    margin-bottom: 3rem;
    animation: App-logo-pulse infinite 1.6s ease-in-out alternate;
  }
  @keyframes App-logo-pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }
</style>
