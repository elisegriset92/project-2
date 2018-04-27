document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

// map

const map = new google.maps.Map(document.getElementById('map'), {
  zoom: 14,
  center: {
    lat: 48.855076,
    lng: 2.356184,
  },
});

// markers

// new google.maps.Marker({
//   position: {
//     lat: 48.855076,
//     lng: 2.356184,
//   },
//   map: map,
//   title: 'Paris',
//   animation: google.maps.Animation.DROP,
// });

// geolocalisation

navigator.geolocation.getCurrentPosition(result => {
  const {latitude, longitude} = result.coords;
  map.setCenter({lat: latitude, lng: longitude});
  // new google.maps.Marker({
  //   position: {
  //     lat: latitude,
  //     lng: longitude,
  //   },
  //   map: map,
  //   title: 'You are Here',
  //   animation: google.maps.Animation.DROP,
  // });
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
        title: onePlace.name,
        animation: google.maps.Animation.DROP,
      });

      var latLng = marker.getPosition(); // returns LatLng object
      map.setCenter(latLng); // setCenter takes a LatLng object

      marker.addListener('click', function() {
        infowindow.open(map, marker);
        setTimeout(function() {
          infowindow.close();
        }, 5000);
        var latLng = marker.getPosition(); // returns LatLng object
        map.setCenter(latLng); // setCenter takes a LatLng object
      });

      // var crea = new Date(Date.parse(onePlace.updatedAt)).toString();

      // get date properly

      var milli = Date.parse('Fri Apr 27 2018 09:34:07 GMT+0200 (CEST)');
      var d = new Date(milli);
      var crea = d.toLocaleString();
      //

      var contentString =
        `<h3 id="firstHeading" class="firstHeading">${onePlace.name}</h3>` +
        `<p> Last comment on <b>${crea}</b>` +
        '<br>' +
        '<div class="signup">' +
        `<br><a href="/view/pin/${onePlace._id}"><button class="btn-sm btn-primary">` +
        ' View Pins</button></a>' +
        '<br>' +
        `<br><a href="/pin/${onePlace._id}"><button class="btn-sm btn-primary">` +
        'Add a Pin</button></a> ' +
        '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      // delete pins after 12h
      setTimeout(function() {
        marker.setMap(null);
      }, 1000 * 60 * 60 * 12);
    });
  })
  .catch(err => {
    alert('something went wrong');
  });

// ------------

// -------------

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
