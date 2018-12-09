
var citymap = {
    lagoSul: {
        center: {lat: -15.83684779, lng: -47.87309647},
    },
    guara: {
        center: {lat: -15.84015068, lng: -47.97437668},
    },
    asaNorte: {
        center: {lat: -15.76251863, lng: -47.88236618},
    },
    lagoNorte: {
        center: {lat: -15.7512843, lng: -47.8404808},
    }
};

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -15.82132351, lng: -47.92991638},
        zoom: 12,
        mapTypeId: 'roadmap'
    });

    for (var city in citymap) {
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: citymap[city].center,
            radius: Math.sqrt(50) * 100
        });
    }
}
