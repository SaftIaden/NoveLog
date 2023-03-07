import { createRouter, createWebHashHistory } from 'vue-router';
import AddBookView from '../views/AddBookView.vue';
import ReadBooksView from '../views/ReadBooksView.vue';
import CurrentBooksView from '../views/CurrentBooksView.vue';
import BookView from '../views/BookView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'current',
      component: CurrentBooksView,
    },
    {
      path: '/readbooks',
      name: 'readbooks',
      component: ReadBooksView,
    },
    {
      path: '/addbook',
      name: 'addbook',
      component: AddBookView,
    },
    {
      path: '/bookview/:id',
      name: 'bookview',
      component: BookView,
      props: true,
    },
  ],
});

export default router;
