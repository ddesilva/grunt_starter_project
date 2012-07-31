define(["require", "exports"], function (require, exports) {

    exports.YouTubeHelper = function (settings) {

        // MEMBERS & DEFAULTS ################################################################################################################################################# 
        var documentRef;
        var originURL = ""; // for cross site checks
        var targetContainer;
        var target;
        var parentContainer; // used for adding popups back into the original spot
        var videoFrameID = "videoFrame";
        var popupTimings;
        var enablePopups;
        var timerArray = new Array();
        var targetContainerPlayer = "";
        var currentVideoSelector;
        var isIOS;
        var popupsAdded = false;
        var player;

        function currplayer(val) { // hold player instances
            var value = val;

            this.getValue = function () {
                return value;
            };

            this.setValue = function (val) {
                value = val;
            };
        }
        var currplayer = new currplayer();

        // YOUTUBE API CALLBACK FUNCTIONS #################################################################################################################################################

        // Called by the api once it's loaded and ready.
        function onYouTubePlayerAPIReady(event) {
            // nothing to handle here
        }

        // The API will call this function when the video player is ready.
        function onPlayerReady(events) {

            // if not ios then autoplay
            if (!isIOS) {
                events.target.playVideo();
            }

            currplayer.setValue(events.target);
        }

        // The API calls this function when the player's state changes. The function indicates that when playing a video (state=1),
        // the player should play for six seconds and then stop.
        var done = false;
        function onPlayerStateChange(event) {

            if (event != undefined) {

                if (event.data == YT.PlayerState.PLAYING) {
                    // remove any popups timers
                    for (timer in timerArray) {
                        clearInterval(timer);
                    }

                    timerArray = [];
                    timerArray = new Array();

                    if (enablePopups && !popupsAdded) {

                        // go through popup timing json and create popups for each.
                        $.each(popupTimings, function (k, data) { // each - k is the index

                            var myTimer = setInterval(function () {
                                CheckTime(event, data.start, data.end, data.target);
                            }, 10);

                            timerArray.push(myTimer);
                            $(data.target).clone("withDataAndEvents").appendTo($(targetContainer));
                        });
                        popupsAdded = true;
                    }
                }

                if (event.data == YT.PlayerState.ENDED) {
                    RemoveCurrentVideo();

                    settings.onVideoEnded && settings.onVideoEnded(currentVideoSelector); // Invoke callback function if set

                    // remove any popups timers
                    for (timer in timerArray) {
                        clearInterval(timer);
                    }
                }

                if (event.data == YT.PlayerState.PAUSED) { //if any other state other than playing.

                    // remove any popups timers
                    for (timer in timerArray) {
                        clearInterval(timer);
                    }
                }

            }
            else {

            }
        }

        // PLAYER CONTROL #################################################################################################################################################

        function playVideoNow(settings) {

            reset();
            targetContainer = $(settings.targetContainer); // get reference to the container
            $(targetContainer).html(""); // clear anything inside the target container
            currentVideoSelector = $(settings.currentVideoSelector); // get reference to the video image

            var customVars = { 'autoplay': 1, 'controls': 1, 'wmode': "opaque", 'rel': 0, 'autohide': 1, 'modestbranding': 1, 'showinfo': 0, 'enablejsapi': 1, 'iv_load_policy': 3, 'origin': "http://www.defencejobs.staging.yrgroup.com.au/" };  // iv_load_policy is to disable annotations.

            $(targetContainer).append('<div id="' + videoFrameID + '"></div>'); // add an empty div to load the youtube player into

            player = new YT.Player(videoFrameID, {
                height: targetContainer.height(),
                width: targetContainer.width(),
                videoId: settings.videoId,
                playerVars: customVars,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function startVideo() {
            currplayer.getValue().startVideo();
        }
        function pauseVideo() {
            currplayer.getValue().pauseVideo();
        }
        function stopVideo() {
            currplayer.getValue().stopVideo();
        }

        function RemoveCurrentVideo() {
            // remove any popups timers
            for (timer in timerArray) {
                clearInterval(timer);
            }
            timerArray = [];

            // player.stopVideo();

            var $parent = $("#" + String(videoFrameID));
            $parent.attr('src', '');

            setTimeout(function() {
                $(targetContainer).html('');
            }, 100);

            $(targetContainer).css('display', 'none');
        }

        function reset() {

            // remove any popups timers
            for (timer in timerArray) {
                clearInterval(timer);
            }
            timerArray = [];
            popupTimings = new Array();
            timerArray = new Array();
            popupsAdded = false;

        }

        // POPUPS #################################################################################################################################################

        function CheckTime(event, startTime, endTime, popupRef) {

            if (player) {
                if (startTime >= 5) {
                    if (Math.floor(player.getCurrentTime()) == startTime) {
                        shopPopup(popupRef);
                    }
                    if (Math.floor(player.getCurrentTime()) == endTime) {
                        hidePopup(popupRef);
                    }
                }
            }

        }

        function shopPopup(popupRef) {
            $("#" + String($(targetContainer).attr("id")) + " #" + String($(popupRef).attr("id"))).css("display", "block"); // show the popup
        }

        function hidePopup(popupRef) {
            $("#" + String($(targetContainer).attr("id")) + " #" + String($(popupRef).attr("id"))).css("display", "none"); // hide the popup
        }

        function clearPopups() {

        }

        function injectYouTubeAPI() {
            // inject the youtube code
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://www.youtube.com/player_api";    // use this for linked script
            document.body.appendChild(script);
        }

        function initWithSettings(settings) {

            videoFrameID = settings.videoFrameID;
            enablePopups = settings.enablePopups;
            isIOS = settings.isIOS;
            injectYouTubeAPI();
        }

        var YouTubeHelperEngine = {
            initWithSettings: initWithSettings,
            playVideoNow: playVideoNow,
            onPlayerStateChange: onPlayerStateChange,
            onPlayerReady: onPlayerReady,
            onYouTubePlayerAPIReady: onYouTubePlayerAPIReady,
            RemoveCurrentVideo: RemoveCurrentVideo
        }
        YouTubeHelperEngine.initWithSettings(settings);
        return YouTubeHelperEngine;


    }
});
