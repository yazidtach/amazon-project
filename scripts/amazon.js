  import {cart, saveTolocalStorageCart} from '../data/cart.js'
  import {products} from '../data/products.js'
  import { convertMoney } from '../reusable/money.js'
  // to store the html after each loop
    let htmlProduct = ''
  
    // the product data will be imporant from the data folder through the amazon index file, so the data will be executed first then the forEach loop
    products.forEach( function (product) {

       htmlProduct += `
        <div class="">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
               ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${convertMoney(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-msg-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
        `
    }) 
    
    document.querySelector('.products-grid').innerHTML = htmlProduct

    function addToCart(productId){
       // Variable to store a reference to the matching product in cart if found
        let matchingItem;
        const selectElm = document.querySelector(`.js-quantity-${productId}`)
       const quantitySelector = Number(selectElm.value)
        cart.forEach((item)=>{
          // CHECK If the product ID matches one already in the cart and then store it
          if(productId === item.productId){
            matchingItem = item}
        })        
        // If we found the product in the cart it'll increase the quantity. matchingItem is a truthy value
        if(matchingItem){
          matchingItem.quantity += quantitySelector
        }
        // if the product didn't exist it will add it to the cart as a new item with quantity 1
        else {
          cart.push({
            productId : productId,
            quantity : quantitySelector
          })
        }
         //after adding the product tothe cart  it'll be saved in the localStorage
        saveTolocalStorageCart()
    }

    function countTotal(){
       let totalQuantiy = 0;
       
        cart.forEach((item)=>{
          totalQuantiy += item.quantity
        })
          document.querySelector('.js-cart-quantity').innerHTML = totalQuantiy 

    }

    //Loop over every "Add to Cart" button on the page

    document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
      // Add a click event listener to each button
      button.addEventListener('click', ()=>{
      // Get the product ID from the data attribute
        const productId = button.dataset.productId
       addToCart(productId)
       countTotal(productId)
       addedMsg(productId)
      })
})

console.log(cart);

function addedMsg(productId){
  const addElem = document.querySelector(`.js-added-msg-${productId}`)
  addElem.classList.add("visible")
  setTimeout(()=>{
    addElem.classList.remove("visible")
  },2000)
}
