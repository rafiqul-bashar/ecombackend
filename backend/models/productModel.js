const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Enter Product Name'], trim: true },
    description: { type: String, required: [true, 'Enter Product Description'] },
    price: { type: Number, required: [true, 'Enter Product Price'], maxlength: [8, "Product price sould not be more than 8 digit"] },
    rating: { type: Number, default: 0 },
    images: [{
        public_id: {
            type: String,
            required: [true, 'Enter Public Id']
        },
        url: {
            type: String,
            required: [true, 'Image url is missing']
        },
    }],
    category: { type: String, required: [true, 'Enter Product Category'] },
    numOfReviews: { type: Number, default: 0 },
    reviews: [{ name: { type: String, required: true }, rating: { type: String, required: true }, comment: { type: String, required: true } }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema)