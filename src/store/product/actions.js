import Database from "../../../resource/database/Database";

export default {
    async getProductList(context,columnToSort) {
      await Database.Model.Product.createTable()
      await Database.Model.Customer.createTable()
      await Database.Model.Sale.createTable()
      const list = await Database.Model.Product.getProducts(columnToSort);
      context.commit("setProductList", { list });
    },
    async getProductById(context, obj) {
      const product = await Database.Model.Product.getProductById(obj.id);
      var tempProduct = {
        id: product.id,
        productName: product.productName,
        productHscNumber: product.productHscNumber,
        productTaxType: product.productTaxType,
        productTaxPercentage: product.productTaxPercentage,
        productQuantity: product.productQuantity,
        productSubQuantity: product.productSubQuantity,
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
      return tempProduct;
    },
    async postProduct(context, obj) {
      const product = await Database.Model.Product.createProduct(obj);
      return product;
    },
    async postProductList(context, list) {
      const productList = await Database.Model.Product.createBulkProduct(list);
      return productList;
    },
    async updateProduct(context, obj) {
      const res = await Database.Model.Product.updateProduct(
        {
          productStock: obj.productStock,
          productMrpPrice: parseFloat(
            obj.productMrpPrice.rupee + "." + obj.productMrpPrice.paisa
          ),
          productSellingPrice: parseFloat(
            obj.productSellingPrice.rupee + "." + obj.productSellingPrice.paisa
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
  