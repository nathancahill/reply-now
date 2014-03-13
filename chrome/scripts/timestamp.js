function setTimestamps() {
    moment.lang('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s:  "secs",
            m:  "1 min",
            mm: "%d min",
            h:  "1 hr",
            hh: "%d hrs",
            d:  "a day",
            dd: "%d days",
            M:  "a month",
            MM: "%d months",
            y:  "a year",
            yy: "%d years"
        }
    });

    window.setInterval(function() {
        $('.xW.xY').each(function() {
            var that = this;

            // Get moment from title attribute
            var m = moment($('span', that).attr('title'), "ddd, MMM D, YYYY at h:m A", "en");

            // Only worry about emails within a week
            if (moment().diff(m, 'minutes') < 10080) {

                // Unread email has time in a <b> tag
                if ($('span', that).has('b').length) {
                    $('span b', that).html(m.fromNow());

                    if (moment().diff(m, 'minutes') > 10080) {
                        // Older than a week does nothing
                    } else if (moment().diff(m, 'minutes') > 60) {
                        $('span', that).css('color', '#FF4136');
                    } else if (moment().diff(m, 'minutes') > 15) {
                        $('span', that).css('color', '#FF851B');
                    } else {
                        $('span', that).css('color', '#3D9970');
                    }
                } else {
                    $('span', that).html(m.fromNow());

                    if (moment().diff(m, 'minutes') > 10080) {
                        // Older than a week does nothing
                    } else if (moment().diff(m, 'minutes') > 60) {
                        $('span', that).css('font-weight', 'bold');
                        $('span', that).css('color', '#FF4136');
                    } else if (moment().diff(m, 'minutes') > 15) {
                        $('span', that).css('font-weight', 'bold');
                        $('span', that).css('color', '#FF851B');
                    } else {
                        $('span', that).css('color', '#3D9970');
                    }
                }
            }
        });
    }, 3000);
}

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        setTimestamps();
    }
    }, 10);
});
