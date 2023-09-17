const shop = document.getElementById("shop");

const dataItem = [
  {
    Id: "one",
    image: "images/1.png",
    name: "Iphone 14",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 999,
  },
  {
    Id: "two",
    image: "images/2.png",
    name: "Macbook air",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 1300,
  },
  {
    Id: "three",
    image: "images/3.png",
    name: "canon m2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 499,
  },
  {
    Id: "four",
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
      const { Id, name, image, price, description } = item;
      return ` 
    <div id="${Id}" class="item">
        <img width="200px" src="${image}">
        <div class="details">
            <h3>${name}</h3>
            <p>${description}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                <i onclick="decrement('${Id}')" class="bi bi-dash-lg"></i>
                <div id="${Id}-quantity" class="quantity">0</div>
                    <i onclick="increment('${Id}')" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`;
    })
    .join(""));
};
shopItem();

const increment = (Id) => {
  let search = basket.find((x) => x.Id === Id);
  if (search) {
    search.item += 1;
  } else {
    basket.push({
      Id: Id,
      item: 1,
    });
  }
  update(Id); // Pass Id as a parameter
};

const decrement = (Id) => {
  let search = basket.find((x) => x.Id === Id);
  if (search && search.item > 0) {
    search.item -= 1;
  }
  update(Id); // Pass Id as a parameter
};

const update = (Id) => {
  let search = basket.find((x) => x.Id === Id);
  if (search) {
    document.getElementById(`${Id}-quantity`).innerHTML = search.item;
  }
  calculate()
};




