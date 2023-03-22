import product from "../model/product";
import Product from "../model/product";
import joi from "joi";
const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    desc: joi.string(),
    status: joi.boolean()
})
export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.json({
                message: error.details[0].message
            })
        }
        const product = await Product.create(req.body)
        return res.status(200).json({
            message: "Them thanh cong",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        if (!product) {
            return res.status(400).json({
                message: "Khong co san pham nao"
            })
        }
        return res.status(200).json({
            message: "Product found ",
            products
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
export const get = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        if (!products) {
            return res.status(400).json({
                message: "Khong tim thay san pham "
            })
        }
        return res.status(200).json({
            message: "Product found",
            products
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
export const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({
            message: "Sua thanh cong",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        return res.json({
            message: "Xoa thanh cong",
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}