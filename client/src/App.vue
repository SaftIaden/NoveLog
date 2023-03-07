<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>
<style>
@font-face {
  font-family: 'Wendys';
  src: url('/fonts/Wendys/Wendys.ttf') format('truetype');
  font-display: swap;
}
body {
  background-color: #fffbe9;
}
</style>
