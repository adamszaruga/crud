const Joi = require('joi');
const Faker = require('faker');

const targetSchema = Joi.object().keys({
    id: Joi.string().uuid(),
    name: Joi.string().max(50).required(),
    status: Joi.string().valid('researching', 'pending', 'approved', 'declined').default('researching'),
    contacts: Joi.array().items(Joi.object().keys({
        name: Joi.string().max(50).required(),
        title: Joi.string().max(30),
        phone: Joi.string().regex(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/),
        email: Joi.string().email()
    }))
});

const randomTarget = () => {
    return Joi.validate({
        name: Faker.company.companyName(),
        status: ['researching', 'pending', 'approved', 'declined'][Math.floor(Math.random()*4)],
        contacts: new Array(Math.floor(Math.random()*3)).map(item=>({
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            title: Faker.name.jobTitle(),
            phone: Faker.phone.phoneNumber(),
            email: Faker.internet.email()
        }))
    }, targetSchema);
}

class Target {
    constructor(data) {
        Joi.validate(data, targetSchema).then(value=>{
            this.data = value;
        }).catch(err=>{
            return randomTarget();
        }).then(value=>{
            this.data = value;
        }).finally(()=>{
            this.data.id = Faker.random.uuid();
        });
    }

    update(updates) {
        let updatedData = {
            ...this.data,
            contacts: this.data.contacts.map(contact=>({...contact})),
            ...updates,
            id: this.data.id
        };
        let {error, value} = Joi.validate(updatedData, targetSchema);

        if (error===null) {
            throw new Error('INVALID UPDATES');
        } else {
            this.data = value;
        }
    }
}

var target = new Target();
console.dir(target);

target.update({
    name: "some name"
});
console.dir(target);
target.update({
    status: "pending",
    contacts: []
})
console.dir(target);
module.exports = Target;