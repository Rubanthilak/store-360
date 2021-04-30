<template>
  <div class="flex">
    <input :placeholder="placeHolder" v-model="searchKeyword" />
    <div class="dropdown-body" v-if="filteredCustomerList">
      <div v-if="filteredCustomerList.length > 0 ">
        <div
          v-for="customer in filteredCustomerList"
          :key="customer.id"
          class="dropdown-customer"
          @click="customerSelected(customer)"
        >
          <p>{{customer.customerName}}</p>
          <p>{{customer.customerPhoneNumber}}</p>
        </div>
      </div>
      <div v-else class="nf-text">
        <p>Create New Customer</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["placeHolder"],
  emits: ["select"],
  methods: {
    customerSelected(obj) {
      this.searchKeyword = "";
      this.$emit("select", obj);
    },
  },
  data() {
    return {
      searchKeyword: "",
    };
  },
  computed: {
    customerList() {
      return this.$store.getters["customer/getCustomers"];
    },
    filteredCustomerList() {
      if (this.searchKeyword.trim() === "") {
        return null;
      }
      return this.customerList.filter((customer) => {
        return (
          customer.customerName
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase()) ||
          customer.customerPhoneNumber
            .toString()
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase())
        );
      });
    },
  },
};
</script>

<style scoped lang="scss">
input {
  display: flex;
  width: calc(100% - 24px);
  padding: 0px 10px;
  height: 35px;
  border: 2px solid var(--gray2);
  outline: none;
  border-radius: 4px;
  background: transparent;
  font-family: var(--font-regular);
  font-size:12px;
  color: var(--gray8);
}

.nf-text {
  text-align: center;
  padding: 20px 0px;
  p {
    font-family: var(--font-semibold);
    font-size: 16px;
  }
}

.flex {
  width: 100%;
  flex-direction: column;
  font-family: var(--font-regular);
  font-size: 14px;
  position: relative;
}

.dropdown-body {
  position: absolute;
  top: 42px;
  z-index: 1;
  background: var(--gray0);
  box-shadow: 0px 5px 25px #0000001a;
  width: calc(100% + 4px);
  overflow-y: auto;
  border-radius: 8px;
  max-height: 300px;
}

.dropdown-customer {
  display: flex;
  gap: 1rem;
  cursor: pointer;
  padding: 10px 15px;
  border-top: 1px solid var(--gray1);

  &:hover {
    background: var(--blue);
    color: var(--gray0);
  }

  p {
    &:last-child {
      text-align: right;
    }
  }
}

.dropdown-header {
  position: sticky;
  top: 0px;
  background: var(--gray0);
  display: grid;
  grid-template-columns: 5% auto 20%;
  gap: 1rem;
  cursor: pointer;
  padding: 10px 15px;
  border: none;

  p {
    font-family: var(--font-semibold);
    &:last-child {
      text-align: right;
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--gray2);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--gray3);
}
</style>