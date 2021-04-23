let products;

function renderProducts(sortOrder) {
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
                        <button class="button card-button">Buy - ${product.convertedPrice} (${product.currency})</button>
                    </div>
                </article>`;
    }
    productsContainer.innerHTML = html;
}

const buttonSortAscending = document.querySelector('.sort-ascending');
const buttonSortDescending = document.querySelector('.sort-descending');

buttonSortAscending.addEventListener('click', sortAscending);
buttonSortDescending.addEventListener('click', sortDescending);

function sortAscending() {
    renderProducts('ascending');
}

function sortDescending() {
    renderProducts('descending');
}

// function fetchProducts() {
//     fetch('products.json')
//         .then(response => response.json() )
//         .then(productsFromServer => products = productsFromServer)
//         .then( () => renderProducts() )
//         .catch( err => alert(err.message) );
// }

async function fetchProducts() {
    const response = await fetch('products.json');
    products = await response.json();
    await convertCurrency();
    renderProducts();
}

fetchProducts();

async function convertCurrency() {
    const startCurrency = 'USD';
    const targetCurrency = document.querySelector('.currency-input').value;
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${startCurrency}`);
    const rates = await response.json();
    const rate = rates.rates[targetCurrency];
    for (const product of products) {
        product.convertedPrice = (product.price * rate).toFixed(2);
        product.currency = targetCurrency;
    }
}

document.querySelector('.convert-currency')
    .addEventListener('click', async () => {
        await convertCurrency();
        renderProducts();
    });
