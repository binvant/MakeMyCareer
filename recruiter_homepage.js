let candidateData = {};
let candidateData2 = {};
$(document).ready(function(){
    console.log('this is run on page load');
    $('#recruiterName').text(localStorage.getItem("name"));
    $('#titleName').text(`Hi,${localStorage.getItem("name")}`);
    $('#recruiterBio')[0].innerHTML = `<p>Email: ${localStorage.getItem("email")}`;
    getJobPostings();
});

function candidateClickListner(index) {
    localStorage.setItem("recruiter_candidate_name", candidateData[index].Item.name.S);
    localStorage.setItem("recruiter_candidate_email", candidateData[index].Item.email.S);
    localStorage.setItem("recruiter_candidate_id", candidateData[index].Item.id.N);
    if (candidateData[index].Item.skills)
        localStorage.setItem("recruiter_candidate_skills", candidateData[index].Item.skills.S);
    window.location.replace("https://makemycareer.s3.amazonaws.com/recruiter_candidate.html");
}

function candidateClickListner2(index) {
    localStorage.setItem("recruiter_candidate_name", candidateData2[index].name.S);
    localStorage.setItem("recruiter_candidate_email", candidateData2[index].email.S);
    localStorage.setItem("recruiter_candidate_id", candidateData2[index].id.N);
    if (candidateData2[index].skills)
        localStorage.setItem("recruiter_candidate_skills", candidateData2[index].skills.S);
    window.location.replace("https://makemycareer.s3.amazonaws.com/recruiter_candidate.html");
}

let jobClickListner = function(jobId){
    console.log(jobId);
    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Content-Type': 'application/json'
        },
        contentType: "application/json",
        method: "GET",
        url: "https://je2xrpvq1h.execute-api.us-east-1.amazonaws.com/v1",
        data: {
            "jobId": jobId
        }
      }).done(function(response) {
        candidateData = response;
        for (let i=0;i<response.length;i++) {
            let div = document.createElement("div");
            div.setAttribute('value',i);
            div.addEventListener("click", function (event) {
                candidateClickListner(this.attributes[0].nodeValue);
            });
            div.innerHTML = response[i].Item.name.S;
            document.getElementById("candidateList").appendChild(div);
        }
      });
      $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Content-Type': 'application/json'
        },
        contentType: "application/json",
        method: "GET",
        url: "https://ofdgpvz74k.execute-api.us-east-1.amazonaws.com/dev/getcandidaterecs",
        data: {
            "job_id": jobId
        }
      }).done(function(response) {
        candidateData2 = response;
        console.log("This is recommended response");
        console.log(response);
        let candidateIds = Object.keys(response);
        for (let i=0;i<candidateIds.length;i++) {
            let div = document.createElement("div");
            div.setAttribute('value',response[candidateIds[i]].id.N);
            div.addEventListener("click", function (event) {
                candidateClickListner2(this.attributes[0].nodeValue);
            });
            div.innerHTML = response[candidateIds[i]].name.S;
            document.getElementById("candidateSuggested").appendChild(div);
        }
      });
};


function getJobPostings() {
          $.ajax({
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            },
            contentType: "application/json",
            method: "GET",
            url: "https://pvpx4f2oyd.execute-api.us-east-1.amazonaws.com/dev",
            data: {
                "id": localStorage.getItem("id")
            }
          }).done(function(response) {
            let toAppendDOM = "";
            for (let i=0;i<response.length;i++) {
                let div = document.createElement("div");
                let innerDiv = document.createElement("div");
                innerDiv.innerHTML = response[i].companyName;
                div.setAttribute('value',response[i].JobID);
                div.addEventListener("click", function (event) {
                    jobClickListner(this.attributes[0].nodeValue);
                });
                div.innerHTML = response[i].positionName
                div.appendChild(innerDiv);
                document.getElementById("jobList").appendChild(div);
                //toAppendDOM += `<div onclick="jobClickListner()"> ${response[i].positionName} <div>${response[i].companyName}</div></div>`
            }
          });
      };
      

function CreateJobRole() {
          $.ajax({
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST'
            },
            contentType: "application/json",
            method: "POST",
            url: "https://e3uyya0frh.execute-api.us-east-1.amazonaws.com/dev/createjob",
            data: JSON.stringify({
                "name": "name",
                "email": "email",
                "password": "password"
            })
          }).done(function() {
            $(this).addClass( "done" ); 
          });
      };