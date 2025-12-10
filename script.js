mapboxgl.accessToken = 'pk.eyJ1IjoiZG9taW5pY2NlamEiLCJhIjoiY21oOXUzc2tkMWZqdDJpbjF1d2d4azRpaSJ9.RBg-rbXZSK9Sq3XAGTgmgw';

const map = new mapboxgl.Map({
  container: 'map', // this is the container ID that we set in the HTML
  style: 'mapbox://styles/dominicceja/cmiz4afrj004c01r8ebol6gp7', // Your Style URL goes here
  center: [-122.27, 37.8], // starting position [lng, lat]. Note that lat must be set between -90 and 90. You can choose what you'd like.
  zoom: 9 // starting zoom, again you can choose the level you'd like.
    });
