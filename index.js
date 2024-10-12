$(document).ready(function() {

$("#cartContainer").hide();




function animateCart () {
if($(window).width()>728) {
    $("#cartContainer").show();
    $("#cartContainer").animate({right: "0"}, "slow");

} else {
    $("#cartContainer").show();
}
}

function animateClose () {
    if($(window).width()>728) {
        $("#cartContainer").animate({right: "-30vw"}, "slow");
        // $("#delivery").css("display", "none");
        
        } else {
            $("#cartContainer").hide();
            // $("#delivery").css("display", "none");
        }
}

$("#cart").click(function() {
    animateCart();
});

$("#close").click(function() {
   animateClose();
});



    const menuItems = document.querySelectorAll('.menuItem'); 

    menuItems.forEach((item) => {
        const menuImage = item.querySelector("img"); 

        item.addEventListener("mouseover", function() {
            console.log("Mouse over:", item);
            menuImage.classList.add('scale-up'); 
        });

        item.addEventListener("mouseout", function() {
            menuImage.classList.remove('scale-up');
        });
    });



const userSize = document.getElementById("size1");
const userSize2 = document.getElementById("size2");
const userSize3 = document.getElementById("size3");
const userSize4 = document.getElementById("size4");
const userSize5 = document.getElementById("size5");
const userSize6 = document.getElementById("size6");
const userSize7 = document.getElementById("size7");
const userSize8 = document.getElementById("size8");
const element = document.getElementById("cartList");

const pizzaInfo = [
    { size: userSize, name: "The Honey Bear Special" },
    { size: userSize2, name: "The Sweetie Bear" },
    { size: userSize3, name: "The Computer Bear" },
    { size: userSize4, name: "The Stevia Bear" },
    { size: userSize5, name: "Banjo's Favorite Pizza" },
    { size: userSize6, name: "Fiona's Fiery Feline Pizza" },
    { size: userSize7, name: "Yoshi's Wild Whimsy Pizza" },
    { size: userSize8, name: "The Crazy Daisy Pizza" },
];

const userPizzas = JSON.parse(localStorage.getItem("data")) || [];

function loadCart() {
    userPizzas.forEach(pizza => {
        const newListItem = createCartItem(pizza.name, pizza.size, pizza.quantity);
        element.appendChild(newListItem);
    });
    updateCartNumber();
}

loadCart();

pizzaInfo.forEach((pizza, index) => {
    $(`#addCart${index + 1}`).click(function() {
        animateCart();
        const quantityInput = $(`#quantity${index + 1}`); 
        const quantity = parseInt(quantityInput.val()) || 1;
        addToCart(pizza.size.value, pizza.name, quantity);
    });
});

function addToCart(size, name, quantity) {
    const existingPizzaIndex = userPizzas.findIndex(pizza => pizza.name === name && pizza.size === size);

    if (existingPizzaIndex === -1) {
        userPizzas.push({ name, size, quantity });
        const newListItem = createCartItem(name, size, quantity);
        element.appendChild(newListItem);
    } else {
        userPizzas[existingPizzaIndex].quantity += quantity; 
        const updatedItem = element.querySelector(`.cart-item[data-name="${name}"][data-size="${size}"]`);
        updatedItem.querySelector('.quantity-input').value = userPizzas[existingPizzaIndex].quantity; 
    }

    localStorage.setItem("data", JSON.stringify(userPizzas));
    updateCartNumber();
}

function createCartItem(name, size, quantity) {
    const newListItem = document.createElement("li");
    newListItem.classList.add("cart-item");
    newListItem.setAttribute("data-name", name);
    newListItem.setAttribute("data-size", size);
    newListItem.innerHTML = `<div id="pizzaName">${name}, ${size}</div> 
       <div id="flexRight">
        <input type="number" value="${quantity}" min="1" class="quantity-input" data-name="${name}" data-size="${size}" />
        <span>
            <svg class='trash' xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5'/>
            </svg>
        </span></div>`;



        const quantityInput = newListItem.querySelector('.quantity-input');
    quantityInput.addEventListener('change', function() {
        const newQuantity = parseInt(quantityInput.value);
        if (newQuantity > 0) {
            const pizzaIndex = userPizzas.findIndex(pizza => pizza.name === name && pizza.size === size);
            if (pizzaIndex !== -1) {
                userPizzas[pizzaIndex].quantity = newQuantity; // Update quantity in userPizzas
                localStorage.setItem("data", JSON.stringify(userPizzas));
                updateCartNumber(); // Update cart number
            }
        } else {
            // Optionally handle case where quantity is 0
            quantityInput.value = 1; // Reset to 1 if user tries to set it to 0
        }
    });

    newListItem.querySelector('.trash').addEventListener('click', function() {
        const pizzaIndex = userPizzas.findIndex(pizza => pizza.name === name && pizza.size === size);
        if (pizzaIndex !== -1) {
            userPizzas.splice(pizzaIndex, 1);
            element.removeChild(newListItem);
            localStorage.setItem("data", JSON.stringify(userPizzas));
            updateCartNumber();
        }
    });

    return newListItem;
}

function updateCartNumber() {
    const totalQuantity = userPizzas.reduce((sum, pizza) => sum + pizza.quantity, 0);
    document.getElementById("cartNumber").innerText = totalQuantity;
}

$("#checkoutButton").click(function() {
    if (userPizzas.length !== 0) {
   
    document.getElementById("delivery").showModal();
    } else {
        document.getElementById("emptyCart").showModal();
    }
})




    const form = document.getElementById('form');
    const result = document.getElementById('result');
    const wait = document.getElementById('wait');
  
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      wait.innerHTML = "<span>Please wait...</span>";
    
        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    $("#form").css("display", "none")
                    wait.style.display = "none";
                    result.innerHTML = '<span>Thank you for contacting Honey Bear Pizza! Honey Bear will be in touch soon!</span>';
                    
                    
                } else {
                    console.log(response);
                    $("#form").css("display", "none")
                    wait.style.display = "none";
                    result.innerHTML = '<span>Thank you for contacting Honey Bear Pizza! Honey Bear will be in touch soon!</span>';
                   
                }
            })
            .catch(error => {
                console.log(error);
                $("#form").css("display", "none")
                wait.style.display = "none";
                result.innerHTML = '<span>Something went wrong!</span>';
                
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none"
                    $("#form").css("display", "block");
                }, 4000);
            });
    });

});

 // $("#delivery").css("display", "block");