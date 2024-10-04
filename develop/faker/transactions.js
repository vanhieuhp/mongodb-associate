const {faker} = require('@faker-js/faker');

// Function to generate a fake transaction
function generateFakeTransaction() {
    return {
        id: faker.string.uuid(),
        date: faker.date.recent(),
        amount: parseFloat(faker.finance.amount()), // Amount in numeric format
        currency: faker.finance.currencyCode(),
        paymentDetails: {
            cardType: faker.finance.creditCardIssuer(),
            cardNumber: faker.finance.creditCardNumber(),
            transactionMethod: faker.helpers.arrayElement(['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer']),
        },
        customerDetails: {
            customerName: faker.person.fullName(),
            customerEmail: faker.internet.email(),
        },
        merchantDetails: {
            merchant: faker.company.name(),
            merchantEmail: faker.internet.email(),
            merchantAddress: {
                street: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                zipCode: faker.location.zipCode(),
            },
        },
        transactionStatus: {
            status: faker.helpers.arrayElement(['Completed', 'Pending', 'Failed']),
            transactionFee: parseFloat(faker.finance.amount(1, 5, 2)), // Random fee between $1 and $5
            tax: parseFloat(faker.finance.amount(0.1, 2, 2)), // Random tax between $0.1 and $2
            refundStatus: faker.helpers.arrayElement(['Not Refunded', 'Partially Refunded', 'Fully Refunded']),
        },
        transactionDescription: faker.commerce.productDescription(),
        deviceUsed: faker.helpers.arrayElement(['Mobile', 'Desktop', 'Tablet']),
        ipAddress: faker.internet.ip(),
        geoLocation: `${faker.location.city()}, ${faker.location.country()}`,
        loyaltyPointsEarned: faker.number.int({min: 0, max: 100}), // Random points between 0 and 100
    };
}

// Generate and log a fake transaction
// const document = {
//   documentTitle: "Transaction Report",
//   generatedDate: new Date().toISOString(),
//   transaction: generateFakeTransaction()
// };

function generateTransactions(count) {
    const transactions = [];
    for (let i = 0; i < count; i++) {
        transactions.push(generateFakeTransaction());
    }
    return transactions;
}

// Generate 1 million movies
for (let i = 0; i < 1; i++) {
    let data = generateTransactions(10000);
    db.getSiblingDB('test').transactions.insertMany(data);
    data = [];
}