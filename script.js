// DOM Declarations
const logInBotron = document.querySelector('#logInBotron');
const signUpBotron = document.querySelector('#signUpBotron');
const container = document.querySelector('.container');
const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');
const fName = document.querySelector('#fName');
const lName = document.querySelector('#lName');
const username = document.querySelector('#username');
const username2 = document.querySelector('#username2');
const gender = document.querySelector('#gender');
const nationality = document.querySelector('#nationality');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const signUP = document.querySelector('#signUP');

// Account Class: Represents a profile
class Account{
	constructor(fName, lName, username2, gender, nationality, password2){
		this.fName = fName.value;
		this.lName = lName.value;
		this.username2 = username2.value;
		this.gender = gender.value;
		this.nationality = nationality.value;
		this.password2 = password2.value;
	}
}

// UI Class: Handle UI Tasks
class UI{
	static showAlert(message, className){
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		signUpBotron.insertBefore(div, form2);
		// Vanish in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 2000);
	}

	static showAlert2(message, className){
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		logInBotron.insertBefore(div, form1);
		// Vanish in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 1000);
	}

	static clearFields(){
		fName.value = '';
		lName.value = '';
		username2.value = '';
		gender.value = '';
		nationality.value = '';
		password2.value = '';
	}

	static clearFields2(){
		username.value = '';
		password.value = '';
	}
}

// Store Class: Handles storage
class Store{
	static getAccounts(){
		let accounts;
		if(localStorage.getItem('accounts') === null){
			accounts = [];
		}
		else{
			accounts = JSON.parse(localStorage.getItem('accounts'));
		}
		return accounts;
	}
	
	static addAccount(account){
		const accounts = Store.getAccounts();
		accounts.push(account);
		localStorage.setItem('accounts', JSON.stringify(accounts));
	}
}
try{
	form2.addEventListener('submit',
	(e) => {
		// Prevent actual submit
		e.preventDefault();

		// Validate
		if(fName.value === '' || lName.value === '' || username2.value === '' || gender.value === '' || nationality.value === '' || password2.value === ''){
			UI.showAlert('Please fill in all fields', 'warning');
		}
		else{
			// Instantiate account
			const account = new Account(fName, lName, username2, gender, nationality, password2);

			// Add account to store
			Store.addAccount(account);

			// Show success message
			UI.showAlert('Account Created!', 'success');

			// Clear fields
			UI.clearFields();

			// Switch Jumbotron
			setTimeout(disappear, 2000);
		}
	});
}
catch(err){
	console.log(err);
}



// Hide Form 2 
try{
	signUpBotron.style.display = 'none';
}
catch(err){
	console.log(err);
}


// Show Form 2
try{
	signUP.onclick = function(){
	logInBotron.style.display = 'none';
	signUpBotron.style.display = 'block';
	}
}
catch(err){
	console.log(err);
}	


// Function: Disappear
function disappear(){
	logInBotron.style.display = 'block';
	signUpBotron.style.display = 'none';
}

// Function: Disappear2
function disappear2(){
	window.location.href = 'home.html';
}

// Function: Log In
try{
	form1.addEventListener('submit', 
	(e) => {
		// Prevent actual submit
		e.preventDefault();

		// Get Accounts
		const accounts = Store.getAccounts();

		// Validate
		for(let i = 0; i < accounts.length; i++){
			let user = accounts[i].username2;
			let pass = accounts[i].password2;

			if(username.value === user && password.value === pass){
				UI.showAlert2('Successfully Logged In', 'success');
				UI.clearFields2();
				localStorage.setItem('name', user);
				// Redirect to home page
				setTimeout(disappear2, 950);
				return
			}
		}

		// Try again alert
		UI.showAlert2('Please try again', 'danger');
		UI.clearFields2();
	});
}
catch(err){
	console.log(err);
}


// Get username value
let mainHeading = document.querySelector('#mainHeading');

// Validate and transfer username value
try{
	mainHeading.textContent += localStorage.getItem('name') +'!';
}
catch(err){
	console.log(err);
}

// Button: Log out
let outBtn = document.querySelector('#outBtn');
try{
	outBtn.onclick = function(){
	window.location.href = 'index.html';
	}
}
catch(err){
	console.log(err);
}
