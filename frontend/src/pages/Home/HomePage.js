import React, { useEffect, useReducer } from 'react'
import { getAll, search } from '../../services/bookService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Serach from '../../components/Search/Serach';

const initialState = { books: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'BOOKS_LOADED':
            return { ...state, books: action.payload };
        default:
            return state;
    }
};

export default function HomePage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { books } = state;
    const { searchTerm } = useParams();

    useEffect( () => {
        const loadedBooks = searchTerm ? search(searchTerm): getAll();

        loadedBooks.then(books => dispatch({ type: 'BOOKS_LOADED', payload: books }));
    }, [searchTerm]);

    return <>
        <Serach />
        <Thumbnails books={ books }/>
    </>;
}
