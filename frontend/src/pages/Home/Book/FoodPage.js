import React, { useEffect, useState } from 'react'
import classes from './foodPage.module.css'
import { getById } from '../../../services/bookService';
import { useParams } from 'react-router-dom';
import StarRating from '../../../components/StarRating/StarRating';
import Tags from '../../../components/Tags/Tags';
import Price from '../../../components/Price/Price';

export default function FoodPage() {
    const [book, setBook] = useState({});
    const {id} = useParams();

    useEffect(() => {
        getById(id).then(setBook);
    }, [id]);

  return <>
    { book && (
        <div className={classes.container}>
            <img 
                className={classes.image} 
                src={`/books/${book.coverImageUrl}`}
                alt={book.title}
            />

            <div className={classes.details}>
                <div className={classes.header}>
                    <span className={classes.title}>{book.title}</span>
                    <span className={`${classes.favorite} ${book.favorite ? '' : classes.not}`}>
                        ❤
                    </span>
                </div>
                <div className={classes.rating}>
                    <StarRating stars={book.stars} size={25} />
                </div>

                <div className={classes.genres}>
                    {
                        book.genres?.map(genre => <span key={genre}>{genre}</span>)
                    }
                </div>

                <div className={classes.tags}>
                    {book.tags && (
                        <Tags tags={book.tags.map(tag => ({ name: tag }))} forBookPage={true} />
                    )}
                </div>

                <div className={classes.publicationYear}>
                    <span>
                        Publication year <strong>{book.publicationYear}</strong>
                    </span>
                </div>

                <div className={classes.price}>
                    <Price price={book.price} />
                </div>

                <button>Add To Cart</button>
            </div>
        </div>
    )}
  </>
}
