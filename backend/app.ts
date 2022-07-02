import 'dotenv/config';

import sequelize from '@/utils/database';

import createServer from '@/utils/server';

const app = createServer();

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
