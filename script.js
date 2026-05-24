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

let cart = 0;

products.forEach((product) => {
  const card = document.createElement('article');
  card.classList.add('product-card');

  card.innerHTML = `
    <button class="favorite">♡</button>
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <h3>${product.name}</h3>
      <strong>${product.price}</strong>
      <button class="add-cart">Ver produto</button>
    </div>
  `;

  card.querySelector('.add-cart').addEventListener('click', () => {
    cart++;
    cartCount.textContent = cart;
    alert(`${product.name} adicionado ao carrinho!`);
  });

  card.querySelector('.favorite').addEventListener('click', (event) => {
    event.target.textContent = event.target.textContent === '♡' ? '♥' : '♡';
  });

  productGrid.appendChild(card);
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
