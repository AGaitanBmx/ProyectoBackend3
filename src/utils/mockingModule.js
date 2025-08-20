const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

class MockingModule {
    // Generar usuarios mock
    static async generateMockUsers(count = 1) {
        const users = [];
        
        for (let i = 0; i < count; i++) {
            const user = {
                _id: faker.database.mongodbObjectId(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                age: faker.number.int({ min: 18, max: 80 }),
                password: await bcrypt.hash('coder123', 10),
                role: faker.helpers.arrayElement(['user', 'admin']),
                pets: [],
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent()
            };
            users.push(user);
        }
        
        return users;
    }

    // Generar mascotas mock (del desafío anterior)
    static generateMockPets(count = 1) {
        const pets = [];
        
        for (let i = 0; i < count; i++) {
            const pet = {
                _id: faker.database.mongodbObjectId(),
                name: faker.animal.dog(),
                species: faker.animal.type(),
                age: faker.number.int({ min: 1, max: 15 }),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent()
            };
            pets.push(pet);
        }
        
        return pets;
    }
}

module.exports = MockingModule;