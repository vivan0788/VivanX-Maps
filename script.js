// Map ko initialize karna (Delhi focus)
var map = L.map('map').setView([28.6139, 77.2090], 3);

// Free OpenStreetMap Tiles load karna
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Example Public Live Camera Data (Duniya bhar ke coordinates)
const liveCams = [
    { name: "Times Square, NY", lat: 40.7588, lng: -73.9851, url: "https://www.youtube.com/embed/1-iS7LArMPA?autoplay=1" },
    { name: "London Bridge", lat: 51.5072, lng: -0.1276, url: "https://www.youtube.com/embed/vOunp6fS8-o?autoplay=1" },
    { name: "Tokyo City", lat: 35.6895, lng: 139.6917, url: "https://www.youtube.com/embed/nUf_A9vK0eI?autoplay=1" }
];

// Map par markers lagana
liveCams.forEach(cam => {
    var marker = L.marker([cam.lat, cam.lng]).addTo(map);
    
    // Jab marker par click ho toh Live Video dikhe
    marker.bindPopup(`
        <b>${cam.name}</b><br>
        <iframe class="live-window" src="${cam.url}" frameborder="0" allowfullscreen></iframe>
    `);
});
