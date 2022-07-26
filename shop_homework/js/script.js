const PRODUCTS = [
	{
		id: 1,
		title: "Aircraft Carrier",
		img: "aircraft-carrier",
		price: 30000,
		sale: true,
		salePercent: 2,
		categories: ['Boat']
	},
	{
		id: 2,
		title: "Boat",
		img: "boat",
		price: 700,
		sale: false,
		categories: ['Boat']
	},
	{
		id: 3,
		title: "Bus",
		img: "bus",
		price: 300,
		sale: true,
		salePercent: 10,
		categories: ['Bus']
	},
	{
		id: 4,
		title: "Cabriolet",
		img: "cabriolet",
		price: 900,
		sale: true,
		salePercent: 25,
		categories: ['Car']
	},
	{
		id: 5,
		title: "Commercial Plane",
		img: "commercial-plane",
		price: 1000,
		sale: false,
		categories: ['Aircraft']
	},
	{
		id: 6,
		title: "Electric car",
		img: "electric-car",
		price: 3000,
		sale: false,
		categories: ['Car']
	},
	{
		id: 7,
		title: "Helicopter police",
		img: "helicopter-police",
		price: 1000,
		sale: true,
		salePercent: 15,
		categories: ['Aircraft', 'Helicopter']
	},
	{
		id: 8,
		title: "Helicopter",
		img: "helicopter",
		price: 900,
		sale: true,
		salePercent: 35,
		categories: ['Aircraft', 'Helicopter']
	},
	{
		id: 9,
		title: "Minibus",
		img: "minibus",
		price: 700,
		sale: true,
		salePercent: 5,
		categories: ['Car', 'Bus']
	},
	{
		id: 10,
		title: "Motorbike",
		img: "motorbike",
		price: 200,
		sale: true,
		salePercent: 25,
		categories: ['Bike']
	},
	{
		id: 11,
		title: "Off Road",
		img: "off-road",
		price: 600,
		sale: false,
		categories: ['Car']
	},
	{
		id: 12,
		title: "Police Car",
		img: "police-car",
		price: 100,
		sale: false,
		categories: ['Car']
	},
	{
		id: 13,
		title: "School Bus",
		img: "school-bus",
		price: 150,
		sale: true,
		salePercent: 8,
		categories: ['Bus']
	},
	{
		id: 14,
		title: "Scooter",
		img: "scooter",
		price: 80,
		sale: true,
		salePercent: 13,
		categories: ['Bike']
	},
	{
		id: 15,
		title: "Small Plane",
		img: "small-plane",
		price: 3000,
		sale: false,
		categories: ['Aircraft']
	},
	{
		id: 16,
		title: "Speed Boat",
		img: "speed-boat",
		price: 2000,
		sale: true,
		salePercent: 34,
		categories: ['Boat']
	},
	{
		id: 17,
		title: "Sport Car",
		img: "sport-car",
		price: 10000,
		sale: true,
		salePercent: 3,
		categories: ['Car']
	},
	{
		id: 18,
		title: "Suv",
		img: "Suv",
		price: 300,
		sale: true,
		salePercent: 13,
		categories: ['Car', 'Bus']
	}
];

const USERS = [
	{
		name: 'Ivan',
		email: 'ivan@gmail.com',
		password: '123',
		favourites: [9, 18, 7],
		
	}
	
];

 const storageUsers = () => {
	 let storage = localStorage.getItem(`users`);
	 if(!storage){
		localStorage.setItem(`users`, JSON.stringify(USERS));
	 }
 }
 storageUsers();

const bodyIdHome = document.querySelector(`#home`);

const renderMain = () =>{
	let main = document.createElement(`main`);
	document.querySelector(`body`).append(main);
	
	let categoriesContainer = document.createElement(`div`);
	categoriesContainer.className = `container`;
	categoriesContainer.id = `categoriesContainer`;
	document.querySelector(`main`).append(categoriesContainer);
}

bodyIdHome && renderMain();

const categoriesContainer = document.querySelector(`#categoriesContainer`);
 
const renderCategories = () => {
	let categories = [];
	PRODUCTS.forEach(product => {
        product.categories.forEach(cat => categories.lastIndexOf(cat) === -1 && categories.push(cat))
	})
	categories.forEach(cat =>{
		let section = document.createElement(`section`);
		section.className = `category`;
		section.dataset.name = cat;
		section.innerHTML = `<h2>${cat}</h2>
		<div class="category__container"><div>`;
		
		categoriesContainer.append(section);

		
	})
	return true;
}

const renderheader = () =>{
	let header = document.createElement(`header`);
	header.className = `header`;
	header.innerHTML = `
	<div class="container">
			<div class="header__container">
				<a href="index.html">
					<img src="images/logo.png" alt="logo" height="45">
				</a>
				<div class="header__info">
					Hi, <a href="login.html" class="header__user" id="headerUser">Log in</a>
					<div class="header__shop">
						<a href="login.html" id="headerFavourites">
							<img src="images/favourite.png" alt="favourite" height="20">
							<span class="header__shop--count" id="headerFavouritesCount">0</span>
						</a>
					</div>
					<button class="header__logout" id="headerLogout">Log out</button>
				</div>
			</div>
		</div>`;
		document.querySelector(`body`).prepend(header);
}
renderheader();

