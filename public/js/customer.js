$(function () {

    // Get the form
    let form = $('#customerForm');

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
        const divResponse = $('#customerResponse');
        divResponse.hide();
        fetch(actionUrl, options)
            .then((response) => response.json())
            .then((data) => {
                // append the response data
                divResponse.html(`
                    <p>Server Response: ${data.Message}</p>
                    <p>Your Credit Score is: ${data.CreditScore}%</p>
                `);

                // show the div
                divResponse.show();
            })
            .catch((error) => console.error(error));
    });

});