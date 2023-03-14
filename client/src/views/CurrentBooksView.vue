<template>
  <q-layout id="app" v-if="finishedLoading">
    <Header />
    <q-page-container>
      <q-page>
        <div class="q-ma-md row items-start q-gutter-md justify-center">
          <q-card v-for="b in currentbooks" :key="b.id" flat bordered @click="cardClick(b.id)" v-ripple class="badge bg-primary col-5 col-md-3">
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
import { ref, onMounted, toRaw } from 'vue';
import router from '../router';
import { openDB } from 'idb';
import axios from 'axios';

const bookStore = useBookStore();
const currentbooks = ref([]);
const finishedLoading = ref(false);
const books = ref([]);
const storedBooks = ref([]);

onMounted(async () => {
  await bookStore.fetchAllBooks();
  const { data } = await axios.get('http://localhost:3000/books');
  books.value = data;

  if (!window.indexedDB) alert('IndexedDB is not available!');
  if (!db) await openDataBase();

  await addAll();

  for (let i = 0; i < bookStore.books.length; i++) {
    if (bookStore.books[i].read !== true) {
      bookStore.books[i].rating = Math.round(bookStore.books[i].rating);
      currentbooks.value.push(bookStore.books[i]);
    }
  }
  finishedLoading.value = true;
});

let db = null;

const openDataBase = async () => {
  db = await openDB('NoveLog', 1, {
    upgrade(db) {
      const store = db.createObjectStore('books', { keyPath: 'id' });
      store.createIndex('title', 'title');
      store.createIndex('author', 'author');
      store.createIndex('read', 'read');
      store.createIndex('pages', 'pages');
      store.createIndex('description', 'description');
      store.createIndex('rating', 'rating');
      store.createIndex('image', 'image');
    },
  });
};

const getStoredBooks = async () => {
  storedBooks.value = await db.getAll('books');
};

const addAll = async () => {
  books.value.forEach(async (book) => {
    await db.put('books', toRaw(book));
  });
  getStoredBooks();
};

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
