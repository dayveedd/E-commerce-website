// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', ()=>{
  cart.classList.add('active');
})
      
closeCart.addEventListener('click', ()=>{
  cart.classList.remove('active');
})

// start when the document is ready
if(document.readyState == "loading"){
  document.addEventListener('DOMContentLoaded', start);
}else{
  start();
}

// ================= START =================
function start(){
  addEvents();
}

// ================ UPDATE & RERENDER ===============
function update(){
  addEvents();
  updateTotal();
}

// ============== ADD EVENTS ================
function addEvents(){
    // remove items from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach(btn => {
    btn.addEventListener('click', handle_removeCartItem);
  });

    // change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
      input.addEventListener("change", handle_changeItemQuantity);
  });

// add items to cart
let addCart_btns = document.querySelectorAll(".add-cart");
addCart_btns.forEach(btn =>{
  btn.addEventListener('click', handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click" ,handle_buyOrder);

}

// ============ HANDLE EVENTS FUNCTIONS ===============
let itemsAdded =[]
function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgScr = product.querySelector(".product-img").src;
  console.log(title, price, imgScr);
  alert('Item successfully added to cart');

  let newToAdd = {
    title,
    price,
    imgScr,
  };

// handle item is already exist
if(itemsAdded.find((el) =>el.title == newToAdd.title)) {
  alert("This Item Is Alredy Exist!");
  return;
}else{
  itemsAdded.push(newToAdd);
}

  // add product to cart
  let cartBoxElement = CartBoxComponents(title, price, imgScr);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function  handle_removeCartItem() {
 this.parentElement.remove();
 itemsAdded = itemsAdded.filter(
  (el) =>
   el.title !=
   this.parentElement.querySelector(".cart-product-title").innerHTML
   );

 update();
}
function handle_changeItemQuantity(){
  if(isNaN(this.value) || this.value < 1){
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer
 
  update();
}

function handle_buyOrder(){
  if(itemsAdded.length <= 0){
    alert("There Is No Order To Place Yet! \nPlease Make an Order first.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = '';
  alert("Your Order is Placed successfully :)");
  itemsAdded = [];

  update();
}



// =========== UPDATE & RERENDER FUNCTIONS ===========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach(cartBox =>{
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$",""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // keep 2 digits after the decimal point
  total = total.toFixed(2);
  // or you can use also
  // total = maths.round(total * 100)/ 100;

  totalElement.innerHTML = "$" + total;
}
// =========== HTML COMPONEMTS =============
function CartBoxComponents(title, price, imgScr){
  return `
               <div class="cart-box">
                   <img src=${imgScr} alt="" class="cart-img">
                     <div class="detail-box">
                       <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <input type="number" value="1" class="cart-quantity">
                          </div>
                       <!--REMOVE CART -->
                        <i class='bx bxs-trash-alt cart-remove'></i>
                         </div>`;
  }

                      