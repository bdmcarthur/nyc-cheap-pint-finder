let barList = [];
let markersList = [];
let map;
let container = document.querySelector("#barContainer");
let neighborhood = [];
let popupList = [];
let currentActive = [];
let fullscreenBtn = document.querySelector(".fullscreen");
let getLocationBtn = document.querySelector(".getLocation");
let openMarker = null
///////Event Listeners////////
window.addEventListener("load", event => {
  getBars();
  initMap();
});


fullscreenBtn.addEventListener("click", event => {
  let mapContainer = document.querySelectorAll(".mapContainer");
  if (fullscreenBtn.innerHTML === "Close Map") {
    mapContainer[0].classList.remove("col-12");
    mapContainer[0].classList.add("col-sm-6");
    fullscreenBtn.innerHTML = "Full Screen Map";
  } else {
    mapContainer[0].classList.remove("col-sm-6");
    mapContainer[0].classList.add("col-12");
    fullscreenBtn.innerHTML = "Close Map";
  }
});

getLocationBtn.addEventListener("click", getLocation);

window.addEventListener("scroll", activeClass);

//////////Functions////////////
const initMap = () => {
  map = new mapboxgl.Map({
    container: 'map', // HTML container id
    style: 'mapbox://styles/mapbox/streets-v8', // style URL
    center: {
      lat: 40.7263542,
      lng: -73.988742
    },
    zoom: 12,
    accessToken: 'pk.eyJ1IjoiYm1jYXJ0aHVyIiwiYSI6ImNrOGx0cTR3aDAzYnkzbHBjN2IzNzc2a2MifQ.16DiKikXbxrXWmYYBeQ0pw'
  });

  var nav = new mapboxgl.NavigationControl({
    showCompass: false,
    showZoom: true
  });

  map.addControl(nav, "top-right");

};

// Gets barList from Database
function getBars() {
  axios
    .get("/bars")
    .then(response => {
      response.data.bars.map(bar => barList.push(bar));
      barList
        .sort((a, b) => a.lat - b.lat)
        .map(item => {
          if (neighborhood.indexOf(item.neighborhood) === -1) {
            neighborhood.push(item.neighborhood);
          }
        });
      placeMarkers();
      listBars();
    })
    .catch(error => {
      console.log(error);
    });
}

function placeMarkers() {
  for (let i = 0; i < barList.length; i++) {
    var markerHeight = 25,
      markerRadius = 10,
      linearOffset = 25;
    var popupOffsets = {
      'bottom': [0, -markerHeight],
    };
    var popup = new mapboxgl.Popup({
        offset: popupOffsets
      })
      .setHTML(`<div class='HHHHHH'>` +
        `<h5 class="info-name">${barList[i].name}</h5>` +
        `<p class="info-address">${barList[i].address}</p>` +
        `</div>`);
    popupList.push(popup)
    var el = document.createElement('div');
    el.className = 'marker';
    el.id = 'm' + barList[i].name.replace(/\s/g, "")

    var marker = new mapboxgl.Marker(el)
      .setLngLat([barList[i].lng, barList[i].lat])
      .setPopup(popup)
      .addTo(map)

    markersList.push(marker)
    let mark = document.getElementById(el.id)
    mark.addEventListener("click", event => {
      var slicedName = event.target.id.slice(1, event.target.id.length)
      window.location = "#" + slicedName;
    });
  }
}

//List text of bars next to map
function listBars() {
  container.innerHTML = "";
  for (let i = 0; i < neighborhood.length; i++) {
    container.innerHTML += `<h2 class="neighborhood" id=${neighborhood[
      i
    ].replace(/\s/g, "")}>${neighborhood[i]}</h2>`;
    for (let j = 0; j < barList.length; j++) {
      if (barList[j].neighborhood === neighborhood[i]) {
        container.innerHTML += `<div class="bar" id=${barList[j].name.replace(
          /\s/g,
          ""
        )}>
        <h2 class="mb-1" >${barList[j].name}</h2>
        <p class="font-italic barDescription mb-0">${barList[j].address}</p>
        <p class="text-muted barDescription mb-2">${barList[j].type}</p>
        <p class="barDescription">${barList[j].description}</p>
      </div>`;
      }
    }
  }
}

//Adds an active class to the main bar on the page
function activeClass() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length; i++) {
    let rect = bars[i].getBoundingClientRect();
    if (window.screen.availWidth > 930) {
      let elemTop = rect.top + 690;
      let elemBottom = rect.bottom - 675;
      if (elemTop <= 818 && elemTop >= 740) {
        if (currentActive !== bars[i].id) {
          bars[i].classList.add("active");
          currentActive = bars[i].id;
          changeMap();
          bars[i].classList.remove("active");
        }
      }
    } else {
      let elemTop = rect.top + 800;
      let elemBottom = rect.bottom - 795;
      if (elemTop <= 818 && elemTop >= 800) {
        bars[i].classList.add("active");
        currentActive = bars[i].name;
        changeMap();
        bars[i].classList.remove("active");
      }
    }
  }
}

// Uses active class to center map on whichever bar is on the page and open infowindow
function changeMap() {

  let active = document.querySelector(".active");
  let activeBarID = document.getElementsByClassName("active")[0].id;
  barList.map((element, index) => {
    if (element.name.replace(/\s/g, "") === activeBarID) {
      let lat = element.lat;
      let long = element.lng;

      popupList.map(item => {
        item.remove()
      })

      map.panTo([long, lat], {
        animate: true
      });

      markersList[index].togglePopup()

    }

  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.panTo(pos);
        var marker = new mapboxgl.Marker()
          .setLngLat(pos)
          .addTo(map);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}