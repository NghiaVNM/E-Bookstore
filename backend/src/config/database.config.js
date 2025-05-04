import { connect, set } from 'mongoose';
import { BookModel } from '../models/book.model.js';
import { UserModel } from '../models/user.model.js';
import { sample_books } from '../data.js';
import { sample_users } from '../data.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;

set('strictQuery', true);

export const dbconnect = async () => {
    try {
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await seedUsers();
        await seedBooks();
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

async function seedUsers() {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
        console.log('User data already exists. Skipping seeding.');
        return;
    }

    for (let user of sample_users) {
        user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }
    console.log('User data seeded successfully.');
}

async function seedBooks() {
    const bookCount = await BookModel.countDocuments();
    if (bookCount > 0) {
        console.log('Book data already exists. Skipping seeding.');
        return;
    }

    for (let book of sample_books) {
        book.coverImageUrl = `/books/${book.coverImageUrl}`;
        await BookModel.create(book);
    }
    console.log('Book data seeded successfully.');
}