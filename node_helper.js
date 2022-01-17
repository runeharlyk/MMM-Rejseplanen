const axios = require('axios');
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

    start: function () {
        console.log("Starting node helper: " + this.name);

    },

    socketNotificationReceived: async function (notification, payload) {
        var self = this;
        if (notification === "GET_ROUTES") {
            const requests = [];
            
            for (var i = 0; i < payload.routes.length; i++) { // payload.routes.length
                const r=payload.routes[i];
                if(!r.stopID || !r.destID){
                    console.log("You need both stopID and destID, please check your configuration");
                    return;
                }
                requests.push(axios.get(`https://xmlopen.rejseplanen.dk/bin/rest.exe/trip?originId=${r.stopID}&destId=${r.destID}&format=json`))
            }

            const trips = [];
            Promise.all(requests).then(res => {
                for (let i = 0; i < res.length; i++) {
                    const response = res[i];
                    const routes = [];
                    for (let j = 0; j < response.data.TripList.Trip.length; j++) {
                        const route_raw = response.data.TripList.Trip[j];
                        var route = {};
                        route.arrival = route_raw.Leg.Destination.time;
                        route.with = route_raw.Leg.name;
                        route.type = route_raw.Leg.type;
                        route.from = route_raw.Leg.Origin.name;
                        route.to = route_raw.Leg.Destination.name;
                        route.departure = route_raw.Leg.Origin.time;
                        routes.push(route);
                    }
                    trips.push(routes)
                }
                self.sendSocketNotification("NEW_ROUTES", trips);
        });
        }
    },
});
