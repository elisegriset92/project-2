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
      new google.maps.Marker({
        position: {lat, lng},
        map: map,
        title: 'onePlace.name',
        animation: google.maps.Animation.DROP,
      });
    });
  })
  .catch(err => {
    alert('something went wrong');
  });
