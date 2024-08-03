const { User, Transaction } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async(req,res)=>{
  try{
    const {username,password} = req.body;
    const user = await User.findOne({where:{username}});
    if(!user){
      return res.status(404).json({error: 'User not found'});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({error:'Password invalid'});
    }
    const token = jwt.sign({userId:user.id},'secret_key');
    res.json({user,token})
  }catch(error){
    res.status(400).json({error:error.message});
  }
}

const balanceRead = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json({ balance: user.balance });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const balanceTopup = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.balance += amount;
    await user.save();
    await Transaction.create({ userId, type: 'deposit', amount });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const transferBalance = async (req, res) => {
  try {
    const { senderId, recipientId, amount } = req.body;
    const sender = await User.findByPk(senderId);
    const recipient = await User.findByPk(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    sender.balance -= amount;
    recipient.balance += amount;

    await sender.save();
    await recipient.save();

    await Transaction.create({ userId: senderId, type: 'transfer', amount, recipientId });
    res.json({ sender, recipient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listTopTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      order: [['amount', 'DESC']],
      limit: parseInt(req.params.n),
    });
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listTopUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'username',
        [sequelize.fn('SUM', sequelize.col('Transactions.amount')), 'totalAmount'],
      ],
      include: [{ model: Transaction, attributes: [] }],
      group: ['User.id'],
      order: [[sequelize.fn('SUM', sequelize.col('Transactions.amount')), 'DESC']],
      limit: parseInt(req.params.n),
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  balanceRead,
  getTransactions,
  balanceTopup,
  transferBalance,
  listTopTransactions,
  listTopUsers,
};
