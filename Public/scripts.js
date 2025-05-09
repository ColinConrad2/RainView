const map = L.map('map').setView([45.0, -110.0], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors',
}).addTo(map);

map.on('click', function (e) {
  const lat = e.latlng.lat.toFixed(4);
  const lon = e.latlng.lng.toFixed(4);
  document.getElementById('weatherInfo').setAttribute('hx-get', `/getWeather?lat=${lat}&lon=${lon}`);
  htmx.trigger('#weatherInfo', 'load');
});