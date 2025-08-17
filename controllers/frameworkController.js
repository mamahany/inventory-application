const db = require('../db/queries');
const {body, validationResult} = require('express-validator');

const validateFramework = [
    body('name').trim().notEmpty().withMessage("Name is required").bail()
    .isLength({min:1, max:100}).withMessage("Name must be between 1 and 100 characters"),
    body("release_year").trim().notEmpty().withMessage("Release Year is required").bail()
    .isInt({min:1950, max:2025}).withMessage("Release Year must only contain numbers between 1950 and 2025."),
    body("description").trim().optional({ checkFalsy: true }),
    body('language_id').trim().notEmpty().withMessage("Language is required")
]

const getAllFrameworks = async (req, res)=>{
    const frameworks = await db.getAllFrameworks();
    res.render('frameworksGrid', {frameworks});
}

const getFrameworkById = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const framework = await db.getFrameworkById(id);

        if (!framework) {
            const err = new Error('Framework not found');
            err.status = 404;
            return next(err);
        }
        res.render('framework.ejs', {framework});
    }catch(err){
        next(err);
    }
}

const createFrameworkGet = async (req, res, next)=>{
    try{
        const authors = await db.getAuthors();
        const languages = await db.getAllLanguages()
        res.render('form/newFramework', {authors, languages, framework: {}}, );
    }catch(err){
        next(err);
    }
}

const createFrameworkPost = [
    validateFramework,
    async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const authors = await db.getAuthors();
        const languages = await db.getAllLanguages();
        return res.status(400).render("form/newFramework", {
            errors: errors.array(),
            authors,
            languages,
            framework:req.body
        });
    }
    try {
        const {name, release_year, description, author_id, language_id} = req.body;
        await db.addFramework(name, release_year, description, author_id, language_id);
        res.redirect('/framework');
    } catch (error) {
        const authors = await db.getAuthors();
        const languages = await db.getAllLanguages();
        return res.status(500).render("form/newFramework", {
          errors: [{ msg: "Database error, please try again."}],
          authors,
          languages,
          framework: req.body
        });
    }
}];

const editFrameworkGet = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const framework = await db.getFrameworkById(id);

        if (!framework) {
            const err = new Error('Framework not found');
            err.status = 404;
            return next(err);
        }

        const authors = await db.getAuthors();
        const languages = await db.getAllLanguages();
        res.render('form/editFramework', {authors,languages, framework});
    }catch(err){
        next(err);
    }
}

const editFrameworkPost = [
    validateFramework,
    async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const authors = await db.getAuthors();
        const languages = await db.getAllLanguages();
        return res.status(400).render("form/editFramework", {
            errors: errors.array(),
            authors,
            languages,
            framework:{...req.body, id:req.params.id}
        });
    }
    try{
        const {id} = req.params;
        const {name, release_year, description, author_id, language_id} = req.body;
        await db.updateFramework(id,name, release_year, description, author_id, language_id)
        res.redirect(`/framework/${id}`);
    }catch(err){
        next(err)
    }
}]

const deleteFramework = async(req, res, next)=>{
    try{
        const {id} = req.params;
        await db.deleteFramework(id);
        res.redirect('/framework');
    }catch(err){
        next(err)
    }
}

module.exports = {
    getAllFrameworks,
    getFrameworkById,
    createFrameworkGet,
    createFrameworkPost,
    deleteFramework,
    editFrameworkGet,
    editFrameworkPost
}