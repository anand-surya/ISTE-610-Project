const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb://localhost:27017";
//3.135.194.71
//const connectionString = "mongodb://3.135.194.71:27017";
//const connectionString = 'mongodb+srv://ubuntu@c2-18-220-247-253.us-east-2.compute.amazonaws.com/test?retryWrites=true&w=majority';
var Grid = require('gridfs');
 ObjectID = require('mongodb').ObjectID;
var geocoder = require('geocoder');
var geoip = require('geoip-lite');
var NodeGeocoder = require('node-geocoder');
const mime = require('mime');
var geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: '84fe8156a0b047bb9f510cf4685b3473'
});
/*
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
*/
/*
app.listen(3000, function() {
  console.log('listening on 3000')
}) 
*/


//console.log(addresses);

require('dotenv').config({path: __dirname + '/.env'});

/*
app.get('/', (req, res) => {
 
  res.render('index.ejs', {})
})
*/

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('VehiclesDB')
    const db1 = client.db('VehicleImagesDB')
    const coll = db.collection('Vehicles')
    var gfs = Grid(db1,mongo)
     var base_array = new Array;
    var res_array = new Array;

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    
    // db.collection("Vehicles").dropIndex("$text")
     db.collection("Vehicles").createIndex({ "manufacturer":"text", "model":"text", "year":"text"})
     db.collection("Vehicles").createIndex({ manufacturer: 1})
     db.collection("Vehicles").createIndex({ model: 1})
     db.collection("Vehicles").createIndex({ year: 1})

   /* 
    gfs.files.findOne({}, (err, file) => {
    if (err) {
        // report the error
    } else {
        // detect the content type and set the appropriate response headers.
        let mimeType = file.contentType;
        if (!mimeType) {
            mimeType = mime.getType(file.filename);
        }
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': 'attachment; filename=' + file.filename
        });

        const readStream = gfs.createReadStream({
            _id: id
        });
        readStream.on('error', err => {
            // report stream error
        });
        // the response will be the file itself.
        readStream.pipe(base_array);
    }
});
*/



