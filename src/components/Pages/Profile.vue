<template>
  <section>
    <div class="flex" style="margin-right:10px;justify-content:space-between">
      <div>
          <h1 style="font-size:32px">{{company.companyName}}</h1>
      </div>
      <div class="flex" style="gap:10px;">
        <the-button label="Edit Details" v-show="!editMode" @click="editMode = !editMode"></the-button>
        <the-button label="Update" v-show="editMode" @click="updateCompanyDetails"></the-button>
        <the-button label="Cancel" v-show="editMode" color="red" @click="editMode = !editMode"></the-button>
      </div>
    </div>
    <div v-if="editMode">
      <input type="text" placeholder="Company Name" v-model="company.companyName" />
      <input type="text" placeholder="GSTIN" v-model="company.gstinNumber" />
      <input type="number" placeholder="Door Number" v-model="company.doorNumber" />
      <input type="text" placeholder="Street Name" v-model="company.streetName" />
      <input type="text" placeholder="City" v-model="company.cityName" />
      <input type="text" placeholder="State" v-model="company.stateName" />
      <input type="number" placeholder="Pincode" v-model="company.pincode" />
      <input type="email" placeholder="Email" v-model="company.emailId" />
      <input type="phone" placeholder="Phone Number" v-model="company.phoneNumber" />
    </div>
    <div v-else>
      <p>{{company.doorNumber}}</p>
      <p>{{company.streetName}}</p>
      <p>{{company.cityName}}</p>
      <p>{{company.stateName}}</p>
      <p>{{company.pincode}}</p>
      <h1 style="font-size:32px">Contact</h1>
      <p>{{company.emailId}}</p>
      <p>{{company.phoneNumber}}</p>
      <h1 style="font-size:32px">GSTIN</h1>
      <p>{{company.gstinNumber}}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      editMode: false,
      company: {
        companyName: null,
        doorNumber: null,
        streetName: null,
        cityName: null,
        stateName: null,
        pincode: null,
        emailId: null,
        phoneNumber: null,
        gstinNumber: null,
      },
    };
  },
  methods: {
    updateCompanyDetails() {
      localStorage.setItem("companyDetails", JSON.stringify(this.company));
      this.editMode = !this.editMode;
    },
    getCompanyDetails() {
      this.company = JSON.parse(localStorage.getItem("companyDetails"));
    },
  },
  mounted() {
    this.getCompanyDetails();
  },
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 0px !important;
  min-width: 1200px;
  width: 90%;
  margin: 20px auto;
}

input {
  margin-bottom: 20px;
  padding: 8px 10px;
  border-radius: 4px;
  border: 2px solid var(--gray2);
  font-family: var(--font-regular);
  width: 320px;

  &:focus {
    border: 2px solid var(--blue);
    outline: none;
  }
}
</style>