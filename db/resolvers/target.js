const Contact = require('./contact');

class Target {
    constructor({name, id, status, contactIds}) {
        this.name = name;
        this.id = id;
        this.status = status;
        this.contactIds = contactIds;
    }

    contacts() {
        return db.contacts.filter(contact => this.contactIds.indexOf(contact.id) > -1).map(contact=>new Contact(contact));
    }
}

module.exports = Target;
