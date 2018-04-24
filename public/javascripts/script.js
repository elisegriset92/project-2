document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

function startMap() {
  const paris = {
    lat: 48.855076,
    lng: 2.356184,
  };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: paris,
  });
}

startMap();
