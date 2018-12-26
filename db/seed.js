const Faker = require('faker');

const randomTarget = () => {
    return {
        id: Faker.random.uuid(),
        name: Faker.company.companyName(),
        status: ['researching', 'pending', 'approved', 'declined'][Math.floor(Math.random() * 4)],
        contacts: []
    };
}

const randomContact = () => {
    return {
        id: Faker.random.uuid(),
        name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
        title: Faker.name.jobTitle(),
        phone: Faker.phone.phoneNumber(),
        email: Faker.internet.email()
    };
}

let db = {
    targets: new Array(5).fill('').map(()=>randomTarget()),
    contacts: new Array(10).fill('').map(() => randomContact())
} 

db.contacts.forEach(contact=>{
    let randomTarget = db.targets[Math.floor(Math.random()*db.targets.length)];
    randomTarget.contacts.push(contact.id);
    contact.targetId = randomTarget.id;
});

module.exports = db;


