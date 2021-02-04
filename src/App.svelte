<!-- App.svelte -->
<script>
  import { Button, Row, Spinner, Col, Card } from "sveltestrap";

  import Repo from "./components/Repo.svelte";

  import getRepos from "./services/repos";

  let repoLang = "java";
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

  const handleInputChange = () => {
    isSearching = true;
  };

  getReposByLang();
</script>

<div class="App" style="overflow: hidden;padding:5px">
  <div style="display:flex;flex-direction:row">
    <img
      src="/logo_github.png"
      class="App-logo"
      alt="logo"
      style="margin-left:40%"
    />
  </div>

  <br />
  <div style="display:flex;flex-direction:row;position:relative;left:43%">
    <form on:submit|preventDefault={getReposByLang}>
      <input
        bind:value={repoLang}
        class="form-control"
        on:input={handleInputChange}
      />
      <Button type="submit" active class="btn btn-info mb-4 mt-1 ml-4"
        >Search for the repos</Button
      >
    </form>
  </div>

  <Card style="padding:10px;border:0px;background-color:skyblue">
    {#if !isSearching}
      <Row>
        {#each reposMap.get(repoLang) ?? [] as repo}
          <Col class="ml-1 mt-1 mr-1">
            <Repo {repo} />
          </Col>
        {/each}
      </Row>
    {:else}
      <Spinner />
    {/if}
  </Card>
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
