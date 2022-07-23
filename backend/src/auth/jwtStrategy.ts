import jwt from 'jsonwebtoken';

export const generateJWT = (email: string, id: number) => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  if (process.env.JWT_SECRET) {
    return jwt.sign(
      {
        email,
        id,
        expiresIn: '30d'
      },
      process.env.JWT_SECRET
    );
  } else {
    throw new Error();
  }
};
