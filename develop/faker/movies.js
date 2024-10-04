const { faker } = require('@faker-js/faker');

function generateMovie() {
    const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Horror', 'Romance', 'Adventure', 'Fantasy', 'Animation'];
    const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
    const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean'];

    return {
        id: faker.string.uuid(),
        title: faker.lorem.words({ min: 1, max: 5 }),
        tagline: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        releaseDate: faker.date.past({ years: 50 }).toISOString().split('T')[0],
        duration: faker.number.int({ min: 60, max: 240 }),
        genre: faker.helpers.arrayElements(genres, { min: 1, max: 3 }),
        director: `${faker.person.firstName()} ${faker.person.lastName()}`,
        writers: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => `${faker.person.firstName()} ${faker.person.lastName()}`),
        cast: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => ({
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            character: faker.person.fullName(),
        })),
        rating: faker.helpers.arrayElement(ratings),
        score: faker.number.float({ min: 1, max: 10, precision: 0.1 }),
        budget: faker.number.int({ min: 1000000, max: 250000000 }),
        boxOffice: faker.number.int({ min: 0, max: 2000000000 }),
        productionCompany: faker.company.name(),
        country: faker.location.country(),
        language: faker.helpers.arrayElements(languages, { min: 1, max: 1 }),
        poster: faker.image.url(),
        trailer: faker.internet.url(),
    };
}

function generateMovies(count) {
    const movies = [];
    for (let i = 0; i < count; i++) {
        movies.push(generateMovie());
    }
    return movies;
}

// Generate 1 million movies
for (let i = 0; i < 1000; i++) {
    let data = generateMovies(1000);
    db.getSiblingDB('test').movies.insertMany(data);
    data = [];
}
