const label = document.getElementById("label");
const shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

const updateCartAmount = () => {
  document.getElementById("cartAmount").innerHTML = basket
    .map((basketObj) => basketObj.item)
    .reduce((prevVal, currVal) => prevVal + currVal, 0);
};

updateCartAmount();

const generateCart = () => {
  if (basket.length === 0) {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  } else {
    shoppingCart.innerHTML = basket.map((basketObj) => {
      const { uniqueId, item } = basketObj;

      const search = itemData.find((dataObj) => dataObj.id === uniqueId);

      return ` 
        <div id="${search.id}" class="cart-item">
            <img width="100px" src="${search.image}">
            <div class="details">

                  <div class="title-price-x ">
                    <h3 class="title-price" >${search.name}</h3>
                    <p class="cart-item-price">$ ${search.price}</p>
                    <i onclick=removeItem('${search.id}')  class="bi bi-x-lg"></i>
                  </div>


                  <div class="buttons">
                        <i onclick=decrement('${
                          search.id
                        }')  class="bi bi-dash-lg"></i>
                        <div id="${
                          search.id
                        }-quantity" class="quantity"> ${item} 
                        </div>
                        <i onclick = increment('${
                          search.id
                        }') class="bi bi-plus-lg"></i>
                  </div>

                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>
        </div>`;
    }).join('')
  }
};
generateCart();

const increment = (id) => {
  const search = basket.find((basketObj) => basketObj.uniqueId === id);

  if (search === undefined) {
    basket.push({
      uniqueId: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCart();

  update(id);

  localStorage.setItem("data", JSON.stringify(basket));
};

const decrement = (id) => {
  const search = basket.find((basketObj) => basketObj.uniqueId === id);

  if (search === undefined || search.item === 0) return;
  else if (search !== undefined) {
    search.item -= 1;
  }
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  generateCart();
  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  const search = basket.find((basketObj) => basketObj.uniqueId === id);
  document.getElementById(`${id}-quantity`).innerHTML = search.item;
  updateCartAmount();
  totalAmount()
};


const removeItem = (id) => {
basket = basket.filter((basketObj) => basketObj.uniqueId !== id)
generateCart();
totalAmount()
updateCartAmount()
localStorage.setItem("data", JSON.stringify(basket));
}

const clearCart = () => {
  basket = []
  generateCart();
  updateCartAmount()
  localStorage.setItem("data", JSON.stringify(basket));
}

const totalAmount = () => {
  if (basket === 0) {
    return
  } else {
   let amount =  basket.map((basketObj) => {
      const {uniqueId, item} = basketObj
      const search = itemData.find((dataObj) => dataObj.id === uniqueId);
      return item * search.price
    }).reduce((prev, curr) => prev + curr, 0)
    label.innerHTML = `
    <h2> Total Bill : $ ${amount} </h2>
    <button class="checkout"> checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear cart</button>
    `
  }
}
totalAmount()

