<template>
  <section class="container">
    <div class="flex">
      <div class="flex">
        <router-link to="/items">
          <div class="back-button">
            <svg-icon size="34" icon="back-icon"></svg-icon>
          </div>
        </router-link>
        <h1>Add Items</h1>
      </div>
      <div class="flex button-container" v-if="!isLoading && !isSuccess && !isListEmpty">
        <the-button label="Save" @click="validateProductList"></the-button>
        <the-button label="Add Rows" @click="generateRows"></the-button>
        <the-button label="Remove Rows" color="red" v-if="isSelected" @click="removeRows"></the-button>
      </div>
    </div>
    <hr />
    <div v-if="isLoading" class="loading-wrapper">
      <loading-spinner></loading-spinner>
      <p class="mg-top">Adding Items ....</p>
    </div>
    <div v-else-if="isSuccess" class="loading-wrapper">
      <p>Successfully Added</p>
    </div>
    <div v-else-if="isListEmpty" class="loading-wrapper">
      <p>
        The List is empty 📄.
        <br />Please add items by clicking the button below.
      </p>
      <the-button label="Click Here" @click="generateRows"></the-button>
    </div>
    <div class="table-wrapper" v-else>
      <the-table class="table-editmode" id="table">
        <template #colgroup>
          <col span="1" style="width: 3%;" />
          <col span="1" style="width: 3%;" />
          <col span="1" style="width: 35%;" />
          <col span="1" style="width: 14%;" />
          <col span="1" style="width: 15%;" />
          <col span="1" style="width: 15%;" />
          <col span="1" style="width: 12%;" />
        </template>
        <template #thead>
          <tr>
            <th v-for="title in columnName" :key="title">{{title}}</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="item in productList" :key="item.id">
            <td>
              <input type="checkbox" v-model="item.isChecked" />
            </td>
            <td>
              <div class="sno">
                <svg-icon v-if="item.hasError" size="24" icon="warn-icon" color="red"></svg-icon>
                <p v-else>{{productList.indexOf(item)+1}}</p>
              </div>
            </td>
            <td>
              <input
                type="text"
                v-model="item.productName"
                placeholder="Enter Name"
                class="max-wd"
                v-on:keydown="arrowkeyEventHandler($event)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.productQuantity"
                placeholder="Enter Stock"
                class="max-sm-wd"
                maxlength="6"
                v-on:keydown="arrowkeyEventHandler($event)"
                @keypress="isNumber($event)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.productMrpPrice.rupee"
                class="mid-wd"
                placeholder="Enter Rupees"
                v-on:keydown="arrowkeyEventHandler($event)"
                @keypress="isNumber($event)"
              />.
              <input
                type="text"
                v-model="item.productMrpPrice.paisa"
                class="min-wd"
                maxlength="2"
                v-on:keydown="arrowkeyEventHandler($event)"
                placeholder="PP"
                @keypress="isNumber($event)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.productSellingPrice.rupee"
                class="mid-wd"
                placeholder="Enter Rupees"
                v-on:keydown="arrowkeyEventHandler($event)"
                @keypress="isNumber($event)"
              />.
              <input
                type="text"
                v-model="item.productSellingPrice.paisa"
                class="min-wd"
                maxlength="2"
                v-on:keydown="arrowkeyEventHandler($event)"
                placeholder="PP"
                @keypress="isNumber($event)"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.productBarcode"
                class="max-sm-wd"
                v-on:keydown="arrowkeyEventHandler($event)"
                placeholder="Enter Barcode"
                @keypress="isNumber($event)"
              />
            </td>
          </tr>
        </template>
      </the-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      columnName: [
        " ",
        "S.NO",
        "ITEM NAME",
        "STOCK",
        "MRP PRICE (in ₹)",
        "SELLING PRICE (in ₹)",
        "BAR CODE",
      ],
      productList: [],
      isLoading: false,
      isSuccess: false,
    };
  },
  computed: {
    isListEmpty() {
      if (this.productList.length === 0) {
        return true;
      }
      return false;
    },
    isSelected() {
      let flag = false;
      this.productList.forEach((product) => {
        if (product.isChecked) {
          flag = true;
        }
      });
      return flag;
    },
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        (charCode > 31 && (charCode < 48 || charCode > 57)) ||
        charCode === 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    arrowkeyEventHandler(e) {
      const inputs = Array.from(
        document.getElementById("table").querySelectorAll("input[type=text]")
      );
      const index = inputs.indexOf(e.target);
      switch (e.keyCode) {
        case 37:
          // "Left Key pressed!"
          if (index > 0 && e.target.selectionStart == 0) {
            inputs[index - 1].focus();
          }
          break;
        case 38:
          // "Up Key pressed!"
          e.preventDefault();
          if (index - 7 >= 0) {
            inputs[index - 7].focus();
          }
          break;
        case 39:
          // "Right Key pressed!
          if (
            index < inputs.length - 1 &&
            e.target.selectionStart == e.target.value.length
          ) {
            inputs[index + 1].focus();
          }
          break;
        case 40:
          // "Down Key pressed!"
          e.preventDefault();
          if (index + 7 < inputs.length) {
            inputs[index + 7].focus();
          }
          break;
        case 46:
          // "Delete Key pressed!"
          e.target.value = "";
          break;
      }
    },
    removeRows() {
      this.productList = this.productList.filter(
        (product) => !product.isChecked
      );
    },
    generateRows() {
      if (this.productList.length < 90) {
        for (var i = 0; i < 10; i++) {
          this.productList.push({
            productName: "",
            productQuantity: null,
            productMrpPrice: {
              rupee: null,
              paisa: null,
            },
            productSellingPrice: {
              rupee: null,
              paisa: null,
            },
            productBarcode: null,
            hasError: false,
            isChecked: false,
          });
        }
      } else if (
        this.productList.length < 100 &&
        this.productList.length > 90
      ) {
        var len = 100 - this.productList.length;
        for (var j = 0; j < len; j++) {
          this.productList.push({
            productName: "",
            productQuantity: null,
            productMrpPrice: {
              rupee: null,
              paisa: null,
            },
            productSellingPrice: {
              rupee: null,
              paisa: null,
            },
            productBarcode: null,
            hasError: false,
            isChecked: false,
          });
        }
      } else {
        this.$store.commit("showSnackBar", "You can only add 100 rows.");
      }
    },
    async validateProductList() {
      var errorFlag = false;
      this.isLoading = true;

      this.productList.forEach((product) => {
        if (
          product.productName === "" ||
          product.productQuantity === null ||
          product.productMrpPrice.rupee === null ||
          product.productSellingPrice.rupee === null ||
          product.productBarcode === null
        ) {
          product.hasError = true;
          errorFlag = true;
        } else {
          product.hasError = false;
        }
      });

      if (!errorFlag) {
        var tempList = [];
        this.productList.forEach((product) => {
          var tempProduct = {
            productName: product.productName,
            productQuantity: product.productQuantity,
            productBarcode: product.productBarcode,
            productMrpPrice: parseFloat(
              product.productMrpPrice.rupee +
                "." +
                (product.productMrpPrice.paisa
                  ? product.productMrpPrice.paisa
                  : "00")
            ),
            productSellingPrice: parseFloat(
              product.productSellingPrice.rupee +
                "." +
                (product.productSellingPrice.paisa
                  ? product.productSellingPrice.paisa
                  : "00")
            ),
          };
          tempList.push(tempProduct);
        });
        await this.$store.dispatch("product/postProductList", tempList);
        this.isSuccess = true;
      } else {
        //Add a SnackBar Popup to check the invalid fields
        this.$store.commit("showSnackBar", "Please, Enter correct values");
        this.isLoading = false;
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  },
  mounted() {
    this.generateRows();
  },
};
</script>


<style lang="scss" scoped>
.flex {
  justify-content: space-between;
  align-items: center;
}

.table-wrapper {
  margin-top: 15px;
}

.mg-top {
  margin-top: 10px;
}


.back-button {
  justify-content: center;
  align-items: center;
  display: flex;
}

h1{
  font-family: var(--font-semibold);
  margin: 0px 10px;
}

.button-container {
  & > div {
    margin-left: 10px;
  }
}

.sno {
  display: flex;
  justify-content: space-evenly;

  p {
    line-height: 20px;
  }
}

.loading-wrapper {
  padding: 25px;
  height: calc(100vh - 220px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-family: var(--font-regular);
  flex-direction: column;
  text-align: center;

  p {
    margin: 10px 0px;
  }
}

.table-editmode {
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  th:nth-of-type(2) {
    text-align: center !important;
  }

  th:nth-of-type(3) {
    text-align: left;
  }

  tr {
    background: var(--gray0);
    padding: 0px !important;
    cursor: default !important;

    &:hover {
      background: var(--gray0) !important;
      color: var(--gray6) !important;
    }

    td {
      text-align: right;
      font-size: 14px;
      border-bottom: 2px solid var(--gray1);
      padding: 0px;
      overflow: hidden;

      &:first-of-type {
        text-align: center;
        padding-left: 15px;
        input {
          cursor: pointer;
        }
      }

      &:last-of-type {
        padding-right: 15px;
      }

      &:nth-of-type(2) {
        p {
          text-align: center;
        }
      }

      &:nth-of-type(3) {
        text-align: left;
        input {
          text-align: left;
        }
      }

      input {
        background: var(--aqua);
        text-align: right;
        padding: 10px 8px;
        font-family: var(--font-regular);
        border: 2px solid transparent;
        display: inline-block;
        border-radius: 4px;

        &.max-wd {
          width: 95%;
        }

        &.max-sm-wd {
          width: calc(85% - 10px);
        }

        &.mid-sm-wd {
          width: 55%;
        }

        &.mid-wd {
          width: 60%;
        }

        &.min-wd {
          width: 10%;
          text-align: center;
          padding: 10px 4px;
        }
      }

      input:focus {
        background: var(--gray0);
        border: 2px solid var(--blue);
        border-radius: 4px;
        outline: none;
      }
    }
  }

  // .error-border {
  //   border: 2px solid var(--red);
  //   border-radius: 4px;
  // }
}
</style>