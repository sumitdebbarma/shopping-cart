const shop = document.getElementById("shop");

const dataItem = [
  {
    id: "one",
    image: "images/1.png",
    name: "Iphone 14",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 999,
  },
  {
    id: "Two",
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

const basket = [];

const shopItem = () => {
  return (shop.innerHTML = dataItem
    .map((item) => {
      // Deconstruction
      const { id, name, image, price, description } = item;
      return ` 
    <div id = product-id-${id}  class="item">
        <img width="200px" src=${image}>
        <div class="details">
            <h3>${name}</h3>
            <p>${description}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick= decrement(${id})  class="bi bi-dash-lg"></i>
                    <div id=${id} class="quatity">0</div>
                    <i onclick= increment(${id}) class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`;
    })
    .join(""));
  // What does this join() method do?
};

shopItem();

// How to select card?
const increment = (id) => {
  let selectedItem = id;
  let seacrh = basket.find((x) => x.id === selectedItem.id);

  //   why search is equal to undefined, why not false, null or other falsey value?

  // if search is empty, then  push new object inside array. For eg: let search;
  if (seacrh === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    seacrh.item += 1;
  }
  update(selectedItem.id)
};

const decrement = (id) => {
  let selectedItem = id;
  let seacrh = basket.find((x) => x.id === selectedItem.id);
  if (seacrh.item === 0) return
   else {
    seacrh.item -= 1;
  }
  update(selectedItem.id)
};

const update = (id) => {
    let seacrh = basket.find((x)=> x.id === id)
    document.getElementById(id).innerHTML = seacrh.item
}
