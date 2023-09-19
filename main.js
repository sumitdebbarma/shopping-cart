const shopElement = document.getElementById("shop");

const itemData = [
  {
    id: "one",
    image: "images/1.png",
    name: "Iphone 14",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 999,
  },
  {
    id: "two",
    image: "images/2.png",
    name: "Macbook air",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 1300,
  },
  {
    id: "three",
    image: "images/3.png",
    name: "canon m2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 499,
  },
  {
    id: "four",
    image: "images/4.png",
    name: "Armani",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 500,
  },
];

const basket = JSON.parse(localStorage.getItem("data")) || [];

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
  // console.log("the val of itemDataArrObjForincrement",itemDataArrObjForincrement)
  // console.log(itemDataArrObjForincrement.id)

  const search = basket.find((eachObjectInsideBasket) => {
    return (
      // console.log("the val of eachObjectInsideBasket.uniqueId",eachObjectInsideBasket.uniqueId),
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
  // console.log(itemDataArrObjForDecrement)

  search = basket.find((eachObjectInsideBasket) => {
    return (
      // console.log(eachObjectInsideBasket)
      eachObjectInsideBasket.uniqueId === itemDataArrObjForDecrement.id
    );
  });
  if (search && search.item > 0) {
    search.item -= 1;
  }

  localStorage.setItem("data", JSON.stringify(basket) )
  update(itemDataArrObjForDecrement);
  // console.log("The val of basket for decrement", basket)
};

const update = (itemDataArrObjForUpdate) => {
  // console.log(itemDataArrObjForUpdate)
  const search = basket.find((eachObjectInsideBasket) => {
    return eachObjectInsideBasket.uniqueId === itemDataArrObjForUpdate.id;
  });
  document.getElementById(`${itemDataArrObjForUpdate.id}-quantity`).innerHTML =
    search.item;
  // console.log("the val of search", search)
  calculation();
};

const calculation = () => {
  document.getElementById("cartAmount").innerHTML = basket
    .map((eachObjectInsideBasket) => eachObjectInsideBasket.item)
    .reduce((prevItem, currentItem) => prevItem + currentItem, 0);
};
calculation()