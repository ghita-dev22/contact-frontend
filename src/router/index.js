import { createRouter, createWebHistory } from "vue-router";
import ContactList from "@/components/ContactList.vue";
import AddContact from "@/components/AddContact.vue";
import EditContact from "@/components/EditContact.vue";

const routes = [
  {
    path: "/",
    name: "ContactList",
    component: ContactList,
  },
  {
    path: "/AddContact",
    name: "AddContact",
    component: AddContact,
  },
  {
    path: "/contact/edit/:id?",
    name: "EditContact",
    component: EditContact,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
