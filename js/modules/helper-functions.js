define(['require', 'exports'], function(require, exports) {
    
    exports.helpers = function() {

        var helperEngine = {
            /*!
             * Detects a users browser agent in which we can use to detect what type
             * of device they are currently using. E.g. iPad
             *
             * @function detectDevice
             * @return string "user agent"
             */
            detectDevice : function() {
                return navigator.userAgent.toLowerCase();
            },


            /*!
             * Determines if the user visiting the site is using an iDevice in which
             * are the iPad, iPhone and iPod
             *
             * @function isAnIdevice
             * @return boolean
             */
            isAnIdevice : function() {
                return this.detectDevice().match(/ip(hone|ad|od)/);
            },


            /*!
             * Detects the browser for the user currently visiting the website
             *
             * @function detectBrowser
             * @return string browser
             */
            detectBrowser : function() {
                var deviceAgent = this.detectDevice();

                if (deviceAgent.match(/chrome/)) {
                    return 'chrome';
                } else if (deviceAgent.match(/safari/)) {
                    return 'safari';
                } else if (deviceAgent.match(/msie 7.0/)) {
                    return 'msie 7.0';
                } else if (deviceAgent.match(/msie 9.0/)) {
                    return 'msie 9.0';
                } else if (deviceAgent.match(/msie/)) {
                    return 'msie';
                }
            },


            /*!
             * Detects if the current user is viewing the website within a webkit based
             * browser such as Google Chrome or Safari
             *
             * @function detectWebKit
             * @return boolean
             */
            detectWebKit : function() {
                return (this.detectDevice().match(/webkit/)) ? true : false;
            },


            /*!
             * Counts the number of properties that exist within the current
             * object specified
             *
             * @function objectLength
             * @param object obj
             * @return int count
             */
            objectLength : function(obj) {
                var count = 0;

                for (var i in obj) {
                    count++;
                }

                return count;
            },


            /*!
             * Allows a custom set of keys to be input so their default actions can
             * be prevented when triggered
             *
             * @function preventDefaultKeyScroll
             * @param object event
             * @param array prevent
             * @param boolean keyup
             */
            keys : [],

            preventDefaultKeyScroll : function(event, keyup, prevent) {
                this.keys[event.which] = (keyup) ? false : true;

                if (!keyup) {
                    if ($.inArray(event.which, prevent) !== -1) {
                        event.preventDefault();
                    }
                }
            }
        };

        return helperEngine;

    };

});