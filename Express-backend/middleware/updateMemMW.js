/*
 * API módosítja a memóriát
 */
const fs = require('fs');

module.exports = function (req, res, next) {
    if ( typeof req.body.data === 'undefined' || isNaN(req.body.data) ) {
        return res.status(400).end();            
    }
    
    let data = JSON.stringify({data : req.body.data});     
    fs.writeFile('memory.json', data, (err) => {
        if (err) return next(err);
        return res.status(201).end();
    });
};