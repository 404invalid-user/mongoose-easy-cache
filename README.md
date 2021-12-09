#mongoose easy cache
a easy light waight way of speeding up your app by caching your mongodb


### example
```
//mongo and schema
const mongoose = require('mongoose');
const USER = require('./user-schema');

//require the cache
const { Cache } = require('./cache');


//make a new cache with a name and inport your schema
const cache = new Cache('users', USER);

//connect to mongo
mongoose.connect(process.env.dburi, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    }).then(async(result) => {
    console.log("[database info]: connected to database");

    //load db into your cache
    console.log("loading all to catch");
    await cache.reloadAll(USER);
}).catch((error) => {
    console.log("there was an error connecting to the database\nerror: " + error);
})



function getAll() {
    const allCache = cache.getAll();
    console.log(allCache);
}


async function getBob(values) {
    const bob = await cache.get(values);
    console.log(bob)
}

getBob({username: "bob"});

getAll()
```