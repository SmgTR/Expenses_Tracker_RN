import 'dotenv/config';

import sequelize from '@/utils/database';

import createServer from '@/utils/server';

const app = createServer();

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err: any) => {
    console.log({ message: 'Something went wrong, try again later', err });
  });
