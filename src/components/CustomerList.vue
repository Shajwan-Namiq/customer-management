<template>
  <div class="container">
    <div class="card shadow-sm">
      <div class="card-header bg-white py-3">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Customer List</h5>
          <router-link to="/add-customer" class="btn btn-primary">
            <i class="bi bi-plus-lg"></i> Add Customer
          </router-link>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th class="px-4">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th class="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in customers" :key="customer.id">
                <td class="px-4">{{ customer.name }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.phoneNumber }}</td>
                <td class="text-end px-4">
                  <div class="btn-group">
                    <router-link
                      :to="`/edit-customer/${customer.id}`"
                      class="btn btn-sm btn-outline-primary"
                    >
                      <i class="bi bi-pencil"></i>
                    </router-link>
                    <router-link
                      :to="`/contract/${customer.id}`"
                      class="btn btn-sm btn-outline-info"
                    >
                      <i class="bi bi-file-text"></i>
                    </router-link>
                    <button
                      @click="deleteCustomer(customer.id)"
                      class="btn btn-sm btn-outline-danger"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="customers.length === 0">
                <td colspan="4" class="text-center py-4">No customers found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Customer } from "../types/types";

const customers = ref<Customer[]>([]);

const loadCustomers = () => {
  customers.value = JSON.parse(localStorage.getItem("customers") || "[]");
};

const deleteCustomer = (id: string) => {
  if (confirm("Are you sure you want to delete this customer?")) {
    const filteredCustomers = customers.value.filter(
      (customer) => customer.id !== id
    );
    localStorage.setItem("customers", JSON.stringify(filteredCustomers));
    loadCustomers();
  }
};

onMounted(() => {
  loadCustomers();
});
</script>
