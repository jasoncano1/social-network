
module.exports = app => {
    app.use('/api', require('./api'));
    app.use((req, res) => res.send('Wrong Route!'));
}