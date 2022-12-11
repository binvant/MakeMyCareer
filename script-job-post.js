function postjob(){
    let company_name = $('#Cname').val();
    let position = $('#Pname').val();
    let skills = $('#skills').val();
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
            "company": company_name,
            "position": position,
            "skills": skills
        })
      }).done(function() {
        $(this).addClass( "done" );
      });
}