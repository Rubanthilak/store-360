<template>
  <div>
    <div class="flex">
      <search-bar></search-bar>
      <div class="flex">
        <the-button label="New"></the-button>
        <the-button label="Edit"></the-button>
        <icon-button></icon-button>
      </div>
    </div>
    <hr/>
    <the-table>
      <template #colgroup>
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 50%;" />
        <col span="1" style="width: 10%;" />
        <col span="1" style="width: 13%;" />
        <col span="1" style="width: 15%;" />
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
          <td>{{item.mrp_price}}</td>
          <td>{{item.selling_price}}</td>
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
        columnName: ["ID", "ITEM NAME", "UNIT", "MRP PRICE", "SELLING PRICE"],
        columnData: [
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "₹ 10.00",
            selling_price: "₹ 10.00"
          },
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "₹ 10.00",
            selling_price: "₹ 10.00"
          },
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "₹ 10.00",
            selling_price: "₹ 10.00"
          },
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "₹ 10.00",
            selling_price: "₹ 10.00"
          },
          {
            id: "000 129",
            name: "Bourban Biscuit",
            unit: "86",
            mrp_price: "₹ 10.00",
            selling_price: "₹ 10.00"
          },
        ]
      },
    };
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