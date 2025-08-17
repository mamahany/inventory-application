const db = require('../db/queries');
const {body, validationResult} = require('express-validator');

const validateAuthor = [
    body('name').trim().notEmpty().withMessage("Name is required").bail()
    .isLength({min:1, max:100}).withMessage("Name must be between 1 and 100 characters"),
]

const getAllAuthors = async (req, res)=>{
    const authors = await db.getAuthors();
    res.render('authorsGrid', {authors});
}

const getAuthorById = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const author = await db.getAuthorById(id);

        if (!author) {
            const err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        res.render('author.ejs', {author});
    }catch(err){
        next(err);
    }
}

const createAuthorGet = async (req, res, next)=>{
    try{
        res.render('form/newAuthor', {author:{}});
    }catch(err){
        next(err);
    }
}

const createAuthorPost = [
    validateAuthor,
    async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render("form/newAuthor", {
            errors: errors.array(),
            author:req.body
        });
    }
    try {
        const {name} = req.body;
        await db.addAuthor(name);
        res.redirect('/author');
    } catch (error) {
        return res.status(500).render("form/newAuthor", {
          errors: [{ msg: "Database error, please try again." }],
          author: req.body
        });
    }
}];

const editAuthorGet = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const author = await db.getAuthorById(id);

        if (!author) {
            const err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }

        res.render('form/editAuthor', {author});
    }catch(err){
        next(err);
    }
}

const editAuthorPost = [
    validateAuthor,
    async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render("form/editAuthor", {
            errors: errors.array(),
            author:{...req.body, id:req.params.id}
        });
    }
    try{
        const {id} = req.params;
        const {name} = req.body;
        await db.updateAuthor(id,name);
        res.redirect(`/author/${id}`);
    }catch(err){
        next(err)
    }
}]

const deleteAuthor = async(req, res, next)=>{
    try{
        const {id} = req.params;
        await db.deleteAuthor(id);
        res.redirect('/author');
    }catch(err){
        next(err)
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthorGet,
    createAuthorPost,
    editAuthorGet,
    deleteAuthor,
    editAuthorPost
}