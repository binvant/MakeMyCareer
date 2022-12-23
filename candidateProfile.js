import { getUsername } from './login.js'

function applyJobClickListner(jobId) {
    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
    
        },
        contentType: "application/json",
        method: "POST",
        url: "https://assvi76zmf.execute-api.us-east-1.amazonaws.com/v1",
        data: JSON.stringify({
            'jobId': jobId,
            'candidateId': localStorage.getItem("id")
        })
      }).done(function(response) {
        console.log(response);
      });
}

$(window).on('load',function() {
    //console.log("Username : " +getUsername());
    console.log(localStorage.getItem("id"));
    $('#welcomeTag').text(`Hi, ${localStorage.getItem("name")}`);
    $('#candidateName').text(`${localStorage.getItem("name")}`);
    $('#candidateBio')[0].innerHTML = `<p>Email: ${localStorage.getItem("email")}</p><p>Skills: ${localStorage.getItem("skills")}</p>`;
    $.ajax({
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
        for (let i=0;i<jobIds.length;i++) {
            let div = document.createElement("div");
            let innerDiv = document.createElement("div");
            let button = document.createElement("button");
            //let a = document.createAttribute("a");
            div.setAttribute('value',response[jobIds[i]].JobID.S);
            div.addEventListener("click", function (event) {
                applyJobClickListner(this.attributes[0].nodeValue);
            });
            div.innerHTML = response[jobIds[i]].positionName.S;
            innerDiv.innerHTML = response[jobIds[i]].companyName.S;
            button.innerHTML = "Apply";
            button.setAttribute('style','float: right; margin-left: 100px;');
            let url = "";
            if (response[jobIds[i]].jobUrl) {
                url = response[jobIds[i]].jobUrl.S;
            }
            button.setAttribute('herf',url);
            //button.appendChild(a);
            div.appendChild(button);
            div.appendChild(innerDiv);
            document.getElementById("joblist").appendChild(div);
            //toAppendDOM += `<div onclick="jobClickListner()"> ${response[i].positionName} <div>${response[i].companyName}</div></div>`
        }
      });
});