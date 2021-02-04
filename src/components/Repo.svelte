<script lang="ts">
  import type { IRepoProps } from "src/types";

  import { Card, CardBody, Button } from "sveltestrap";

  export let repo: IRepoProps;
</script>

<Card class="Card">
  <CardBody style=" margin-left: 2% !important;">
    <div class="repo-animation">
      <div>
        <a href={repo.html_url} target="_blanc">
          {repo.name}
          <br />
          <img
            src={repo.owner.avatar_url}
            href={repo.html_url}
            width="40px"
            alt="star github"
          />
          by :
          {repo.owner.login}
          <br />

          <div style="color:gold;font-weight:bold">
            {repo.stargazers_count}
            <img src="../star.png" width="18px" alt="star github" />
          </div>
        </a>
      </div>
    </div>
  </CardBody>
</Card>

<style>
  .repo-animation {
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
  .Card {
    border-radius: 25%;
  }
</style>
