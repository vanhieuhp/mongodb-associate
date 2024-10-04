const {faker} = require('@faker-js/faker');

function generateArtPiece() {
    const mediums = ['Oil painting', 'Acrylic painting', 'Watercolor', 'Sculpture', 'Photography', 'Digital art', 'Mixed media', 'Charcoal drawing', 'Printmaking', 'Installation'];
    const movements = ['Renaissance', 'Baroque', 'Romanticism', 'Impressionism', 'Expressionism', 'Cubism', 'Surrealism', 'Abstract Expressionism', 'Pop Art', 'Contemporary'];

    return {
        id: faker.string.uuid(),
        title: faker.lorem.words({min: 1, max: 5}),
        artist: {
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            birthDate: faker.date.birthdate().toISOString().split('T')[0],
            nationality: faker.location.country(),
            biography: faker.lorem.paragraph()
        },
        creationDate: faker.date.past({years: 500}).toISOString().split('T')[0],
        medium: faker.helpers.arrayElement(mediums),
        dimensions: {
            height: faker.number.float({min: 10, max: 300, precision: 0.1}),
            width: faker.number.float({min: 10, max: 300, precision: 0.1}),
            depth: faker.datatype.boolean() ? faker.number.float({min: 1, max: 100, precision: 0.1}) : null,
            unit: 'cm'
        },
        description: faker.lorem.paragraph(),
        currentLocation: {
            name: faker.company.name(),
            city: faker.location.city(),
            country: faker.location.country()
        },
        movement: faker.helpers.arrayElement(movements),
        subject: faker.lorem.words({min: 1, max: 3}),
        style: faker.lorem.word(),
        technique: faker.lorem.words(2),
        materials: faker.helpers.arrayElements(['Canvas', 'Wood', 'Paper', 'Metal', 'Stone', 'Glass', 'Fabric'], {
            min: 1,
            max: 3
        }),
        estimatedValue: parseFloat(faker.commerce.price({min: 1000, max: 1000000, dec: 0})),
        provenance: Array.from({length: faker.number.int({min: 1, max: 5})}, () => ({
            owner: faker.company.name(),
            dateAcquired: faker.date.past({years: 100}).toISOString().split('T')[0]
        })),
        exhibitions: Array.from({length: faker.number.int({min: 0, max: 5})}, () => ({
            name: `${faker.lorem.words(3)} Exhibition`,
            venue: faker.company.name(),
            date: faker.date.past({years: 20}).toISOString().split('T')[0]
        })),
        condition: faker.helpers.arrayElement(['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']),
        image: faker.image.url(),
        tags: faker.helpers.arrayElements(faker.word.words(10).split(' '), {min: 3, max: 7})
    };
}

function generateArtPieces(count) {
    return Array.from({length: count}, generateArtPiece);
}

// Generate 1 million art pieces
for (let i = 0; i < 10; i++) {
    let data = generateArtPieces(100000);
    db.getSiblingDB('test').art_pieces.insertMany(data);
    data = [];
}
