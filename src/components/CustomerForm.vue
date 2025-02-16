<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card shadow-sm">
          <div class="card-header bg-white py-3">
            <h5 class="mb-0">
              {{ isEditing ? "Edit Customer" : "Add Customer" }}
            </h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="needs-validation">
              <div class="mb-3">
                <label for="name" class="form-label">Customer Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="customer.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="dateOfBirth" class="form-label"
                  >Date of Birth</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="dateOfBirth"
                  v-model="customer.dateOfBirth"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="customer.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phoneNumber"
                  v-model="customer.phoneNumber"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="note" class="form-label">Note</label>
                <textarea
                  class="form-control"
                  id="note"
                  v-model="customer.note"
                  rows="3"
                ></textarea>
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">
                  {{ isEditing ? "Update Customer" : "Add Customer" }}
                </button>
                <router-link to="/" class="btn btn-outline-secondary"
                  >Cancel</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { Customer } from "../types/types";

const router = useRouter();
const route = useRoute();
const isEditing = ref(false);

const customer = ref<Customer>({
  id: "",
  name: "",
  dateOfBirth: "",
  email: "",
  phoneNumber: "",
  note: "",
});

onMounted(() => {
  const customerId = route.params.id as string;
  if (customerId) {
    isEditing.value = true;
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const existingCustomer = customers.find(
      (c: Customer) => c.id === customerId
    );
    if (existingCustomer) {
      customer.value = existingCustomer;
    }
  }
});

const handleSubmit = () => {
  const customers = JSON.parse(localStorage.getItem("customers") || "[]");

  if (isEditing.value) {
    const index = customers.findIndex(
      (c: Customer) => c.id === customer.value.id
    );
    if (index !== -1) {
      customers[index] = customer.value;
    }
  } else {
    customer.value.id = Date.now().toString();
    customers.push(customer.value);
  }

  localStorage.setItem("customers", JSON.stringify(customers));
  router.push("/");
};
</script>
