const { v4: uuidv4 } = require('uuid');
const products = [];

exports.getAllProducts = (req, res) => {
  let result = [...products];

  // Filter
  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  result = result.slice(start, start + limit);

  res.json(result);
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

exports.createProduct = (req, res) => {
  const product = { id: uuidv4(), ...req.body };
  products.push(product);
  res.status(201).json(product);
};

exports.updateProduct = (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

exports.deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(index, 1);
  res.status(204).send();
};

exports.searchProducts = (req, res) => {
  const keyword = req.query.name?.toLowerCase() || '';
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  res.json(filtered);
};

exports.getStats = (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
};
