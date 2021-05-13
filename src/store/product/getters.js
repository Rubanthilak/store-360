
export default {
    getProducts: (state) => {
      var tempList = [];
      state.productList.forEach((product) => {
        var tempProduct = {
          id: product.id,
          productName: product.productName,
          productHscNumber: product.productHscNumber,
          productTaxType: product.productTaxType,
          productTaxPercentage: product.productTaxPercentage,
          productBaseUnit: product.productBaseUnit,
          productSecondaryUnit: product.productSecondaryUnit,
          productStock: product.productStock,
          productMrpPrice: {
            rupee: Math.floor(product.productMrpPrice),
            paisa:
              Math.round((product.productMrpPrice % 1) * 100) < 10
                ? "0" + Math.round((product.productMrpPrice % 1) * 100)
                : Math.round((product.productMrpPrice % 1) * 100),
          },
          productSellingPrice: {
            rupee: Math.floor(product.productSellingPrice),
            paisa:
              Math.round((product.productSellingPrice % 1) * 100) < 10
                ? "0" + Math.round((product.productSellingPrice % 1) * 100)
                : Math.round((product.productSellingPrice % 1) * 100),
          },
          productBarcode: product.productBarcode,
        };
        tempList.push(tempProduct);
      });
      return tempList;
    },
    getProductIdToDelete: (state) => {
      return state.productIdToDelete;
    },
  };