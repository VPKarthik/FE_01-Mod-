let carts = document.querySelectorAll(".addToCart");

let products = [
    {
        name: 'Chicken Pizza',
        tag: 'CP',
        price: 700,
        inCart: 0
    },
    {
        name: 'Vegetable Pizza',
        tag: 'VP',
        price: 500,
        inCart: 0
    },
    {
        name: 'Chicken Kottu',
        tag: 'CK',
        price: 300,
        inCart: 0
    },
    {
        name: 'Vegetable kottu',
        tag: 'VK',
        price: 200,
        inCart: 0
    },
    {
        name: 'Water Bottle',
        tag: 'WB',
        price: 70,
        inCart: 0
    },
]

for(let i=0; i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        // console.log("Added");
        cartNumbers(products[i]);
        totalCost(products[i])
    });
}

function onLoadCartNumber(){
    let productNumbers = localStorage.getItem("cartNumbers");
    if(productNumbers){
        document.querySelector('.cart1 span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    // console.log("Clicked is:", product)
    let productNumbers = localStorage.getItem("cartNumbers");
    // console.log(productNumbers);
    // console.log(typeof productNumbers);
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem("cartNumbers",productNumbers+1); 
        document.querySelector('.cart1 span').textContent= productNumbers+1;
    }else{
        localStorage.setItem("cartNumbers",1); 
        document.querySelector('.cart1 span').textContent = 1;
    }
       
    // console.log(typeof productNumbers);
    setItems(product);
}
function setItems(product){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        
        // console.log("inside is", product);    
        // console.log("cartItems are",cartItems);
         cartItems = {
            [product.tag]: product
        }
        
    }
    // we have to do json strinify bcz we don't need to pass as objects
    
    localStorage.setItem("productsInCart",JSON.stringify(cartItems))
}
function totalCost(product){
    // console.log("the product price is",product.price);
    let cartCost = localStorage.getItem("totalCost");
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost+product.price);
    }else{
        localStorage.setItem("totalCost",product.price);}
}
function displayCart(){
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems)
    let productContainer = document.querySelector(".products");
    if (cartItems && productContainer){
        productContainer.innerHTML='';//initially empty
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
                <pre>                                                                                 </pre>
                <img width="15%" heigth="15%" src="./images/${item.tag}.jpg">
                <p>${item.name}</p><pre>                           </pre>
                <p class="price">${item.price}</p><pre>                    </pre>
                <p>${item.inCart}</p><pre>                    </pre>
                <p>${item.inCart * item.price}</p>
                <hr>
            </div>
            `
        });
        productContainer.innerHTML +=`
        <h4 id="h41">Basket Total is: ??? ${cartCost}</h4>
        `
    }
}

onLoadCartNumber();
displayCart();


            // <div class="price">${item.price}</div>
            // <div class="quantity">
            //     <button type="button">Decrease</button>
            //     <span>${item.inCart}</span>
            //     <button type="button">Increase</button>
            // </div>
            // <div class="total">                
            //     <span>${item.inCart * item.price}</span>
            // </div>