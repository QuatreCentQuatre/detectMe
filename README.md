#DetectMe

Small library that gives you info about your users browser, and navigator.
Can also be used to create function based on the user browser.

---

### Version

**1.0.4**

---

### Dependencies

- **jQuery 1.9.1 ++** (https://jquery.com/download/)

---

### Getting Started

Place the **me.detect.js** file in your default JavaScript vendor directory. Link the script before the end of your **body** and after **jquery.js**.

```
<script src="js/vendor/jquery-1.9.1.min.js"></script>
<script src="js/vendor/detectMe.js"></script>
```
Here you go ! You're now ready to use detectMe. Here most commons method used.

```
//Log your Current Browser (Exemple: Firefox)
console.log("Current Browser :: " + Me.detect.data.browser);

//Log your Current Version of that Browser (Exemple: 32)
console.log("Current Version :: " + Me.detect.data.version);

//Log your Current OS (Exemple: Windows)
console.log("Current OS :: " + Me.detect.data.os);

//Return true if browser is IE8 and older
if(Me.detect.isOldIE()) {
    console.log("Hello! I'm a old Internet Explorer.");
}

```

---

### Create New Exceptions

You've got a new client and he using an old version of a certain browser? Well there no problems ! You can create your own exceptions. Like **isOldIE()**.

Exemple: Create an exception for Safari 5 and older.
```
proto.isOldSafari = function() {
	if (this.options.simulate) {
		return true;
	}

	if (this.data.browser == "Safari" && this.data.version < 6){
        return true;
    }

	return false;
};

```