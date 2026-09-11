"use strict";


function initMap() {


    var displayMap = document.getElementById("displayMap");
    var routeBox   = document.getElementById("routeBox");
    var btnBar     = document.getElementById("routeBtns");


    var restaurant = { lat: 43.6498, lng: -79.3765 };


    var myMap = new google.maps.Map(displayMap, {
        zoom: 14,
        center: restaurant,
        fullscreenControl: false,
        mapTypeControl: false
    });


    new google.maps.Marker({
        position: restaurant,
        map: myMap,
        title: "Crepes & Waffles – 26 Lombard St, Toronto"
    });


    var routeFind = new google.maps.DirectionsService();
    var routeDraw = new google.maps.DirectionsRenderer();
    routeDraw.setMap(myMap);
    routeDraw.setPanel(routeBox);


    var modes  = ["DRIVING",   "WALKING",  "TRANSIT"];
    var labels = ["🚗 Driving", "🚶 Walking", "🚇 Transit"];


    navigator.geolocation.getCurrentPosition(getPos, handleError);

    function getPos(pos) {
        var myPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        };

        for (var i = 0; i < modes.length; i++) {
            (function(mode, label) {
                var btn = document.createElement("button");
                btn.textContent = label;
                btn.className   = "route-btn";

                btn.addEventListener("click", function() {

                    var all = document.querySelectorAll(".route-btn");
                    for (var j = 0; j < all.length; j++) {
                        all[j].classList.remove("active");
                    }
                    btn.classList.add("active");
                    showRoute(myPosition, mode);
                });

                btnBar.appendChild(btn);
            })(modes[i], labels[i]);
        }


        btnBar.querySelectorAll(".route-btn")[0].classList.add("active");
        showRoute(myPosition, "DRIVING");
    }


    function showRoute(origin, travelMode) {
        var myRoute = {
            origin:      origin,
            destination: restaurant,
            travelMode:  travelMode
        };

        routeFind.route(myRoute, function(result, status) {
            if (status === "OK") {
                routeDraw.setDirections(result);
                routeDraw.setMap(myMap);
                routeDraw.setPanel(routeBox);
            } else {
                routeBox.innerHTML =
                    "<p class='geo-error'>Directions unavailable: " + status + "</p>";
            }
        });
    }


    function handleError(err) {
        console.log("Geolocation error: " + err.message);
        routeBox.innerHTML =
            "<p class='geo-error'>&#9888; Could not get your location. " +
            "Please allow location access in your browser and refresh the page.</p>";
    }
}