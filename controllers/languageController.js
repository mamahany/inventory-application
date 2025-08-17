const db = require('../db/queries');
const {body, validationResult} = require('express-validator');

const validateLang = [
    body('name').trim().notEmpty().withMessage("Name is required").bail()
    .isLength({min:1, max:50}).withMessage("Name must be between 1 and 50 characters"),

    body("first_release").trim().notEmpty().withMessage("First Release is required").bail()
    .isInt({min:1950, max:2025}).withMessage("First Release must only contain numbers between 1950 and 2025."),

    body("paradigm").trim().optional({ checkFalsy: true })
    .isLength({min:1, max:100}).withMessage("Paradigm must be between 1 and 100 characters")
]
const getAllLanguages = async (req, res)=>{
    const languages = await db.getAllLanguages();
    res.render('languagesGrid', {languages});
}

const getLanguageById = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const language = await db.getLanguageById(id);

        if (!language) {
            const err = new Error('Language not found');
            err.status = 404;
            return next(err);
        }
        res.render('language.ejs', {language});
    }catch(err){
        next(err);
    }
}
const createLanguageGet = async (req, res, next)=>{
    try{
        const authors = await db.getAuthors();
        res.render('form/newLanguage', {authors, language: {}}, );
    }catch(err){
        next(err);
    }
}
const createLanguagePost = [
    validateLang,
    async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const authors = await db.getAuthors();
        return res.status(400).render("form/newLanguage", {
            errors: errors.array(),
            authors,
            language:req.body
        });
    }
    try {
        const {name, first_release, paradigm, author_id} = req.body;
        await db.addLanguage(name, first_release, paradigm, author_id);
        res.redirect('/language');
    } catch (error) {
        const authors = await db.getAuthors();
        return res.status(500).render("form/newLanguage", {
          errors: [{ msg: "Database error, please try again." }],
          authors,
          language: req.body
        });
    }
}];
const editLanguageGet = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const language = await db.getLanguageById(id);

        if (!language) {
            const err = new Error('Language not found');
            err.status = 404;
            return next(err);
        }

        const authors = await db.getAuthors();
        res.render('form/editLanguage', {authors, language});
    }catch(err){
        next(err);
    }
}
const editLanguagePost = [
    validateLang,
    async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const authors = await db.getAuthors();
        return res.status(400).render("form/editLanguage", {
            errors: errors.array(),
            authors,
            language:{...req.body, id:req.params.id}
        });
    }
    try{
        const {id} = req.params;
        const {name, first_release, paradigm, author_id} = req.body;
        await db.updateLanguage(id,name,first_release,paradigm,author_id)
        res.redirect(`/language/${id}`);
    }catch(err){
        next(err)
    }
}]
const deleteLanguage = async(req, res, next)=>{
    try{
        const {id} = req.params;
        await db.deleteLanguage(id);
        res.redirect('/language');
    }catch(err){
        next(err)
    }
}
module.exports = {
    getAllLanguages,
    getLanguageById,
    createLanguageGet,
    createLanguagePost,
    deleteLanguage,
    editLanguageGet,
    editLanguagePost
}