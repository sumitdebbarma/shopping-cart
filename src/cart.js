let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];
const calculation = () => {
  document.getElementById("cartAmount").innerHTML = basket
    .map((eachObjectInsideBasket) => eachObjectInsideBasket.item)
    .reduce((prevItem, currentItem) => prevItem + currentItem, 0);
};
calculation();

const generateCartItems = () => {
  if (basket.length === 0) {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2> Cart is empty </h2>
        <a href="index.html">
        <button class="homeBtn">Back to home</button>
        </a>
        `;
  } else {
    return (shoppingCart.innerHTML = basket
      .map((eachObjectInsideBasket) => {
        let { uniqueId, item } = eachObjectInsideBasket;
        let search = itemData.find((y) => y.id === uniqueId) || [];
        return `
            <div class="cart-item">
            <img width="100px" src= ${search.image} />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                         <p>${search.name}</p>
                         <p class="cart-item-price" >$ ${search.price}</p>
                         </h4>
                         <i class="bi bi-x-lg"></i>
                    </div>
                    <div 
                        <div class="buttons">
                            <i onclick="decrement(${uniqueId}) " class="bi bi-dash-lg"></i>
                            <div id="${uniqueId}-quantity" class="quantity">${item} </div>
                                <i onclick = "increment(${uniqueId})" class="bi bi-plus-lg"></i>
                        </div> 
                 </div>
            </div>
            `;
      })
      .join(""));
  }
};

generateCartItems();




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