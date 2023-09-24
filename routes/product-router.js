const router = require('express').Router()
const mongoose = require('mongoose')
const Product = require('../models/product')

router.get('/', async (req, res) => {
  try {
    let foundProducts = await Product.find({}).exec();
    return res.send(foundProducts);
  } catch (error) {
    return res.status(500).send(e);
  }
})

router.get('/:_id', async (req, res) => {
  try {
    let { _id } = req.params;
    foundProduct = await Product.findById({ _id }).exec();
    res.send(foundProduct)
  } catch (error) {
    res.status(500).send('ERROR!! Cannot get product')
  }
})

router.post('/new', async (req, res) => {
  const { name, image, description, price, quantity, category } = req.body;

  const createdProduct = new Product({
    name, image, description, price, quantity, category, owner: req.user._id
  });

  try {
    await createdProduct.save()
    res.status(201).json({ message: 'add information successfully' })
  } catch (error) {
    console.log(error)
  }
})

router.patch('/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    let product = await Product.findOne({ _id });

    if (!product) return res.status(400).send('找不到產品')

    let updatedProduct = await Product.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.send({
      message: "產品已經被更新", updatedProduct
    })

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update product.',
      500
    );
    return next(error);
  }
})

router.delete('/:_id', async (req, res) => {
  let { _id } = req.params
  let product = await Product.findOne({ _id })
  if (!product) {
    res.status(404)
    return res.json({ message: "Contact cant find" })
  }

  Product.deleteOne({ _id })
    .then(() => {
      res.send("Contact deleted")
    }).catch((err) => {
      res.send({ message: err })
    })
})

module.exports = router