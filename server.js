const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());

app.use('/repositories', routes);

app.get('/', (req, res, next) => {

    res.json({
        status: 'UP',
        msg: 'Server is up and running'
    })
    next();

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
