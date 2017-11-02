$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lon1 = position.coords.longitude
            var lat1 = position.coords.latitude;
            var url = 'https://fcc-weather-api.glitch.me/api/current';
            $.getJSON( url, {
                lon: lon1,
                lat: lat1,
                format: "json"
            }).done(function( data ) {
                console.log(data.name);
                console.log(data.weather[0].main);
                var name = data.name;
                var icon = data.weather[0].icon;
                celcius = data.main.temp;
                faren = (data.main.temp * 1.8) + 32;
                var sun = 'https://images.unsplash.com/photo-1505554898845-050c97a90ad6';
                var rain = 'https://images.unsplash.com/photo-1486016006115-74a41448aea2';
                if (data.weather[0].main === 'Rain') {
                    $('.well').css('backgroundImage','url('+rain+')');
                } else {
                    $('.well').css('backgroundImage','url('+sun+')');
                }
                $('.container').html('<h1>'+name+' <img src="'+icon+'"></h1><p>Temp:<span id="theTemp">'+celcius+'</span> degrees <span id="tempType">Celsius</span></p>')
              });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    $('#changeTemp').click(function() {
        var tempType = $('#tempType').text();
        var theTemp = $('#theTemp').text();
        console.log(tempType);
        if (tempType === "Celsius") {
            $('#tempType').html('Fahrenheit');
            $('#theTemp').html(faren);
        } else {
            $('#tempType').html('Celsius');
            $('#theTemp').html(celcius);
        }
    });
});
