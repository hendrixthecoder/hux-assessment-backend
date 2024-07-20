// config/passport.js
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../src/models/User";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your_jwt_secret",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findOne({ email: jwt_payload.email });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

export default passport;
