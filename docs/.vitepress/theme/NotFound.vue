<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <div class="ms-notfound">
    <p class="ms-code">404</p>
    <h1>Signal lost</h1>
    <p>That page does not exist, or it has moved.</p>
    <p class="ms-log" role="img" aria-label="Routing log: no route to this page, delivery failed.">
      <span class="ms-if">router</span><span>no route to this page</span><span class="ms-state">FAILED</span>
    </p>
    <div class="ms-actions">
      <a class="ms-btn ms-btn-primary" :href="withBase('/')">Documentation home</a>
      <a class="ms-btn" :href="withBase('/start.html')">Choose your setup</a>
      <a class="ms-btn" href="https://meshsat.net/">meshsat.net</a>
    </div>
  </div>
</template>
