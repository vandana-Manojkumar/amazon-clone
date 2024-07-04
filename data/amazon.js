
let html = '';
products.forEach((eachitem) =>{
   html+= ` <div class="product-container">
  <div class="product-image-container">
    <img class="product-image"
      src=" ${eachitem.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
  ${eachitem.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src=" images/ratings/rating-${eachitem.rating.stars *10}.png">
    <div class="product-rating-count link-primary">
    ${eachitem.rating.count}
    </div>
  </div>

  <div class="product-price">
  ${(eachitem.priceCents/100).toFixed(2)}
  </div>

  <div class="product-quantity-container">
    <select>
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

  <button class="add-to-cart-button button-primary addcart" 
  " data-product-name =" ${eachitem.name}">
    Add to Cart
  </button>
</div>`
})

document.querySelector('.products-grid').innerHTML = html;

document.querySelectorAll('.addcart').forEach((button) =>{
  button.addEventListener('click',() =>{
   const product= button.dataset.productName; 
    
let matching = '';
   cart.forEach((item) =>{
   
    if(product === item.name){
      matching = item;
    }
  })
   ;
    if(matching){
      matching.quantity += 1;
    }
    else{
      cart.push({
        name : product,
        quantity : 1
       })
    }

    let a = 0;
    cart.forEach((item) =>{
      a += item.quantity;
    });
    document.querySelector('.cart-quantity').innerHTML=a;
   
     console.log(cart);

  })
})
 


  document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    addToCartButtons.forEach(button => {
      button.addEventListener('click', event => {
        const productContainer = event.target.closest('.product-container');
        const productName = productContainer.querySelector('.product-name').innerText;
        const productPrice = productContainer.querySelector('.product-price').innerText;
        const productImage = productContainer.querySelector('.product-image').src;
        const productQuantity = productContainer.querySelector('.product-quantity-container select').value;
        
        const product = {
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: productQuantity
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartQuantity();
      });
    });

    function updateCartQuantity() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartQuantity = cart.reduce((total, product) => total + parseInt(product.quantity), 0);
      document.querySelector('.cart-quantity').innerText = cartQuantity;
    }

    updateCartQuantity();
  });