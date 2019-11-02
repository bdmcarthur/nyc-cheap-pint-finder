let barList = [];
let markers = [];
let map;
let container = document.querySelector("#barContainer");
let neighborhood = [];
let infoWindow = null;
let currentActive = "";

///////Event Listeners////////
window.addEventListener("load", event => {
  getBars();
  initMap();
});

window.addEventListener("scroll", activeClass);

//////////Functions////////////
const initMap = () => {
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
    let marker = new google.maps.Marker({
      position: {
        lat: barList[i].lat,
        lng: barList[i].lng
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
      `<h5>${barList[i].name}</h5>` +
      `<p>${barList[i].address}</p>` +
      `</div>`;

    infowindow = new google.maps.InfoWindow({
      content: content
    });

    //Opens Infowindow On Click
    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, i) {
        return function() {
          window.location = "#" + barList[i].name.replace(/\s/g, "");
          infowindow.setContent(content);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
    markers.push(marker);
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

      let content =
        `<div>` +
        `<h5>${barList[index].name}</h5>` +
        `<p>${barList[index].address}</p>` +
        `</div>`;

      map.panTo({ lat: lat, lng: long });
      infowindow.disableAutoPan = true;
      infowindow.setContent(content);
      infowindow.open(map, markers[index]);
    }
  });
}

// window.onscroll = () => {
//   const nav = document.querySelector("#myTopnav");

//   if (this.scrollY <= 10) {
//     nav.className = "topnav";
//   } else {
//     nav.className = "topnav-scrolled";
//   }
// };
