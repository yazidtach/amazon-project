import { cart , deleteCartItem} from "../data/cart.js";
import { products } from "../data/products.js";
import { convertMoney } from "../reusable/money.js";
let htmlCart = ''

    cart.forEach(cartItem => {
        // check if the cartId is the Same as ProductId if true then we can get the whole properties of the product without saving it twice in cart and product 
        const productId = cartItem.productId
        let matchingId;
            products.forEach((product)=>{
                if(product.id === productId)
                    matchingId = product
            })
    
        htmlCart += `
            <div class="cart-item-container
            //each container will have a unique id for each product  
                js-cart-item-countainer-${matchingId.id}
            ">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingId.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingId.name}
                    </div>
                    <div class="product-price">
                    $${convertMoney(matchingId.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-button" data-product-id = ${matchingId.id}>
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingId.id}">
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                        name="delivery-option-${matchingId.id}">
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingId.id}">
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
`});

document.querySelector(".order-summary").innerHTML = htmlCart

document.querySelectorAll('.js-delete-button').forEach(button => {
    button.addEventListener('click', ()=>{
        let productId = button.dataset.productId
        deleteCartItem(productId)
        //get the countainer using the dom with a specific id for each product 
        const deletedContainer = document.querySelector(`.js-cart-item-countainer-${productId}`)
        //.remove() deletes the container from the dom 
        deletedContainer.remove()
        
    })
    
});
