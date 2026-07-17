const products = [
  {
    id: "air-tee-001",
    name: "Áo thun AIR cổ tròn",
    category: "Áo thun",
    price: 299000,
    rating: 4.9,
    badge: "Bán chạy",
    tone: "sky",
    colors: ["Trắng", "Xanh nhạt", "Đen"],
    sizes: ["S", "M", "L", "XL"],
    description: "Áo thun mềm nhẹ, khô nhanh, phù hợp mặc trong nhà, đi làm hoặc đi chơi cuối tuần.",
  },
  {
    id: "air-polo-002",
    name: "Polo Dry-EX",
    category: "Polo",
    price: 399000,
    rating: 4.8,
    badge: "Mới",
    tone: "white",
    colors: ["Trắng", "Xanh navy", "Be"],
    sizes: ["S", "M", "L", "XL"],
    description: "Polo gọn gàng với bề mặt vải mịn, co giãn tốt, giữ vẻ lịch sự trong ngày nóng.",
  },
  {
    id: "uv-jacket-003",
    name: "Áo khoác UV nhẹ",
    category: "Áo khoác",
    price: 599000,
    rating: 4.7,
    badge: "UPF 50+",
    tone: "gray",
    colors: ["Ghi", "Xanh nhạt", "Đen"],
    sizes: ["M", "L", "XL"],
    description: "Áo khoác chống nắng mỏng nhẹ, dễ gấp gọn, phù hợp di chuyển ngoài trời.",
  },
  {
    id: "seamless-004",
    name: "Đồ lót seamless",
    category: "Đồ lót",
    price: 199000,
    rating: 4.6,
    badge: "Cơ bản",
    tone: "navy",
    colors: ["Đen", "Ghi", "Be"],
    sizes: ["S", "M", "L", "XL"],
    description: "Thiết kế ít đường may, mềm mịn trên da, hạn chế đường hằn khi mặc cả ngày.",
  },
  {
    id: "tank-005",
    name: "Áo ba lỗ AIR mesh",
    category: "Áo thun",
    price: 249000,
    rating: 4.5,
    badge: "Thoáng khí",
    tone: "sage",
    colors: ["Trắng", "Xám", "Xanh olive"],
    sizes: ["S", "M", "L"],
    description: "Lớp lót thoáng khí cho áo sơ mi hoặc mặc riêng trong ngày nghỉ.",
  },
  {
    id: "overshirt-006",
    name: "Áo sơ mi overshirt mát nhẹ",
    category: "Áo khoác",
    price: 799000,
    rating: 4.8,
    badge: "Premium",
    tone: "sand",
    colors: ["Be", "Xanh navy"],
    sizes: ["M", "L", "XL"],
    description: "Overshirt mỏng nhẹ, dễ layer với áo thun AIR cho phong cách tối giản.",
  },
  {
    id: "polo-knit-007",
    name: "Polo knit thoáng mát",
    category: "Polo",
    price: 499000,
    rating: 4.7,
    badge: "Văn phòng",
    tone: "sky",
    colors: ["Xanh", "Trắng", "Nâu"],
    sizes: ["S", "M", "L", "XL"],
    description: "Chất knit nhẹ tạo vẻ chỉn chu nhưng vẫn thoáng trong môi trường công sở.",
  },
  {
    id: "boxer-008",
    name: "Boxer AIR cotton blend",
    category: "Đồ lót",
    price: 229000,
    rating: 4.4,
    badge: "Combo",
    tone: "white",
    colors: ["Đen", "Ghi"],
    sizes: ["S", "M", "L", "XL"],
    description: "Cotton blend mềm và co giãn, phù hợp sử dụng hằng ngày.",
  },
];

