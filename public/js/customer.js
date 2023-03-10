$(function () {

    // Get the form
    let form = $('#customer-form');

    // Get the action url
    let actionUrl = form.attr('action');

    // Listen for submit
    form.on('submit', (e) => {
        e.preventDefault();

        // Get data from form
        let data = {
            "DateOfBirth": form.find('input[name=DateOfBirth]').val(),
            "Email": form.find('input[name=Email]').val(),
            "IdNumber": form.find('input[name=IdNumber]').val(),
            "Name": form.find('input[name=Name]').val(),
            "Phone": form.find('input[name=Phone]').val()
        };

        // Set the request Headers
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        // Set the request options
        let options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        };

        // Send data
        fetch(actionUrl, options)
            .then((response) => response.json())
            .then((data) => {
                // Show the credit score from response data
                $("#message").text(data.message);
                $("#credit-score").text(data.data.CreditScore);
                $('#server-response').css('display', 'block');
            })
            .catch((error) => console.error(error));
    });

});