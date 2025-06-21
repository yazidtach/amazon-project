//to get the data stored in from the add function 
export let cart = JSON.parse(localStorage.getItem('cart')) || [ {
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 1
}]


export function deleteCartItem(productId){
     let newCart = [];
        cart.forEach((cartItem)=>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem)
            }
        }) 
        cart = newCart
        //after deleting the product it'll be saved in the localStorage
    saveTolocalStorageCart()
}
//to store the data in localStorage
export function saveTolocalStorageCart(){ localStorage.setItem('cart',JSON.stringify(cart))}