const express = require('express');

const{
    registerUser,
    loginUser,
    getTransactions,
    balanceRead,
    balanceTopup,
    transferBalance,
    listTopTransactions,
    listTopUsers,
} = require('../controllers/userController');
const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('balance/:userId',balanceRead);
router.get('/transactions', getTransactions);
router.post('/topup',balanceTopup);
router.post('/transfer',transferBalance);
router.get('/top-transactions/:n',listTopTransactions);
router.get('/top-users/:n',listTopUsers);

module.exports =router;