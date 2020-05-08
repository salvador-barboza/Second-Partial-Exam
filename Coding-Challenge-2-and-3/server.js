const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const { deletesSport, sportExists, addTestData } = require('./models/sport-model')

const app = express();
app.use(jsonParser)

app.delete('/sports/delete', (req, res) => {
    const id = req.body.id
    if (!id) {
        return res.status(406).send("You must specify an id in the request body")
    }

    const sportId = req.query.sportId
    if (!sportId) {
        return res.status(406).send("You must specify a sportId query param")
    }

    if (id !== sportId) {
        return res.status(409).send("sportId query param and body's id must match")
    }

    sportExists(id).then(exists => {
        if (exists) {
            return deletesSport(id).then(() => {
                return res.sendStatus(204)
            })
        } else {
            return res.status(404).send("A team with this id does not exist")
        }
    })
})

/* Your code goes here */


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});