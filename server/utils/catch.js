// catch.js
module.exports = (fn) => {
    return (req, res, next) => {
        // Wrap in Promise.resolve so both async and sync errors are caught
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};