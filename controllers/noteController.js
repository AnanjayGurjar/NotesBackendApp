const noteModel = require('../models/note');

const createNote = async (req, res) => {
    // as mentioned in auth req.userId have the userId

    const {title, description} = req.body;

    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId
    });


    try{
        await newNote.save();
        res.status(201).json(newNote);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }


}

const getNotes = async (req, res) => {
    try{
        const notes = await noteModel.find({userId: req.userId});
        res.status(200).json(notes);
    }catch(error){
        console.log(error);
        res.status(200).json({message: "Something went wrong"});
    }
}

const updateNote = async (req, res) => {
    const id = req.params.id;
    const {title, description} = req.body;

    const newNote = {
        title: title,
        description: description,
        userId: req.userId
    }

    try{
        await noteModel.findByIdAndUpdate(id, newNote, {new: true});    //the option new: true will first update in db and then return the udpated option
        res.status(200).json(newNote);
    }catch(error){
        console.log(error);
        res.status(200).json({message: "Something went wrong"});
    }
}

const deleteNote = async (req, res) => {
    const id = req.params.id;

    try{
        const deletedNote = await noteModel.findByIdAndRemove(id);
        res.status(202).json(deletedNote);
    }catch(error){
        console.log(error);
        res.status(200).json({message: "Something went wrong"});
    }
}



module.exports = {createNote, updateNote, deleteNote, getNotes};