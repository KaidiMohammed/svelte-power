<!-- App.svelte -->
<script>
  import { onMount } from "svelte";
  import { Row, Spinner, Col } from "sveltestrap";

  import Dog from "./components/Dog.svelte";
  import Repo from "./components/Repo.svelte";

  import getRepos from "./services/repos";

  let repoLang = "";
  let repoLangInput;
  let reposMap = new Map();
  let isSearching = false;

  const getReposByLang = async () => {
    isSearching = true;
    if (reposMap.has(repoLang)) {
      isSearching = false;
      return;
    }
    await getRepos(repoLang).then((res) => {
      reposMap.set(repoLang, res.items);
      isSearching = false;
    });
  };

  $: setTimeout(() => {
    getReposByLang();
  }, 3000);

  onMount(() => repoLangInput.focus());
</script>

<div class="App" style="overflow: hidden;padding:5px">
  <div style="">
    <Dog /><img
      src="/logo_github.png"
      class="github-logo"
      alt="logo"
      style="margin-left:10%"
    />
  </div>

  <br />
  <div style="display:flex;flex-direction:row;position:relative;left:38%">
    <form on:submit|preventDefault={getReposByLang}>
      <input
        bind:this={repoLangInput}
        bind:value={repoLang}
        class="form-control"
        placeholder="Search a repo"
        style="font-size:25px"
      />
    </form>
  </div>

  <div style="padding:10px;border:0px;">
    {#if !isSearching}
      <Row>
        {#each reposMap.get(repoLang) ?? [] as repo}
          <Col
            class="mt-1 col-md-12 col-xs-12 col-s-12 col-sm-12 col-lg-6 col-xl-3  "
          >
            <Repo {repo} />
          </Col>
        {/each}
      </Row>
    {:else}
      <Spinner />
    {/if}
  </div>
</div>

<style>
  .github-logo {
    height: 36vmin;
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
