import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional
} from 'sequelize';

import sequelize from '@/utils/database';

export interface ExpenseModel
  extends Model<InferAttributes<ExpenseModel>, InferCreationAttributes<ExpenseModel>> {
  id: CreationOptional<number>;
  amount: CreationOptional<number>;
  description: CreationOptional<string>;
  date: CreationOptional<Date>;
}

const Expense = sequelize.define<ExpenseModel>('expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

export default Expense;
