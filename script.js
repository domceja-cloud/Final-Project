mapboxgl.accessToken =
'pk.eyJ1IjoiZG9taW5pY2NlamEiLCJhIjoiY21oOXUzc2tkMWZqdDJpbjF1d2d4azRpaSJ9.RBg-rbXZSK9Sq3XAGTgmgw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dominicceja/cmiz4afrj004c01r8ebol6gp7',
    center: [-121.79, 37.99],
    zoom: 11
});

/* Apply fade-in when window loads */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

/* Close intro box */
document.getElementById('intro-close').addEventListener('click', () => {
    document.getElementById('intro').classList.add('hidden');
});

map.on('load', () => {

    /* DATA SOURCE */
    map.addSource('points-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/domceja-cloud/Final-Project/refs/heads/main/data/map.geojson'
    });

    /* POINT LAYER */
    map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points-data',
        paint: {
            'circle-color': '#C47A6A',
            'circle-radius': 8,
            'circle-stroke-width': 3,
            'circle-stroke-color': '#9A4B40'
        }
    });

    /* HOVER HIGHLIGHT */
    map.on('mouseenter', 'points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
        map.setPaintProperty('points-layer', 'circle-radius', 12);
    });

    map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = '';
        map.setPaintProperty('points-layer', 'circle-radius', 8);
    });

    /* POPUPS */
    map.on('click', 'points-layer', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        const popupContent = `
            <div>
                <h3 style="margin:0 0 12px 0; font-size:22px; color:#3a2e2e; font-family:Georgia, serif;">
                    ${properties.Name}
                </h3>

                <p><strong>Address:</strong> ${properties.Address}</p>
                <p><strong>Category:</strong> ${properties.Category}</p>
                <p><strong>Description:</strong> ${properties.Description}</p>
            </div>
        `;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });

    /* CATEGORY FILTERING */
    const checkboxes = document.querySelectorAll('#filters input[type="checkbox"]');

    checkboxes.forEach(box => {
        box.addEventListener('change', () => {
            const active = Array.from(checkboxes)
                .filter(b => b.checked)
                .map(b => b.value);

            map.setFilter('points-layer', [
                'in',
                ['get', 'Category'],
                ['literal', active]
            ]);
        });
    });

    /* NAVIGATION CONTROLS */
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.GeolocateControl({ trackUserLocation: true }), 'top-right');

});
