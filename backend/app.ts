import 'dotenv/config';

import sequelize from '@/utils/database';

import createServer from '@/utils/server';

import { User, Expense } from '@/models';

const app = createServer();

Expense.belongsTo(User, { onDelete: 'CASCADE', targetKey: 'id' });

User.hasMany(Expense, { sourceKey: 'id' });

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err: any) => {
    console.log({ message: 'Something went wrong, try again later', err });
  });
