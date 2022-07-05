/**
 * This function used to handle authentication with Passport Strategy
 * @author Didijobs <rgy713>
 */
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const AnonymousStrategy = require("passport-anonymous").Strategy;

const authenticationMiddleware = require("./middleware");
const AuthorizationForm = require("../../forms/AuthorizationForm");

//storing user info in session
passport.serializeUser(function (user, done) {
  done(null, user.idUser);
});

passport.deserializeUser(async (idUser, done) => {
  const user = await AuthorizationForm.getUserById(idUser);
  done(null, user);
});
/**
 * Initializing Passport Bearer stratgy
 * @author Didijobs <rgy713>
 */
function initPassport() {
  passport.use(new AnonymousStrategy());
  passport.use(
    new BearerStrategy(async (token, done) => {
      const user = await AuthorizationForm.getUserByToken(token);
      console.log(user)
      if (user) {
        return done(null, user, { scope: "all" });
      } else {
        return done(null, false);
      }
    })
  );

  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;
