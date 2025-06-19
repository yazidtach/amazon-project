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
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity">
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

          <div class="added-to-cart">
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

    //Loop over every "Add to Cart" button on the page

    document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
      // Add a click event listener to each button
      button.addEventListener('click', ()=>{
      // Get the product ID from the data attribute
        const productId = button.dataset.productId
        // Variable to store a reference to the matching product in cart if found
        let matchingItem;
        
        cart.forEach((item)=>{
          // CHECK If the product ID matches one already in the cart and then store it
          if(productId === item.productId){
            matchingItem = item}
        })        
        // If we found the product in the cart it'll increase the quantity. matchingItem is a truthy value
        if(matchingItem){
          matchingItem.quantity += 1 
        }
        // if the product didn't exist it will add it to the cart as a new item with quantity 1
        else {
          cart.push({
            productId : productId,
            quantity : 1
          })
        }
        
        
      console.log(cart);
      

        
      })
})

