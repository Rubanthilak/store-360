<template>
  <section>
    <div class="flex">
      <the-button label="Back"></the-button>
      <div class="flex button-container">
        <the-button label="Add Rows" @click="generateRows"></the-button>
        <the-button label="Save" @click="validateProductList"></the-button>
      </div>
    </div>
    <div v-if="isLoading" class="loading-wrapper">
      <loading-spinner></loading-spinner>
    </div>
    <div  v-else-if="isSuccess" class="loading-wrapper">
      <p>Successfully Added</p>
    </div>
    <div class="table-wrapper" v-else>
      <the-table class="table-editmode" id="table">
        <template #colgroup>
          <col span="1" style="width: 5%;" />
          <col span="1" style="width: 35%;" />
          <col span="1" style="width: 10%;" />
          <col span="1" style="width: 15%;" />
          <col span="1" style="width: 15%;" />
          <col span="1" style="width: 12%;" />
          <col span="1" style="width: 4%;" />
        </template>
        <template #thead>
          <tr>
            <th v-for="title in columnName" :key="title">{{title}}</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="item in productList" :key="item.id">
            <td>
              <div class="sno">
                <warn-icon v-show="item.hasError"></warn-icon>
                <p>{{productList.indexOf(item)+1}}</p>
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
                class="max-wd"
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
            <td>
              <cross-icon @click="removeProduct(productList.indexOf(item))"></cross-icon>
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
        "S.NO",
        "ITEM NAME",
        "STOCK",
        "MRP PRICE (in ₹)",
        "SELLING PRICE (in ₹)",
        "BAR CODE",
        " ",
      ],
      productList: [],
      isLoading: true,
      isSuccess: false,
    };
  },
  methods: {

    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) || charCode === 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    arrowkeyEventHandler(e) {
      const inputs = Array.from(
        document.getElementById("table").getElementsByTagName("input")
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
      }
      setTimeout(() => this.isLoading = false ,3000);
    },
    removeProduct(index) {
      this.productList.splice(index, 1);
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
}

.table-wrapper {
  margin-top: 25px;
}

hr:first-of-type {
  margin-top: 20px;
}

.button-container {
  & > div {
    margin-left: 10px;
  }
}

.sno {
  display: flex;
  svg {
    margin-left: -30px;
    margin-right: 5px;
  }
  p {
    line-height: 20px;
  }
}

.loading-wrapper {
  margin-top: 20px;
  padding: 25px;
  height: calc(100vh - 220px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-family: var(--font-regular);
}

.table-editmode {
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  th:last-child {
    padding-left: 0px !important;
    padding-right: 0px !important;
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

      &:first-of-type {
        text-align: center;
        padding-left: 35px;
      }

      &:nth-of-type(2) {
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
          width: 85%;
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