import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  ForeignKey,
  NonAttribute
} from 'sequelize';

import User from './user';

import sequelize from '@/utils/database';

class Expense extends Model<InferAttributes<Expense>, InferCreationAttributes<Expense>> {
  declare id: CreationOptional<number>;

  declare owner?: NonAttribute<User>;

  declare userId: ForeignKey<User['id']>;
  declare description: string;

  // `owner` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare amount: number;

  declare date: Date;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'expenses',
    sequelize // passing the `sequelize` instance is required
  }
);

export default Expense;
