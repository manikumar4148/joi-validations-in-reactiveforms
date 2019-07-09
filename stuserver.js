var hapi=require('@hapi/hapi');
require("dotenv").config();
var mysql=require('mysql');
 var Joi=require('@hapi/joi');


var server=new hapi.Server({
    host:'localhost',
    port:4201,
    routes : {
            cors : true
        }
});


server.route({
    method:"GET",
    path:"/api/studentdata",
    handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`SELECT * from studentdata`, function (error,stu, fields) {
                if (error) reject(error);
                resolve(stu);
              }); 
              connection.end();
        })
      } 
});

server.route({
    method:"POST",
    path:"/api/studentdata",
    options:{
        validate:{
            payload:{
                fname:Joi.string().min(4).required(),
                lname:Joi.string().min(4).required().label("Your error message in here"),
                email:Joi.string().email().required(),
                dob:Joi.string().required(),
                gender:Joi.string().required(),
                phone:Joi.string().min(10).required(),
                address:Joi.string().required(),
                selectc:Joi.string().required(),
                selectb:Joi.string().required()
            }
        }
    },
     handler:(request,reply)=>{
               var newstudentdata=request.payload;
               console.log(newstudentdata);
            return new Promise((resolve,reject)=>{
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query(`INSERT INTO studentdata(fname,lname,email,dob,gender,phone,address,selectc,selectb) VALUES('${newstudentdata.fname}','${newstudentdata.lname}','${newstudentdata.email}','${newstudentdata.dob}','${newstudentdata.gender}','${newstudentdata.phone}','${newstudentdata.address}','${newstudentdata.selectc}','${newstudentdata.selectb}')`, function (error, stu, fields) {
                    if (error) reject(error);
                    resolve(stu);
                  });
                   
                  connection.end();
            })
            
        }
    
        
    });




server.start((err)=>{
    if(err) throw err;
    
})
console.log("Server is started"+ server.info.uri)