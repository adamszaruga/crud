const Faker = require('faker');
let { targets, contacts } = global.db;

class Target {
    constructor({name, id, status, contactIds}) {
        this.name = name;
        this.id = id;
        this.status = status;
        this.contactIds = contactIds;
    }

    contacts() {
        return contacts.filter(contact => this.contactIds.indexOf(contact.id) > -1);
    }
}

module.exports = {
    getTargets: () => {
        return targets.map(target => new Target(target))
    },
    getTarget: ({ id }) => {
        return new Target(targets.find(target => target.id === id));
    },
    createTarget: ({ input }) => {
        input.id = Faker.random.uuid();
        if (input.contactIds) {
            input.contactIds = input.contactIds.filter(contactId => contacts.some(contact => contact.id === contactId));
            contacts.forEach(contact => {
                if (input.contactIds.indexOf(contact.id) > -1) {
                    contact.targetId = input.id;
                } 
            })
            targets.forEach(target => {
                let contactsToSplice = [];
                target.contactIds.forEach((contactId, index) => {
                    if (input.contactIds.indexOf(contactId) > -1) {
                        contactsToSplice.push(index);
                    }
                })
                while (contactsToSplice.length > 0) {
                    target.contactIds.splice(contactsToSplice.pop(), 1);
                }

            })
        } else {
            input.contactIds = []
        }
        targets.push(input);
        return new Target(input);
    },
    updateTarget: ({ id, input }) => {
        let index = targets.findIndex(target => target.id === id);
        let target = targets[index];

        if (input.contactIds) {
            input.contactIds = input.contactIds.filter(contactId => contacts.some(contact => contact.id === contactId));
            contacts.forEach(contact => {
                if (input.contactIds.indexOf(contact.id) > -1) {
                    contact.targetId = id;
                } else {
                    if (contact.targetId === id) contact.targetId = undefined;
                }
            })
            targets.forEach(target => {
                if (target.id !== id) {
                    let contactsToSplice = [];
                    target.contactIds.forEach((contactId, index) => {
                        if (input.contactIds.indexOf(contactId) > -1) {
                            contactsToSplice.push(index);
                        }
                    })
                    while (contactsToSplice.length > 0) {
                        target.contactIds.splice(contactsToSplice.pop(), 1);
                    }
                }
            })
        }

        let updated = Object.assign({}, target, input)

        targets.splice(index, 1, updated)
        return new Target(updated);
    },
    deleteTarget: ({ id }) => {
        let index = targets.findIndex(target => target.id === id);
        if (index > -1) {
            targets.splice(index, 1);
            contacts.forEach(contact => {
                if (contact.targetId === id) contact.targetId = undefined;
            });
            return id;
        } else {
            return null;
        }
    }
}

