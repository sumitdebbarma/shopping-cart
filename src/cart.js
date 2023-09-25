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
    return (shoppingCart.innerHTML = basket.map((basketObj) => {
        const {uniqueId, item} = basketObj;

        const search = itemData.find((dataObj) => dataObj.id === uniqueId  || [] );
        
        return ` 
        <div id="${search.id}" class="item">
            <img width="200px" src="${search.image}">
            <div class="details">
                <h3>${search.name}</h3>
                <p>${search.description}</p>
                <div class="price-quantity">
                    <h2>$ ${search.price}</h2>
                    <div class="buttons">
                        <i onclick=decrement('${search.id}')  class="bi bi-dash-lg"></i>
                        <div id="${search.id}-quantity" class="quantity"> ${item} 
                        </div>
                        <i onclick = increment('${search.id}') class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>`

    }))
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
      search.item += 1
    }
    update(id)
    
    localStorage.setItem('data',JSON.stringify(basket))
   
  };

  const decrement = (id) => {
    const search = basket.find((basketObj) => basketObj.uniqueId === id)
  
    if ( search === undefined || search.item === 0) return
    else if (search !== undefined ) {
      search.item -= 1
    }
    update(id)
    basket = basket.filter((x) => x.item !== 0);
    generateCart()
    localStorage.setItem("data", JSON.stringify(basket));
  }

  const update = (id) => {
    const search = basket.find((basketObj) => (basketObj.uniqueId === id))
    document.getElementById(`${id}-quantity`).innerHTML = search.item
    updateCartAmount()
  }
