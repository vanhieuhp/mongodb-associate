const {faker} = require('@faker-js/faker');
const users = [];
for (let i = 0; i < 10; i++) {
    for (let i = 0; i < 100000; i++) {
        users.push({
            name: faker.person.fullName(),
            age: faker.number.int({ min: 18, max: 60 }),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zip: faker.location.zipCode(),
            country: faker.location.country(),
            company: faker.company.name(),
            isActivated: faker.datatype.boolean(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
        });
    }
    
    db.getSiblingDB('test').users.insertMany(users);
    users = [];
}
