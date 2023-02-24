const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const {Schema} = mongoose; 

const NoteSchema = new Schema({
    // this is same like foriegn key in mysql
    // making connection using id with specific user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true
    },    
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('note', NoteSchema);