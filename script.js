//const fs = require('fs');
//const AWS = require('aws-sdk');

function signup() {
    let name = $('#name').val();
    let email = $('#mail').val();
    let password = $('#password').val();
    // let myFile = $('#myFile').serialize();
    // let file = document.getElementById('myFile').files[0];
    // let formData = new FormData();
    // formData.append("resume", file, "");
    /*formData.append("name", "Binvant");
    formData.append("password", "xyzzzz");
    formData.append("email", "binvantbajwa@gmail.com");*/

    /*const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });*/
           
    //formData.append("file", file);
    /*$.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST'
        },
        "mimeType": "multipart/form-data",
        contentType: "application/json",
        method: "POST",
        url: "https://jwjkqbwke5.execute-api.us-east-1.amazonaws.com/dev/uploadresume",
        data: {
          "resume": formData
        }
      }).done(function() {
        $(this).addClass( "done" );
      });*/

      $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST',
            'Content-Type': 'application/json'

        },
        contentType: "application/json",
        method: "POST",
        url: "https://jwjkqbwke5.execute-api.us-east-1.amazonaws.com/dev/createprofile",
        data: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
      }).done(function() {
        $(this).addClass( "done" );
      });
      
      // var settings = {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Headers': '*',
      //     'Access-Control-Allow-Methods': 'OPTIONS, POST',
      // },
      //   "url": "https://jwjkqbwke5.execute-api.us-east-1.amazonaws.com/dev/createprofile",
      //   "method": "POST",
      //   "timeout": 0,
      //   "mimeType": "application/json",
      //   "contentType": "application/",
      //   "data": JSON.stringify({
      //     "name": name,
      //     "email": email,
      //     "password": password
      // }),
      //   "isBase64Encoded": false
      // };
      // $.ajax(settings).done(function (response) {
      //   console.log(response);
      // });

      /*fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: 'testBucket', // pass your bucket name
            Key: 'contacts.csv', // file will be saved as testBucket/contacts.csv
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
        });
     });*/

     
      // var setting_resume = {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Headers': '*',
      //     'Access-Control-Allow-Methods': 'OPTIONS, POST',
      //     'Content-Type': file.type
      // },
      //   "url": "https://jwjkqbwke5.execute-api.us-east-1.amazonaws.com/dev/uploadresume",
      //   "method": "POST",
      //   "timeout": 0,
      //   "processData": false,
      //   "mimeType": "multipart/form-data",
      //   "contentType": "application/pdf",
      //   "data": pdfFile,
      //   "isBase64Encoded": true
      // };
      var fd = new FormData(),
      File = document.getElementById("myFile").files[0];
      fd.append( 'file',  File);
      console.log(File.type)
      $.ajax({headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Content-Type': File.type
    },
      "url": "https://jwjkqbwke5.execute-api.us-east-1.amazonaws.com/dev/uploadresume",
      "method": "POST",
      "mimeType": "application/pdf",
      "contentType": "application/pdf",
      "processData": false,
      "contentType": false,
      "data": fd,
      "isBase64Encoded": true
    }).done(function (response) {
        console.log(response);
      });
    }