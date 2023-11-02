export default class MapComponent extends HTMLElement {
	#lat;
	#lng;

	constructor(data) {
		super();
		this.#lat = data.latitud;
		this.#lng = data.longitud;
		if (data.id) this.id = data.id;
		else this.id = "map-component";
		if(data.style) this.style = data.style;
		if (data.id_div) this.divId = data.id_div;
		else this.divId = "map";
		if(data.mapStyle) this.mapStyle = data.mapStyle;
		if(data.linkStyle) this.linkStyle = data.linkStyle;
		this.addToBody();
	}

	#init() {
		var mapPreview = document.createElement("iframe");
		mapPreview.src = `https://maps.google.com/maps?q=${this.#lat},${this.#lng}&z=15&output=embed`;
		if(this.mapStyle) mapPreview.style = this.mapStyle;
		this.appendChild(mapPreview);

		var mapLink = document.createElement("a");
		mapLink.href = `https://www.google.com/maps/?q=${this.#lat},${this.#lng}`;
		mapLink.innerText = "Ver en Google Maps";
		mapLink.id = "map-link";
		if(this.linkStyle) mapLink.style = this.linkStyle;
		this.appendChild(mapLink);

	}

	update(newLat, newLng) {
		this.#lat = newLat;
		this.#lng = newLng;
		this.innerHTML = "";
		this.#init();
		this.addToBody();
	}
	addToBody() {
		if (this.divId) {
			if (document.getElementById(this.divId)) {
				document.getElementById(this.divId).appendChild(this);
			} else {
				document.body.appendChild(this);
			}
		}
	}
}

customElements.define("map-component", MapComponent);
