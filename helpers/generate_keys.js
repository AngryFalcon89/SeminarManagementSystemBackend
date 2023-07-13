import crypto from 'crypto'
//access token key
const key1 = crypto.randomBytes(32).toString('hex')
//refresh token key
const key2 = crypto.randomBytes(32).toString('hex')
console.table({key1, key2})