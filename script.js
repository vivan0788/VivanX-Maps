// 1. Map Setup
var map = L.map('map').setView([20.5937, 78.9629], 5);

// 2. Map Tiles load karna
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Search Function (Fixed Version)
async function findLocation() {
    const place = document.getElementById('locationInput').value;
    
    if (!place) {
        alert("Please enter a location name!");
        return;
    }

    try {
        // Nominatim API ka use - 'https' hona zaroori hai
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            // Map ko smoothly move karna
            map.flyTo([lat, lon], 14);

            // Purane markers hatane ke liye (optional)
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`Showing Live: ${place}`)
                .openPopup();

            // Video Update karna
            const videoPanel = document.getElementById('videoContainer');
            // YouTube search URL ko thoda clean kiya hai
            videoPanel.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed?listType=search&list=live+webcam+${encodeURIComponent(place)}" 
                    allowfullscreen>
                </iframe>`;
        } else {
            alert("Location nahi mili! Kuch aur search karein (e.g. New York).");
        }
    } catch (error) {
        console.error("Error fetching location:", error);
        alert("Server se connect nahi ho pa raha hai. Internet check karein.");
    }
}
