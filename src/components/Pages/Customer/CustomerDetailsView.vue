<template>
  <section>
    <top-bar>
      <template #default>
        <div class="flex menu-bar">
          <div class="flex header">
            <div class="back-button" @click="goBack">
              <svg-icon color="gray8" size="34" icon="back-icon"></svg-icon>
            </div>
            <div v-if="!isLoading">
              <h1>Customer Details</h1>
            </div>
          </div>
          <div class="flex button-container">
             <dropdown-menu-customer :customer-id="$route.params.id"></dropdown-menu-customer>
          </div>
        </div>
      </template>
    </top-bar>
    <div v-if="!isLoading" class="container content-wrapper">
      <div class="flex" style="gap: 1rem">
        <customer-details-card :customer="customer" :unpaidBalance="unpaidBalance"></customer-details-card>
        <div
          style="
            width: calc(100% - 350px);
            background: white;
            padding: 25px;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
          "
        >
          <h1>Customer Purchase History</h1>
          <BarChart
            :data="chartData"
            style="margin-top: 25px"
            :options="chartOptions"
          />
        </div>
      </div>
      <h1
        style="
          margin-top: 25px;
          font-size: 24px;
          font-family: var(--font-semibold);
        "
      >
        Recent Purchase
      </h1>
      <hr />
      <div class="sales-list">
        <sale-card
          v-for="sale in sales"
          :key="sale.id"
          :sale="sale"
        ></sale-card>
      </div>
    </div>
    <div v-else class="container loading-wrapper">
      <loading-spinner></loading-spinner>
    </div>
  </section>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { BarChart } from "vue-chart-3";
import DropdownMenuCustomer from '../../UI/DropdownMenu/DropdownMenuCustomer';

export default {
  components: { BarChart, DropdownMenuCustomer},
  data() {
    return {
      isLoading: false,
      customer: null,
      sales: [],
      editMode: false,
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      generatedChartArray: [],
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },

  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.generatedChartArray,
            backgroundColor: ["#0077FF"],
          },
        ],
      };
    },
    unpaidBalance(){
      var totalPurchase = 0;
      var totalAmountReceived = 0;
      this.sales.forEach(sale => {
        totalPurchase += sale.totalPrice
        totalAmountReceived += sale.totalAmountPaid
      });
      return totalPurchase - totalAmountReceived;
    }
  },

  async beforeMount() {
    this.isLoading = true;
    this.customer = await this.$store.dispatch(
      "customer/getCustomerById",
      this.$route.params.id
    );
    this.sales = await this.$store.dispatch(
      "sale/getSalesByCustomerId",
      {
        cust_id: this.$route.params.id,
        limit: 10,
      }
    );
    this.generatedChartArray = await this.$store.dispatch(
      "sale/getChartDataByCustomerId",
      {
        cust_id: this.$route.params.id,
      }
    );
    this.isLoading = false;
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    triggerDeleteCustomer() {
      this.$store.commit("customer/setCustomerIdToDelete", this.customer.id);
      this.$store.commit("setActivePopup", "popup-delete-customer");
    },
    async triggerUpdateCustomer() {
      var res = await this.$store.dispatch(
        "customer/updateCustomer",
        this.customer
      );
      if (res) {
        this.$store.commit("showSnackBar", "Successfully updated.");
      } else {
        this.$store.commit(
          "showSnackBar",
          "Unable to update the customer record"
        );
      }
    },
    toggleEditMode() {
      if (this.editMode) {
        this.triggerUpdateCustomer();
      }
      this.editMode = !this.editMode;
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-wrapper {
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-wrapper {
  margin-bottom: 50px;

  .sales-list {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(auto-fill, 300px);
    justify-content: space-evenly;
    overflow: auto;
  }
}

.menu-bar {
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.back-button {
  cursor: pointer;
  margin-right: 10px;
}

.button-container {
  svg {
    padding: 5px;
    border-radius: 5px;
    transition: all 0.3s;
    margin-left: 10px;
    &:hover {
      background: var(--gray1);
      box-shadow: inset 0px 0px 15px rgb(0, 0, 0, 0.05);
    }
  }
}
</style>