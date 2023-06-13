const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const ProductModel = require("../schema/product.model");
const Definer = require("../lib/errors");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }
  async addNewProductData(data, member) {
    try {
      console.log("addNewProductData-data-1::", data);
      data.restaurant_mb_id = shapeIntoMongooseObjectId(member._id);
      console.log("addNewProductData-data-2::", data);

      const new_product = new this.productModel(data);

      const result = await new_product.save();

      assert.ok(result, Definer.product_err1);
      return result;
    } catch (err) {
      console.log("Product-catch::", err.message);
      throw err;
    }
  }

  async updateChosenProductData(id, updated_data, mb_id) {
    console.log("updateChosenProductData=>id-1::", id);
    console.log("updateChosenProductData=>updated-data-1::", updated_data);
    console.log("updateChosenProductData=>mb_id-1::", mb_id);
    try {
      id = shapeIntoMongooseObjectId(id);
      mb_id = shapeIntoMongooseObjectId(mb_id);
      console.log("updateChosenProductData=>id-2::", id);
      console.log("updateChosenProductData=>mb_id-2::", mb_id);

      const result = await this.productModel
        .findOneAndUpdate({ _id: id, restaurant_mb_id: mb_id }, updated_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();
      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getAllProductsDataResto(member) {
    {
      try {
        member._id = shapeIntoMongooseObjectId(member._id);
        const result = await this.productModel.find({
          restaurant_mb_id: member._id,
        });

        console.log("getAllProductsDataResto member_id::", member._id);
        assert.ok(result, Definer.general_err1);
        console.log("all-products-result::", result);
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
}

module.exports = Product;
