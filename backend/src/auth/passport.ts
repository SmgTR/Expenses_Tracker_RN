import { User } from '@/models';
import passportJwt from 'passport-jwt';

const ExtractJwt = passportJwt.ExtractJwt;

const JwtStrategy = passportJwt.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export const strategy = new JwtStrategy({ ...jwtOptions }, async function (jwtPayload, next) {
  return await User.findOne({ where: { id: jwtPayload.id } })
    .then((user) => {
      return next(null, user);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
});
