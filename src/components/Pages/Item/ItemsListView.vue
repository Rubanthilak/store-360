<template>
  <div>
    <div class="flex">
      <search-bar @typing="searchProduct" :placeHolder="'Search Items by Name, ID, ...'"></search-bar>
      <div class="flex button-container" v-if="!tableEditMode">
        <the-button label="New" @click="triggerCreateProduct"></the-button>
        <the-button label="Edit" @click="toggleTableEditMode"></the-button>
        <dropdown-menu-item></dropdown-menu-item>
      </div>
      <div class="flex button-container" v-if="tableEditMode">
        <the-button label="Save" @click="toggleTableEditMode"></the-button>
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
        <tr v-for="item in filteredProductList" :key="item.id">
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
          <th></th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="item in filteredProductList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>
            <input
              type="text"
              v-model="item.unit"
              v-on:keydown="arrowkeyEventHandler($event,item.id)"
              placeholder="Stock"
              class="max-wd"
              maxlength="6"
              @blur="validateInputField($event,item.id)"
              field="unit"
              @keypress="isNumber($event)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="item.mrp_price.rupee"
              v-on:keydown="arrowkeyEventHandler($event,item.id)"
              class="mid-wd"
              placeholder="Enter Rupees"
              @blur="validateInputField($event,item.id)"
              field="mrp_rupee"
              @keypress="isNumber($event)"
            />.
            <input
              type="text"
              v-model="item.mrp_price.paisa"
              v-on:keydown="arrowkeyEventHandler($event,item.id)"
              class="min-wd"
              maxlength="2"
              @blur="validateInputField($event,item.id)"
              field="mrp_paisa"
              @keypress="isNumber($event)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="item.selling_price.rupee"
              v-on:keydown="arrowkeyEventHandler($event,item.id)"
              class="mid-wd"
              placeholder="Enter Rupees"
              @blur="validateInputField($event,item.id)"
              field="sell_rupee"
              @keypress="isNumber($event)"
            />.
            <input
              type="text"
              v-model="item.selling_price.paisa"
              v-on:keydown="arrowkeyEventHandler($event,item.id)"
              class="min-wd"
              maxlength="2"
              @blur="validateInputField($event,item.id)"
              field="sell_paisa"
              @keypress="isNumber($event)"
            />
          </td>
          <td>{{item.barcode}}</td>
          <td>
            <delete-icon @click="triggerDeleteProduct(item.id)"></delete-icon>
          </td>
        </tr>
      </template>
    </the-table>
  </div>
</template>

<script>
import DropdownMenuItem from "../../UI/DropdownMenu/DropdownMenuItem";
export default {
  components: {
    DropdownMenuItem,
  },
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
      ItemDeleteIdProp: null,
      searchKeyword: "",
    };
  },
  computed: {
    productList() {
      return this.$store.getters["product/getProducts"];
    },
    filteredProductList() {
      return this.productList.filter((product) => {
        return (
          product.name
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase()) ||
          product.id
            .toString()
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase())
        );
      });
    },
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

    triggerDeleteProduct(id) {
      this.$store.commit("product/setProductIdToDelete", id);
      this.$store.commit("setActivePopup", "popup-delete-item");
    },

    triggerCreateProduct() {
      this.$store.commit("setActivePopup", "popup-new-item");
    },

    searchProduct(str) {
      this.searchKeyword = str;
    },

    // Adds red border to input field on keypress if input field is empty.
    validateArrowKey(e) {
      if (e.target.value === "") {
        e.target.classList.add("error-border");
        return false;
      } else {
        e.target.classList.remove("error-border");
      }
      return true;
    },

    async validateInputField(e, id = null) {
      if (e.target.value === "") {
        e.target.classList.remove("error-border");
        const item = await this.$store.dispatch("product/getProductById", {
          id,
        });
        switch (e.target.getAttribute("field")) {
          case "unit":
            e.target.value = item.unit;
            break;
          case "mrp_rupee":
            e.target.value = item.mrp_price.rupee;
            break;
          case "mrp_paisa":
            e.target.value = item.mrp_price.paisa;
            break;
          case "sell_rupee":
            e.target.value = item.selling_price.rupee;
            break;
          case "sell_paisa":
            e.target.value = item.selling_price.paisa;
            break;
        }
      } else {
        e.target.classList.remove("error-border");
        this.productList.forEach((product) => {
          if (product.id === id) {
            this.$store.dispatch("product/updateProduct", product);
          }
        });
      }
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

    arrowkeyEventHandler(e) {
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
            this.validateArrowKey(e)
          ) {
            inputs[index - 1].focus();
          }
          break;
        case 38:
          // "Up Key pressed!"
          e.preventDefault();
          if (index - 5 >= 0 && this.validateArrowKey(e)) {
            inputs[index - 5].focus();
          }
          break;
        case 39:
          // "Right Key pressed!
          if (
            index < inputs.length - 1 &&
            e.target.selectionStart == e.target.value.length &&
            this.validateArrowKey(e)
          ) {
            inputs[index + 1].focus();
          }
          break;
        case 40:
          // "Down Key pressed!"
          e.preventDefault();
          if (index + 5 < inputs.length && this.validateArrowKey(e)) {
            inputs[index + 5].focus();
          }
          break;
        case 46:
          // "Delete Key pressed!"
          e.target.value = "";
          break;
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("product/getProductList");
  },
};
</script>
<style lang="scss" scoped>
.flex {
  justify-content: space-between;
}

.button-container {
  & > div {
    margin-left: 10px;
  }
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