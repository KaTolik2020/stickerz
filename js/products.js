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
                        <button class="button card-button">Buy - ${product.price}</button>
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
    try {
        const response = await fetch('products.json');
        products = await response.json();
    } catch (err) {
        alert(err.message);
    }
    renderProducts();
}

fetchProducts();
