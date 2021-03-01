const express = require('express');
const api = require('./api');

const app = express();
const port = process.env.PORT || 3000;

const { urls } = require('./url_data');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api', api);

app.get('/:id', (req, res) => {
    const response = urls[req.params.id];
    if (response) {
        res.redirect(response);
    } else {
        res.status(404).send('Invalid URL');
    }
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening at port: ${port}`);
});
