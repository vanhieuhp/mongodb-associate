const { faker } = require('@faker-js/faker');

function generateBook() {
    const genres = ['Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Historical Fiction', 'Biography', 'Self-help'];
    const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean'];
    return {
        id: faker.string.uuid(),
        title: faker.lorem.words({ min: 1, max: 5 }),
        author: {
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            birthDate: faker.date.birthdate().toISOString().split('T')[0],
            nationality: faker.location.country(),
            biography: faker.lorem.paragraph()
        },
        isbn: faker.number.int({ min: 1000000000000, max: 9999999999999 }).toString(),
        publicationDate: faker.date.past({ years: 100 }).toISOString().split('T')[0],
        publisher: faker.company.name(),
        genre: faker.helpers.arrayElements(genres, { min: 1, max: 3 }),
        description: faker.lorem.paragraphs(2),
        pageCount: faker.number.int({ min: 50, max: 1000 }),
        language: faker.helpers.arrayElements(languages, { min: 1, max: 1 }),
        format: faker.helpers.arrayElement(['Hardcover', 'Paperback', 'E-book', 'Audiobook']),
        price: parseFloat(faker.commerce.price({ min: 5, max: 50, dec: 2 })),
        rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        reviews: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
            reviewer: faker.internet.userName(),
            rating: faker.number.int({ min: 1, max: 5 }),
            comment: faker.lorem.sentence()
        })),
        coverImage: faker.image.url(),
        series: faker.datatype.boolean() ? {
            name: faker.lorem.words({ min: 2, max: 4 }),
            bookNumber: faker.number.int({ min: 1, max: 10 })
        } : null,
        awards: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
            name: `${faker.company.name()} Award`,
            year: faker.date.past({ years: 10 }).getFullYear()
        })),
        keywords: faker.helpers.arrayElements(faker.word.words(10).split(' '), { min: 3, max: 7 })
    };
}

function generateBooks(count) {
    return Array.from({ length: count }, generateBook);
}

// Generate 1 million books
for (let i = 0; i < 10; i++) {
    let data = generateBooks(100000);
    db.getSiblingDB('test').books.insertMany(data);
    data = [];
}
