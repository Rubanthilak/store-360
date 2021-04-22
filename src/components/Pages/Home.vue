<template>
  <section>
    <the-tabs></the-tabs>
    <div class="tab-body">
      <div class="tab-container">
        <div class="flex menu-bar">
          <search-bar-dropdown place-holder="Search Items by Name, ID, Barcode" @select="test"></search-bar-dropdown>
        </div>
        <hr />
        <the-table>
          <template #colgroup>
            <col span="1" style="width: 5%;" />
            <col span="1" style="width: 30%;" />
            <col span="1" style="width: 5%;" />
            <col span="1" style="width: 12%;" />
            <col span="1" style="width: 12%;" />
          </template>
          <template #thead>
            <tr>
              <th v-for="title in columnName" :key="title">{{title}}</th>
            </tr>
          </template>
          <template #tbody>
            <tr v-for="item in cartList" :key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.count}}</td>
              <td>{{item.selling_price.rupee+'.'+item.selling_price.paisa}}</td>
              <td
                style="font-family:var(--font-semibold)"
              >{{((item.selling_price.rupee+'.'+item.selling_price.paisa)*item.count).toFixed(2)}}</td>
            </tr>
          </template>
        </the-table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("product/getProductList");
  },
  data() {
    return {
      cartList: [],
      columnName: ["ID", "ITEM NAME", "UNIT", "SELLING PRICE", "TOTAL PRICE"],
    };
  },
  methods: {
    test(obj) {
      let index = this.cartList.indexOf(obj);
      if (index !== -1) {
        this.cartList[index].count++;
      } else {
        obj.count = 1;
        this.cartList.push(obj);
      }
    },
  },
  computed: {
    totalPrice() {
      let temp = 0;
      this.cartList.forEach((item) => {
        temp += +(
          (item.selling_price.rupee + "." + item.selling_price.paisa) *
          item.count
        ).toFixed(2);
      });
      return parseFloat(temp);
    },
    cgstAmount() {
      return parseFloat(this.totalPrice * 0.08);
    },
    sgstAmount() {
      return parseFloat(this.totalPrice * 0.08);
    },
    billAmount() {
      return (this.cgstAmount + this.sgstAmount + this.totalPrice).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 0px !important;
  min-width: 1200px;
  max-width: 100vw;
}

.tab-body {
  background: var(--gray1);
  height: 100vh;
  min-width: 1200px;
  width: 90%;
  padding: 25px 0px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: auto 350px;
  gap: 1em;
}

.tab-container {
  width: 100%;
  height: 100%;
}

.menu-bar {
  margin-bottom: 25px;
  max-width: 100%;
}

</style>