const getDiscount = (product =>{
	return product.price - product.price / 100 * product.salePercent 
});

const renderProducts = () => {
	

	PRODUCTS.forEach(product => {
		
		product.categories.forEach(cat => {
			let catSection = document.querySelector(`section[data-name="${cat}"] .category__container`);
			let productBlock = document.createElement(`div`);
			let user = getUser();
			productBlock.className = (`product`);
			productBlock.innerHTML = `
			<button class="product__favourite " data-id="${product.id}">
			${user && user.favourites.includes(product.id) ?  `<img src="images/product__favourite--true.png" alt="favourite" height="20">` :
			`<img src="images/product__favourite.png" alt="favourite" height="20">`}	
			</button>
			<img src="images/products/${product.img}.png" class="product__img" alt="${product.title}" height="80">
			<p class="product__title">${product.title}</p>
			${product.salePercent ? `
			<div class="product__sale">
			<span class="product__sale--old">$${product.price}</span>
			<span class="product__sale--percent">-${product.salePercent}%</span>
			</div>
			<div class="product__info">
				<span class="product__price">$${getDiscount(product)}</span>
			</div> ` : `
			<div class="product__info">
				<span class="product__price">$${product.price}</span>
			</div
			` }`
			
			

			catSection.append(productBlock);

			

		})
		
	})
}

categoriesContainer && renderCategories() && renderProducts();

const bodyIDForm = document.querySelector(`#loginForm`);
const renderForm = () => {
let loginAndAuthorization = document.createElement(`div`);
loginAndAuthorization.className = `container`;
loginAndAuthorization.innerHTML =`
		<div class="columns">
			<form id="LoginForm" class="userForm">
				<p class="title">Secure Sign In</h2>
				<p class="desription">For current customers</p>

				<div class="error">Invalid email address or password.</div>

				<label>
					<input type="email" placeholder="Email Address" data-name="email" value="ivan@gmail.com" required>
				</label>

				<label>
					<input type="password" placeholder="Password" data-name="password" value="123" required>
				</label>

				<button class="btn">Sign in</button>
			</form>

			<form id="RegistrationForm" class="userForm">
				<p class="title">Quick Registration</h2>
				<p class="desription">For new customers</p>

				<div class="error">Invalid email address or password.</div>

				<label>
					<input type="text" placeholder="Full name" data-name="name" value="Ivan" required>
				</label>

				<label>
					<input type="email" placeholder="Email Address" data-name="email" value="ivan@gmail.com" required>
				</label>

				<label>
					<input type="password" placeholder="Password" data-name="password" value="123" required>
				</label>

				<label>
					<input type="password" placeholder="Verify Password" data-name="passwordVerify" value="123" required>
				</label>

				<button class="btn">Create Account</button>
			</form>
		</div>`;
		document.querySelector(`body`).append(loginAndAuthorization);
}
bodyIDForm && renderForm();

const formError = (form, errorText) =>{
	let errorBlock = form.querySelector(`.error`);
	errorBlock.innerHTML = errorText;
	errorBlock.classList.add(`active`);
}

const LoginForm = document.querySelector(`#LoginForm`);
if (LoginForm){
	LoginForm.addEventListener(`submit`, e => {
		e.preventDefault();
	
		let email = e.target.querySelector(`input[data-name="email"]`).value,
			password = e.target.querySelector(`input[data-name="password"]`).value;
	
		let users = JSON.parse(localStorage.getItem(`users`)),
			userExist = users.find(user => user.email === email);
	
		if(!userExist){
			formError(e.target, `User with <strong>${email}</strong> not exist!`);
		} else if(userExist.password !== password){
			formError(e.target, `Not valid password for user!`);
		} else{
			localStorage.setItem(`user`, JSON.stringify(userExist));
			document.location.href = `index.html`;
			
			
		}
	})
}

const RegistrationForm = document.querySelector(`#RegistrationForm`);
if(RegistrationForm){
	RegistrationForm.addEventListener(`submit`, e => {
		e.preventDefault();
	
		let name = e.target.querySelector(`input[data-name="name"]`).value,
			email = e.target.querySelector(`input[data-name="email"]`).value,
			password = e.target.querySelector(`input[data-name="password"]`).value,
			passwordVerify = e.target.querySelector(`input[data-name="passwordVerify"]`).value;
	
		let users = JSON.parse(localStorage.getItem(`users`)),
			userExist = users.find(user => user.email === email);
	
		if(userExist){
			formError(e.target, `User with <strong>${email}</strong> already exist!`);
		} else if(password !== passwordVerify){
			formError(e.target, `Password not equals!`);
		} else{
			let user = {
				email: email,
				favourites: [],
				name: name,
				password: password
			};

			setUser(user);
			document.location.href = `index.html`;
		}
	})
}

