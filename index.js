const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

app.get('/', async (req, res) => {
    const customObjects = 'https://api.hubspot.com/crm/v3/objects/2-57855372?properties=name&properties=actor_name&properties=superhero_name';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(customObjects, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'Custom Objects | Integrating With HubSpot I Practicum', data });
    } catch (error) {
        console.error(error);
    }
});

app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/update-cobj', async (req, res) => {
    const newCustomObject = {
        properties: {
            "name": req.body.name,
            "actor_name": req.body.actor_name,
            "superhero_name": req.body.superhero_name
        }
    }

    const createCustomObject = 'https://api.hubspot.com/crm/v3/objects/2-57855372';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(createCustomObject, newCustomObject, { headers });
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));