<template>
  <section class="container">
    <top-bar>
      <template #default>
        <div class="flex menu-bar">
          <search-bar
            @typing="searchProduct"
            :placeHolder="'Search Items by Name, ID, ...'"
          ></search-bar>
          <div class="flex button-container" v-if="!tableEditMode">
            <list-box-item-sort></list-box-item-sort>
            <svg-icon
              icon="plus-icon"
              color="gray2"
              hover-color="blue"
              size="24"
              @click="triggerCreateProduct"
            ></svg-icon>
            <svg-icon
              icon="edit-icon"
              color="gray2"
              hover-color="blue"
              size="24"
              @click="toggleTableEditMode"
            ></svg-icon>
            <dropdown-menu-item
              @column-selected="toggleColumnVisibility"
              :column-data="columnProps"
            ></dropdown-menu-item>
          </div>
          <div class="flex button-container" v-if="tableEditMode">
            <the-button label="Save" @click="toggleTableEditMode"></the-button>
          </div>
        </div>
      </template>
    </top-bar>

    <the-table v-if="!tableEditMode" table-height="calc(100vh - 135px)">
      <template #colgroup>
        <col span="1" style="width: 5%" />
        <col span="1" style="width: 25%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 10%" />
      </template>
      <template #thead>
        <tr>
          <th v-if="columnProps.id.visible">{{ columnProps.id.name }}</th>
          <th v-if="columnProps.item_name.visible">
            {{ columnProps.item_name.name }}
          </th>
          <th v-if="columnProps.hsc_code.visible">
            {{ columnProps.hsc_code.name }}
          </th>
          <th v-if="columnProps.tax_type.visible">
            {{ columnProps.tax_type.name }}
          </th>
          <th v-if="columnProps.tax_percent.visible">
            {{ columnProps.tax_percent.name }}
          </th>
          <th v-if="columnProps.stock.visible">{{ columnProps.stock.name }}</th>
          <th v-if="columnProps.mrp_price.visible">
            {{ columnProps.mrp_price.name }}
          </th>
          <th v-if="columnProps.selling_price.visible">
            {{ columnProps.selling_price.name }}
          </th>
          <th v-if="columnProps.bar_code.visible">
            {{ columnProps.bar_code.name }}
          </th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="product in filteredProductList" :key="product.id">
          <td v-if="columnProps.id.visible">{{ product.id }}</td>
          <td v-if="columnProps.item_name.visible">
            {{ product.productName }}
          </td>
          <td v-if="columnProps.hsc_code.visible">
            {{ product.productHscNumber }}
          </td>
          <td v-if="columnProps.tax_type.visible">
            {{ product.productTaxType }}
          </td>
          <td v-if="columnProps.tax_percent.visible">
            {{ product.productTaxPercentage }} %
          </td>
          <td v-if="columnProps.stock.visible">{{ product.productStock }}</td>
          <td v-if="columnProps.mrp_price.visible">
            {{
              product.productMrpPrice.rupee +
              "." +
              product.productMrpPrice.paisa
            }}
          </td>
          <td v-if="columnProps.selling_price.visible">
            {{
              product.productSellingPrice.rupee +
              "." +
              product.productSellingPrice.paisa
            }}
          </td>
          <td v-if="columnProps.bar_code.visible">
            {{ product.productBarcode }}
          </td>
        </tr>
      </template>
    </the-table>
    <the-table
      v-else
      class="table-editmode"
      id="table-in-editmode"
      table-height="calc(100vh - 135px)"
    >
      <template #colgroup>
        <col span="1" style="width: 5%" />
        <col span="1" style="width: 20%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 9%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 14%" />
        <col span="1" style="width: 14%" />
        <col span="1" style="width: 10%" />
        <col span="1" style="width: 3%" />
      </template>
      <template #thead>
        <tr>
          <th v-for="column in columnProps" :key="column">{{ column.name }}</th>
          <th></th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="product in filteredProductList" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.productName }}</td>
          <td>{{ product.productHscNumber }}</td>
          <td>{{ product.productTaxType }}</td>
          <td>{{ product.productTaxPercentage }} %</td>
          <td>
            <input
              type="text"
              v-model="product.productStock"
              v-on:keydown="arrowkeyEventHandler($event, product.id)"
              placeholder="Stock"
              class="max-sm-wd"
              maxlength="6"
              @blur="validateInputField($event, product.id)"
              field="unit"
              @keypress="isNumber($event)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="product.productMrpPrice.rupee"
              v-on:keydown="arrowkeyEventHandler($event, product.id)"
              class="mid-wd"
              placeholder="Enter Rupees"
              @blur="validateInputField($event, product.id)"
              field="mrp_rupee"
              @keypress="isNumber($event)"
            />.
            <input
              type="text"
              v-model="product.productMrpPrice.paisa"
              v-on:keydown="arrowkeyEventHandler($event, product.id)"
              class="min-wd"
              maxlength="2"
              @blur="validateInputField($event, product.id)"
              field="mrp_paisa"
              @keypress="isNumber($event)"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="product.productSellingPrice.rupee"
              v-on:keydown="arrowkeyEventHandler($event, product.id)"
              class="mid-wd"
              placeholder="Enter Rupees"
              @blur="validateInputField($event, product.id)"
              field="sell_rupee"
              @keypress="isNumber($event)"
            />.
            <input
              type="text"
              v-model="product.productSellingPrice.paisa"
              v-on:keydown="arrowkeyEventHandler($event, product.id)"
              class="min-wd"
              maxlength="2"
              @blur="validateInputField($event, product.id)"
              field="sell_paisa"
              @keypress="isNumber($event)"
            />
          </td>
          <td>{{ product.productBarcode }}</td>
          <td>
            <svg-icon
              @click="triggerDeleteProduct(product.id)"
              size="24"
              icon="delete-icon"
              hover-color="red"
              color="gray2"
            ></svg-icon>
          </td>
        </tr>
      </template>
    </the-table>
  </section>
