<template>
  <q-layout id="app" v-if="finishedLoading">
    <Header />
    <q-page-container>
      <q-page>
        <div class="q-ma-md row items-start q-gutter-md justify-center">
          <q-card v-for="b in this.currentbooks" :key="b.id" flat bordered @click="cardClick(b.id)" v-ripple class="badge bg-primary col-5 col-md-3">
            <div class="flex flex-center q-mt-md">
              <q-img :src="b.image" style="width: 75%" />
            </div>
            <q-card-section class="text-center">
              <div class="" style="font-size: x-small">
                <b>{{ b.title }}</b>
              </div>
              <div class="text-subtitle q-mt-xs" style="font-size: xx-small">{{ b.author }}</div>
              <div class="q-mt-xs">
                <q-linear-progress size="md" :value="b.currentpage / b.pages" color="dark" />
              </div>
              <!-- <q-card-actions vertical align="center">
                <router-link :to="`/bookview/${b.id}`" style="text-decoration: underline; color: info" :id="b.id">View Book...</router-link>
              </q-card-actions> -->
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar class="q-mb-md" />
    </q-page-sticky>
    <div style="height: 100px"></div>
  </q-layout>
</template>
<script setup>
import NavBar from '../components/NavBar.vue';
import Header from '../components/Header.vue';
import { useBookStore } from '../stores/bookstore';
import { ref, onMounted } from 'vue';
import router from '../router';

const bookStore = useBookStore();
const currentbooks = [];
const finishedLoading = ref(false);

onMounted(async () => {
  await bookStore.fetchAllBooks();

  for (let i = 0; i < bookStore.books.length; i++) {
    if (bookStore.books[i].read !== true) {
      bookStore.books[i].rating = Math.round(bookStore.books[i].rating);
      currentbooks.push(bookStore.books[i]);
    }
  }
  finishedLoading.value = true;
});

function cardClick(id) {
  router.push(`/bookview/${id}`, (id = 'id'));
}
</script>
<style>
.badge {
  border-radius: 15px;
  font-family: 'Keep Calm';
  width: 100px;
  height: 230px;
}
</style>
