const CartModel = require('../models/cartModel');

class CartController {
    static async getAllItems(req, res) {
        try {
            const items = await CartModel.getAllItems();
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }

    //新增
    static async addItem(req, res) {
        try {
            const newItem = await CartModel.addItem(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
       
    }

    //修改
    static async updateItem(req, res) {
        try{
            const updateItem = await CartModel.updateItem(req.params.id, req.body);
            res.json(updateItem);
        } catch (error) {
            res.status(500).json({error: error.message });
        }
    }

    //刪除
    static async deleteItem(req, res) {
        try{
            await CartModel.deleteItem(req.params.id);
            res.status(204).send();
        } catch(error) {
            res.status(500).json({ error: error.message});
        }
    }
}

module.exports =  CartController;