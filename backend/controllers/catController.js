const catgeoryModel = require('../models/categoryModel');

const add = async(req, res, next) => {
    const {name} = req.body;

    try {
        const cat = await catgeoryModel.findOne({name});
        if (cat) {
            const error = new Error('category with this name exists.');
            error.statusCode = 400;
            return next(error);
        }
        const newCat = new catgeoryModel({name});
        await newCat.save();
        res
            .status(200)
            .json({message: 'category created.', success: true});
    } catch (error) {
        next(error);
    }
};

const getAll = async(req, res, next) => {

    try {
        const categories = await catgeoryModel.find();
        if (!categories) {
            const error = new Error('No categories found.');
            error.statusCode = 404;
            return next(error);
        }
        res
            .status(200)
            .json({message: 'All categories listed successfully.', success: true, categories});
    } catch (error) {
        next(error);
    }
};

const deleteCat = async(req, res, next) => {
    const {id} = req.params;

    try {
        const category = await catgeoryModel.findByIdAndDelete(id);

        if (!category) {
            const error = new Error('Category not found.');
            error.statusCode = 404;
            return next(error);
        }

        res
            .status(200)
            .json({message: 'Category deleted successfully.', success: true, category});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    add,
    getAll,
    deleteCat
}