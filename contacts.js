
const fs = require('fs');

function read_json_file() {
    const filePath = './data/contacts.json';
    return fs.readFile(filePath);
}

module.exports.list = () => { return JSON.parse(read_json_file()) }

module.exports.query_by_phone = function(phoneNumber) {
    
    const json_result = JSON.parse(read_json_file());
    const result = json_result.result;

    for(var i = 0 ; i < result.length; i++) {
        let contact = result[i];
        if( contact.primarycontactnumber === phoneNumber) {
            return contact;
        }
    }// end for

    return null;
}



module.exports.query_by_arg = function(arg, value) {
    
    const json_result = JSON.parse(read_json_file());
    const result = json_result.result;

    for(var i = 0 ; i < result.length; i++) {
        let contact = result[i];
        if( contact[arg] === value) {
            return contact;
        }
    }// end for

    return null;
}

module.exports.list_emails = function() {
    
    const json_result = JSON.parse(read_json_file());
    const result = json_result.result;

    var resultArray = new Array();

    for(var i = 0 ; i < result.length; i++) {
        let emails = result[i].emails;
        
        for(var index = 0; index < emails.length; index++) {
            if( resultArray.indexOf(emails[index]) === -1) {
                resultArray.push(emails[index]);
            }
        }

    }// end for

    return resultArray;
}


