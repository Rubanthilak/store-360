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
            <router-link :to="'/customers/'+ $route.params.id +'/edit'">
              <svg-icon
                icon="edit-icon"
                color="gray2"
                hover-color="blue"
                size="22"
              ></svg-icon>
            </router-link>
             <svg-icon
                icon="ellipsis-icon"
                color="gray2"
                hover-color="blue"
                size="22"
              ></svg-icon>
          </div>
        </div>
      </template>
    </top-bar>
    <div v-if="!isLoading" class="container content-wrapper">
      <div class="flex" style="gap: 1rem">
        <customer-details-card :customer="customer"></customer-details-card>
        <div
          style="
            width: calc(100% - 350px);
            background: white;
            padding: 25px;
            border-radius: 5px;
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
          v-for="sale in customer.sales"
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

export default {
  components: { BarChart },
  data() {
    return {
      isLoading: false,
      customer: null,
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
  },

  async beforeMount() {
    this.isLoading = true;
    this.customer = await this.$store.dispatch(
      "customer/getCustomerById",
      this.$route.params.id
    );
    this.customer.sales = await this.$store.dispatch(
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