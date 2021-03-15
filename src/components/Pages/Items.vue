<template>
  <div>
    <div class="flex">
      <search-bar></search-bar>
      <div class="flex" v-if="!tableEditMode">
        <the-button label="New"></the-button>
        <the-button label="Edit"  @click="toggleTableEditMode" ></the-button>
        <icon-button></icon-button>
      </div>
      <div class="flex" v-else>
        <the-button label="Save"></the-button>
        <the-button label="Close" color="red" @click="toggleTableEditMode"></the-button>
      </div>
    </div>
    <hr />
    <the-table v-if="!tableEditMode">
      <template #colgroup>
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 40%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 13%;" />
        <col span="1" style="width: 13%;" />
        <col span="1" style="width: 12%;" />
      </template>
      <template #thead>
        <tr>
          <th v-for="title in tableData.columnName" :key="title">{{title}}</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="item in tableData.columnData" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.unit}}</td>
          <td>₹ {{item.mrp_price}}</td>
          <td>₹ {{item.selling_price}}</td>
          <td>{{item.barcode}}</td>
        </tr>
      </template>
    </the-table>
    <the-table v-else class="table-editmode" id="table-in-editmode">
      <template #colgroup>
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 35%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 15%;" />
        <col span="1" style="width: 15%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 5%;" />
      </template>
      <template #thead>
        <tr>
          <th v-for="title in tableData.columnName" :key="title">{{title}}</th>
        </tr>
      </template>
      <template #tbody>
        <tr v-for="item in tableData.columnData" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>
            <input type="text" v-model="item.unit" v-on:keydown="arrowkeyEventHandler" />
          </td>
          <td>
            <input type="text" v-model="item.mrp_price" v-on:keydown="arrowkeyEventHandler" />
          </td>
          <td>
            <input type="text" v-model="item.selling_price" v-on:keydown="arrowkeyEventHandler" />
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
      tableData: {
        columnName: ["ID", "ITEM NAME", "UNIT", "MRP PRICE", "SELLING PRICE", "BAR CODE"],
        columnData: [
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "10.00",
            selling_price: "10.00",
            barcode: "1801251"
          },
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "10.00",
            selling_price: "10.00",
            barcode: "1801251"
          },
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "10.00",
            selling_price: "10.00",
            barcode: "1801251"
          },
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "10.00",
            selling_price: "10.00",
            barcode: "1801251"
          },
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "10.00",
            selling_price: "10.00",
            barcode: "1801251"
          },
        ],
      },
      tableEditMode: false,
    };
  },
  methods: {
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
          if (index > 0) {
            inputs[index - 1].focus();
          }
          break;
        case 38:
          // "Up Key pressed!"
          if (index - 3 >= 0) {
            inputs[index - 3].focus();
          }
          break;
        case 39:
          // "Right Key pressed!
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
          break;
        case 40:
          // "Down Key pressed!"
          if (index + 3 < inputs.length) {
            inputs[index + 3].focus();
          }
          break;
      }
    },
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
</style>