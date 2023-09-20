const shopElement = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("data")) || [];

const shop = () => {
  return (shopElement.innerHTML = itemData.map((eachObjectInsideItemData) => {
    const { id, image, name, description, price } = eachObjectInsideItemData;
    const search = basket.find((eachObjectInsideBasket) => eachObjectInsideBasket.uniqueId === id)
    return ` 
            <div id="${id}" class="item">
                <img width="200px" src="${image}">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                        <i onclick=decrement(${id})  class="bi bi-dash-lg"></i>
                        <div id="${id}-quantity" class="quantity"> ${search ? search.item : 0} </div>
                            <i onclick = increment(${id}) class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>`;
  }).join(''));
};
shop();

const increment = (itemDataArrObjForincrement) => {

  const search = basket.find((eachObjectInsideBasket) => {
    return (
      eachObjectInsideBasket.uniqueId === itemDataArrObjForincrement.id
    );
  });

  if (search) {
    search.item += 1;
  } else {
    basket.push({
      uniqueId: itemDataArrObjForincrement.id,
      item: 1,
    });
  }

  localStorage.setItem("data", JSON.stringify(basket) )
  update(itemDataArrObjForincrement);

  //   console.log("The value of basket for increment", basket);
  // console.log("The value of search", search)
};

// function with object and array.
const decrement = (itemDataArrObjForDecrement) => {
 
  const search = basket.find((eachObjectInsideBasket) => {
    return (
      
      eachObjectInsideBasket.uniqueId === itemDataArrObjForDecrement.id
    );
  });

  if (search === undefined) return
  else if (search && search.item > 0) {
    search.item -= 1;
  }
  update(itemDataArrObjForDecrement);

  // It will update the basket, it will remove all item if item:0.
  basket = basket.filter((eachObjectInsideBasket) => eachObjectInsideBasket.item !== 0)
  localStorage.setItem("data", JSON.stringify(basket) )
  
};

const update = (itemDataArrObjForUpdate) => {
  const search = basket.find((eachObjectInsideBasket) => {
    return eachObjectInsideBasket.uniqueId === itemDataArrObjForUpdate.id;
  });
  document.getElementById(`${itemDataArrObjForUpdate.id}-quantity`).innerHTML =
    search.item;
  calculation();
};

const calculation = () => {
  document.getElementById("cartAmount").innerHTML = basket
    .map((eachObjectInsideBasket) => eachObjectInsideBasket.item)
    .reduce((prevItem, currentItem) => prevItem + currentItem, 0);
};
calculation()