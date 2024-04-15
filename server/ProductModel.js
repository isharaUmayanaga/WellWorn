const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    ProductId:Number,
    ProductName:String,
    Catagory:String,
    Price:Number,
    Ratings:Number,
    Sizes:[String],
    Colors:[String],
    ImgUrls:[String],
});

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;