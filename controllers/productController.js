const assert = require("assert");
const Definer = require("../lib/errors");
const Product = require("../models/Product");

const productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET: cont/getAllProducts");
  } catch (err) {
    console.log(`ERROR: cont/getAllProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.addNewProduct = async (req, res) => {
  try {
    // console.log("add-req-params", req.params);
    // console.log("POST: cont/addNewProduct");
    // console.log("req.files:::", req.files);
    assert(req.files, Definer.general_err3);
    const product = new Product();
    console.log("product::", product);
    let data = req.body;
    // console.log("data-1::", data);
    // console.log("data.product_images-1::", data.product_images);
    data.product_images = req.files.map((ele) => {
      return ele.path;
    });
    // console.log("data-2::", data);
    // console.log("data.product_images-2::", data.product_images);
    // console.log("req.member=> prod/cont::", req.member);
    const result = await product.addNewProductData(data, req.member);
    // assert.ok(result, Definer.product_err1);
    const html = `<script>
    alert('new dish added successfully')
    window.location.replace('/resto/products/menu')
    </script>`;

    res.send(html);
  } catch (err) {
    console.log(`ERROR: cont/addNewProduct, ${err.message}`);
    //res.json({ state: "fail", message: err.message });
  }
};

productController.updateChoosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/updateChoosenProduct");

    const product = new Product();
    // console.log("req-params from productCont-1::", req.params);
    const id = req.params.id;
    // console.log("req-params from productCont-2::", req.params);
    // console.log("req.member from productCont::", req.member);
    const result = await product.updateChosenProductData(
      id,
      req.body,
      req.member._id
    );
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR: cont/updateChoosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
