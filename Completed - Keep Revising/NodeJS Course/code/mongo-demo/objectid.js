const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId();
// Created in memory, not mongodb
console.log(id, id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid("61afesdssljk123re");
