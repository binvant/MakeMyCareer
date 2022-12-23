var info = {
  email: "1",
  id: "83",
  name: "1",
  password: "1",
  skills: "Programming: Java, C++, C, Python, C#, HTML, CSS, JavaScript, Haskell, Julia, SQL (MySQL, PostgreSQL), Unix, Linux"
};
const getUsername = () => {
  return info;
}
const setUsername = (name) => {
  localStorage.setItem("name", name.data.name);
  localStorage.setItem("email", name.data.email);
  localStorage.setItem("id", name.data.id);
  localStorage.setItem("password", name.data.password);
  localStorage.setItem("skills", name.data.skills);
}
export { getUsername };

$('#loginButton').click(function() {
//let login = () => {
    info.username = $('#username').val();
    info.password = $('#password').val();
    $.ajax({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
    
        },
        contentType: "application/json",
        method: "GET",
        url: "https://awsn7uawvi.execute-api.us-east-1.amazonaws.com/v1",
        data: {
            'username': info.username,
            'password': info.password,
            'isRecruiter': $('#loginAs').is(":checked")
        }
      }).done(function(response) {
        console.log(response);
        setUsername(response);
        if ($('#loginAs').is(":checked")) {
          console.log(response);
          //window.location.replace("https://makemycareer.s3.amazonaws.com/recruiter_homepage.html");
          window.location.replace("recruiter_homepage.html");
        } else {
          window.location.replace("https://makemycareer.s3.amazonaws.com/candidateHomePage.html");
        }
        //window.location.replace("http://makemycareer.s3-website-us-east-1.amazonaws.com/recruitersignup.html");
      });
});

$('#signup').on('click',function () {
  if ($('#loginAs').is(":checked")) {
    window.location.replace("http://makemycareer.s3-website-us-east-1.amazonaws.com/recruitersignup.html");
  } else {
    window.location.replace("https://makemycareer.s3.amazonaws.com/index.html");
  }
})