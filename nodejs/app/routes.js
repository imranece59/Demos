
var Subjects = require('./models/SubjectViews');

var tripdetails = require('./models/tripobsnovehicle');

var tenantmasterdetails = require('./models/tenantmastermodel'); 

var requestval = require('request');

const request = require('request-promise') ;

const pg = require('pg');


const connectionString = process.env.DATABASE_URL || 'postgres://user:pwd@host:5432/db';




module.exports = function(app) {




  app.get('/api/tenants', function(req, res) {
   tenantmasterdetails.find({}, {'_id': 0, 'tenant_id' : 1,'tenant_display_name':1}, function(err, tenantmasterdetails) {
   if (err) 
   res.send(err);
    res.json(tenantmasterdetails); 
  });
  });

 
   app.get('/data', function(req, res) {
   Subjects.find({}, {'_id': 0, 'startdateskey' : 1,'tenantid' :1, 'triphour':1,'actualtripdrivetime':1,'alerttype':1,'total_alert_count' :1, 'tailgatingcount':1,'tripstarttime':1,'tripendtime':1,'driverfname' : 1,'driverlname':1,'breaktimedesc':1,'cumulativebreaktimedesc':1}, function(err, subjectDetails) {
   if (err) 
   res.send(err);
    res.json(subjectDetails); 
  });
  });
	
  
 app.get('/data/:tenantid/:startdate/:enddate/:breaktime/:cumbreaktime', function(req, res) {
   
  Subjects.getTripbytenantid(req.params.tenantid,req.params.startdate,req.params.enddate,req.params.breaktime,req.params.cumbreaktime,function(err,tripdetails){
  
    if (err) 
    throw err;
    res.json(tripdetails); 
  });
  });


 app.get('/trip', function(req, res) {
  
  tripdetails.find({}, {'_id': 0, 'startdateskey' : 1,'tenantid' :1, 'triphour':1,'actualtripdrivetime':1,'alerttype_novehicle':1,'tailgateoverallcount_novehicle' :1, 'tailgatingcount_novehicle':1,'tripstarttime':1,'tripendtime':1,'driverfname' : 1,'driverlname':1,'breaktimedesc':1,'cumulativebreaktimedesc':1}, function(err, tripobsdetailsall) {
   if (err) 
   res.send(err);
    res.json(tripobsdetailsall); 
  });
  })


  app.get('/trip/:tenantid/:startdate/:enddate/:breaktime/:cumbreaktime', function(req, res) {
   
  tripdetails.getTripbytenantid(req.params.tenantid,req.params.startdate,req.params.enddate,req.params.breaktime,req.params.cumbreaktime,function(err,tripobsdetails){
  
    if (err) 
    throw err;
    res.json(tripobsdetails); 
  });
 }); 

  app.get('/', function(req, res) {

		res.render('login',{errorMessage:''});
   });



  

  

  
  app.post('/analytics', function(req, res,next) {
  
  const  options = {
     uri: 'https://xxx/api/v1/auth/login',
      method: 'POST',
      body: {
        username : req.body.username, 
        password: req.body.password},
      json : true

  }

     requestval(options,

      function(error, response, body){

       

        if (!body.response) {
         
         
          
         res.render("login",{errorMessage : 'Username and Password not matching'})

        }else { 
          

          res.render('index')}
      } 
    
    )

      

     
      //res.render('index');
   

  })

}
