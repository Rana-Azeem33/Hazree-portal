//Schema and Model for collection 'User'


const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    _id: { type: String, required: true },
    team_id: { type: String, required: true },
    user_id: { type: String, required: true },
    real_name: { type: String, required: true },
    display_name: { type: String, required: true },
    tz: { type: String, required: true },
    tz_label: { type: String, required: true },
    tz_offset: { type: Number, required: true },
    role: { type: String, required: true }
});

module.exports = mongoose.model('users', schema);