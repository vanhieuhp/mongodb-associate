const {faker} = require('@faker-js/faker');

function generateFakeWeatherData() {
    return {
        timestamp: faker.date.past(1), // Generates a random date within the past year
        metadata: {
            location: {
                city: faker.location.city(),
                country: faker.location.country(),
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude(),
            }, sensor: faker.string.alphanumeric(10),
        },
        temperature: faker.number.float({min: -30, max: 50, precision: 0.1}), // Random temperature between -30 and 50°C
        humidity: faker.number.float({min: 0, max: 100, precision: 0.1}), // Random humidity between 0 and 100%
        pressure: faker.number.float({min: 950, max: 1050, precision: 0.1}), // Random pressure in hPa
        windSpeed: faker.number.float({min: 0, max: 150, precision: 0.1}),
    }
}

function generateWeathers(count) {
    const documents = [];
    for (let i = 0; i < count; i++) {
        documents.push(generateFakeWeatherData());
    }
    return documents;
}

// Generate weathers
let documents = generateWeathers(100);
db.getSiblingDB('test').weathers.insertMany(documents);
