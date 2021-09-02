const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const keyData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(keyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const keyData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!keyData) {res.status(404).json({ message: "Cannot find tags with this id." });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const keyData = await Tag.create(req.body);
    res.status(200).json(keyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const keyData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        returning: true,
        where: {
          id: req.params.id,
        },
      }
    );
    if (!keyData) {res.status(404).json({ message: "Cannot find id of tag." });
      return;
    }
    res.status(200).json({ message: "Success! Tag updated."});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const keyData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!keyData) {res.status(404).json({message: "No tag to delete.",});
      return;
    }
    res.status(200).json({ message: "Success! Tag deleted."});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;