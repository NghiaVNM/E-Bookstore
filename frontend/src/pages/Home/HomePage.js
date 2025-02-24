import React, { useEffect, useReducer } from 'react'
import { getAll } from '../../services/bookService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';

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

    useEffect( () => {
        getAll().then(books => dispatch({ type: 'BOOKS_LOADED', payload: books }));
    })

    return <>
        <Thumbnails books={ books }/>
    </>;
}
