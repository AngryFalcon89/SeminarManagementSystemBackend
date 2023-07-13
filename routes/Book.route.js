import { Router } from 'express'
import { addBook, deleteBook, getAllBooks, search, updateBook } from '../Controllers/Book.controller.js'
import { verifyAccessToken } from '../helpers/jwt_helper.js'
const router = Router()

router.get('/getAllBooks', getAllBooks)

router.get('/search', search)

router.post('/addBook', verifyAccessToken, addBook)

router.put('/update', verifyAccessToken, updateBook)

router.delete('/delete', verifyAccessToken, deleteBook)

export default router