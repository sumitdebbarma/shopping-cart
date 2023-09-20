let basket = JSON.parse(localStorage.getItem("data")) || [];
const calculation = () => {
    document.getElementById("cartAmount").innerHTML = basket
      .map((eachObjectInsideBasket) => eachObjectInsideBasket.item)
      .reduce((prevItem, currentItem) => prevItem + currentItem, 0);
  };
  calculation()