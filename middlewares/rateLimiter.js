const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    message: "Too many requests from this IP, please try again after a minute"
});

module.exports = limiter;