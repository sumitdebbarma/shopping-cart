const shopElement = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem('data')) || [];

const shop = () => {
  return (shopElement.innerHTML = itemData
    .map((dataObj) => {
      const { id, image, name, description, price } = dataObj;
      const search = basket.find((basketObj) => (basketObj.uniqueId === id) )
      return ` 
            <div id="${id}" class="item">
                <img width="200px" src="${image}">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                        <i onclick=decrement('${id}')  class="bi bi-dash-lg"></i>
                        <div id="${id}-quantity" class="quantity"> ${search !== undefined  ? search.item : 0} </div>
                            <i onclick = increment('${id}') class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>`;
    })
    .join(""));
};
shop();

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
  localStorage.setItem("data", JSON.stringify(basket));
}

const update = (id) => {
  const search = basket.find((basketObj) => (basketObj.uniqueId === id))
  document.getElementById(`${id}-quantity`).innerHTML = search.item
  updateCartAmount()
}


const updateCartAmount = () => {
  document.getElementById('cartAmount').innerHTML = basket.map((basketObj) => (basketObj.item)).reduce((prevVal, currVal) => (prevVal + currVal), 0)
}
updateCartAmount()
