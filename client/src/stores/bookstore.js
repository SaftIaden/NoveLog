import axios from 'axios';
import { defineStore } from 'pinia';

export const useBookStore = defineStore('bookStore', {
  state: () => {
    return {
      books: Object,
      book: Object,
    };
  },
  actions: {
    async fetchAllBooks() {
      const { data } = await axios.get('http://127.0.0.1:3000/books');
      this.books = data;
    },
    async fetchBook(id) {
      const { data } = await axios.get(`http://127.0.0.1:3000/books/${id}`);
      this.book = data;
    },
  },
});
