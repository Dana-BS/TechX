function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.getElementById('cart-items');
    let subtotal = 0;

    cartTableBody.innerHTML = ''; 

    cart.forEach((item, index) => {
        const total = item.price * item.quantity;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="item-details">
                    <img src="${item.image}" alt="Item Image">
                    <div>
                        <p>${item.name}</p>
                        <p>${item.category}</p>
                        <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
                    </div>
                </div>
            </td>
            <td>$${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${total}</td>
        `;

        cartTableBody.appendChild(row);
        subtotal += total;
    });

    // Calculate VAT
    const vat = cart.length > 0 ? 150 : 0;

    // Update UI
    document.getElementById('subtotal').textContent = `${subtotal}$`;
    document.getElementById('grand-total').textContent = `${subtotal + vat}$`;

    const vatElement = document.querySelector('.cart-summary p:nth-child(2) span');
    vatElement.textContent = `${vat}$`;
}



function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function deleteItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

function checkout() {
    alert(`Total Cost: ${document.getElementById('grand-total').textContent}`);
    window.location.href = 'review.html';
}

loadCart();
