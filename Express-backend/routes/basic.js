const updateMemoryMW = require('../middleware/updateMemMW');
const readMemoryMW = require('../middleware/readMemMW');

module.exports = function(app) {    
	
	app.use('/readmem',
        readMemoryMW
    );

    app.post('/updatemem',
        updateMemoryMW
    );
};