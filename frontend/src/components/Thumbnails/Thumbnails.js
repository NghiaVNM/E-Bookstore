import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import classes from './thumbnails.module.css';
export default function Thumbnails({ books }) {
  return (
    <ul className={classes.list}>
      {books.map(book => (
        <li key={book.id}>
          <Link to={`/book/${book.id}`}>
            <img
              className={classes.image}
              src={`/books/${book.coverImageUrl}`}
              alt={book.title}
            />

            <div className={classes.content}>
              <div className={classes.titile}>{book.title}</div>
              <span
                className={`${classes.favorite} ${
                  book.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
              <div className={classes.stars}>
                <StarRating stars={book.stars} />
              </div>
              <div className={classes.product_item_footer}>
                <div className={classes.genres}>
                  {book.genres.map(genre => (
                    <span key={genre}>{genre}</span>
                  ))}
                </div>
                <div className={classes.publication_year}>
                  <span>🕒</span>
                  {book.publicationYear}
                </div>
              </div>
              <div className={classes.price}>
                <Price price={book.price} />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}