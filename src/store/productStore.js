import Database from "../../resource/Database";

const state = function() {
  return {
    productList: [],
    productIdToDelete: null,
  };
};

const getters = {
  getProducts: (state) => {
    var tempList = [];
    state.productList.forEach((product) => {
      var tempProduct = {
        id: product.id,
        name: product.productName,
        unit: product.productQuantity,
        mrp_price: {
          rupee: Math.floor(product.productMrpPrice),
          paisa:
            Math.round((product.productMrpPrice % 1) * 100) < 10
              ? "0" + Math.round((product.productMrpPrice % 1) * 100)
              : Math.round((product.productMrpPrice % 1) * 100),
        },
        selling_price: {
          rupee: Math.floor(product.productSellingPrice),
          paisa:
            Math.round((product.productSellingPrice % 1) * 100) < 10
              ? "0" + Math.round((product.productSellingPrice % 1) * 100)
              : Math.round((product.productSellingPrice % 1) * 100),
        },
        barcode: product.productBarcode,
      };
      tempList.push(tempProduct);
    });
    return tempList;
  },
  getProductIdToDelete: (state) => {
    return state.productIdToDelete;
  },
};

const actions = {
  async getProductList(context) {
    const list = await Database.Model.Product.getProducts();
    context.commit("setProductList", { list });
  },
  async getProductById(context, obj) {
    const product = await Database.Model.Product.getProductById(obj.id);
    var tempProduct = {
      id: product.id,
      name: product.productName,
      unit: product.productQuantity,
      mrp_price: {
        rupee: Math.floor(product.productMrpPrice),
        paisa:
          Math.round((product.productMrpPrice % 1) * 100) < 10
            ? "0" + Math.round((product.productMrpPrice % 1) * 100)
            : Math.round((product.productMrpPrice % 1) * 100),
      },
      selling_price: {
        rupee: Math.floor(product.productSellingPrice),
        paisa:
          Math.round((product.productSellingPrice % 1) * 100) < 10
            ? "0" + Math.round((product.productSellingPrice % 1) * 100)
            : Math.round((product.productSellingPrice % 1) * 100),
      },
      barcode: product.productBarcode,
    };
    return tempProduct;
  },
  async postProduct(context, obj) {
    const product = await Database.Model.Product.createProduct(obj);
    return product;
  },
  async updateProduct(context, obj) {
    const res = await Database.Model.Product.updateProduct(
      {
        productQuantity: obj.unit,
        productMrpPrice: parseFloat(
          obj.mrp_price.rupee + "." + obj.mrp_price.paisa
        ),
        productSellingPrice: parseFloat(
          obj.selling_price.rupee + "." + obj.selling_price.paisa
        ),
      },
      obj.id
    );
    return res;
  },
  async deleteProduct(context, obj) {
    const res = await Database.Model.Product.deleteProduct(obj.id);
    return res;
  },
};

const mutations = {
  setProductList(state, { list }) {
    state.productList.splice(0, state.productList.length);
    state.productList.push(...list);
  },
  setProductIdToDelete(state, id) {
    state.productIdToDelete = id;
  },
};

const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
