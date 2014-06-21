var formatNumber = function(n) {
    if(n >= 0) {
        return n.toFixed(2);
    }
    else {
        return "-";
    }
}

var validateNumber = function(n, duration) {
    if(n > 0 && n < duration) {
        return n;
    }
    else {
        return -1;
    }
}

var navtime = function() {
    var tdata, tstr, p, url, type, startTime, requestStart, responseStart,
        responseEnd, duration, download, connect, ttfb;
    if(window.performance) {
        var tdata = window.performance.getEntries();
        var tstr = "<div class='row'>" +
            "<div class='col-md-1'><h3>#</h3></div>" +
            "<div class='col-md-7'><h3>URL</h3></div>" +
            "<div class='col-md-1'><h3>Dur.</h3></div>" +
            "<div class='col-md-1'><h3>Conn.</h3></div>" +
            "<div class='col-md-1'><h3>TTFB</h3></div>" +
            "<div class='col-md-1'><h3>Down.</h3></div>";
        for(p in tdata) {
            url = tdata[p].name;
            type = tdata[p].entryType;
            duration = tdata[p].duration;
            startTime = tdata[p].startTime;
            requestStart = tdata[p].requestStart;
            responseStart = tdata[p].responseStart;
            responseEnd = tdata[p].responseEnd;

            connect = validateNumber(requestStart - startTime, duration);
            ttfb = validateNumber(responseStart - requestStart, duration);
            download = validateNumber(responseEnd - responseStart, duration);
                tstr +=
                "<div class='col-md-1'>" + p  + "</div>" +
                "<div class='col-md-7'>" + url + "</div>" +
                "<div class='col-md-1'>" + formatNumber(duration) + "</div>" +
                "<div class='col-md-1'>" + formatNumber(connect) + "</div>" +
                "<div class='col-md-1'>" + formatNumber(ttfb) + "</div>" +
                "<div class='col-md-1'>" + formatNumber(download) + "</div>";
        }
        tstr += "</div>";

        $("#timing").html(tstr);
    }
}

