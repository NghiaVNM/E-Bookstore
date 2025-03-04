import { sample_books, sample_tags } from "../data";

export const getAll = async () => sample_books;

export const search = async (searchTerm) =>
    sample_books.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

export const getAllTags = async () => sample_tags;

export const getAllByTag = async (tag) => {
    if (tag === 'All') return getAll();
    return sample_books.filter(item => item.tags.includes(tag));
};