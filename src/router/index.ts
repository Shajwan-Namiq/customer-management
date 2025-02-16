import { createRouter, createWebHistory } from "vue-router";
import CustomerForm from "../components/CustomerForm.vue";
import CustomerList from "../components/CustomerList.vue";
import ContractForm from "../components/ContractForm.vue";

const routes = [
  {
    path: "/",
    name: "CustomerList",
    component: CustomerList,
  },
  {
    path: "/add-customer",
    name: "AddCustomer",
    component: CustomerForm,
  },
  {
    path: "/edit-customer/:id",
    name: "EditCustomer",
    component: CustomerForm,
  },
  {
    path: "/contract/:customerId",
    name: "Contract",
    component: ContractForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
