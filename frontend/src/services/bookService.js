import { sample_books } from "../data";

export const getAll = async () => sample_books;

export const search = async (searchTerm) =>
    sample_books.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );