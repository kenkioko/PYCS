$(function () {

    // toogle the valid input group
    $('input[name="XMLType"').click(function () {
        if ($(this).attr("value") == "data") {
            $("#xmlText").show();
            $("#xmlFile").hide();
        }
        if ($(this).attr("value") == "file") {
            $("#xmlFile").show();
            $("#xmlText").hide();
        }
    });

    // Get the form
    let xmlForm = $('#xmlForm');

    // Get the action url
    let xmlUrl = xmlForm.attr('action');

    // Listen for submit
    xmlForm.on('submit', (e) => {
        e.preventDefault();

        // request header
        let headers = new Headers();
        headers.append("Accept", "application/json");

        // request data and param
        const params = new URLSearchParams();
        let data;

        // the selected data type
        const xmlDataType = $('input[name="XMLType"]:checked').val();
        params.append('XMLType', xmlDataType);
        if (xmlDataType === 'data') {
            // XML content type
            headers.append("Content-Type", "application/xml");

            // XML text data
            data = $('textarea[name="XMLText"]').val();
        } else {
            // XML file
            data = new FormData();
            data.append('XMLFile', $('input[name="XMLFile"]')[0].files[0]);
        }

        // Set the request options
        let options = {
            method: 'POST',
            body: data,
            headers: headers
        };

        // add param to url
        const url = new URL(xmlUrl, window.location.origin);
        url.search = params;

        // Send data
        const divResponse = $('#tierResponse');
        divResponse.hide();
        fetch(url.toString(), options)
            .then(response => response.json())
            .then(data => {
                // append the response data
                divResponse.html(`<p>Server Response: ${data.Message}</p>`);
                divResponse.show();
            })
            .catch(error => console.log('error', error));
    });
});