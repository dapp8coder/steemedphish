var background = {
    alertMessage: 'Steemed Phish Alert\n\nOne of your browser tabs has landed on a Steemit SCAM website: ',

    whitelist: [
        "https://steemit.com/",
        "https://busy.org/",
        "https://beta.chainbb.com/",
        "https://steemitstage.com/",
        "https://mspsteem.com/",
        "https://utopian.io/",
        "https://d.tube/",
        "https://dsound.audio/",
        "https://steemconnect.com/",
        "https://steemit.chat/",
        "https://steem.chat/",
        "https://steemtools.com/",
        "https://thesteemitshop.com/",
        "https://developers.steem.io/",
        "https://steem.io/",
        "https://smt.steem.io/",
        "https://steemkr.com/",
        "https://yehey.org/",
        "https://steemitstage.com/",
        "https://steemd.com/",
        "https://steemdb.com/"
    ],

    blacklist: [
        "steewit.com",
        "steemil.com"
    ],

    alertDisplayed: false,

    init: function() {
        chrome.tabs.onActivated.addListener(function(info){
            chrome.tabs.get(info.tabId, function(change){
                background.updateIconColorByUrl(change.url, info.tabId);
            });
        });

        chrome.tabs.onUpdated.addListener(function (tabId, change, tab){
            if(tab.url == undefined){
                return;
            }

            background.updateIconColorByUrl(tab.url, tabId);
        });
    },

    updateIconColorByUrl: function(url, tabId)
    {
        var isWhitelisted = background.isWhitelisted(url);
        if(isWhitelisted){
            chrome.browserAction.setIcon({path: '../images/icon.png', tabId: tabId});
        } else {
            var isBlacklisted = background.isBlackListed(url);
            if (isBlacklisted) {
                chrome.browserAction.setIcon({path: '../images/icon-red.png', tabId: tabId});

                if (background.alertDisplayed === false) {
                    background.alertDisplayed = true;
                    alert(background.alertMessage + url);

                    setTimeout(function() {
                        background.alertDisplayed = false;
                    }, 15000);
                }
            } else {
                chrome.browserAction.setIcon({path: '../images/icon-grey.png', tabId: tabId});
            }
        }
    },

    isWhitelisted: function(url) {
        for(var i=0; i<background.whitelist.length; i++) {
            var wlDomain = background.whitelist[i];
            if (url.indexOf(wlDomain) === 0) {
                return true;
            }
        }

        return false;
    },

    isBlackListed: function(url) {
        for(var i=0; i<background.blacklist.length; i++) {
            var blDomain = background.blacklist[i];
            if (url.indexOf(blDomain) !== -1) {
                return true;
            }
        }

        return false;
    }
};

background.init();