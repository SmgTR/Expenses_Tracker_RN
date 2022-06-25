import db from '@/utils/database';

export const getAllExpenses = () => {
  return db
    .execute('SELECT * FROM EXPENSES')
    .then((result) => {
      return result[0];
    })
    .catch((err) => {
      console.log(err);
    });
};
