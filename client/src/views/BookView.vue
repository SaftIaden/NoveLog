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
            <q-select rounded outlined v-model="readStatus" color="dark" :options="readOptions" option-value="id" option-label="desc" dense emit-value map-options behavior="menu" bg-color="info" />
          </div>
        </div>
      </div>
      <div class=" q-ma-s">
        <div class="row justify-evenly text-center">
          <div class="col-6">
            <q-input style="max-width: 180px" item-aligned v-model="genre" hint="Genre"
              ><template v-slot:prepend>
                <q-icon name="fa-solid fa-compact-disc" />
              </template>
            </q-input>
          </div>
          <div class="col-5">
            <q-input style="max-width: 170px" item-aligned v-model="currentPage" :suffix="`/ ${bookStore.book.pages.toString()}`" hint="current Page / Pages" maxlength="4"
              ><template v-slot:prepend>
                <q-icon name="fa-solid fa-file" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <div class="q-pa-sm q-ma-sm">
        <span class="text-h5 block q-my-md"><b>Description</b></span>
        <p class="q-mx-md">{{ bookStore.book.description }}</p>
      </div></q-page-container
    >
    <q-page-sticky position="bottom" :offset="[0, 100]">
      <div class="row justify-center">
        <q-btn type="submit" color="info" class="btn q-mt-lg updateButton" rounded @click="updateBook(props.id)">
          <div style="color: black">Done</div>
        </q-btn>
      </div>
    </q-page-sticky>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <NavBar class="q-mb-md" />
    </q-page-sticky>
  </q-layout>
</template>
<script setup>
import NavBar from '../components/NavBar.vue';
import Header from '../components/Header.vue';
import axios from 'axios';
import { useBookStore } from '../stores/bookstore';
import { ref, onMounted } from 'vue';

const props = defineProps({
  id: String,
});

const bookStore = useBookStore();
const finishedLoading = ref(false);
const ratingModel = ref();
const readStatus = ref();
const readOptions = [
  { id: true, desc: 'Finished' },
  { id: false, desc: 'in Progress' },
];
const currentPage = ref();
const genre = ref();

onMounted(async () => {
  await bookStore.fetchBook(props.id);
  currentPage.value = bookStore.book.currentpage;
  genre.value = bookStore.book.genre;
  readStatus.value = bookStore.book.read;
  ratingModel.value = bookStore.book.rating;

  finishedLoading.value = true;
});

const updateBook = async (id) => {
  await axios.patch(`http://127.0.0.1:3000/books/${id}`, {
    currentpage: currentPage.value,
    genre: genre.value,
    read: readStatus.value,
    rating: ratingModel.value,
  });
};
</script>
<style scoped>
.updateButton {
  width: 80vw;
  height: 5vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