const state = {
  search: "",
  category: "all",
  sort: "featured",
  maxPrice: 799000,
  cart: JSON.parse(localStorage.getItem("airplus_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("airplus_wishlist") || "[]"),
  promo: localStorage.getItem("airplus_promo") || "",
};

const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const productGrid = $("[data-product-grid]");
const emptyState = $("[data-empty-state]");
const cartDrawer = $("[data-cart-drawer]");
const backdrop = $("[data-backdrop]");
const productModal = $("[data-product-modal]");
const toast = $("[data-toast]");

function formatPrice(value) {
  return money.format(value).replace("₫", "đ");
}

function saveState() {
  localStorage.setItem("airplus_cart", JSON.stringify(state.cart));
  localStorage.setItem("airplus_wishlist", JSON.stringify(state.wishlist));
  localStorage.setItem("airplus_promo", state.promo);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function getFilteredProducts() {
  const keyword = state.search.trim().toLowerCase();
  let list = products.filter((product) => {
    const matchesSearch = !keyword || [product.name, product.category, product.description].join(" ").toLowerCase().includes(keyword);
    const matchesCategory = state.category === "all" || product.category === state.category;
    const matchesPrice = product.price <= state.maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (state.sort === "priceAsc") list = list.sort((a, b) => a.price - b.price);
  if (state.sort === "priceDesc") list = list.sort((a, b) => b.price - a.price);
  if (state.sort === "ratingDesc") list = list.sort((a, b) => b.rating - a.rating);
  if (state.sort === "featured") list = list.sort((a, b) => products.indexOf(a) - products.indexOf(b));
  return list;
}

function productCard(product) {
  const wished = state.wishlist.includes(product.id);
  return `
    <article class="product-card">
      <button class="wish-button ${wished ? "active" : ""}" type="button" aria-label="Yêu thích ${product.name}" data-toggle-wishlist="${product.id}">♥</button>
      <div class="product-art ${product.tone}">
        <span class="badge">${product.badge}</span>
        <div class="shirt-shape"></div>
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <strong>${formatPrice(product.price)}</strong>
          <span class="rating">★ ${product.rating}</span>
        </div>
      </div>
      <div class="product-actions">
        <button type="button" data-quick-view="${product.id}">Xem nhanh</button>
        <button type="button" data-add-cart="${product.id}">Thêm giỏ</button>
      </div>
    </article>`;
}

function renderProducts() {
  const list = getFilteredProducts();
  productGrid.innerHTML = list.map(productCard).join("");
  emptyState.hidden = list.length > 0;
  $("[data-result-count]").textContent = list.length;
  $("[data-price-label]").textContent = formatPrice(state.maxPrice);

  $$('[data-category-tab]').forEach((button) => button.classList.toggle("active", button.dataset.categoryTab === state.category));
}

function cartKey(item) {
  return `${item.id}__${item.size}__${item.color}`;
}

function addToCart(productId, size = "M", color) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  const selectedColor = color || product.colors[0];
  const newLine = { id: product.id, size, color: selectedColor, qty: 1 };
  const existing = state.cart.find((line) => cartKey(line) === cartKey(newLine));
  if (existing) existing.qty += 1;
  else state.cart.push(newLine);
  saveState();
  renderCart();
  showToast(`Đã thêm ${product.name} vào giỏ hàng`);
}

function toggleWishlist(productId) {
  if (state.wishlist.includes(productId)) {
    state.wishlist = state.wishlist.filter((id) => id !== productId);
    showToast("Đã bỏ khỏi yêu thích");
  } else {
    state.wishlist.push(productId);
    showToast("Đã thêm vào yêu thích");
  }
  saveState();
  renderProducts();
  renderCounters();
}

function renderCounters() {
  const count = state.cart.reduce((total, line) => total + line.qty, 0);
  $("[data-cart-count]").textContent = count;
  $("[data-wishlist-count]").textContent = state.wishlist.length;
}

function renderCart() {
  const container = $("[data-cart-items]");
  if (!state.cart.length) {
    container.innerHTML = `<div class="empty-state"><h3>Giỏ hàng trống</h3><p>Hãy thêm sản phẩm bạn thích vào giỏ hàng.</p></div>`;
  } else {
    container.innerHTML = state.cart.map((line) => {
      const product = products.find((item) => item.id === line.id);
      if (!product) return "";
      return `
        <article class="cart-line">
          <div class="cart-thumb"><span></span></div>
          <div>
            <h3>${product.name}</h3>
            <p>${line.color} / ${line.size} · ${formatPrice(product.price)}</p>
            <div class="qty-control" aria-label="Số lượng">
              <button type="button" data-change-qty="${cartKey(line)}" data-delta="-1">−</button>
              <span>${line.qty}</span>
              <button type="button" data-change-qty="${cartKey(line)}" data-delta="1">+</button>
            </div>
          </div>
          <button class="remove-button" type="button" data-remove-line="${cartKey(line)}">Xóa</button>
        </article>`;
    }).join("");
  }

  const subtotal = state.cart.reduce((total, line) => {
    const product = products.find((item) => item.id === line.id);
    return total + (product ? product.price * line.qty : 0);
  }, 0);
  const discount = state.promo === "AIR10" ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal === 0 || subtotal >= 999000 ? 0 : 30000;
  const total = Math.max(subtotal - discount + shipping, 0);

  $("[data-subtotal]").textContent = formatPrice(subtotal);
  $("[data-discount]").textContent = `-${formatPrice(discount)}`;
  $("[data-shipping]").textContent = shipping ? formatPrice(shipping) : "Miễn phí";
  $("[data-total]").textContent = formatPrice(total);
  $("[data-promo-input]").value = state.promo;
  renderCounters();
}

function changeQty(key, delta) {
  const line = state.cart.find((item) => cartKey(item) === key);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) state.cart = state.cart.filter((item) => cartKey(item) !== key);
  saveState();
  renderCart();
}

function removeLine(key) {
  state.cart = state.cart.filter((item) => cartKey(item) !== key);
  saveState();
  renderCart();
  showToast("Đã xóa sản phẩm khỏi giỏ");
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  if (productModal.hidden) backdrop.hidden = true;
}

function openQuickView(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  const sizeButtons = product.sizes.map((size, index) => `<button class="${index === 1 ? "active" : ""}" type="button" data-size="${size}">${size}</button>`).join("");
  const colorButtons = product.colors.map((color, index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-color="${color}">${color}</button>`).join("");
  productModal.innerHTML = `
    <div class="modal-card">
      <button class="close-button" type="button" data-close-modal aria-label="Đóng">×</button>
      <div class="modal-art product-art ${product.tone}"><div class="shirt-shape"></div></div>
      <div class="modal-body">
        <p class="kicker">${product.category}</p>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="modal-price">${formatPrice(product.price)}</div>
        <div class="option-group"><strong>Size</strong><div class="option-row">${sizeButtons}</div></div>
        <div class="option-group"><strong>Màu sắc</strong><div class="option-row">${colorButtons}</div></div>
        <div class="modal-actions">
          <button class="primary-link" type="button" data-modal-add="${product.id}">Thêm vào giỏ</button>
          <button class="secondary-link" type="button" data-toggle-wishlist="${product.id}">Yêu thích</button>
        </div>
      </div>
    </div>`;
  productModal.hidden = false;
}

function closeModal() {
  productModal.hidden = true;
  productModal.innerHTML = "";
}

function applyPromo() {
  const code = $("[data-promo-input]").value.trim().toUpperCase();
  if (!code) {
    state.promo = "";
    showToast("Đã xóa mã giảm giá");
  } else if (code === "AIR10") {
    state.promo = code;
    showToast("Đã áp dụng mã AIR10");
  } else {
    showToast("Mã giảm giá không hợp lệ");
    return;
  }
  saveState();
  renderCart();
}

function showWishlistOnly() {
  if (!state.wishlist.length) {
    showToast("Danh sách yêu thích đang trống");
    return;
  }
  state.search = "";
  state.category = "all";
  $("[data-search-input]").value = "";
  productGrid.innerHTML = products.filter((product) => state.wishlist.includes(product.id)).map(productCard).join("");
  $("[data-result-count]").textContent = state.wishlist.length;
  document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;

    if (target.matches("[data-open-cart]")) openCart();
    if (target.matches("[data-close-cart]")) closeCart();
    if (target.matches("[data-open-search]")) $("[data-search-panel]").hidden = false;
    if (target.matches("[data-close-search]")) $("[data-search-panel]").hidden = true;
    if (target.matches("[data-show-wishlist]")) showWishlistOnly();
    if (target.matches("[data-menu-toggle]")) $("[data-main-nav]").classList.toggle("open");
    if (target.matches("[data-category-tab]")) {
      state.category = target.dataset.categoryTab;
      $("[data-category-filter]").value = state.category;
      renderProducts();
      document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
    }
    if (target.matches("[data-add-cart]")) addToCart(target.dataset.addCart);
    if (target.matches("[data-quick-view]")) openQuickView(target.dataset.quickView);
    if (target.matches("[data-toggle-wishlist]")) toggleWishlist(target.dataset.toggleWishlist);
    if (target.matches("[data-change-qty]")) changeQty(target.dataset.changeQty, Number(target.dataset.delta));
    if (target.matches("[data-remove-line]")) removeLine(target.dataset.removeLine);
    if (target.matches("[data-apply-promo]")) applyPromo();
    if (target.matches("[data-close-modal]")) closeModal();
    if (target.matches("[data-size], [data-color]")) {
      $$(target.matches("[data-size]") ? "[data-size]" : "[data-color]", target.parentElement).forEach((button) => button.classList.remove("active"));
      target.classList.add("active");
    }
    if (target.matches("[data-modal-add]")) {
      const size = $("[data-size].active", productModal)?.dataset.size || "M";
      const color = $("[data-color].active", productModal)?.dataset.color;
      addToCart(target.dataset.modalAdd, size, color);
      closeModal();
      openCart();
    }
  });

  backdrop.addEventListener("click", closeCart);

  $("[data-search-input]").addEventListener("input", (event) => {
    state.search = event.target.value;
    renderProducts();
  });
  $("[data-global-search]").addEventListener("input", (event) => {
    state.search = event.target.value;
    $("[data-search-input]").value = state.search;
    renderProducts();
  });
  $("[data-global-search]").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      $("[data-search-panel]").hidden = true;
      document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
    }
  });
  $("[data-category-filter]").addEventListener("change", (event) => {
    state.category = event.target.value;
    renderProducts();
  });
  $("[data-sort-filter]").addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderProducts();
  });
  $("[data-price-filter]").addEventListener("input", (event) => {
    state.maxPrice = Number(event.target.value);
    renderProducts();
  });

  $("[data-newsletter-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.currentTarget.querySelector("input").value;
    localStorage.setItem("airplus_newsletter", email);
    event.currentTarget.reset();
    showToast("Cảm ơn bạn đã đăng ký nhận tin!");
  });

  $("[data-contact-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Đã nhận yêu cầu tư vấn. Chúng tôi sẽ liên hệ lại sớm.");
  });

  $("[data-checkout-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.cart.length) {
      showToast("Giỏ hàng đang trống");
      return;
    }
    const orderCode = `AIR${Math.floor(100000 + Math.random() * 900000)}`;
    state.cart = [];
    state.promo = "";
    saveState();
    renderCart();
    event.currentTarget.reset();
    closeCart();
    showToast(`Đặt hàng demo thành công: ${orderCode}`);
  });

  $$(".faq-item").forEach((item) => {
    item.addEventListener("click", () => {
      const expanded = item.getAttribute("aria-expanded") === "true";
      item.setAttribute("aria-expanded", String(!expanded));
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();
      closeModal();
      $("[data-search-panel]").hidden = true;
    }
  });
}

renderProducts();
renderCart();
bindEvents();
