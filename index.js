const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const port = process.env.PORT || 9000;

app.use(express.static(__dirname + '/html'));

app.engine('hbs', expressHbs.engine({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    }
}));

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/', require('./routes/threadRouter'));

// const models = require("./models");
// models.sequelize.sync().then(() => console.log("Created tables!"));

app.use((req, res, next) => {
    res.status(404).send("File not Found!")
});

app.listen(port, () => console.log('...running on port 9000!'));