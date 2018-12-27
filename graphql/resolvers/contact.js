const Faker = require('faker');
let { targets, contacts } = global.db;

class Contact {
    constructor({ name, id, title, phone, email, targetId}) {
        this.name = name;
        this.id = id;
        this.title = title;
        this.phone = phone;
        this.email = email;
        this.targetId = targetId;
    }

    target() {
        return db.targets.find(target => target.id === this.targetId)
    }
}

module.exports = {
    getContacts: () => {
        return contacts.map(contact => new Contact(contact))
    },
    getContact: ({ id }) => {
        return new Contact(contacts.find(contact => contact.id === id));
    }, 
    createContact: ({ input }) => {
        if (input.targetId && !targets.some(target => target.id === input.targetId)) input.targetId = undefined;
        input.id = Faker.random.uuid();
        if (input.targetId) {
            targets.find(target => target.id === input.targetId).contactIds.push(input.id);
        }
        contacts.push(input);
        return new Contact(input);
    },
    updateContact: ({ id, input }) => {
        let index = contacts.findIndex(contact => contact.id === id);
        let contact = contacts[index];

        if (!targets.some(target => target.id === input.targetId)) input.targetId = undefined;

        if (input.targetId) {
            targets.forEach(target => {
                if (target.id === input.targetId) {
                    if (target.contactIds.indexOf(id) === -1) target.contactIds.push(id);
                } else {
                    let contactIndex = target.contactIds.findIndex(contactId => contactId === id);
                    if (contactIndex > -1) target.contactIds.splice(contactIndex, 1);
                }
            })
        }
        let updated = Object.assign({}, contact, input);

        contacts.splice(index, 1, updated)
        return new Contact(updated);
    },
    deleteContact: ({ id }) => {
        let index = contacts.findIndex(contact => contact.id === id);
        if (index > -1) {
            contacts.splice(index, 1);
            targets.some(target => {
                let contactIndex = target.contactIds.indexOf(id);
                if (contactIndex > -1) {
                    target.contactIds.splice(contactIndex, 1);
                    return true;
                }
            })
            return true;
        } else {
            return false;
        }
    }
}