/*
    gfs.files.find({}).toArray(function(err, files){
        // create read stream
      //  console.log("lenght" + files.length)
        for( var i=0;i<25;i++){
        // console.log(i)
        var readstream = gfs.createReadStream({filename: files[i].filename});
        //console.log(readstream)
         var bufs = [];
        readstream.on('data', function (chunk) {
         bufs.push(chunk);
         var fbuf = Buffer.concat(bufs);
           var base64 = fbuf.toString('base64');
          // console.log(base64)
           //console.log(typeof base64)
           base_array.push(base64);
           console.log(base_array.length)
        });

        console.log(base_array.length+"bef")
        // set the proper content type 
        readstream.on('end', function () {
          
          // console.log(base_array)
          // console.log(base_array.length)

         //  console.log(base_array)
         // console.log(base64 +"\n\n\n");
          
         });
      }
      console.log(base_array)
     //   res.render('index.ejs', { Vehicles : results, Images: base_array});
    });
  */

     app.get('/', (req, res) => {
  db.collection("Vehicles").find().limit(20).toArray()
    .then(results => {
      res.render('index.ejs', {Vehicles:"",Images:""})
      

      //console.log(results)
    })
    .catch(/* ... */)
})
   
    
    app.post('/find', (req, res) => {
      //var query = { manufacturer: req.body.query };
    //  var query = { $text: {$search: req.body.query} }
    //var selector = {model: {$regex: /.*req.body.query./, $options:"i"}}

    

    var query = {$text: { $search: req.body.query}}
    var query1 = {$or: [query, {manufacturer: {$regex: req.body.query, $options:"i"}},{model: {$regex: req.body.query, $options:"i"}},{year: {$regex: req.body.query, $options:"i"}}]}
    //var query = {$and:[sel,selector]}
     
      
  db.collection("Vehicles").find(query1).limit(10).limit(25).toArray()
    .then(results => {
    //  console.log(results[0].image_url)
      var i = 0;
     var k=0;
       
      var q1 = { filename: "https://images.craigslist.org/01414_3LIXs9EO33z_600x450.jpg" };
       //  res.send(found)
       var fname = [];
	       gfs.files.find({}).toArray(function(err, files){
        // create read stream
	fname[4]=files[4].filename;
	fname[0]=files[0].filename;
	fname[1]=files[1].filename;
	fname[2]=files[2].filename;
	fname[3]=files[3].filename;
	fname[5]=files[0].filename;
	fname[6]=files[1].filename;
	fname[7]=files[2].filename;
	fname[8]=files[3].filename;
	fname[9]=files[4].filename;
	fname[10]=files[0].filename;
	fname[11]=files[1].filename;
	fname[12]=files[2].filename;
	fname[13]=files[3].filename;
	fname[14]=files[4].filename;
	fname[20]=files[0].filename;
	fname[16]=files[1].filename;
	fname[15]=files[2].filename;
	fname[18]=files[3].filename;
	fname[19]=files[4].filename;
        fname[17]=files[0].filename;
      	fname[21]=files[1].filename;
	fname[22]=files[2].filename;
	fname[23]=files[3].filename;
	fname[24]=files[4].filename;
	

        for(i=0;i<25;i++){
        // console.log(i)
        var readstream = gfs.createReadStream({filename: fname[i]});
        //console.log(readstream)
         var bufs = [];
        readstream.on('data', function (chunk) {
         bufs.push(chunk);
         var fbuf = Buffer.concat(bufs);
           var base64 = fbuf.toString('base64');
          // console.log(base64)
           //console.log(typeof base64)
           base_array.push(base64);
           console.log(base_array.length)
        });
      //  console.log(base_array.length+"bef")
        // set the proper content type 
        readstream.on('end', function () {
          
          // console.log(base_array)
          // console.log(base_array.length)

         //  console.log(base_array)
         // console.log(base64 +"\n\n\n");
          
         });

      }
      if(i == 25){ i=0;}
      base_array = [];
      console.log(base_array)
     //   res.render('index.ejs', { Vehicles : results, Images: base_array});
    });

/*
      const readstream = gfs.createReadStream(q1);
        const bufs = [];
        readstream.on('data', function (chunk) {
         bufs.push(chunk);
        });
       readstream.on('end', function () {
          const fbuf = Buffer.concat(bufs);
           const base64 = fbuf.toString('base64');
         // console.log(base64[i] +"\n\n\n");
         });
       */
       //res.render('index.ejs', { Vehicles : results, Images: base_array});

       res.render('index.ejs', { Vehicles : results, Images: base_array});
      //--
     //console.log(results)
    })
    .catch(console.error)
})


    app.post('/loc', (req, res) => {
      //var query = { manufacturer: req.body.query };
    //  var query = { $text: {$search: req.body.query} }
    //var selector = {model: {$regex: /.*req.body.query./, $options:"i"}}
    geocoder.geocode(req.body.lat, function(err, result) {
           console.log(result[0].latitude);
           console.log(result[0].longitude);
           var lat = result[0].latitude;
    var lon = result[0].longitude;
    var dist = parseInt((parseInt(req.body.dist))/0.00062137);
    console.log(dist)
    var query = { loc: { $near: { $geometry: {type: "Point" ,coordinates: [ lon,lat ]},$maxDistance: dist}}};
   // var query = {$text: { $search: req.body.lat}}
    //var query = {$and:[sel,selector]}
      
  db.collection("Vehicles").find(query).limit(10).toArray()
    .then(results => {
      var q = { filename: "https://images.craigslist.org/01414_3LIXs9EO33z_600x450.jpg" };
      res.render('index.ejs', { Vehicles: results, Images: "" })
    // console.log(results)
    })
    .catch(console.error)
        });
    
})



    app.post('/comment', (req, res) => {
      console.log(req.body)
      console.log("reached here")
      //var Vehicles = ""
     // var query = { id: req.body.commentid }, {$set: { comment: req.body.comment } };
      console.log({ _id: req.body.commentid }, {$set: { comments: req.body.comment } })
       var myquery = { _id: ObjectID(req.body.commentid) };
       console.log(myquery)
      var newvalues = {$set: { comments: req.body.comment } };
        console.log(newvalues)
       db.collection("Vehicles").updateOne(myquery,newvalues)
       .then(result =>{
        console.log(result)
        console.log("1 document updated");
       // res.render('index.ejs', {Vehicles:""})
       //console.log(result);
       }).catch(console.error)
       var query = { _id: ObjectID(req.body.commentid)  };
       db.collection("Vehicles").find(query).toArray()
    .then(results => {
      var q = { filename: "https://images.craigslist.org/01414_3LIXs9EO33z_600x450.jpg" };
      res.render('index.ejs', { Vehicles: results, Images:"" })
      console.log(results)
    })
    .catch(console.error)

       
       
  
})
   

  const isProduction = process.env.NODE_ENV === 'production'
    const port = isProduction ? 7500 : 3000
    app.listen(port, function () {
      console.log(`listening on ${port}`)
    })
  })

console.log('May Node be with you')
