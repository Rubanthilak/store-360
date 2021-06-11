<template>
  <div class="flex">
    <input :placeholder="placeHolder" v-model="searchKeyword" class="search" v-on:keydown="arrowkeyEventHandler($event)"/>
    <div class="dropdown-body" v-if="filteredCustomerList">
      <div v-if="filteredCustomerList.length > 0 ">
        <div
          v-for="(customer,index) in filteredCustomerList"
          :key="customer.id"
          :class="['dropdown-customer',{'active' : activeTileIndex===index}]"
          @click="customerSelected(customer)"
        >
          <p>{{customer.customerName}}</p>
          <p>-</p>
          <p>{{customer.customerPhoneNumber}}</p>
        </div>
      </div>
      <div v-else class="new-cust">
        <h1>New Customer</h1>
        <input type="text" placeholder="Customer Name" v-model="customer.customerName" />
        <input type="number" placeholder="Phone Number" v-model="customer.customerPhoneNumber" maxlength="10"/>
        <the-button label="Create" @click="validateNewCustomer"></the-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["placeHolder"],
  emits: ["select"],
  methods: {
    arrowkeyEventHandler(event) {
      if (event.keyCode === 40 && this.activeTileIndex < this.filteredCustomerList.length-1 ) {
        this.activeTileIndex += 1;
      }
      else if (event.keyCode === 38 && this.activeTileIndex > 0){
        this.activeTileIndex -= 1;
      }
      else if (event.keyCode === 13 && this.activeTileIndex !== -1){
        this.customerSelected(this.filteredCustomerList[this.activeTileIndex]);
      }
    },
    customerSelected(obj) {
      this.searchKeyword = "";
      this.$emit("select", obj.dataValues);
    },
    clearField(){
      this.searchKeyword = "";
    },
    validateNewCustomer() {
      if (
        this.customer.customerName.trim() === "" ||
        this.customer.customerPhoneNumber.trim() === ""
      ) {
        this.errorFlag = true;
      } else if (this.customer.customerPhoneNumber.trim().length !== 10) {
        this.errorFlag = true;
        this.errorMessage = "Please, Enter valid Phone Number";
      } else {
        this.errorFlag = false;
        this.createNewCustomer();
      }
    },
    async createNewCustomer() {
      var res = await this.$store.dispatch(
        "customer/postCustomer",
        this.customer
      );
      if (!res) {
        this.errorFlag = true;
        this.errorMessage = "Phone Number already exist";
      } else {
        this.customer.customerName = null;
        this.customer.customerPhoneNumber = null;
        this.customer.customerCreditPoint = 0;
        this.customer.customerUnpaidBalance = 0.0;
        this.customer.customerDoorNumber = null;
        this.customer.customerStreetName = null;
        this.customer.customerCityName = null;
        this.customer.customerPincode = null;
        this.searchKeyword = "";
        this.$emit("select", res);
      }
    },
  },
  data() {
    return {
      searchKeyword: "",
       customer: {
        customerName: null,
        customerPhoneNumber: null,
        customerCreditPoint: 0,
        customerUnpaidBalance: 0.0,
        customerDoorNumber: null,
        customerStreetName: null,
        customerCityName: null,
        customerStateName: null,
        customerPincode: null,
        customerGstinNumber: null,
      },
      errorFlag: false,
      errorMessage: "Please fill all the fields*",
      activeTileIndex: -1
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
  watch:{
    filteredCustomerList(curVal,oldVal){
      if(curVal != oldVal){
        this.activeTileIndex = -1;
      }
    },
    searchKeyword() {
      if(!isNaN(this.searchKeyword)){
        this.customer.customerName = null;
        this.customer.customerPhoneNumber = this.searchKeyword;
      }
      else{
        this.customer.customerName = this.searchKeyword;
        this.customer.customerPhoneNumber = null;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  display: flex;
  width: calc(100% - 24px);
  padding: 0px 10px;
  height: 32px;
  border: 2px solid var(--gray2);
  outline: none;
  border-radius:5px;
  background: transparent;
  font-family: var(--font-regular);
  font-size: 12px;
  color: var(--gray8);
}

.new-cust {
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h1{
    margin: 0px 20px;
    width: calc(100% - 64px);
  }
  input {
    margin: 0px 20px;
    width: calc(100% - 64px);
    padding: 0px 10px;
    height: 30px;
    border: 2px solid var(--gray2);
    font-family: var(--font-regular);
    outline: none;
    border-radius: 4px;
    background: transparent;
    font-size: 12px;
  }

  div {
    margin: 0px 20px;
  }
}

p {
  font-size: 14px;
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
  width: calc(100% + 0px);
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
  
  &.active {
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