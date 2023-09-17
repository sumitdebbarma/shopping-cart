// why did I function, I can this way to?

const shop = document.getElementById('shop')
const dataItem = [
    {
        id:1,
        image:"images/1.png",
        name:"Iphone 14",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 999,
    },
    {
        id:2,
        image:"images/2.png",
        name:"Macbook air",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 1300,
    },
    {
        id:3,
        image:"images/3.png",
        name:"canon m2",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 499,
    },
    {
        id:4,
        image:"images/4.png",
        name:"Armani",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 500,
    },
]
shop.innerHTML =  shop.innerHTML = dataItem.map((item) => {
    // Deconstruction
    const {name, image, price, description} = item
    return ` 
    <div class="item">
        <img width="200px" src=${image}>
        <div class="details">
            <h3>${name}</h3>
            <p>${description}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i class="bi bi-dash-lg"></i>
                    <div class="quatity">0</div>
                    <i class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`
}).join("")
