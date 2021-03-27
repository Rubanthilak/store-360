<template>
  <div>
    <div class="flex">
      <search-bar></search-bar>
      <div class="flex" v-if="!tableEditMode">
        <the-button label="New" @click="popupNewItemTrigger"></the-button>
        <the-button label="Edit" @click="toggleTableEditMode"></the-button>
        <icon-button></icon-button>
      </div>
      <div class="flex" v-else>
        <the-button label="Save" @click="toggleTableEditMode"></the-button>
        <the-button label="Back" color="red" @click="toggleTableEditMode"></the-button>
      </div>
    </div>
    <hr />
    <the-table v-if="!tableEditMode">
      <template #colgroup>
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 45%;" />
        <col span="1" style="width: 5%;" />
        <col span="1" style="width: 15%;" />
        <col span="1" style="width: 15%;" />
        <col span="1" style="width: 10%;" />
      </template>
      <template #thead>
        <tr>
          <th v-for="title in columnName" :key="title">{{title}}</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="item in columnData" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.unit}}</td>
          <td>{{item.mrp_price.rupee+'.'+item.mrp_price.paisa}}</td>
          <td>{{item.selling_price.rupee+'.'+item.selling_price.paisa}}</td>
          <td>{{item.barcode}}</td>
        </tr>
      </template>
    </the-table>
    <the-table v-else class="table-editmode" id="table-in-editmode">
      <template #colgroup>
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 40%;" />
        <col span="1" style="width: 5%;" />
        <col span="1" style="width: 15%;" />
        <col span="1" style="width: 15%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 5%;" />
      </template>
      <template #thead>
        <tr>
          <th v-for="title in columnName" :key="title">{{title}}</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="item in columnData" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>
            <input
              type="text"
              v-model="item.unit"
              v-on:keydown="arrowkeyEventHandler($event,item.id,'unit')"
              placeholder="Stock"
              class="max-wd"
              maxlength="6"
              @blur="validateInputField($event,item.id)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="item.mrp_price.rupee"
              v-on:keydown="arrowkeyEventHandler($event,item.id,'mrp')"
              class="mid-wd"
              placeholder="Enter Rupees"
              @blur="validateInputField($event,item.id)"
            />.
            <input
              type="text"
              v-model="item.mrp_price.paisa"
              v-on:keydown="arrowkeyEventHandler($event,item.id,'mrp')"
              class="min-wd"
              maxlength="2"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="item.selling_price.rupee"
              v-on:keydown="arrowkeyEventHandler($event,item.id,'sell')"
              class="mid-wd"
              placeholder="Enter Rupees"
              @blur="validateInputField($event,item.id)"
            />.
            <input
              type="text"
              v-model="item.selling_price.paisa"
              v-on:keydown="arrowkeyEventHandler($event,item.id,'sell')"
              class="min-wd"
              maxlength="2"
            />
          </td>
          <td>{{item.barcode}}</td>
          <td>
            <delete-icon></delete-icon>
          </td>
        </tr>
      </template>
    </the-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnName: [
        "ID",
        "ITEM NAME",
        "STOCK",
        "MRP PRICE (in ₹)",
        "SELLING PRICE (in ₹)",
        "BAR CODE",
      ],
      tableEditMode: false,
    };
  },
  computed: {
    columnData(){
      var tempList = [];
      this.$store.state.productList.forEach(product => {
        var tempProduct = {
          id:product.id,
          name:product.productName,
          unit:product.productQuantity,
          mrp_price:{
            rupee:Math.floor(product.productMrpPrice),
            paisa:product.productMrpPrice%1,
          },
          selling_price:{
            rupee:Math.floor(product.productSellingPrice),
            paisa:Math.round(product.productSellingPrice%1*100),
          },
          barcode:product.productBarcode,
        };
        tempList.push(tempProduct);
      });
      return tempList;
    }
  },
  methods: {
    
    popupNewItemTrigger(){
      this.$store.commit("setActivePopup","popup-new-item")
    },

    validateInputField(e, id = null) {
      if (id == null) {
        if (e.target.value == "") {
          e.target.classList.add("error-border");
          return false;
        } else {
          e.target.classList.remove("error-border");
        }
      } else {
        if (e.target.value == "") {
          this.columnData.forEach((item) => {
            if (item.id == id) {
              item.unit = 56; //TODO: get value from database instead of 56
            }
          });
        }
      }
      return true;
    },

    toggleTableEditMode() {
      this.tableEditMode = !this.tableEditMode;
      if (this.tableEditMode) {
        setTimeout(() => {
          var inputs = document
            .getElementById("table-in-editmode")
            .getElementsByTagName("input");
          inputs[0].focus();
        }, 100);
      }
    },

    arrowkeyEventHandler(e, id, type = "") {
      const inputs = Array.from(
        document
          .getElementById("table-in-editmode")
          .getElementsByTagName("input")
      );
      const index = inputs.indexOf(e.target);
      switch (e.keyCode) {
        case 37:
          // "Left Key pressed!"
          if (
            index > 0 &&
            e.target.selectionStart == 0 &&
            this.validateInputField(e)
          ) {
            inputs[index - 1].focus();
          }
          break;
        case 38:
          // "Up Key pressed!"
          if (index - 5 >= 0 && this.validateInputField(e)) {
            inputs[index - 5].focus();
          }
          break;
        case 39:
          // "Right Key pressed!
          if (
            index < inputs.length - 1 &&
            e.target.selectionStart == e.target.value.length &&
            this.validateInputField(e)
          ) {
            inputs[index + 1].focus();
          }
          break;
        case 40:
          // "Down Key pressed!"
          if (index + 5 < inputs.length && this.validateInputField(e)) {
            inputs[index + 5].focus();
          }
          break;
        case 46:
          // "Delete Key pressed!"
          this.columnData.forEach((item) => {
            if (item.id == id) {
              if (type.localeCompare("unit") == 0) {
                e.target.value = "";
              } else if (type.localeCompare("mrp") == 0) {
                item.mrp_price.rupee = "";
              } else {
                item.selling_price.rupee = "";
              }
            }
          });
          break;
      }
    },
  },
  async mounted(){
      await this.$store.dispatch('getProductList');
  },
};
</script>
<style lang="scss" scoped>
.flex {
  justify-content: space-between;
}

hr:first-of-type {
  margin-top: 20px;
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
    padding: 0px 10px;
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

      input {
        text-align: right;
        padding: 10px 8px;
        font-family: var(--font-regular);
        background: var(--aqua);
        border: 2px solid transparent;
        display: inline-block;

        &.max-wd {
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

  .error-border:focus {
    border: 2px solid var(--red);
    border-radius: 4px;
  }
}
</style>