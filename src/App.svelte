<!-- App.svelte -->
<script>
  import { onMount } from "svelte";
  import { Row, Spinner, Col, Button } from "sveltestrap";
  import InfiniteScroll from "svelte-infinite-scroll";

  import Dog from "./components/Dog.svelte";
  import Repo from "./components/Repo.svelte";

  import getRepos from "./services/repos";

  let repoLang = ""; // the search input value
  let repoLangInput; // to focus on input onMount
  let reposMap = new Map(); // to save repos
  let isSearching = false; // contains the state of fetching repos
  let page = 0; // the page number in the api
  let listRepo = []; // to display the selected repos

  /**
   * fetches the repos and save them in a Map , {"language",repos}
   */
  const getReposByLang = async () => {
    if (!reposMap.has(repoLang)) page = 0;
    isSearching = true;
    if (reposMap.has(repoLang) && !page === 0) {
      isSearching = false;
      return;
    }
    await getRepos(repoLang, page).then((res) => {
      if (reposMap.has(repoLang)) {
        reposMap.set(repoLang, [...reposMap.get(repoLang), ...res.items]);
      } else reposMap.set(repoLang, res.items);
      isSearching = false;
    });
    listRepo = reposMap.get(repoLang);
    if (page === 0) page = 1;
  };

  // actions to do when the component is mounted first time
  onMount(() => {
    getReposByLang();
    repoLangInput.focus();
  });
</script>

<div class="App" style="overflow: hidden;padding:5px;">
  <div style="">
    <Dog /><img
      src="/logo_github.png"
      class="github-logo"
      alt="logo"
      style="margin-left:1%"
    />
    <br />
  </div>

  <br />
  <div style="display:flex;flex-direction:row;position:relative;left:32%">
    <form on:submit|preventDefault={getReposByLang}>
      <label for="repoLang" style="font-size:25px">
        Search for repos of a prog language
      </label>
      <input
        bind:this={repoLangInput}
        bind:value={repoLang}
        name="repoLang"
        class="form-control"
        placeholder="Ex: java, then hit Enter Or Go"
        style="font-size:25px;display:initial !important; width:50%"
      />
      <Button
        class="btn btn-info mt-1"
        style="calc(1.5em + .75rem + 2px);font-size:25px;margin-bottom:15px;background-color:#0b22d3"
        type="submit">Go</Button
      >
    </form>
  </div>

  <div style="padding:10px;border:0px;">
    {#if isSearching}
      <div style="display:flex;flex-direction:row;position:relative;left:42%">
        <Spinner class="spinner-border text-warning" />
      </div>
    {/if}
    <Row>
      {#each listRepo ?? [] as repo}
        <Col class="mt-1 col-md-6 col-12 col-s-6 col-sm-6 col-lg-4 col-xl-3">
          <Repo {repo} />
        </Col>
      {/each}
    </Row>
    {#if isSearching && page > 1}
      <div style="display:flex;flex-direction:row;position:relative;left:42%">
        <Spinner class="spinner-border text-warning" />
      </div>
    {/if}
  </div>
</div>
{page}
<InfiniteScroll
  threshold={1}
  window
  on:loadMore={() => {
    page = page + 1;
    getReposByLang();
  }}
/>

<style>
  .github-logo {
    height: 22vmin;
    pointer-events: none;
    animation: github-logo-pulse infinite 1.6s ease-in-out alternate;
  }
  @keyframes github-logo-pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }
</style>
