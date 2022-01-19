Module.register("MMM-Rejseplanen", {
    routes: [],
    
    defaults: {
        updateInterval:60000,
        header: "Rejseplanen",
        routes: [
            {
                stopID: 6716,
                from: "Hillerød St.",
            },
            {
                stopID: 6716,
                distination: "Hillerød St.",
            }
        ]
    },

    init: function () {
        Log.log(this.name + " is in init!");
    },

    start: function () {
        Log.log(this.name + " is starting!");
        this.scheduleUpdate(updateInterval);
    },

    loaded: function (callback) {
        Log.log(this.name + " is loaded!");
        callback();
    },

    // return list of other functional scripts to use, if any (like require in node_helper)
    getScripts: function () {
        return [
            // sample of list of files to specify here, if no files,do not use this routine, or return empty list

            //'script.js', // will try to load it from the vendor folder, otherwise it will load is from the module folder.
            //'moment.js', // this file is available in the vendor folder, so it doesn't need to be available in the module folder.
            //this.file('anotherfile.js'), // this file will be loaded straight from the module folder.
            //'https://code.jquery.com/jquery-2.2.3.min.js',  // this file will be loaded from the jquery servers.
        ]
    },

    // return list of stylesheet files to use if any
    getStyles: function () {
        return [
            'rejseplanen.css',
            // sample of list of files to specify here, if no files, do not use this routine, , or return empty list

            //'script.css', // will try to load it from the vendor folder, otherwise it will load is from the module folder.
            'font-awesome.css', // this file is available in the vendor folder, so it doesn't need to be avialable in the module folder.
            //this.file('anotherfile.css'), // this file will be loaded straight from the module folder.
            //'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',  // this file will be loaded from the bootstrapcdn servers.
        ]
    },

    // return list of translation files to use, if any
    /*getTranslations: function() {
        return {
            // sample of list of files to specify here, if no files, do not use this routine, , or return empty list
            // en: "translations/en.json",  (folders and filenames in your module folder)
            // de: "translations/de.json"
        }
    }, */

    // only called if the module header was configured in module config in config.js
    getHeader: function () {
        return this.data.header;
    },

    notificationReceived: function (notification, payload, sender) {
        // once everybody is loaded up
        if (notification === "ALL_MODULES_STARTED") {
            // send our config to our node_helper
            this.sendSocketNotification("CONFIG", this.config)
        }
        if (sender) {
            Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
        } else {
            Log.log(this.name + " received a system notification: " + notification);
        }
    },

    socketNotificationReceived: function (notification, payload) {
        Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
        if (notification === "NEW_ROUTES") {
            this.routes = payload;
            this.updateDom(1000)
        }
    },

    // system notification your module is being hidden
    // typically you would stop doing UI updates (getDom/updateDom) if the module is hidden
    suspend: function () {

    },

    // system notification your module is being unhidden/shown
    // typically you would resume doing UI updates (getDom/updateDom) if the module is shown
    resume: function () {

    },

    // this is the major worker of the module, it provides the displayable content for this module
    getDom: function () {
        var wrapper = document.createElement("div");
        console.log(this.routes);
        if (this.routes.length < 1) return wrapper;
        for (let j = 0; j < this.routes.length; j++) {
            if (this.routes[j].length < 1) break;
            wrapper.append(`${this.routes[j][0].from} to ${this.routes[j][0].to}`)
            var list = document.createElement("ul")
            list.classList.add('routes')

            for (let i = 0; i < this.routes[j].length; i++) {
                const route = this.routes[j][i];
                const viaIcon = route.type === "BUS" ? '<i class="fas fa-bus"></i>' : '<i class="fas fa-train"></i>'
                routeElement = document.createElement('li');
                routeElement.innerHTML = `${route.departure} ------ ${route.arrival} via ${viaIcon}${route.with}`;
                list.append(routeElement);
            }
            wrapper.append(list);
        }
        
        return wrapper;
    },

    updateRoutes: function () {
        var self = this;
        self.sendSocketNotification("GET_ROUTES", { routes: this.config.routes });
    },

    scheduleUpdate: function(delay){
        var nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }

        var self = this;
        clearTimeout(this.updateTimer);
        this.updateTimer = setTimeout(() => {
            self.updateRoutes();
        }, nextLoad);
    }

})