</template>

<script>
import DropdownMenuItem from "../../UI/DropdownMenu/DropdownMenuItem";
export default {
  components: {
    DropdownMenuItem,
  },
  data() {
    return {
      tableEditMode: false,
      ItemDeleteIdProp: null,
      searchKeyword: "",
      columnProps: {
        id: {
          name: "ID",
          visible: true,
        },
        item_name: {
          name: "ITEM NAME",
          visible: true,
        },
        hsc_code: {
          name: "HSC CODE",
          visible: true,
        },
        tax_type: {
          name: "TAX TYPE",
          visible: true,
        },
        tax_percent: {
          name: "TAX %",
          visible: true,
        },
        stock: {
          name: "STOCK",
          visible: true,
        },
        mrp_price: {
          name: "MRP PRICE",
          visible: true,
        },
        selling_price: {
          name: "SELLING PRICE",
          visible: true,
        },
        bar_code: {
          name: "BAR CODE",
          visible: true,
        },
      },
    };
  },
  computed: {
    productList() {
      return this.$store.getters["product/getProducts"];
    },
    filteredProductList() {
      return this.productList.filter((product) => {
        return (
          product.productName
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
    toggleColumnVisibility(columnName) {
      this.columnProps[columnName].visible =
        !this.columnProps[columnName].visible;
      localStorage.setItem("itemColumns", JSON.stringify(this.columnProps));
    },
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
        const product = await this.$store.dispatch("product/getProductById", {
          id,
        });
        switch (e.target.getAttribute("field")) {
          case "unit":
            e.target.value = product.productStock;
            break;
          case "mrp_rupee":
            e.target.value = product.productMrpPrice.rupee;
            break;
          case "mrp_paisa":
            e.target.value = product.productMrpPrice.paisa;
            break;
          case "sell_rupee":
            e.target.value = product.productSellingPrice.rupee;
            break;
          case "sell_paisa":
            e.target.value = product.productSellingPrice.paisa;
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
    if (localStorage.getItem("itemColumns") !== null) {
      this.columnProps = JSON.parse(localStorage.getItem("itemColumns"));
    }
  },
};
</script>
<style lang="scss" scoped>

.menu-bar {
  justify-content: space-between;
  align-items:center;
  gap: 1rem;
}

.button-container {
  align-items:center;
  gap: 1rem;
}

th {
  text-align: right;
  &:nth-child(1),
  &:nth-child(2) {
    text-align: left !important;
  }
}

tr {
  td {
    &:nth-of-type(1),
    &:nth-of-type(2) {
      text-align: left !important;
    }
  }
}

.table-editmode {
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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

        &.max-sm-wd {
          width: 75%;
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