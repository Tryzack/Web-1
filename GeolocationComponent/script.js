import MapComponent from "./MapComponent.js";

// Get the button elements from the HTML
const generateLinkButton = document.getElementById("generate-link-button");
const getCurrentLocationButton = document.getElementById("get-current-location-button");

//MapComponent
let mapComponent = new MapComponent({
	latitud: 0,
	longitud: 0,
	id_div: "map",
    style: `display:grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    `,
    mapStyle: `
    width: 100%;
    height: 350px;
    `,
	linkStyle: `
		color: #ffffff;
		justify-self: center;
	`,
});

// Add event listeners to the buttons
generateLinkButton.addEventListener("click", () => {
    // Get the latitude and longitude values from the input elements
    const latitude = document.getElementById("latitude-input");
    const longitude = document.getElementById("longitude-input");
	mapComponent.update(latitude.value, longitude.value);
});

casa.addEventListener("click", () => {
	mapComponent.update(10.720279337988682, -71.61334342264412);
});

uru.addEventListener("click", () => {
	mapComponent.update(10.649569259463494, -71.59664274623904);
});

getCurrentLocationButton.addEventListener("click", () => {
	// Options for the getCurrentPosition() method
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	// Check if geolocation is supported by the browser
	if (navigator.geolocation) {
		// Get the current position
		navigator.geolocation.getCurrentPosition(
			(position) => {
				// Get the latitude and longitude values from the position object
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				console.log(position.coords.accuracy)
				mapComponent.update(latitude, longitude);

				// Place latitude and longitude values in the input elements
				document.getElementById("latitude-input").value = latitude;
				document.getElementById("longitude-input").value = longitude;
			},
			null,
			options
		);

	} else {
		// Geolocation is not supported by the browser
		alert("Geolocation is not supported by your browser.");
	}


});
