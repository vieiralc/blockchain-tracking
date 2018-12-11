
var citymap = {
    lagoSul: {
        center: {lat: -15.83684779, lng: -47.87309647, radius: 500},
    },
    guara: {
        center: {lat: -15.84015068, lng: -47.97437668, radius: 500},
    },
    asaNorte: {
        center: {lat: -15.76251863, lng: -47.88236618, radius: 500},
    },
    lagoNorte: {
        center: {lat: -15.7512843, lng: -47.8404808, radius: 500},
    }
};

var map;
var bounds = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -15.78729805, lng: -47.87223816},
        zoom: 11.8,
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
            radius: citymap[city].center.radius
        });

        bounds.push(cityCircle.getBounds())
    }
}
