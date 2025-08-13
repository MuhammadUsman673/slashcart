document.addEventListener('DOMContentLoaded', () => {
  // UI Elements
  const searchIcon = document.getElementById('search');
  const cartIcon = document.getElementById('cart');
  const searchSection = document.getElementById('searchSection');
  const closeSearch = document.getElementById('closeSearch');
  const backgroundVideo = document.querySelector('.background-video');
  const cartPopup = document.getElementById('cartPopup');
  const closeCart = document.getElementById('closeCart');
  const navbar = document.querySelector('.navbar');
  
  // Initialize all components
  initSearch();
  initCart();
  initCollectionsSlider();
  initProductsSlider();
  initCapsuleSlider();
  initFavoritesCarousel();
  initNewsletter();
  initQuantityControls();
  initMobileMenu();
  initProductModals();

  // Search functionality
  function initSearch() {
    searchIcon.addEventListener('click', (e) => {
      e.preventDefault();
      searchSection.classList.add('active');
    });

    closeSearch.addEventListener('click', () => {
      searchSection.classList.remove('active');
    });
  }

  // Cart functionality
  function initCart() {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      cartPopup.classList.add('active');
      navbar.classList.add('cart-open');
    });

    closeCart.addEventListener('click', () => {
      cartPopup.classList.remove('active');
      navbar.classList.remove('cart-open');
    });

    document.addEventListener('click', (e) => {
      if (cartPopup.classList.contains('active') &&
          !cartPopup.contains(e.target) &&
          !cartIcon.contains(e.target)) {
        cartPopup.classList.remove('active');
        navbar.classList.remove('cart-open');
      }
    });
  }

  // Collections slider
  function initCollectionsSlider() {
    const collectionsContainer = document.querySelector('.collections-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    const totalSlides = 3;

    function updateSlider() {
      const offset = -currentSlide * (433.53 + 50);
      collectionsContainer.style.transform = `translateX(${offset}px)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
      });
    });
  }

  // Products slider and filter
  function initProductsSlider() {
    const productsData = {
      coffee: [
        { 
          img: "assets/new5.jpg", 
          name: "Panama Coffee", 
          desc: "Introducing EI vergel Estate, a vibrant new coffee from the Bayter's family innovative farm in Frensco .Tolima.This red and yelloe catura variety.", 
          price: "£13.50" 
        },
        { 
          img: "assets/new6.jpg", 
          name: "Peru Coffee", 
          desc: "Introducing EI vergel Estate, a vibrant new coffee from the Bayter's family innovative farm in Frensco .Tolima.This red and yelloe catura variety.", 
          price: "£13.50" 
        },
      ],
      capsule: [
        { 
          img: "assets/new8.png", 
          name: "Capsule Espresso",  
          desc: "Rich flavor capsule coffee with intense aroma and perfect crema. Ideal for espresso lovers who want convenience without compromising quality.", 
          price: "£10.00" 
        },
        { 
          img: "assets/new9.png", 
          name: "Capsule Decaf", 
          desc: "Rich flavor capsule coffee with intense aroma and perfect crema. Ideal for espresso lovers who want convenience without compromising quality.", 
          price: "£9.50" 
        },
      ],
      all: []
    };
    productsData.all = [...productsData.coffee, ...productsData.capsule];

    const productsContainer = document.getElementById("products-container");
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const leftImages = document.getElementById("left-images");
    let currentSlide = 0;
    const totalSlides = Math.ceil(productsData.all.length / 2);

    function renderProducts(type) {
      productsContainer.innerHTML = "";
      productsData[type].forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.desc}</p>
          <div class="price">${product.price}</div>
          <a href="#" class="shop-now">Shop Now</a>
        `;
        productsContainer.appendChild(card);
      });

      // Update left images based on product type
      leftImages.innerHTML = type === "capsule" ? `
        <div class="img-item single-view"><img src="assets/new7.jpg" alt="Capsule"><span>See More</span></div>
      ` : `
        <div class="img-grid">
          <div class="img-item"><img src="assets/new1.jpg" alt="Coffee 1"><span>See More</span></div>
          <div class="img-item"><img src="assets/new2.jpg" alt="Coffee 2"><span>See More</span></div>
          <div class="img-item"><img src="assets/new3.png" alt="Coffee 3"><span>See More</span></div>
          <div class="img-item"><img src="assets/new4.jpg" alt="Coffee 4"><span>See More</span></div>
        </div>
      `;

      currentSlide = 0;
      updateProductSlider();
    }

    function updateProductSlider() {
      productsContainer.style.transform = `translateX(-${currentSlide * 50}%)`;
    }

    document.querySelector(".nav.next").addEventListener("click", () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateProductSlider();
      }
    });

    document.querySelector(".nav.prev").addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateProductSlider();
      }
    });

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(btn.dataset.filter);
      });
    });

    // Default load
    renderProducts("coffee");
  }

  // Capsule slider
  function initCapsuleSlider() {
    const capsuleData = [
      {
        title: "Clifton Capsules",
        desc: "The wait is finally over, our capsules are back and better than ever. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...",
        img: "assets/capsule1.jpg"
      },
      {
        title: "Clifton Coffee",
        desc: "Not only five centuries, but the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s...",
        img: "assets/cap1.jpg"
      },
      {
        title: "Clifton Roasters",
        desc: "We offer a selection of carefully crafted capsules designed for every taste. Discover the richness of our blends...",
        img: "assets/col2.jpg"
      }
    ];

    const title = document.getElementById("capsule-title");
    const desc = document.getElementById("capsule-desc");
    const image = document.getElementById("capsule-image");
    const dots = document.querySelectorAll(".dot");

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const index = dot.dataset.index;
        title.textContent = capsuleData[index].title;
        desc.textContent = capsuleData[index].desc;
        image.src = capsuleData[index].img;
        dots.forEach(d => d.classList.remove("active"));
        dot.classList.add("active");
      });
    });
  }

  // Favorites carousel
  function initFavoritesCarousel() {
    const dots = document.querySelectorAll('#carousel-dots .dot');
    const track = document.getElementById('favorites-track');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    let currentSlide = 0;
    const totalSlides = dots.length;

    function updateCarousel() {
      const cardWidth = track.querySelector('.favorite-card').offsetWidth;
      const gap = parseFloat(getComputedStyle(track).gap || 20);
      const offset = currentSlide * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.dataset.slide);
        updateCarousel();
      });
    });

    updateCarousel();
  }

  // Newsletter form
  function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector("input").value;
        if (email) {
          alert(`Thanks for subscribing with ${email}!`);
          e.target.reset();
        }
      });
    }
  }

  // Quantity controls
  function initQuantityControls() {
    const minusBtn = document.querySelector('.quantity-btn:first-child');
    const plusBtn = document.querySelector('.quantity-btn:last-child');
    const qtyDisplay = document.querySelector('.quantity-number');
    let quantity = 1;

    if (minusBtn && plusBtn && qtyDisplay) {
      minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          qtyDisplay.textContent = quantity;
        }
      });

      plusBtn.addEventListener('click', () => {
        quantity++;
        qtyDisplay.textContent = quantity;
      });
    }
  }

  // Mobile menu
  function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    if (!mobileToggle) return;

    const navbar = document.querySelector('.navbar');
    const navbarLeft = document.querySelector('.navbar__left');
    const navbarRight = document.querySelector('.navbar__right');

    mobileToggle.addEventListener('click', function() {
      navbar.classList.toggle('navbar--mobile-active');
      navbarLeft.classList.toggle('active');
      navbarRight.classList.toggle('active');

      // Toggle icon
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');

      // Close any open mega menus
      document.querySelectorAll('.mega-menu.active').forEach(menu => {
        menu.classList.remove('active');
        const dropdownIcon = menu.previousElementSibling.querySelector('.dropdown-icon');
        if (dropdownIcon) dropdownIcon.classList.remove('active');
      });
    });

    // Mobile menu dropdowns
    document.querySelectorAll('.navbar__item').forEach(item => {
      const link = item.querySelector('.navbar__link');
      const megaMenu = item.querySelector('.mega-menu');

      if (megaMenu) {
        link.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();

            // Close other menus
            document.querySelectorAll('.mega-menu').forEach(menu => {
              if (menu !== megaMenu) {
                menu.classList.remove('active');
                menu.previousElementSibling.querySelector('.dropdown-icon')?.classList.remove('active');
              }
            });

            // Toggle current menu
            megaMenu.classList.toggle('active');
            const dropdownIcon = this.querySelector('.dropdown-icon');
            if (dropdownIcon) dropdownIcon.classList.toggle('active');
          }
        });
      }
    });
  }

  // Product modals
  function initProductModals() {
    document.querySelectorAll('.buy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.favorite-card');
        const modal = card.querySelector('.buy-modal');
        modal.style.display = 'flex';
      });
    });

    document.querySelectorAll('.close-modal').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.buy-modal');
        modal.style.display = 'none';
      });
    });

    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('buy-modal')) {
        e.target.style.display = 'none';
      }
    });
  }
});