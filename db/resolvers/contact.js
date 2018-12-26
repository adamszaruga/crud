
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

module.exports = Contact;