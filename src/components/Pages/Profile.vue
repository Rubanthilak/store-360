<template>
  <section>
    <top-bar>
      <template #default>
        <div
          style="
            display: flex;
            margin-right: 10px;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div>
            <svg-icon
              size="34"
              icon="back-icon"
              v-show="editMode"
              @click="editMode = !editMode"
            ></svg-icon>
          </div>

          <div class="flex" style="gap: 10px">
            <tool-tip label="Edit Details">
              <svg-icon
                icon="edit-icon"
                color="gray2"
                hover-color="blue"
                size="24"
                v-show="!editMode"
                @click="editMode = !editMode"
              ></svg-icon>
            </tool-tip>
            <the-button
              label="Update"
              v-show="editMode"
              @click="updateCompanyDetails"
            ></the-button>
          </div>
        </div>
      </template>
    </top-bar>
    <div v-if="editMode" class="user-form">
      <h1 style="font-size: 36px">Company Details</h1>
      <svg-icon icon="user-circle-icon" color="gray2" size="200" />
      <h1 style="font-size: 18px">Name</h1>
      <div class="flex">
        <input
          type="text"
          placeholder="Company Name"
          v-model="company.companyName"
        />
      </div>
      <h1 style="font-size: 18px">GSTIN</h1>
      <input type="text" placeholder="GSTIN" v-model="company.gstinNumber" />
      <h1 style="font-size: 18px">Address</h1>
      <div class="flex">
        <input
          type="number"
          placeholder="Door Number"
          v-model="company.doorNumber"
        />
        <input
          type="text"
          placeholder="Street Name"
          v-model="company.streetName"
        />
        <input type="text" placeholder="City" v-model="company.cityName" />
      </div>
      <div class="flex">
        <input type="text" placeholder="State" v-model="company.stateName" />
        <input type="number" placeholder="Pincode" v-model="company.pincode" />
      </div>
      <h1 style="font-size: 18px">Contact</h1>
      <div class="flex">
        <input type="email" placeholder="Email" v-model="company.emailId" />
        <input
          type="phone"
          placeholder="Phone Number"
          v-model="company.phoneNumber"
        />
      </div>
    </div>
    <div v-else class="user-profile">
      <svg-icon icon="user-circle-icon" color="gray2" size="200" />
      <div class="card">
        <h1 style="font-size: 32px">{{ company.companyName }}</h1>
        <p>Door No. {{ company.doorNumber }},</p>
        <p>{{ company.streetName }},</p>
        <p>{{ company.cityName }},</p>
        <p>{{ company.stateName }} - {{ company.pincode }}.</p>
      </div>
      <div class="card">
        <h1 style="font-size: 18px">Contact</h1>
        <p>{{ company.emailId }}</p>
        <p>{{ company.phoneNumber }}</p>
      </div>
      <div class="card">
        <h1 style="font-size: 18px">GSTIN</h1>
        <p>{{ company.gstinNumber }}</p>
      </div>
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
      this.company = JSON.parse(localStorage.getItem("companyDetails")) || {
        companyName: null,
        doorNumber: null,
        streetName: null,
        cityName: null,
        stateName: null,
        pincode: null,
        emailId: null,
        phoneNumber: null,
        gstinNumber: null,
      };
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
  overflow: auto;
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

.user-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0px;
  background: var(--gray0);
  box-shadow: 0px 3px 15px #0000001a;
  padding: 25px;
  border-radius: 6px;
  margin: 0px auto;
  min-height: calc(100vh - 175px);
  div {
    gap: 50px;
  }
}

.user-profile {
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  gap: 25px;
  background: var(--gray0);
  box-shadow: 0px 3px 15px #0000001a;
  padding: 25px;
  border-radius: 6px;
  text-align: center;
  min-height: calc(100vh - 175px);
  align-items: center;
}
</style>