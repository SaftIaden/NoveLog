<template>
  <div id="app" class="container text-center">
    <div class="q-ma-md" v-if="update">
      <p>There is an Update available!</p>
      <q-btn type="button" color="info" rounded class="btn" @click="onRestart"><div style="color: black">Update Now</div></q-btn>
    </div>

    <div class="q-ma-md text-h7" v-if="!isOnline">
      <p>You are Offline <i class="fa-solid fa-triangle-exclamation"></i></p>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { ref, onMounted } from 'vue';
import { onlineTest } from '@/utils/onlineTest.js';

const update = ref(false);
const isOnline = ref(true);

onMounted(async () => {
  isOnline.value = await onlineTest();
  window.addEventListener('online', () => (isOnline.value = true));
  window.addEventListener('offline', () => (isOnline.value = false));
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log('registration failed!');
    return;
  }
  registration.addEventListener('updatefound', () => (update.value = true));
  if (registration.waiting) update.value = true;
});

const onRestart = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
};
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
