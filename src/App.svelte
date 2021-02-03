<!-- App.svelte -->
<script>
  /* component logic will go here */
</script>

<div
  class="App"
  style="display: flex;flex-direction: column; align-items: center;"
>
  <header class="App-header">
    <img src="/coffee.svg" class="App-logo" alt="logo" />
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
