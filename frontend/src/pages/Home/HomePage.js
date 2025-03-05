import React, { useEffect, useReducer } from 'react'
import { getAll, getAllByTag, getAllTags, search } from '../../services/bookService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Serach from '../../components/Search/Serach';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';

const initialState = { books: [], tags: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case 'BOOKS_LOADED':
            return { ...state, books: action.payload };
        case 'TAGS_LOADED':
                return { ...state, tags: action.payload };
        default:
            return state;
    }
};

export default function HomePage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { books, tags } = state;
    const { searchTerm, tag } = useParams();

    useEffect( () => {
        getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

        const loadBooks = tag 
            ? getAllByTag(tag)
            : searchTerm
            ? search(searchTerm)
            : getAll();
        loadBooks.then(books => dispatch({ type: 'BOOKS_LOADED', payload: books }));
    }, [searchTerm, tag]);

    return <>
        <Serach />
        <Tags tags={tags}/>
        {books.length === 0 && <NotFound linkText='Reset Search'/>}
        <Thumbnails books={ books }/>
    </>;
}
