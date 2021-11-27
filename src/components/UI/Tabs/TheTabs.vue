<template>
  <div class="flex tab-wrapper">
    <div
      :class="['tab',{'is-active':(tab.key === isActive)}]"
      v-for="tab in tabList"
      :key="tab.key"
      @click="setTab(tab.key)"
    >
      <p>{{tab.tabName}}</p>
      <svg-icon class="close-button" @click="removeTab(tab.key)" icon="cross-icon" color="gray8" hover-color="gray0" size="18"></svg-icon>
    </div>
    <div class="add-tab" @click="addTab">
      <p>+</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: [
        {
          tabName: "New Tab",
          key: 0,
        },
      ],
      isActive: null,
      count: 1,
      keys: [
        { key: 0, taken: true },
        { key: 1, taken: false },
        { key: 2, taken: false },
        { key: 3, taken: false },
        { key: 4, taken: false },
        { key: 5, taken: false },
        { key: 6, taken: false },
        { key: 7, taken: false },
        { key: 8, taken: false },
        { key: 9, taken: false },
      ],
    };
  },
  methods: {
    getKey() {
      let key;
      for (var i = 0; i < this.keys.length; i++) {
        if (!this.keys[i].taken) {
          key = this.keys[i].key;
          this.keys[i].taken = true;
          this.count++;
          break;
        }
      }
      return key;
    },
    freeKey(key) {
      this.keys.forEach((k) => {
        if (k.key === key) {
          k.taken = false;
        }
      });
    },
    setTab(key) {
      this.keys.forEach((k) => {
        if (k.key === key && k.taken) {
          this.isActive = key;
        }
      });
    },
    addTab() {
      if (this.tabList.length < 10) {
        let key = this.getKey();
        this.setTab(key);
        this.tabList.push({
          tabName: "New Tab",
          key: key,
        });
      } else {
        this.$store.commit("showSnackBar", "Maximum 10 tabs only.");
      }
    },
    removeTab(key) {
      if (this.tabList.length > 1) {
        this.$emit("tabRemoved",key);
        for (var i = 0; i < this.tabList.length; i++) {
          if (
            this.tabList[i].key === key &&
            this.isActive === this.tabList[i].key &&
            i != 0
          ) {
            this.setTab(this.tabList[i - 1].key);
          } else if (
            this.tabList[i].key === key &&
            this.isActive === this.tabList[i].key &&
            i === 0
          ) {
            this.setTab(this.tabList[i + 1].key);
          }
          if (this.tabList[i].key === key) {
            this.freeKey(key);
            this.tabList.splice(i, 1);
          }
        }
      } else {
        this.$store.commit("showSnackBar", "Atleast 1 tab should be open.");
      }
    },
  },
  mounted() {
    this.isActive = 0;
  },
  updated(){
    this.$emit("tabSwitched",this.isActive)
  }
};
</script>

<style lang="scss" scoped>

.close-button{
  margin-right: 8px;
  border-radius:5px;   
  padding:1px; 
  display:none;

  &:hover{
    background: var(--red);
  }
}

.tab-wrapper {
  background: #cecece;
  .add-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: var(--blue);
      p {
        color: var(--gray0);
      }
    }
    p {
      margin: 0px 10px;
      font-size: 26px;
      font-family: var(--font-medium);
      color: var(--gray8);
    }
  }

  .tab {
    height: 40px;
    width: 100%;
    min-width: 50px;
    max-width: 200px;
    display: flex;
    background: var(--gray2);
    align-items: center;
    justify-content: space-between;
    margin-right: 3px;
    transition: all 0.2s;

    &:hover{
      .close-button{
        display:block;
      }
    }

    &.is-active {
      background: var(--gray1);
      .close-button{
        display:block;
      }
    }

    p {
      font-size: 14px;
      margin: 0px 10px;
      font-family: var(--font-medium);

      &:first-child {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}

</style>