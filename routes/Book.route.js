import { Router } from 'express'
import { addBook, deleteBook, getAllBooks, search, updateBook } from '../Controllers/Book.controller.js'
const router = Router()

router.get('/getAllBooks', getAllBooks)

router.get('/search', search)

router.post('/addBook', addBook)

router.put('/update', updateBook)

router.delete('/delete', deleteBook)

export default router