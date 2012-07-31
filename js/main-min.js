/*!
             * Detects a users browser agent in which we can use to detect what type
             * of device they are currently using. E.g. iPad
             *
             * @function detectDevice
             * @return string "user agent"
             */

/*!
             * Determines if the user visiting the site is using an iDevice in which
             * are the iPad, iPhone and iPod
             *
             * @function isAnIdevice
             * @return boolean
             */

/*!
             * Detects the browser for the user currently visiting the website
             *
             * @function detectBrowser
             * @return string browser
             */

/*!
             * Detects if the current user is viewing the website within a webkit based
             * browser such as Google Chrome or Safari
             *
             * @function detectWebKit
             * @return boolean
             */

/*!
             * Counts the number of properties that exist within the current
             * object specified
             *
             * @function objectLength
             * @param object obj
             * @return int count
             */

/*!
             * Allows a custom set of keys to be input so their default actions can
             * be prevented when triggered
             *
             * @function preventDefaultKeyScroll
             * @param object event
             * @param array prevent
             * @param boolean keyup
             */

/*!
 *    # Config File
 *	

 */

/*!
 *    ## Sample Require.js Application
 *	
 */

/*!
		 *
		 * @function init
		 */

(function(){function e(e){var t=e.currentTarget||e.srcElement,n;if(e.type==="load"||s.test(t.readyState)){e=t.getAttribute("data-requiremodule"),u[e]=!0;for(e=0;n=o[e];e++){if(!u[n.name])break;n.req([n.name],n.onLoad)}e>0&&o.splice(0,e),setTimeout(function(){t.parentNode.removeChild(t)},15)}}function t(e){var t,n;e.setAttribute("data-orderloaded","loaded");for(e=0;n=f[e];e++){if(!(t=a[n])||t.getAttribute("data-orderloaded")!=="loaded")break;delete a[n],require.addScriptToDom(t)}e>0&&f.splice(0,e)}var n=typeof document!="undefined"&&typeof window!="undefined"&&document.createElement("script"),r=n&&(n.async||window.opera&&Object.prototype.toString.call(window.opera)==="[object Opera]"||"MozAppearance"in document.documentElement.style),i=n&&n.readyState==="uninitialized",s=/^(complete|loaded)$/,o=[],u={},a={},f=[],n=null;define("order",{version:"1.0.5",load:function(n,s,u,l){var c;s.nameToUrl?(c=s.nameToUrl(n,null),require.s.skipAsync[c]=!0,r||l.isBuild?s([n],u):i?(l=require.s.contexts._,!l.urlFetched[c]&&!l.loaded[n]&&(l.urlFetched[c]=!0,require.resourcesReady(!1),l.scriptCount+=1,c=require.attach(c,l,n,null,null,t),a[n]=c,f.push(n)),s([n],u)):s.specified(n)?s([n],u):(o.push({name:n,req:s,onLoad:u}),require.attach(c,null,n,e,"script/cache"))):s([n],u)}})})(),define("ajax-content-loader",["require","exports"],function(e,t){t.ajaxLoader=function(e){function t(){for(var e=0;e<h.length;e++)h[e].removeEvent&&h[e].removeEvent("onload")}function n(e){var t=c[e];t!=undefined&&$.ajax({url:t.url,cache:t.cache,dataType:t.dataType||"text",success:function(e){$("#scrollWrap").append(e),r(t.images)}})}function r(e){a=e;var t=new Array;for(i=0;i<a.length;i++)t[i]=s(a[i])}function s(e){var t=new Image;return t.addEventListener?t.addEventListener("load",o,!1):t.attachEvent&&t.attachEvent("onload",o),t.src=e,h.push(t),t}function o(){f++,f==a.length&&(f=0,l<c.length&&(c[l].success&&c[l].success(),l++,n(l),t()))}function u(e){c=e.contentToLoad,n(l)}var a,f=new Number(0),l=new Number(0),c,h=[],p={initWithSettings:u};return p.initWithSettings(e),p}}),define("helper-functions",["require","exports"],function(e,t){t.helpers=function(){var e={detectDevice:function(){return navigator.userAgent.toLowerCase()},isAnIdevice:function(){return this.detectDevice().match(/ip(hone|ad|od)/)},detectBrowser:function(){var e=this.detectDevice();if(e.match(/chrome/))return"chrome";if(e.match(/safari/))return"safari";if(e.match(/msie 7.0/))return"msie 7.0";if(e.match(/msie 9.0/))return"msie 9.0";if(e.match(/msie/))return"msie"},detectWebKit:function(){return this.detectDevice().match(/webkit/)?!0:!1},objectLength:function(e){var t=0;for(var n in e)t++;return t},keys:[],preventDefaultKeyScroll:function(e,t,n){this.keys[e.which]=t?!1:!0,t||$.inArray(e.which,n)!==-1&&e.preventDefault()}};return e}}),define("youtube-helper",["require","exports"],function(e,t){t.YouTubeHelper=function(e){function v(e){var t=e;this.getValue=function(){return t},this.setValue=function(e){t=e}}function m(e){}function g(e){h||e.target.playVideo(),v.setValue(e.target)}function b(t){if(t!=undefined){if(t.data==YT.PlayerState.PLAYING){for(timer in f)clearInterval(timer);f=[],f=new Array,a&&!p&&($.each(u,function(e,n){var i=setInterval(function(){C(t,n.start,n.end,n.target)},10);f.push(i),$(n.target).clone("withDataAndEvents").appendTo($(r))}),p=!0)}if(t.data==YT.PlayerState.ENDED){T(),e.onVideoEnded&&e.onVideoEnded(c);for(timer in f)clearInterval(timer)}if(t.data==YT.PlayerState.PAUSED)for(timer in f)clearInterval(timer)}}function w(e){N(),r=$(e.targetContainer),$(r).html(""),c=$(e.currentVideoSelector);var t={autoplay:1,controls:1,wmode:"opaque",rel:0,autohide:1,modestbranding:1,showinfo:0,enablejsapi:1,iv_load_policy:3,origin:"http://www.defencejobs.staging.yrgroup.com.au/"};$(r).append('<div id="'+o+'"></div>'),d=new YT.Player(o,{height:r.height(),width:r.width(),videoId:e.videoId,playerVars:t,events:{onReady:g,onStateChange:b}})}function E(){v.getValue().startVideo()}function S(){v.getValue().pauseVideo()}function x(){v.getValue().stopVideo()}function T(){for(timer in f)clearInterval(timer);f=[];var e=$("#"+String(o));e.attr("src",""),setTimeout(function(){$(r).html("")},100),$(r).css("display","none")}function N(){for(timer in f)clearInterval(timer);f=[],u=new Array,f=new Array,p=!1}function C(e,t,n,r){d&&t>=5&&(Math.floor(d.getCurrentTime())==t&&k(r),Math.floor(d.getCurrentTime())==n&&L(r))}function k(e){$("#"+String($(r).attr("id"))+" #"+String($(e).attr("id"))).css("display","block")}function L(e){$("#"+String($(r).attr("id"))+" #"+String($(e).attr("id"))).css("display","none")}function A(){}function O(){var e=document.createElement("script");e.type="text/javascript",e.src="http://www.youtube.com/player_api",document.body.appendChild(e)}function M(e){o=e.videoFrameID,a=e.enablePopups,h=e.isIOS,O()}var t,n="",r,i,s,o="videoFrame",u,a,f=new Array,l="",c,h,p=!1,d,v=new v,y=!1,_={initWithSettings:M,playVideoNow:w,onPlayerStateChange:b,onPlayerReady:g,onYouTubePlayerAPIReady:m,RemoveCurrentVideo:T};return _.initWithSettings(e),_}});var PagesConfig={};define("config-pages",function(){}),require({paths:{"ajax-content-loader":"modules/ajax-content-loader","helper-functions":"modules/helper-functions","youtube-helper":"modules/youtube-helper",order:"libs/order","config-pages":"pages"},urlArgs:"v=testing-dev"},["order!ajax-content-loader","order!helper-functions","order!youtube-helper","order!config-pages"],function(){var e={init:function(){this.win=$(window),this.doc=$(document)}}}),define("main",function(){})