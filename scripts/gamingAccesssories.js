const products = [
    { id: '1', name: "Logitech G502 X Plus LIGHTSPEED RGB Gaming Mouse", price: 300, rating: 4, image: "images/mouse.png", category: "Gaming Accessories" },
    { id: '2', name: "Razer Mini Switch Gaming Keyboard", price: 200, rating: 3, image: "images/keyboard.jpg", category: "Gaming Accessories" },
    { id: '3', name: "Astro A50 + Gen 4 Gaming Headset", price: 900, rating: 5, image: "images/headset.jpg", category: "Gaming Accessories" },
    { id: '4', name: "Sony Controller", price: 150, rating: 3, image: "images/controller.webp", category: "Gaming Accessories" },
    { id: '5', name: "Razer Firefly V2 Gaming Mouse Pad", price: 150, rating: 3, image: "images/mousepad.jpg", category: "Gaming Accessories" },
    { id: '6', name: "HyperX QuadCast S RGB USB Condenser Microphone", price: 150, rating: 3, image: "images/mic.jpg", category: "Gaming Accessories" }
];

const productContainer = document.getElementById('products-list');

// Function to render products dynamically
function displayProducts(productsToDisplay) {
    productContainer.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="Product">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <div class="stars">${'★'.repeat(product.rating)}</div>
            <input type="number" class="quantity-input" value="1" min="1">
            <button class="add-to-cart" onclick="addToCart('${product.id}')">
                <img src="images/shopping-cart-png.webp" alt="Cart"> Add to cart
            </button>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Function to sort products based on user selection
function sortProducts() {
    const sortValue = document.getElementById('sort').value;
    let sortedProducts = [...products];

    if (sortValue === 'High To Low') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'Low To High') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'Highest Rate') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortValue === 'Lowest Rate') {
        sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (sortValue === 'A-Z') {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'Z-A') {
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayProducts(sortedProducts);
}

// Add a product to the cart by its unique ID
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(item => item.id === productId);

    if (!product) {
        console.error('Product not found');
        return;
    }

    const productIndex = products.findIndex(item => item.id === productId);
    const quantityInput = document.querySelectorAll('.quantity-input')[productIndex];
    const quantity = parseInt(quantityInput.value) || 1;

    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // Update quantity if product already exists in the cart
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Add new product to the cart
        const productToAdd = { ...product, quantity: quantity };
        cart.push(productToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${quantity} ${product.name}(s) to the cart!`);
}

// Initial render of products
displayProducts(products);
