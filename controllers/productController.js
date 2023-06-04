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
    console.log("POST: cont/addNewProduct");
    console.log(req.member);
    //TODO: product creation develop
    // res.json({ test: "ok" });
  } catch (err) {
    console.log(`ERROR: cont/addNewProduct, ${err.message}`);
    //res.json({ state: "fail", message: err.message });
  }
};

productController.updateChoosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/updateChoosenProduct");
  } catch (err) {
    console.log(`ERROR: cont/updateChoosenProduct, ${err.message}`);
    //res.json({ state: "fail", message: err.message });
  }
};
