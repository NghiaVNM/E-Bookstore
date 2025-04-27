import { useEffect, useState } from 'react';
import classes from './booksAdminPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../../services/bookService';
import NotFound from '../../components/NotFound/NotFound';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';
import Price from '../../components/Price/Price';
import { toast } from 'react-toastify';

export default function BooksAdminPage() {
  const [books, setbooks] = useState();
  const { searchTerm } = useParams();

  useEffect(() => {
    loadbooks();
  }, [searchTerm]);

  const loadbooks = async () => {
    const books = searchTerm ? await search(searchTerm) : await getAll();
    setbooks(books);
  };

  const booksNotFound = () => {
    if (books && books.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/admin/books" linkText="Show All" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    );
  };

  const deletebook = async book => {
    const confirmed = window.confirm(`Delete Book ${book.name}?`);
    if (!confirmed) return;

    await deleteById(book._id);
    toast.success(`"${book.name}" Has Been Removed!`);
    setbooks(books.filter(f => f.id !== book._id));
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Manage Books" margin="1rem auto" />
        <Search
          searchRoute="/admin/books/"
          defaultRoute="/admin/books"
          margin="1rem 0"
          placeholder="Search books"
        />
        <Link to="/admin/addbook" className={classes.add_book}>
          Add Book +
        </Link>
        <booksNotFound />
        {books &&
          books.map(book => (
            <div key={book._id} className={classes.list_item}>
              <img src={'/books/' + book.coverImageUrl} alt={book.title} />
              <Link to={'/book/' + book._id}>{book.title}</Link>
              <Price price={book.price} />
              <div className={classes.actions}>
                <Link to={'/admin/editbook/' + book._id}>Edit</Link>
                <Link onClick={() => deletebook(book)}>Delete</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}