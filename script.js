//const fs = require('fs');
//const AWS = require('aws-sdk');
let temp;
function convertToBase64(selectedFile) {
  //Read File
  //Check File is not Empty
  console.log(selectedFile)
  if (selectedFile) {
    console.log("Inside if")
      // Select the very first file from list
      var fileToLoad = selectedFile;
      // FileReader function for read the file.
      var fileReader = new FileReader();
      var base64;
      // Onload of file read the file content
      fileReader.onload = function(fileLoadedEvent) {
        temp = fileLoadedEvent.target.result;
          // Print data in console
          console.log(base64);
      };
      // Convert data to base64
      console.log("Filetoload")
      console.log(fileToLoad)
      let toReturn = fileReader.readAsDataURL(fileToLoad);
      console.log("done")
      console.log(toReturn);
      return temp;
  }
}

function render(){
  window.location.replace("http://makemycareer.s3-website-us-east-1.amazonaws.com/recruitersignup.html")
}

function signup() {
    let name = $('#name').val();
    let email = $('#mail').val();
    let password = $('#password').val();
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
      var fd = new FormData();
      var File = document.getElementById("myFile").files[0];
      let promise = new Promise((resolve, reject) => {
        //resolve(convertToBase64(File));
      //File = convertToBase64(File);
      convertToBase64(File);
      //console.log("Just after function return");
      //console.log(temp);
      let that = this;
      setTimeout(() => {
        //temp = convertToBase64(File);
        console.log("The file sent in resolve");
        console.log(temp);
        resolve(temp);
      }, 3000);
      /*if (File){
        resolve(File);
      }else {
        reject(File);
      }*/ 
      });
      promise.then(
        function() {
          console.log("Inside resolve");
          resolveUpload(File);
        }, 
        function(Fie){
          rejectUpload(File);
        }
       );
      }

    function resolveUpload(File){
      console.log("Filee")
      console.log(temp)
      $.ajax({headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
    },
      url: "https://jwjkqbwke5.execute-api.us-east-1.amazonaws.com/dev/uploadresume",
      method: "POST",
      data: temp,
      isBase64Encoded: false
    }).done(function (response) {
        console.log(response);
      });
    }
    function rejectUpload(inp){
      console.log(inp)
    }