
export default {
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