<template>
  <div class="flex" id="item-sb-dd">
    <input
      :placeholder="placeHolder"
      v-model="searchKeyword"
      v-on:keydown="arrowkeyEventHandler($event)"
    />
    <div class="dropdown-body" v-if="filteredProductList">
      <div v-if="filteredProductList.length > 0 ">
        <div class="dropdown-header">
          <p>ID</p>
          <p>ITEM NAME</p>
        </div>
        <div
          v-for="(item,index) in filteredProductList"
          :key="item.id"
          :class="['dropdown-item',{'active' : activeTileIndex===index}]"
          @click="itemSelected(item)"
        >
          <p>{{item.id}}</p>
          <p>{{item.productName}}</p>
        </div>
      </div>
      <div v-else class="nf-text">
        <p>NO ITEMS FOUND</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["placeHolder"],
  emits: ["select"],
  methods: {
    itemSelected(obj) {
      this.searchKeyword = "";
      this.$emit("select", obj);
    },
    arrowkeyEventHandler(event) {
      if (event.keyCode === 40 && this.activeTileIndex < this.filteredProductList.length-1 ) {
        this.activeTileIndex += 1;
      }
      else if (event.keyCode === 38 && this.activeTileIndex > 0){
        this.activeTileIndex -= 1;
      }
      else if (event.keyCode === 13 && this.activeTileIndex !== -1){
        this.itemSelected(this.filteredProductList[this.activeTileIndex]);
      }
    },
  },
  data() {
    return {
      columnName: ["ID", "ITEM NAME", "BAR CODE"],
      searchKeyword: "",
      activeTileIndex: -1
    };
  },
  computed: {
    productList() {
      return this.$store.getters["product/getProducts"];
    },
    filteredProductList() {
      if (this.searchKeyword.trim() === "") {
        return null;
      }
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
  watch:{
    filteredProductList(curVal,oldVal){
      if(curVal != oldVal){
        this.activeTileIndex = -1;
      }
    }
  }
};
</script>

<style scoped lang="scss">
input {
  display: flex;
  width: calc(100% - 34px);
  padding: 0px 15px;
  height: 35px;
  border: none;
  outline: none;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.01);
  border-radius: 4px;
  border: 2px solid var(--gray0);
  
  &:focus{
    border: 2px solid var(--blue);
    background: var(--gray0);
  }

}

.nf-text {
  text-align: center;
  padding: 20px 0px;
  p {
    font-family: var(--font-semibold);
    font-size: 16px;
  }
}

.flex {
  width: 100%;
  flex-direction: column;
  font-family: var(--font-regular);
  font-size: 14px;
  position: relative;
}

.dropdown-body {
  position: absolute;
  top: 42px;
  z-index: 1;
  background: var(--gray0);
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow-y: auto;
  border-radius:8px;
  max-height: 300px;
}

.dropdown-item {
  display: grid;
  grid-template-columns: 5% auto;
  gap: 1rem;
  cursor: pointer;
  padding: 10px 15px;
  border-top: 1px solid var(--gray1);

  &:hover {
    background: var(--blue);
    p{
      color: var(--gray0);
    }
  }

  &.active {
    background: var(--blue);
    p{
      color: var(--gray0);
    }
  }

  // p {
  //   &:last-child {
  //     text-align: right;
  //   }
  // }
}

.dropdown-header {
  position: sticky;
  top: 0px;
  background: var(--gray0);
  display: grid;
  grid-template-columns: 5% auto;
  gap: 1rem;
  cursor: pointer;
  padding: 10px 15px;
  border: none;

  p {
    font-family: var(--font-semibold);
    // &:last-child {
    //   text-align: right;
    // }
  }
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--gray2);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--gray3);
}
</style>