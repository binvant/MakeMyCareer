$(window).on('load',function() {
    //console.log("Username : " +getUsername());
    console.log(localStorage.getItem("id"));
    $('#headerName').text(`${localStorage.getItem("name")}`);
    $('#userName').text(`${localStorage.getItem("name")}`);
    $('#skills').text(`${localStorage.getItem("skills")}`);
    $('#resumeDisplay').attr('src',`https://resume-bucket-bsb.s3.amazonaws.com/resume_${localStorage.getItem("id")}`)
    /*$.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
    
        },
        contentType: "application/json",
        method: "GET",
        url: "https://ofdgpvz74k.execute-api.us-east-1.amazonaws.com/dev/getjobrecs",
        data: {
            'candidate_id': localStorage.getItem("id")
        }
      }).done(function(response) {
        console.log(response);
        let jobIds = Object.keys(response);
        let toAppendDOM = "";
        for (let i=0;i<jobIds.length;i++) {
            toAppendDOM += `<div> ${response[jobIds[i]].positionName.S} <button style="float: right; margin-left: 100px;"> Apply </button> <div>${response[jobIds[i]].companyName.S}</div></div>`
        }
        $('#joblist')[0].innerHTML = toAppendDOM;
      });*/
});

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

function resolveUpload(File){
    console.log("Filee")
    console.log(temp)
    $.ajax({headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST',
  },
    url: "https://jwjkqbwke5.execute-api.us-east-1.amazonaws.com/dev/updateresume",
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

$('#updateProfile').on('click',function () {
    console.log("UPDATE");
    var fd = new FormData();
    var File = document.getElementById("resume-upload").files[0];
    let promise = new Promise((resolve, reject) => {
    convertToBase64(File);
    let that = this;
    setTimeout(() => {
        console.log("The file sent in resolve");
        console.log(temp);
        resolve(temp);
    }, 3000);
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
});