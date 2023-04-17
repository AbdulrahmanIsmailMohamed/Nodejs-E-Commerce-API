const asyncHandler = require("../middlewares/asyncHandler");
const APIError = require("../util/APIError");
const APIFeature = require("../util/APIFeatures");

const deleteOne = (model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const document = await model.findByIdAndDelete(id);
        if (!document) return next(new APIError(`No document for this id ${id}`, 404));
        res.status(204).json({ success: true });
    });

const createOne = (model) =>
    asyncHandler(async (req, res, next) => {
        const document = await model.create(req.body);
        if (!document) return next(new APIError("The Document Can't Be Created!!", 400));
        res.status(201).json({
            success: true,
            Document: document
        });
    });

const updateOne = (model) =>
    asyncHandler(async (req, res, next) => {
        const document = await model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!document) return next(new APIError("The Document Can't Be Updated!!", 400));
        res.status(200).json({
            success: true,
            Document: document
        });
    });

const getAll = (model, modelName = "") =>
    asyncHandler(async (req, res, next) => {
        const countDocument = await model.countDocuments()
        const apiFeature = new APIFeature(model.find(), req.query)
            .filter()
            .pagination(countDocument)
            .search(modelName)
            .limiting()
            .sort()

        const { mongooseQuery, paginationResult } = apiFeature;
        const document = await mongooseQuery;
        if (!document) return next(new APIError("The Document Not Found"));
        res.status(200).json({
            success: true,
            result: document.length,
            paginationResult: paginationResult,
            Document: document,
        });
    });

const getOne = (model) =>
    asyncHandler(async (req, res, next) => {
        const document = await model.findById(req.params.id).select("-password");
        if (!document) return next(new APIError("The Document Can't Be Found!!", 404));
        res.status(200).json({
            success: true,
            Document: document
        });
    });

module.exports = {
    deleteOne,
    createOne,
    updateOne,
    getAll,
    getOne
}