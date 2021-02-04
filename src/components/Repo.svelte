<script lang="ts">
  import type { IRepoProps } from "src/types";

  import { Card, CardBody, Button } from "sveltestrap";

  export let repo: IRepoProps;
</script>

<Card>
  <CardBody>
    <div class="repo-animation">
      <a href={repo.html_url} target="_blanc">
        {repo.name} <br />
      </a>
      {repo.stargazers_count} stars
    </div>
  </CardBody>
</Card>

<style>
  .repo-animation {
    height: 7vmin;
    margin-bottom: 3rem;
    cursor: pointer;
    animation: repo-animation-pulse infinite 1.6s ease-in-out alternate;
  }

  @keyframes repo-animation-pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }
  .repo-animation:hover {
    background-color: aqua;
    color: brown;
  }

  a {
    color: unset;
  }
</style>
