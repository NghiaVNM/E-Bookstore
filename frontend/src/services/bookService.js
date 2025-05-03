import axios from 'axios';

export const getAll = async () => {
    const { data } = await axios.get('/api/books');
    return data; 
};

export const search = async (searchTerm) =>
{
    const { data } = await axios.get(`/api/books/search/${searchTerm}`);
    return data;
}

export const getAllTags = async () => {
    const { data } = await axios.get('/api/books/tags');
    return data;
};

export const getAllByTag = async (tag) => {
    if (tag === 'All') return getAll();
    const { data } = await axios.get(`/api/books/tag/${tag}`);

    return data;
}

export const getById = async bookId => {
    const { data } = await axios.get(`/api/books/${bookId}`);
    return data;
};

export async function deleteById(bookId) {
    await axios.delete(`/api/books/${bookId}`);
  }

  export async function update(book) {
    await axios.put('/api/books', book);
  }
  
  export async function add(book) {
    const { data } = await axios.post('/api/books', book);
    return data;
  }