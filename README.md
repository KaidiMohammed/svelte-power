The [Demo](https://svelte-power.vercel.app/).

# What is the application?

A simple web-application that fetches the trending git repositories of a programming language and displays them.

## Tools we're going to use:

1. [Svelte] (https://svelte.dev/) for developing the app.
2. [SnowPack] (https://www.snowpack.dev/) for building the app.
3. [Vercel] (https://vercel.com/) for deploying the app.

## Project architecture

the project architecture is very simple.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/dqz9mqcy7s869yzhyxbw.JPG)

## Let's begin

In the "src" folder we create App.svelte, it's the principal component.

```typescript
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
```

The `onMount` function executes the `getReposByLang();` and `repoLangInput.focus();` when the component is mounted, it's equivalent in react is `useEffect()`.
The `getReposByLang` function will fetch the repos and save them in a Map.

```typescript
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
```

### Displaying the git repos

```typescript
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
```

We loop over listRepo which contains the git repos and display them in a grid.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/vsyqc62oovcg9tj3s2cc.JPG)

We use another component to display each repo.
`<Repo {repo} />`
`Repo` is a component that has a props repo.

```typescript
<script lang="ts">
  import type {IRepoProps} from "src/types"; import {(Card, CardBody)} from
  "sveltestrap"; export let repo: IRepoProps;
</script>
```

To create props for a component we just add `export` to the variable name.

```typescript
export let repo: IRepoProps;
```

## Building with snowPack

I've used Snowpack to build the project; Snowpack is a lightweight alternative to webpack.
In the `config` file we just need to add the svelte plugin and let place to magic.

```typescript
/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: ["@snowpack/plugin-svelte"],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
```

To build the project we launch `snowpack build`

## Deploying on vercel

Deploying in vercel is very simple, we just need to import the project from Github and vercel will do all the rest.

The [Demo](https://svelte-power.vercel.app/).
