const express = require('express');
const { getNotes, createNote, deleteNote, updateNote } = require('../controllers/noteController');
const noteRouter = express.Router();
const {auth} = require("../middlewares/auth");


noteRouter.post('/',auth,  createNote);

noteRouter.get('/', auth, getNotes);        //auth middlewawre is used to check if the endpoint is authenticated or not, i.e. these end points will only be called if we have a valid token

noteRouter.delete('/:id', auth,  deleteNote);

noteRouter.put('/:id', auth,  updateNote);

module.exports = noteRouter;