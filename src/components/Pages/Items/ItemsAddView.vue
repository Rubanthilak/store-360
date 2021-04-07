<template>
  <section>
    <div class="flex button-container">
      <the-button label="Back"></the-button>
    </div>
    <div class="table-wrapper">
      <the-table class="table-editmode" id="table">
        <template #colgroup>
          <col span="1" style="width: 4%;" />
          <col span="1" style="width: 35%;" />
          <col span="1" style="width: 10%;" />
          <col span="1" style="width: 15%;" />
          <col span="1" style="width: 15%;" />
          <col span="1" style="width: 12%;" />
          <col span="1" style="width: 5%;" />
        </template>
        <template #thead>
          <tr>
            <th v-for="title in columnName" :key="title">{{title}}</th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="item in productList" :key="item.id">
            <td>{{productList.indexOf(item)+1}}</td>
            <td>
              <input
                type="text"
                v-model="item.name"
                placeholder="Name"
                class="max-wd"
                maxlength="6"
                v-on:keydown="arrowkeyEventHandler($event)"
                field="name"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.unit"
                placeholder="Stock"
                class="max-wd"
                maxlength="6"
                v-on:keydown="arrowkeyEventHandler($event)"
                field="unit"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.mrp_price.rupee"
                class="mid-wd"
                placeholder="Enter Rupees"
                v-on:keydown="arrowkeyEventHandler($event)"
                field="mrp_rupee"
              />.
              <input
                type="text"
                v-model="item.mrp_price.paisa"
                class="min-wd"
                maxlength="2"
                v-on:keydown="arrowkeyEventHandler($event)"
                field="mrp_paisa"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.selling_price.rupee"
                class="mid-wd"
                placeholder="Enter Rupees"
                v-on:keydown="arrowkeyEventHandler($event)"
                field="sell_rupee"
              />.
              <input
                type="text"
                v-model="item.selling_price.paisa"
                class="min-wd"
                maxlength="2"
                v-on:keydown="arrowkeyEventHandler($event)"
                field="sell_paisa"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="item.barcode"
                class="max-sm-wd"
                maxlength="2"
                field="barcode"
                v-on:keydown="arrowkeyEventHandler($event)"
                placeholder="Barcode"
              />
            </td>
            <td>
              <delete-icon></delete-icon>
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
        " "
      ],
      productList: [],
    };
  },
  methods: {
    validateArrowKey(e) {
      if (e.target.value === "") {
        e.target.classList.add("error-border");
        // return false;
      } else {
        e.target.classList.remove("error-border");
      }
      return true;
    },
    arrowkeyEventHandler(e) {
      const inputs = Array.from(
        document.getElementById("table").getElementsByTagName("input")
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
          if (index - 7 >= 0 && this.validateArrowKey(e)) {
            inputs[index - 7].focus();
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
          if (index + 7 < inputs.length && this.validateArrowKey(e)) {
            inputs[index + 7].focus();
          }
          break;
        case 46:
          // "Delete Key pressed!"
          e.target.value = "";
          break;
      }
    },
    generateRows(num=20){
      for (var i = 0; i < num; i++) {
      this.productList.push({
        name: "",
        stock: null,
        mrp_price: {
          rupee: null,
          paisa: null,
        },
        selling_price: {
          rupee: null,
          paisa: null,
        },
        barcode: null,
      });
     }
    }
  },
  mounted() {
    this.generateRows(25);
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

.button-container {
  & > div {
    margin-left: 10px;
  }
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

      &:first-of-type{
        text-align: center;
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