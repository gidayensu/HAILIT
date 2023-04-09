
function login() {
	// var email = document.getElementById("email").value;
	// var password = document.getElementById("password").value; 
	const email = "w8i@gmail.com";
	const password = "verify"
	const userData = {
		email: email,
		password: password
	}
    fetch(`http://localhost:5000/api/v1/customer/verify`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(userData)
	}
	)
        .then(response => response.json())
        .then(data => {
            if(data.customer_id) {
				console.log('Password and email correct')
				fetch(`http://localhost:5000/api/v1/customer/${customer_id}`)
				.then(response => response.json())
				.then(data=> {
					console.log(data)
				})
				
            } else {
				console.log('redirect')
				//window.location.href = 'index.html';
			}
        })
		
}
login()
function logout() {
	console.log('redirect')
	//window.location.href = "login.html";
}
