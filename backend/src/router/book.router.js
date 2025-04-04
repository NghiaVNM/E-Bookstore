import {Router} from 'express';
import {sample_books, sample_tags} from '../data.js';

const router = Router();
router.get('/', (req, res) => {

    res.send(sample_books);
});

router.get('/tags', (req, res) => {
    res.send(sample_tags);
});

router.get('/search/:searchTerm', (req, res) => {
    const { searchTerm } = req.params;
    const books = sample_books.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.send(books);
});

router.get('/tag/:tag', (req, res) => {
    const { tag } = req.params;
    const books = sample_books.filter(item => item.tags.includes(tag));
    res.send(books);    
});

router.get('/:bookId', (req, res) => {
    const { bookId } = req.params;
    const books = sample_books.find(item => item.id === bookId);
    res.send(books);
});

export default router;