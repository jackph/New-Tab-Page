function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

info();
setInterval(info, 1000);

function info() {
    var date = Date().split(" ");
    document.getElementById("date").innerHTML = date[0] + ", " + date[1] + " " + date[2] + ", " + date[3];
    document.getElementById("time").innerHTML = formatAMPM(new Date());
}

var schedule = {
    1: {
        classes: ["Data Communications", "IT Skills", "IT Concepts"],
        times: [[9, 45], [17, 0], [19, 00]],
        rooms: [3080, 3050, 3050]
    },
    2: {
        classes: ["Preparing for IT", "Programming Logic and Design"],
        times: [[10, 10], [17, 0]],
        rooms: [3080, 3010]
    },
    3: {
        classes: ["Data Communications", "M$ Wingdings OS"],
        times: [[9, 45], [12, 20]],
        rooms: [3080, 3030]
    }
};

function classToday() {
    var date = new Date();
    var nextClass = new Date();
    var day = 1;
    var rDay = date.getDay();
    nextClass.setDate(nextClass.getUTCDate() - rDay + 1);
    var month = date.getUTCMonth() + 1;
    var dayOM = date.getUTCDate();
    var year = date.getUTCFullYear();
    var time = formatAMPM(date);
    var s = schedule[day];
    var classes = [];


    while (day < 4) {
        for (var i = 0; i < s["classes"].length; i++) {
            console.log("Day: " + day);
            console.log("i: " + i);
            nextClass.setHours(s["times"][i][0], s["times"][i][1]);
            console.log(date - nextClass);

            if (nextClass > date && date - nextClass < 86400000) {
                var timeUntil = (nextClass.getTime() - date.getTime()) / (1000 * 60 * 60);
                reg = /(\d*)(\.\d*)/g;
                var minsUntil = Math.floor(parseFloat(timeUntil.toString().replace(reg, "0$2")) * 60);
                var hoursUntil = timeUntil.toString().replace(reg, "$1");
                timeUntil = hoursUntil + " hours and " + minsUntil + " minutes.";
                console.log(timeUntil);
                classes.push({
                    classes: s["classes"],
                    nextClass: s["classes"][i],
                    times: s["times"],
                    rooms: s["rooms"],
                    timeUntil: timeUntil
                });
            }
        }
        day++;
        nextClass.setDate(nextClass.getDate() + 1);
    }
    return classes;
}

function schdisp(c) {
    var html = "<ul>";
    for (var i = 0; i < c.classes.length; i++) {
        html += "<li>" + c.classes[i] + " at " + c.times[i] + "</li>";
    }
    html += "<h2>Next class: " + c.nextClass + "</h2>";
    html += "<li>In " + c.timeUntil + "</li></ul>";
    document.getElementById("schecont").innerHTML = html;
}

schdisp(classToday());



