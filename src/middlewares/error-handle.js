const params = require("../config/params");

/**
 * 404 handling.
 */
handle404 = (app) => {
  app.use((req, res, next) => {
    params.message = "404";
    params.status = false;
    params.dev_message = "Route does not exists on the server";

    res.status(404).send(params);
  });
};
