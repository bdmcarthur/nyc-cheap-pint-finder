var map;
      function init() {
        map = new google.maps.Map(
            document.getElementById('map'),
            {center: new google.maps.LatLng(-33.91722, 151.23064), zoom: 16});

        // var icons = {
        //   parking: {
        //     icon: iconBase + 'parking_lot_maps.png'
        //   }
        // };

        // Create markers.
        // for (var i = 0; i < features.length; i++) {
        //   var marker = new google.maps.Marker({
        //     position: features[i].position,
        //     icon: icons[features[i].type].icon,
        //     map: map
        //   });
        // };
      }