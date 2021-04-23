const productsJson = 
`[
    {
        "id": "1",
        "title": "Baby Yoda",
        "image": "img/baby-yoda.svg",
        "description": "Baby Yoda sticker",
        "price": 49.99
    },
    {
        "id": "2",
        "title": "Banana",
        "image": "img/banana.svg",
        "description": "Banana sticker",
        "price": 19.99
    },
    {
        "id": "3",
        "title": "Girl",
        "image": "img/girl.svg",
        "description": "Girl sticker",
        "price": 24.99
    },
    {
        "id": "4",
        "title": "Viking",
        "image": "img/viking.svg",
        "description": "Viking sticker",
        "price": 34.99
    },
    {
        "id": "5",
        "title": "Kitty",
        "image": "https://placekitten.com/400/400",
        "description": "Kitten",
        "price": 30.99
    }
]`;

function renderProducts(products, sortOrder) {
    const sortedProducts = [...products]
        .sort( (a, b) => sortOrder === 'ascending' 
                    ? a.price - b.price 
                    : b.price - a.price );
    const productsContainer = document.querySelector('.product-list');
    let html = '';
    for (const product of sortedProducts) {
        html += `<article class="product">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <div class="buttons">
                        <button class="button card-button">Info</button>
                        <button class="button card-button">Buy - ${product.price}</button>
                    </div>
                </article>`;
    }
    productsContainer.innerHTML = html;
}

renderProducts(JSON.parse(productsJson), 'ascending');

const buttonSortAscending = document.querySelector('.sort-ascending');
const buttonSortDescending = document.querySelector('.sort-descending');

buttonSortAscending.addEventListener('click', sortAscending);
buttonSortDescending.addEventListener('click', sortDescending);

function sortAscending() {
    renderProducts(JSON.parse(productsJson), 'ascending');
}

function sortDescending() {
    renderProducts(JSON.parse(productsJson), 'descending');
}