const Contact = require('./contact');

class Target {
    constructor({name, id, status, contacts}) {
        this.name = name;
        this.id = id;
        this.status = status;
        this.contactIds = contacts;
    }

    contacts() {
        return db.contacts.filter(contact => this.contactIds.indexOf(contact.id) > -1).map(contact=>new Contact(contact));
    }
}

module.exports = Target;
