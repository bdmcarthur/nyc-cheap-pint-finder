let markers = [];
let map;
let container = document.querySelector("#barContainer");
let neighborhood = [];
let infoWindow = null;
let currentActive = "";
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
      markers.map(item => {
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

function init() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(40.7263542, -73.988742),
    zoom: 14,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    }
  });
  infoWindow = new google.maps.InfoWindow();
}

function placeMarkers() {
  for (let i = 0; i < markers.length; i++) {
    let marker = new google.maps.Marker({
      position: {
        lat: markers[i].lat,
        lng: markers[i].lng
      },
      icon: {
        scaledSize: new google.maps.Size(30, 30),
        labelOrigin: new google.maps.Point(16, 45),
        url: "/images/icon.png"
      },
      map: map
    });

    let content =
      `<div>` +
      `<h5>${markers[i].name}</h5>` +
      `<p>${markers[i].address}</p>` +
      `</div>`;

    infowindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(map, "click", function() {
      infowindow.close();
    });

    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, i) {
        return function() {
          window.location = "#" + markers[i].name.replace(/\s/g, "");
          infowindow.setContent(content);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
  }
}

function listBars() {
  container.innerHTML = "";
  for (let i = 0; i < neighborhood.length; i++) {
    container.innerHTML += `<h1 class="neighborhood" id=${neighborhood[
      i
    ].replace(/\s/g, "")}>${neighborhood[i]}</h1>`;
    for (let j = 0; j < markers.length; j++) {
      if (markers[j].neighborhood === neighborhood[i]) {
        container.innerHTML += `<div class="bar" id=${markers[j].name.replace(
          /\s/g,
          ""
        )}>
        <h2 class="mb-1" >${markers[j].name}</h2>
        <p class="font-italic barDescription mb-0">${markers[j].address}</p>
        <p class="text-muted barDescription mb-2">${markers[j].type}</p>
        <p class="barDescription">${markers[j].description}</p>
      </div>`;
      }
    }
  }
  container.innerHTML += `<Footer>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris ultrices eros in cursus turpis massa tincidunt. Mauris nunc congue nisi vitae suscipit. Diam vulputate ut pharetra sit amet aliquam id. Nisl condimentum id venenatis a. Ipsum dolor sit amet consectetur. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Purus semper eget duis at tellus. Sapien et ligula ullamcorper malesuada proin. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Dictumst quisque sagittis purus sit amet volutpat consequat. Donec pretium vulputate sapien nec. Varius vel pharetra vel turpis nunc. Congue nisi vitae suscipit tellus mauris a. Ullamcorper eget nulla facilisi etiam. At lectus urna duis convallis convallis tellus. Massa vitae tortor condimentum lacinia.

  Ultrices neque ornare aenean euismod elementum. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Tristique sollicitudin nibh sit amet. Sed risus ultricies tristique nulla aliquet.</p>
  </Footer> `;
}

//Adds an active class to the bar on the page

function changeLinkState() {
  let bars = document.querySelectorAll(".bar");
  for (var i = 0; i < bars.length; i++) {
    var rect = bars[i].getBoundingClientRect();
    if (window.screen.availWidth > 930) {
      var elemTop = rect.top + 690;
      var elemBottom = rect.bottom - 675;
      if (elemTop <= 818 && elemTop >= 740) {
        if (currentActive !== bars[i].id) {
          bars[i].classList.add("active");
          currentActive = bars[i].id;
          changeMap();
          bars[i].classList.remove("active");
        }
      }
    } else {
      var elemTop = rect.top + 800;
      var elemBottom = rect.bottom - 795;
      if (elemTop <= 818 && elemTop >= 800) {
        bars[i].classList.add("active");
        currentActive = bars[i].name;
        changeMap();
        bars[i].classList.remove("active");
      }
    }
  }
}

// Uses active class to center map on whichever bar is on the page
function changeMap() {
  var active = document.querySelector(".active");
  var activeBarID = document.getElementsByClassName("active")[0].id;

  markers.map((element, index) => {
    if (element.name.replace(/\s/g, "") === activeBarID) {
      let lat = element.lat;
      let long = element.lng;
      let marker = new google.maps.Marker({
        position: {
          lat: markers[index].lat,
          lng: markers[index].lng
        },
        icon: {
          scaledSize: new google.maps.Size(30, 30),
          labelOrigin: new google.maps.Point(16, 45),
          url: "/images/icon.png"
        },
        map: map
      });

      let content =
        `<div>` +
        `<h5>${markers[index].name}</h5>` +
        `<p>${markers[index].address}</p>` +
        `</div>`;

      map.panTo({ lat: lat, lng: long });
      infowindow.disableAutoPan = true;
      infowindow.setContent(content);
      infowindow.open(map, marker);
    }
  });
}

window.addEventListener("scroll", changeLinkState);
