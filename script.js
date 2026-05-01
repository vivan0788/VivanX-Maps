// 1. Map Setup (Default view: India)
var map = L.map('map').setView([20.5937, 78.9629], 5);

// 2. Satellite View Tiles (Free from Esri)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

// 3. Search and View Logic
async function findLocation() {
    const place = document.getElementById('locationInput').value;
    if (!place) return alert("Please enter a location!");

    // City name ko Coordinates mein badalna (Free API)
    const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${place}`;
    const response = await fetch(geoUrl);
    const data = await response.json();

    if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        // Map ko us jagah par le jana
        map.setView([lat, lon], 15); 
        L.marker([lat, lon]).addTo(map).bindPopup(`Live: ${place}`).openPopup();

        // 4. Live Streaming Hack
        // Hum YouTube Live Search ko embed karenge jo har city ki live stream dhund lega
        const videoPanel = document.getElementById('videoContainer');
        videoPanel.innerHTML = `
            <iframe src="https://www.youtube.com/embed?listType=search&list=live+webcam+${place}+city+environment" 
            allow="autoplay; encrypted-media" allowfullscreen></iframe>
        `;
    } else {
        alert("Location nahi mili. Kuch aur try karein!");
    }
}
