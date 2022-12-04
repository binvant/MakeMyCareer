function signuprecruiter(){
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
        url: "https://e3uyya0frh.execute-api.us-east-1.amazonaws.com/dev/createjob",
        data: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
      }).done(function() {
        $(this).addClass( "done" );
      });
}