/*
 * API visszaküldi a memóriát
 */
const fs = require('fs');

module.exports = function (req, res, next) {  
    fs.readFile('memory.json', 'utf8', (err, data) => {
        if (err) return next(err);
        return res.status(200).json(JSON.parse(data));          
    });      
};