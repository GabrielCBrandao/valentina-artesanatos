const products = [
  {
    name: 'Cesto de Crochê',
    price: 'R$ 89,90',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Coelhinha Amigurumi',
    price: 'R$ 129,90',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Painel de Macramê',
    price: 'R$ 149,90',
    image: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Caneca de Cerâmica',
    price: 'R$ 59,90',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Caixa Presenteável',
    price: 'R$ 39,90',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80'
  }
];

const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const newsletterForm = document.getElementById('newsletterForm');

const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

let cart = [];

function formatPrice(price) {
  return Number(
    price
      .replace('R$ ', '')
      .replace(',', '.')
  );
}

function formatCurrency(value) {
  return value.toFixed(2).replace('.', ',');
}

function updateCart() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Seu carrinho está vazio. Adicione produtos para finalizar sua compra.
      </p>
    `;

    cartCount.textContent = 0;
    cartTotal.textContent = 'Total: R$ 0,00';
    return;
  }

  let total = 0;
  let totalItems = 0;

  cart.forEach((item, index) => {
    const subtotal = formatPrice(item.price) * item.quantity;

    total += subtotal;
    totalItems += item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <h4>${item.name}</h4>
      <p>Preço: ${item.price}</p>

      <div class="cart-actions">
        <button onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remover</button>
      </div>

      <strong>Subtotal: R$ ${formatCurrency(subtotal)}</strong>
    `;

    cartItems.appendChild(cartItem);
  });

  cartCount.textContent = totalItems;
  cartTotal.textContent = `Total: R$ ${formatCurrency(total)}`;
}

function addToCart(product) {
  const productExists = cart.find((item) => item.name === product.name);

  if (productExists) {
    productExists.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCart();
  alert(`${product.name} adicionado ao carrinho!`);
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  updateCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function finalizarCompra() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio. Adicione produtos para finalizar a compra.');
    return;
  }

  let mensagem = '🛒 *Pedido Valentina Artesanatos*%0A%0A';
  let total = 0;

  cart.forEach((item) => {
    const subtotal = formatPrice(item.price) * item.quantity;
    total += subtotal;

    mensagem += `🧶 Produto: ${item.name}%0A`;
    mensagem += `Quantidade: ${item.quantity}%0A`;
    mensagem += `Subtotal: R$ ${formatCurrency(subtotal)}%0A%0A`;
  });

  mensagem += `💰 *Total: R$ ${formatCurrency(total)}*%0A%0A`;
  mensagem += 'Olá! Gostaria de finalizar este pedido.';

  const telefone = '5521974089973';
  const url = `https://wa.me/${telefone}?text=${mensagem}`;

  window.open(url, '_blank');
}

products.forEach((product) => {
  const card = document.createElement('article');
  card.classList.add('product-card');

  card.innerHTML = `
    <button class="favorite">♡</button>
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <h3>${product.name}</h3>
      <strong>${product.price}</strong>
      <button class="add-cart">Comprar</button>
    </div>
  `;

  card.querySelector('.add-cart').addEventListener('click', () => {
    addToCart(product);
  });

  card.querySelector('.favorite').addEventListener('click', (event) => {
    event.target.textContent = event.target.textContent === '♡' ? '♥' : '♡';
  });

  productGrid.appendChild(card);
});

cartButton.addEventListener('click', () => {
  cartModal.classList.add('active');
  updateCart();
});

closeCart.addEventListener('click', () => {
  cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.classList.remove('active');
  }
});

menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  alert(`Obrigado! O e-mail ${email} foi cadastrado com sucesso.`);
  newsletterForm.reset();
});

updateCart();