$(window).on('load',function() {
    //console.log("Username : " +getUsername());
    console.log(localStorage.getItem("id"));
    $('#headerName').text(`Hi, ${localStorage.getItem("recruiter_candidate_name")}`);
    $('#candidateName').text(`${localStorage.getItem("recruiter_candidate_name")}`);
    if (localStorage.getItem("skills"))
        $('#skills').text(`${localStorage.getItem("recruiter_candidate_skills")}`);
    $('#pdfHolder').attr('src',`https://resume-bucket-bsb.s3.amazonaws.com/resume_${localStorage.getItem("recruiter_candidate_id")}`)
});