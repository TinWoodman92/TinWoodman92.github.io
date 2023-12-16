console.log('Hello from app.js!');

const setStyleVariable = function(styleVariable, styleValue) {
	document.documentElement.style.setProperty(styleVariable, styleValue);
};

const toggleTheme = function() {
	document.documentElement.style.setProperty(this.id, Number(this.checked));
	localStorage.setItem(this.id, Number(this.checked));
};

const initInput = function(styleVariable=null) {
	let initValue = localStorage.getItem(styleVariable);
	if (initValue) {
		initValue = Number(initValue);
		document.documentElement.style.setProperty(styleVariable, initValue);
	} else {
		initValue = getComputedStyle(document.body).getPropertyValue(styleVariable);
	};

	const inputObject = document.getElementById(styleVariable);
	if (inputObject) {
		if (inputObject.type == 'checkbox') {
			inputObject.addEventListener('change', toggleTheme);
			inputObject.checked = initValue
		};
	};
};

initInput('--dark-theme-check');
