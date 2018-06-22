const express = require('express');
const coverPicRouter = express.Router();

coverPicRouter.route('/')
.get((res, req, next) => {
     res.end("hello");
}, (err) => next(err));

module.exports = coverPicRouter;
