const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const itemData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const itemData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!itemData) {
      res.status(404).json({ message: "Cannot find products with this id." });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const item = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
    })
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json(err)
  }
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  try {
    Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!req.body) {
      res.status(404).json({ message: "Cannot find id of product." });
      return;
    }
    res.status(200).json({ message: "Success! Product updated!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const itemData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!itemData) {
      res.status(400).json({message: "No product to delete.",});
      return;
    }
    res.status(200).json({ message: "Success! Product deleted."});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;