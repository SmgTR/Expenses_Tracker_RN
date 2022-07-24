import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute
} from 'sequelize';

import Expense from './expense';

import sequelize from '@/utils/database';

// 'projects' is excluded as it's not an attribute, it's an association.
class User extends Model<
  InferAttributes<User, { omit: 'expenses' }>,
  InferCreationAttributes<User, { omit: 'expenses' }>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;

  declare expenses?: NonAttribute<Expense[]>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  declare getExpenses: HasManyGetAssociationsMixin<Expense>; // Note the null assertions!
  declare addExpense: HasManyAddAssociationMixin<Expense, number>;
  declare addExpenses: HasManyAddAssociationsMixin<Expense, number>;
  declare setExpenses: HasManySetAssociationsMixin<Expense, number>;
  declare removeExpense: HasManyRemoveAssociationMixin<Expense, number>;
  declare removeExpenses: HasManyRemoveAssociationsMixin<Expense, number>;
  declare hasExpense: HasManyHasAssociationMixin<Expense, number>;
  declare hasExpenses: HasManyHasAssociationsMixin<Expense, number>;
  declare countExpenses: HasManyCountAssociationsMixin;
  declare createExpense: HasManyCreateAssociationMixin<Expense, 'userId'>;

  declare static associations: {
    expenses: Association<User, Expense>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'users',
    sequelize,
    indexes: [{ unique: true, fields: ['email'] }]
  }
);

export default User;
