import 'dotenv/config';

import sequelize from '@/utils/database';

import createServer from '@/utils/server';

import { User, Expense } from '@/models';

const app = createServer();

Expense.belongsTo(User, { constraints: true, onDelete: 'CASCADE', targetKey: 'id' });
User.hasMany(Expense, { sourceKey: 'id' });

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ email: 'test@test.com', password: 'test' });
    }
    return user;
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err: any) => {
    console.log({ message: 'Something went wrong, try again later', err });
  });
