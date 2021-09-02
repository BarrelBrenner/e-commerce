// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
foreignKey: 'category_id',
through: {
  model: Category,
  unique: false
  },
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  through: {
  model: Product,
  unique: false,
  },
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: "product_id",
  through: {
    model: ProductTag,
    unique: true,
  },
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(ProductTag, {
  foreignKey: "tag_id",
  through: {
    model: ProductTag,
    unique: true,
  },
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};