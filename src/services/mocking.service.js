const { Types } = require('mongoose');
const bcrypt = require('bcryptjs');


const DEFAULT_HASHED_PASSWORD = bcrypt.hashSync('coder123', 10);


function randomItem(arr) {
return arr[Math.floor(Math.random() * arr.length)];
}


function randomDate(startYear = 2018, endYear = new Date().getFullYear()) {
const start = new Date(startYear, 0, 1).getTime();
const end = new Date(endYear, 11, 31).getTime();
return new Date(start + Math.floor(Math.random() * (end - start)));
}


function slugifyEmail(str) {
return str
.toLowerCase()
.normalize('NFD')
.replace(/[^a-z0-9.]/g, '');
}


function generateUsers(count = 50) {
const firsts = ['Agustín','Sofía','Juan','Valentina','Mateo','Lucía','Benjamín','Martina','Thiago','Emma','Julián','Lautaro','Camila','Jazmín','Franco'];
const lasts = ['García','Rodríguez','Gómez','Fernández','López','Martínez','Pérez','González','Sánchez','Romero','Díaz','Álvarez','Torres','Domínguez'];
const domains = ['mail.com','example.com','test.com','hotmail.com','gmail.com','yahoo.com'];


const emails = new Set();
const users = [];


for (let i = 0; i < count; i++) {
const first = randomItem(firsts);
const last = randomItem(lasts);


let email;
do {
const tag = Math.floor(Math.random() * 100000);
email = `${slugifyEmail(first)}.${slugifyEmail(last)}.${tag}@${randomItem(domains)}`;
} while (emails.has(email));
emails.add(email);


users.push({
_id: new Types.ObjectId(),
first_name: first,
last_name: last,
email,
password: DEFAULT_HASHED_PASSWORD,
role: Math.random() < 0.2 ? 'admin' : 'user',
pets: []
});
}
return users;
}


function generatePets(count = 50, owners = []) {
const names = ['Coco','Luna','Milo','Simba','Nala','Rocky','Toby','Kira','Olivia','Max','Lola','Greta','Ichi','Rocco','Blue'];
const species = ['dog','cat','hamster','parrot','turtle','fish','rabbit'];


const pets = [];
for (let i = 0; i < count; i++) {
const owner = owners.length ? randomItem(owners) : undefined;
pets.push({
_id: new Types.ObjectId(),
name: randomItem(names),
species: randomItem(species),
birthDate: randomDate(),
adopted: Math.random() < 0.5,
owner
});
}
return pets;
}


module.exports = { generateUsers, generatePets };