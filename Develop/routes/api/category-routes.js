const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
   try {
     const selectData = await Category.findAll({
       include: [{ model: Product }],
     });
     res.status(200).json(selectData);
   } catch (err) {
     res.status(500).json(err);
   }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const selectData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!selectData) {
      res.status(404).json({ message: "No items under this category." });
    }
    res.status(200).json(selectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const selectData = await Category.create(req.body);
    res.status(200).json(selectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
   try {
     const selectData = await Category.update(
       {
         category_name: req.body.category_name,
       },
       {
         returning: true,
         where: {
           id: req.params.id,
         },
       }
     );
     if (!selectData) {
       res.status(404).json({ message: "Cannot find id of Category." });
       return;
     }
     res.status(200).json({ message: "Success! Category updated."});
   } catch (err) {
     res.status(500).json(err);
   }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const selectData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!selectData) {
      res.status(404).json({ message: "No Category to delete." });
      return;
    }
    res.status(200).json({ message: "Success! Category deleted."});
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;