const {faker: users} = require('@faker-js/faker');
function generateDocument() {
    return {
        id: users.string.uuid(),
        firstName: users.person.firstName(),
        lastName: users.person.lastName(),
        middleName: users.person.middleName(),
        email: users.internet.email(),
        username: users.internet.userName(),
        password: users.internet.password(),
        phone: users.phone.number(),
        dateOfBirth: users.date.birthdate(),
        age: users.number.int({ min: 18, max: 80 }),
        address: {
            street: users.location.streetAddress(),
            city: users.location.city(),
            state: users.location.state(),
            zipCode: users.location.zipCode(),
            country: users.location.country()
        },
        isActivated: users.datatype.boolean(),
        createdAt: users.date.past(),
        updatedAt: users.date.recent(),
        company: users.company.name(),
        jobTitle: users.person.jobTitle(),
        department: users.commerce.department(),
        creditCardNumber: users.finance.creditCardNumber(),
        creditCardIssuer: users.finance.creditCardIssuer(),
        iban: users.finance.iban(),
        socialSecurityNumber: users.number.int({ min: 100000000, max: 999999999 }).toString(),
        avatar: users.image.avatar(),
        favColor: users.color.human(),
        website: users.internet.url()
    }
}

function generateUsers(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(generateDocument());
    }
    return data;
}

// Generate 1 million users
for (let i = 0; i < 10; i++) {
    let data = generateUsers(100000);
    db.getSiblingDB('test').users.insertMany(data);
    data = [];
}
