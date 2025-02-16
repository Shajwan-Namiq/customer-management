<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card shadow-sm">
          <div class="card-header bg-white py-3">
            <h5 class="mb-0">Contract for {{ customerName }}</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="needs-validation">
              <div class="mb-3">
                <label for="name" class="form-label">Contract Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="contract.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="startDate" class="form-label">Start Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="startDate"
                  v-model="contract.startDate"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="endDate" class="form-label">End Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="endDate"
                  v-model="contract.endDate"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="note" class="form-label">Note</label>
                <textarea
                  class="form-control"
                  id="note"
                  v-model="contract.note"
                  rows="3"
                ></textarea>
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">
                  Save Contract
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
import type { Contract, Customer } from "../types/types";

const router = useRouter();
const route = useRoute();
const customerName = ref("");

const contract = ref<Contract>({
  id: "",
  customerId: "",
  name: "",
  startDate: "",
  endDate: "",
  note: "",
});

onMounted(() => {
  const customerId = route.params.customerId as string;
  contract.value.customerId = customerId;

  // get customer name
  const customers = JSON.parse(localStorage.getItem("customers") || "[]");
  const customer = customers.find((c: Customer) => c.id === customerId);
  if (customer) {
    customerName.value = customer.name;
  }
});

const handleSubmit = () => {
  const contracts = JSON.parse(localStorage.getItem("contracts") || "[]");
  contract.value.id = Date.now().toString();
  contracts.push(contract.value);
  localStorage.setItem("contracts", JSON.stringify(contracts));
  router.push("/");
};
</script>
