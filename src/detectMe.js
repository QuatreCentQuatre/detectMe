/*
 * detectMe
 * Library to give you navigator and a lot of info about your browser
 * */
(function($, window, document, undefined){
	var DetectMe = function(){
		this.__construct();
	};

	var defaults = {
		debug: false,
		simulate: false,
		test: false,
		info_recipient: 'samuel@quatrecentquatre.com'
	};
	var versionSearch = null;

	var proto = DetectMe.prototype;

	proto.options = null;

	//--------Methods--------//
	proto.__construct = function() {
		this.options       = $.extend({}, defaults);
		this.userAgent     = navigator.userAgent;
		this.navigator     = navigator;
		this.data 	       = {};
		this.data.browser  = privateMethods.searchString.call(this, browserData);
		this.data.version  = privateMethods.searchVersion.call(this, this.userAgent, navigator.appVersion, versionSearch);
		this.data.os       = privateMethods.searchString.call(this, osData);
	};

	proto.setOpts = function(options) {
		this.options = $.extend({}, this.options, options);
	};

	proto.sendInfos = function(name, email){
		/* need info Nickname, Email */
		/* will fetch browser info in php and send it to mail info */
		//http://supportdetails.com/?sender_name=Jessica&sender=email@sender.com&recipient=email@recipient.com
		//http://www.formspree.com/

		/*
		 export_detail[name]	Jessica
		 export_detail[from_email]	email@sender.com
		 export_detail[to_email]	email@recipient.com
		 export_detail[javascript]	1
		 export_detail[cookies]	true
		 export_detail[browser_type]	Firefox
		 export_detail[browser_version]	27.0
		 export_detail[color_depth]	24
		 export_detail[screen_resolution]	1920 x 1200
		 export_detail[browser_size]	1920 x 1038
		 export_detail[flash_version]	12.0.-1
		 export_detail[full_flash_version]
		 */
		/*$.ajax({
		 method:'POST',
		 url: "http://supportdetails.com/?sender_name=Jessica&sender=email@sender.com&recipient=" + this.options.info_recipient,
		 success: $.proxy(function(){
		 console.log(arguments);
		 }, this),
		 error: $.proxy(function(){

		 }, this)
		 });*/
	};

	proto.isOldIE = function() {
		if (this.options.simulate) {
			return true;
		}

		if (this.data.browser == "Explorer" && this.data.version < 9){
			return true;
		}

		return false;
	};

	proto.isOldBrowser = function() {
		if (this.options.simulate) {
			return true;
		}

		return false;
	};

	/*var webkitOld = /(applewebkit\/[0-9.]*)+/i;
	 var webkitOldVersion = 534.30;
	 isOldBrowser = function(){
	 var isOld = false;
	 if(webkitOld.test(navigator.userAgent)){
	 var match = navigator.userAgent.match(webkitOld)[1];
	 var version = parseFloat(match.replace('AppleWebKit/', ''));
	 if(version <= webkitOldVersion)
	 isOld = true;
	 }
	 return isOld;
	 };*/

	proto.isNativeAndroid = function() {
		if (this.options.simulate) {
			return true;
		}

		return false;
	};

	var browserData = [
		{
			string: navigator.vendor,
			versionSearch: "Version",
			subString: "Apple",
			identity: "Safari"
		},
		{
			string: navigator.vendor,
			versionSearch: "Konqueror",
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.vendor,
			versionSearch: "iCab",
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.userAgent,
			versionSearch: "MSIE",
			subString: "MSIE",
			identity: "Explorer"
		},
		{ 	string: navigator.userAgent,
			versionSearch: "OmniWeb/",
			subString: "OmniWeb",
			identity: "OmniWeb"
		},
		{
			string: navigator.userAgent,
			versionSearch: "OPR",
			subString: "OPR",
			identity: "Opera"
		},
		{
			string: navigator.userAgent,
			versionSearch: "Firefox",
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.userAgent,
			versionSearch: "Chrome",
			subString: "Chrome",
			identity: "Chrome"
		}
	];

	var osData = [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
		},
		{
			string: navigator.userAgent,
			subString: "iPad",
			identity: "iPad"
		}
	];

	var privateMethods = {
		searchString: function(data) {
			var browser = null;
			for (var index in data)	{
				if (browser) {
					break;
				}

				if(data[index].string == undefined) {
					continue;
				}

				versionSearch = data[index].versionSearch || data[index].identity;
				if (data[index].string.indexOf(data[index].subString) != -1) {
					browser = data[index].identity;
				}
			}

			if(!browser) {
				browser = "Unknown";
			}

			return browser;
		},
		searchVersion: function(userAgent, appVersion, versionSearch) {
			var version = null;
			if (version == null && userAgent.indexOf(versionSearch) != -1) {
				version = parseFloat(userAgent.substring(userAgent.indexOf(versionSearch) + versionSearch.length + 1));
			}

			if (version == null && appVersion.indexOf(versionSearch) != -1) {
				version = parseFloat(appVersion.substring(appVersion.indexOf(versionSearch) + versionSearch.length + 1));
			}

			if (version == null) {
				version = 0;
			}

			return version;
		}
	};

	if(!window.Me) {
		window.Me = {};
	}
	Me.detect = new DetectMe();
}(jQuery, window, document));