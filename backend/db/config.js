// This file would typically contain database configuration
// Since we're using MongoDB with mongoose in server.js, we don't need much here
// But we can add some helper functions if needed

module.exports = {
    isValidObjectId: (id) => {
        const ObjectId = require('mongoose').Types.ObjectId;
        return ObjectId.isValid(id) ? String(new ObjectId(id)) === id : false;
    }
};