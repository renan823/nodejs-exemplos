module.exports = (req, res, next) => {
    console.log("Passing througth middleware!");
    next();
}