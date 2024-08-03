module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      recipientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  
    return Transaction;
  };
  