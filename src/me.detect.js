/**
 * detectMe from the MeLibs
 * Library that let you easily check for browsers verification
 *
 * Version :
 *  - 1.0.1
 *
 * Dependencies :
 *  - Jquery
 *
 * Private Methods :
 *  - searchString
 *  - searchVersion
 *
 * Public Methods :
 *  - setOptions
 *  - getOptions
 *  - isOldIE
 *  - isOldSafari
 *  - isOldBrowser
 *  - isIpad
 *  - isNativeAndroid
 *  - toString
 */

(function($, window, document, undefined) {
	"use strict";
	/* Private Variables */
	var instanceID   = 1;
	var instanceName = "DetectMe";
	var defaults     = {
		debug: false,
		simulate: false,
		test: false,
		info_recipient: 'samuel@quatrecentquatre.com'
	};
	var overwriteKeys = [
		'debug',
		'$messages',
		'$btn',
		'form_scope',
		'fields',
		'disabled',
		'accepted_empty',
		'onValidationError',
		'onValidationSuccess',
		'handleValidationErrorField',
		'handleValidationSuccessField',
		'onAllSuccess',
		'onAllError',
		'onSuccess',
		'onError'
	];
	var versionSearch = null;

	/* Browser Data */
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

	/* Private Methods */
	var privatesMethods = {};
	/**
	 *
	 * searchString
	 * will reformat all the form data to a final object.
	 *
	 * @param   data     all data that need to be reformated (obj)
	 * @return  object   reformated data
	 * @access  private
	 *
	 */
	privatesMethods.searchString = function(data) {
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

		if(!browser) {browser = "Unknown";}
		return browser;
	};

	/**
	 *
	 * searchVersion
	 * will reformat all the form data to a final object.
	 *
	 * @param   data     all data that need to be reformated (obj)
	 * @return  object   reformated data
	 * @access  private
	 *
	 */
	privatesMethods.searchVersion = function(userAgent, appVersion, versionSearch) {
		var version = null;
		if (version == null && userAgent.indexOf(versionSearch) != -1) {
			version = parseFloat(userAgent.substring(userAgent.indexOf(versionSearch) + versionSearch.length + 1));
		}

		if (version == null && appVersion.indexOf(versionSearch) != -1) {
			version = parseFloat(appVersion.substring(appVersion.indexOf(versionSearch) + versionSearch.length + 1));
		}

		if (!version) {version = -1;}
		return version;
	};

	/* Builder Method */
	var DetectMe = function(options) {
		this.__construct(options);
	};
	var proto = DetectMe.prototype;

	proto.debug          = null;
	proto.id             = null;
	proto.name           = null;
	proto.dname          = null;
	proto.options        = null;

	/**
	 *
	 * __construct
	 * the first method that will be executed.
	 *
	 * @param   options  all the options that you need
	 * @return  object    null || scope
	 * @access  private
	 */
	proto.__construct = function(options) {
		this.id    = instanceID;
		this.name  = instanceName;
		this.dname = this.name + ":: ";
		this.setOptions(options);

		if (!this.__validateDependencies()) {return null;}
		if (!this.__validateOptions()) {return null;}
		instanceID ++;

		this.__initialize();
		return this;
	};

	/**
	 *
	 * __validateDependencies
	 * Will check if you got all the dependencies needed to use that plugins
	 *
	 * @return  boolean
	 * @access  private
	 *
	 */
	proto.__validateDependencies = function() {
		var isValid = true;
		if (!window.jQuery) {
			isValid = false;
			console.warn(this.dname + "You need jquery");
		}
		return isValid;
	};

	/**
	 *
	 * __validateOptions
	 * Will check if you got all the required options needed to use that plugins
	 *
	 * @return  boolean
	 * @access  private
	 *
	 */
	proto.__validateOptions = function() {
		var isValid = true;
		return isValid;
	};

	/**
	 *
	 * setOptions
	 * will merge options to the plugin defaultKeys and the rest will be set as additionnal options
	 *
	 * @param   options
	 * @return  object scope
	 * @access  public
	 *
	 */
	proto.setOptions = function(options) {
		var $scope = this;
		var settings = $.extend({}, defaults, options);
		$.each(settings, function(index, value) {
			if ($.inArray(index, overwriteKeys) != -1) {
				$scope[index] = value;
				delete settings[index];
			}
		});
		this.options = settings;
		return this;
	};

	/**
	 *
	 * getOptions
	 * return the additional options that left
	 *
	 * @return  object options
	 * @access  public
	 *
	 */
	proto.getOptions = function() {
		return this.options;
	};

	proto.__initialize = function() {
		this.userAgent     = navigator.userAgent;
		this.navigator     = navigator;
		this.data 	       = {};
		this.data.browser  = privatesMethods.searchString.call(this, browserData);
		this.data.version  = privatesMethods.searchVersion.call(this, this.userAgent, navigator.appVersion, versionSearch);
		this.data.os       = privatesMethods.searchString.call(this, osData);
	};

	proto.isOldIE = function() {
		if (this.options.simulate) {return true;}

		return (this.data.browser == "Explorer" && this.data.version < 9);
	};

	proto.isOldSafari = function() {
		if (this.options.simulate) {return true;}

		return (this.data.browser == "Safari" && this.data.version < 6);
	};

	proto.isOldBrowser = function() {
		if (this.options.simulate) {return true;}

		if (this.isOldIE()) {return true}
		if (this.isOldSafari()) {return true}

		return false;
	};

	proto.isIpad = function() {
		if (this.options.simulate) {return true;}

		if (this.data.os == "iPad"){return true;}
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
		if(this.options.simulate){return true;}

		return false;
	};


	//proto.sendBrowserInfoRemote = function(name, email) {
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
	//};

	proto.toString = function(){
		return "[" + this.name + "]";
	};

	/* Create Me reference if does'nt exist */
	if(!window.Me){window.Me = {};}
	/* Initiate to make a Singleton */
	Me.detect = new DetectMe();
}(jQuery, window, document));