document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

// map

const map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: {
    lat: 48.855076,
    lng: 2.356184,
  },
});

// markers

new google.maps.Marker({
  position: {
    lat: 48.855076,
    lng: 2.356184,
  },
  map: map,
  title: 'Paris',
  animation: google.maps.Animation.DROP,
});

// geolocalisation

navigator.geolocation.getCurrentPosition(result => {
  const {latitude, longitude} = result.coords;
  map.setCenter({lat: latitude, lng: longitude});
  new google.maps.Marker({
    position: {
      lat: latitude,
      lng: longitude,
    },
    map: map,
    title: 'You are Here',
    animation: google.maps.Animation.DROP,
  });
});

// retrieve places data from our backend
axios
  .get('/place/data')
  .then(response => {
    const placeList = response.data;
    placeList.forEach(onePlace => {
      const [lat, lng] = onePlace.location.coordinates;
      var marker = new google.maps.Marker({
        position: {lat, lng},
        map: map,
        title: 'onePlace.name',
        animation: google.maps.Animation.DROP,
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      console.log(onePlace);
      var contentString =
        '<p id="firstHeading" class="firstHeading">{{name}}</p>' +
        '<a href="/views/pin/view-pin">' +
        'View Pins</a> ' +
        '<br>' +
        '<a href="/views/pin/add-pin">' +
        'Add a Pin</a> ' +
        '</div>' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
    });
  })
  .catch(err => {
    alert('something went wrong');
  });

const locationInput = document.querySelector('.location-input');
const latInput = document.querySelector('.lat-input');
const lngInput = document.querySelector('.lng-input');

const autocomplete = new google.maps.places.Autocomplete(locationInput);

autocomplete.addListener('place_changed', () => {
  const place = autocomplete.getPlace();
  const loc = place.geometry.location;

  latInput.value = loc.lat();
  lngInput.value = loc.lng();
  nameInput.value = loc.name();
});
