let markers = [];
let map;
let container = document.querySelector("#barContainer");

window.addEventListener("load", event => {
  getBars();
  init();
});

// Gets Markers from Database
function getBars() {
  axios
    .get("/bars")
    .then(response => {
      response.data.bars.map(bar => markers.push(bar));
      sortBars(markers);
      placeMarkers();
      listBars();
    })
    .catch(error => {
      console.log(error);
    });
}

function init() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(40.7263542, -73.988742),
    zoom: 14
  });
}

function placeMarkers() {
  for (let i = 0; i < markers.length; i++) {
    let marker = new google.maps.Marker({
      position: {
        lat: markers[i].lat,
        lng: markers[i].lng
      },
      map: map
    });

    let content =
      `<div>` +
      `<h5>${markers[i].name}</h5>` +
      `<p>${markers[i].address}</p>` +
      `</div>`;

    let infowindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, i) {
        return function() {
          // window.location = '#' + locations[i][3];
          infowindow.setContent(content);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
  }
}

function listBars() {
  container.innerHTML = "";
  for (let i = 0; i < markers.length; i++) {
    container.innerHTML += `
      <div class="mt-5">
        <h1 class="mb-1" id="ace">${markers[i].name}</h1>
        <p class="font-italic barDescription mb-0">${markers[i].address}</p>
        <p class="text-muted barDescription mb-2">${markers[i].type}</p>
        <p class="barDescription">${markers[i].description}</p>
        <p class="barDescription">${markers[i].neighborhood}</p>
      </div>`;
  }
}

function sortBars(markers) {
  return markers.sort(function(a, b) {
    var nameA = a.neighborhood.toUpperCase(); // ignore upper and lowercase
    var nameB = b.neighborhood.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}
