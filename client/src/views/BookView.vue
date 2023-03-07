<template>
  <q-layout id="app" v-if="finishedLoading">
    <Header />
    <q-page-container>
      <div class="row justify-evenly q-mt-lg">
        <div class="col-5">
          <q-img :src="bookStore.book.image" style="border-radius: 20px"> </q-img>
        </div>
        <div class="col-5">
          <span class="text-h5 block"
            ><b>{{ bookStore.book.title }}</b></span
          >
          <span class="block q-mt-xs">{{ bookStore.book.author }}</span>
          <div class="q-mt-md">
            <q-rating v-model="ratingModel" size="2em" color="dark" icon="fa-regular fa-star" icon-selected="fa-solid fa-star" />
          </div>
          <div class="q-mt-lg">
            <q-select rounded outlined v-model="forSaleRent" color="dark" :options="forSaleRentOptions" option-value="id" option-label="desc" :icon="icon" dense emit-value map-options behavior="menu" bg-color="info" />
          </div>
        </div>
      </div>
    </q-page-container>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-btn>Test</q-btn>
      <NavBar class="q-mb-md" />
    </q-page-sticky>
  </q-layout>
</template>
<script setup>
import NavBar from '../components/NavBar.vue';
import Header from '../components/Header.vue';

import { useBookStore } from '../stores/bookstore';
import { ref, onMounted } from 'vue';

const props = defineProps({
  id: String,
});

const bookStore = useBookStore();
const finishedLoading = ref(false);
const ratingModel = ref(3);
const forSaleRent = ref(false);
const forSaleRentOptions = [
  { id: false, icon: 'fa-solid fa-check', desc: 'Finished' },
  { id: true, icon: 'fa-solid fa-wrench', desc: 'in Progress' },
];

onMounted(async () => {
  await bookStore.fetchBook(props.id);

  finishedLoading.value = true;
});
</script>
<style></style>
