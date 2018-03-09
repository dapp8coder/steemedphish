var contentScript = {
    init: function () {
        contentScript.log('Injecting the blacklist content script...');

        var script = document.createElement('script');
        script.appendChild(document.createTextNode('(' + contentScript.inject + ')();'));
        document.body.appendChild(script);

        contentScript.log('Done.');
    },

    inject: function () {
        var contentObject = {
            blacklist: [
                "steewit.com",
                "steemil.com"
            ],

            init: function () {
                var host = window.location.host;

                if (contentObject.isBlackListed(host)) {
                    contentObject.displayScamWarning();
                }
            },

            displayScamWarning: function() {
                var div = document.createElement('div');
                div.id = "steemedphishwarning";
                div.style.position = 'absolute';
                div.style.width = "100%";
                div.style.height = "100%";
                div.style.padding = "3px";
                div.style.backgroundColor = 'darkred';
                div.style.color = 'white';
                div.style.top = 0;
                div.style.left = 0;
                div.style.zIndex = 9999;
                div.innerHTML = '<div style="text-align: center"><h1>STEEMED PHISH WARNING</h1>' +
                    '<p>This site is known to be stealing username and password from Steemit users.</p>' +
                    '<p>Click on the back button on your browser or close this browser tab or window to return to safety</p>' +
                    '<p><a href="javascript:void(null)" onclick="document.getElementById(\'steemedphishwarning\').style.display=\'none\';"' +
                    'style="color: yellow">Dismiss this message</a></p></div>';
                document.body.appendChild(div);
            },

            isBlackListed: function(url) {
                for(var i=0; i<contentObject.blacklist.length; i++) {
                    var blDomain = contentObject.blacklist[i];
                    if (url.indexOf(blDomain) !== -1) {
                        return true;
                    }
                }

                return false;
            },
        }

        contentObject.init();
    },

    log: function() {
        var prefix = 'Steemed Phish:';
        if (typeof arguments.unshift === 'undefined') {
            arguments[0] = prefix + ' ' + arguments[0];
        } else {
            arguments.unshift(prefix);
        }
        console.log.apply(null, arguments);
    }
}

contentScript.init();