$(document).ready(function() {

$("#checkoutButton").click(function() {
    $("#delivery").css("display", "block");
})

$("#cart").click(function() {
    $("#cartContainer").animate({right: "0"}, "slow");
});

$("#close").click(function() {
    $("#cartContainer").animate({right: "-30vw"}, "slow");
    $("#delivery").css("display", "none");
})

    const menuItems = document.querySelectorAll('.menuItem'); 

    menuItems.forEach((item) => {
        const menuImage = item.querySelector("img"); // Get the specific image for this item

        item.addEventListener("mouseover", function() {
            console.log("Mouse over:", item);
            menuImage.classList.add('scale-up'); // Add the class to scale up the image
        });

        item.addEventListener("mouseout", function() {
            menuImage.classList.remove('scale-up'); // Remove the class to scale back down
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
        const newListItem = createCartItem(pizza.name, pizza.size);
        element.appendChild(newListItem);
    });
    document.getElementById("cartNumber").innerText = userPizzas.length;
}

loadCart();



pizzaInfo.forEach((pizza, index) => {
    $(`#addCart${index + 1}`).click(function() {
        $("#cartContainer").animate({ right: "0" }, "slow");
        addToCart(pizza.size.value, pizza.name);
    });
});

let cartNumber = userPizzas.length;

function addToCart(size, name) {
    const element = document.getElementById("cartList");
    const existingPizzaIndex = userPizzas.findIndex(pizza => pizza.name === name && pizza.size === size);

    if (existingPizzaIndex === -1) {
        userPizzas.push({ name, size });
        const newListItem = createCartItem(name, size);
        element.appendChild(newListItem);
        localStorage.setItem("data", JSON.stringify(userPizzas));
        cartNumber++;
        document.getElementById("cartNumber").innerText = cartNumber;
    } 
}

function createCartItem(name, size) {
    const newListItem = document.createElement("li");
    newListItem.classList.add("cart-item");
    newListItem.innerHTML = `${name}, ${size} 
        <span>
            <svg class='trash' xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5'/>
            </svg>
        </span>`;




newListItem.querySelector('.trash').addEventListener('click', function() {

    const pizzaIndex = userPizzas.findIndex(pizza => pizza.name === name);
    if (pizzaIndex !== -1) {
        userPizzas.splice(pizzaIndex, 1);
        element.removeChild(newListItem); 
        localStorage.setItem("data", JSON.stringify(userPizzas));
        cartNumber--;
        document.getElementById("cartNumber").innerText = cartNumber;
   
    }
});


    return newListItem;
}




});