const header = () => {
	let user = localStorage.getItem(`user`) ? JSON.parse(localStorage.getItem(`user`)) : null;
	if (user){
		let headerUser = document.querySelector(`#headerUser`);
		headerUser.href = `favourites.html`;
		headerUser.innerHTML = user.name;

		const headerFavourites = document.querySelector(`#headerFavourites`);
		headerFavourites.href = `favourites.html`;
		const headerFavouritesCount = document.querySelector(`#headerFavouritesCount`);
		headerFavouritesCount.innerHTML = user.favourites.length;

		const headerLogout = document.querySelector(`#headerLogout`);
		headerLogout.classList.add(`active`);
		headerLogout.addEventListener(`click`,()=>{
			localStorage.removeItem(`user`);
			document.location.href = `index.html`;
		})
	}
}
header();

const bodyIdFavourites = document.querySelector(`#favourites`);

const renderContainerFavourites = () =>{
let container = document.createElement(`div`);
container.className = `container`;

let favouritesContainer = document.createElement(`div`);
favouritesContainer.className = `favourites__container`;
favouritesContainer.innerHTML = `
		<div class="table__container">
						<table class="order__table" id="favouriteTable">
							<caption>Favourite Items</caption>
							<thead>
								<tr>
									<th>Item Description</th>
									<th>Price</th>
									<th>Sale</th>
									<th>Total</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								
							</tbody>
						</table>
		</div>`
container.append(favouritesContainer);

document.querySelector(`body`).append(container);
};

bodyIdFavourites && renderContainerFavourites();

const productItem = document.querySelector(`tbody`);
 const renderProductInTabele = () => {
  
	
		let user = getUser();
		user.favourites.forEach(favId => {
			
				PRODUCTS.forEach(product => {
		
					if (favId === product.id){
					let productBlock = document.createElement(`tr`);

					productBlock.setAttribute('data-id-fav', product.id);
					productBlock.innerHTML = `
					<td>
							<div class="item__info">
								<img src="images/products/${product.img}.png" alt="Cabriolet" height="100">
								<div>
									<p class="item__info--title">${product.title}</p>
								</div>
							</div>
						</td>
						<td>$${product.price}</td>
						${product.salePercent ? `<td><span class="item__sale">- ${product.salePercent}%</span></td>
						<td>$${getDiscount(product)}</td>` : `
						<td>- </td>
						<td>${product.price}</td>
						`}
						
						<td>
							<button class="item__favourite" data-id-fav="${product.id}" ><img src="images/product__favourite--true.png" alt="favourite" height="20"></button>
						</td>
					`
					productItem.append(productBlock);
					} 
					
			})
		
		})
 }
 productItem && renderProductInTabele();

const buttons = document.querySelectorAll(".product__favourite");

  buttons.forEach((button) => {
	button.addEventListener('click', () =>{
	 const img = button.querySelector('img');
	 const dataId = +button.getAttribute('data-id');
	 const currentUser = getUser();
	 const headerFavourites = document.querySelector(`#headerFavouritesCount`);

	 if(currentUser){
		if(img.getAttribute('src') === `images/product__favourite.png`){
			img.src = `images/product__favourite--true.png`;
			
			if(!currentUser.favourites.includes(dataId)){
			currentUser.favourites.push(dataId);
			setUser(currentUser);
			headerFavourites.innerHTML = `${currentUser.favourites.length}`;
			} 
		   } else {
			img.src = `images/product__favourite.png`;
	
			const myIndex = currentUser.favourites.indexOf(dataId);
			  if (myIndex !== -1) {
				  currentUser.favourites.splice(myIndex, 1);
				  setUser(currentUser);
				  headerFavourites.innerHTML = `${currentUser.favourites.length}`;
			  }
		   }
	 } else {
		window.location.href = 'login.html';
	 }
	})
   });
function getUser (){
	return JSON.parse(localStorage.getItem(`user`));
}

function setUser (user){

    localStorage.setItem(`user`, JSON.stringify(user));
	let users = JSON.parse(localStorage.getItem(`users`));
	

	let isUserExist = false;

		for(let i=0; i<users.length; i++) {
		if(user.email === users[i].email) {
			isUserExist = true;
				break;
		} 
		};

		if (isUserExist) {
			users = users.map((userItem) => {
			  if (userItem.email === user.email) {
				return user;
			  }
		  
			  return userItem;
			});
			localStorage.setItem(`users`, JSON.stringify(users));
		} else {
			users.push(user);
			localStorage.setItem(`users`, JSON.stringify(users));
			}
		};
const buttonsFavourites = document.querySelectorAll(".item__favourite");

buttonsFavourites.forEach((button) => {
	button.addEventListener('click', () =>{
	 const dataId = +button.getAttribute('data-id-fav');
	 const currentUser = getUser();
	 const myIndex = currentUser.favourites.indexOf(dataId);
	
		if (myIndex !== -1) {
			let action
			if(!action){
				currentUser.favourites.splice(myIndex, 1);
				setUser(currentUser);
				document.querySelector(`tr[data-id-fav="${dataId}"]`).remove();
				const headerFavourites = document.querySelector(`#headerFavouritesCount`);
				headerFavourites.innerHTML = `${currentUser.favourites.length}`;
			} 
		}
	 })
	  
	});
