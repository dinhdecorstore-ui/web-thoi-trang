const products = [
  { id: "air-tee-001", name: "Áo thun AIR cổ tròn", category: "Áo thun", price: 299000, oldPrice: 349000, rating: 4.9, badge: "Bán chạy", tone: "sky", stock: 42, colors: ["Trắng", "Xanh nhạt", "Đen"], sizes: ["S", "M", "L", "XL"], description: "Áo thun mềm nhẹ, khô nhanh, phù hợp mặc trong nhà, đi làm hoặc đi chơi cuối tuần.", material: "AIR cotton blend", care: "Giặt máy nước lạnh, không tẩy." },
  { id: "air-polo-002", name: "Polo Dry-EX", category: "Polo", price: 399000, oldPrice: 459000, rating: 4.8, badge: "Mới", tone: "white", stock: 31, colors: ["Trắng", "Xanh navy", "Be"], sizes: ["S", "M", "L", "XL"], description: "Polo gọn gàng với bề mặt vải mịn, co giãn tốt, giữ vẻ lịch sự trong ngày nóng.", material: "Dry pique", care: "Phơi nơi thoáng mát." },
  { id: "uv-jacket-003", name: "Áo khoác UV nhẹ", category: "Áo khoác", price: 599000, oldPrice: 699000, rating: 4.7, badge: "UPF 50+", tone: "gray", stock: 18, colors: ["Ghi", "Xanh nhạt", "Đen"], sizes: ["M", "L", "XL"], description: "Áo khoác chống nắng mỏng nhẹ, dễ gấp gọn, phù hợp di chuyển ngoài trời.", material: "Nylon stretch", care: "Không sấy nhiệt cao." },
  { id: "seamless-004", name: "Đồ lót seamless", category: "Đồ lót", price: 199000, oldPrice: 249000, rating: 4.6, badge: "Cơ bản", tone: "navy", stock: 65, colors: ["Đen", "Ghi", "Be"], sizes: ["S", "M", "L", "XL"], description: "Thiết kế ít đường may, mềm mịn trên da, hạn chế đường hằn khi mặc cả ngày.", material: "Microfiber", care: "Giặt riêng lần đầu." },
  { id: "tank-005", name: "Áo ba lỗ AIR mesh", category: "Áo thun", price: 249000, oldPrice: 299000, rating: 4.5, badge: "Thoáng khí", tone: "sage", stock: 37, colors: ["Trắng", "Xám", "Xanh olive"], sizes: ["S", "M", "L"], description: "Lớp lót thoáng khí cho áo sơ mi hoặc mặc riêng trong ngày nghỉ.", material: "Mesh air", care: "Không ủi trực tiếp logo." },
  { id: "overshirt-006", name: "Áo sơ mi overshirt mát nhẹ", category: "Áo khoác", price: 799000, oldPrice: 899000, rating: 4.8, badge: "Premium", tone: "sand", stock: 12, colors: ["Be", "Xanh navy"], sizes: ["M", "L", "XL"], description: "Overshirt mỏng nhẹ, dễ layer với áo thun AIR cho phong cách tối giản.", material: "Poly cotton", care: "Ủi nhiệt thấp." },
  { id: "polo-knit-007", name: "Polo knit thoáng mát", category: "Polo", price: 499000, oldPrice: 559000, rating: 4.7, badge: "Văn phòng", tone: "sky", stock: 23, colors: ["Xanh", "Trắng", "Nâu"], sizes: ["S", "M", "L", "XL"], description: "Chất knit nhẹ tạo vẻ chỉn chu nhưng vẫn thoáng trong môi trường công sở.", material: "Cool knit", care: "Phơi ngang giữ phom." },
  { id: "boxer-008", name: "Boxer AIR cotton blend", category: "Đồ lót", price: 229000, oldPrice: 269000, rating: 4.4, badge: "Combo", tone: "white", stock: 70, colors: ["Đen", "Ghi"], sizes: ["S", "M", "L", "XL"], description: "Cotton blend mềm và co giãn, phù hợp sử dụng hằng ngày.", material: "Cotton modal", care: "Giặt túi lưới." },
  { id: "shorts-009", name: "Quần short nylon nhanh khô", category: "Quần", price: 459000, oldPrice: 529000, rating: 4.6, badge: "Du lịch", tone: "sage", stock: 28, colors: ["Đen", "Xanh rêu", "Be"], sizes: ["S", "M", "L", "XL"], description: "Quần short nhẹ, nhiều túi, nhanh khô sau vận động hoặc du lịch biển.", material: "Nylon quick dry", care: "Giặt máy chế độ nhẹ." },
  { id: "pants-010", name: "Quần dài smart ankle", category: "Quần", price: 699000, oldPrice: 799000, rating: 4.9, badge: "Smart", tone: "gray", stock: 16, colors: ["Đen", "Ghi", "Navy"], sizes: ["S", "M", "L", "XL"], description: "Quần dài co giãn, đứng phom, phù hợp đi làm và gặp khách hàng.", material: "Stretch twill", care: "Ủi mặt trái." },
];

const app = document.querySelector("#app");
const toast = document.querySelector("[data-toast]");
const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
const categories = ["all", ...new Set(products.map((p) => p.category))];
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const state = {
  search: "",
  category: "all",
  sort: "featured",
  maxPrice: 900000,
  cart: load("airplus_cart", []),
  wishlist: load("airplus_wishlist", []),
  orders: load("airplus_orders", []),
  user: load("airplus_user", null),
  promo: localStorage.getItem("airplus_promo") || "",
};

function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function save() {
  localStorage.setItem("airplus_cart", JSON.stringify(state.cart));
  localStorage.setItem("airplus_wishlist", JSON.stringify(state.wishlist));
  localStorage.setItem("airplus_orders", JSON.stringify(state.orders));
  localStorage.setItem("airplus_user", JSON.stringify(state.user));
  localStorage.setItem("airplus_promo", state.promo);
}
function price(v) { return money.format(v).replace("₫", "đ"); }
function routeTo(hash) { location.hash = hash; window.scrollTo({ top: 0, behavior: "smooth" }); }
function showToast(msg) { toast.textContent = msg; toast.classList.add("show"); clearTimeout(showToast.t); showToast.t = setTimeout(() => toast.classList.remove("show"), 2400); }
function product(id) { return products.find((p) => p.id === id); }
function cartKey(line) { return `${line.id}|${line.size}|${line.color}`; }

function totals() {
  const subtotal = state.cart.reduce((sum, line) => sum + (product(line.id)?.price || 0) * line.qty, 0);
  const discount = state.promo === "AIR10" ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal === 0 || subtotal >= 999000 ? 0 : 30000;
  return { subtotal, discount, shipping, total: Math.max(subtotal - discount + shipping, 0) };
}

function filteredProducts() {
  const q = state.search.trim().toLowerCase();
  let list = products.filter((p) => {
    const text = [p.name, p.category, p.description, p.badge].join(" ").toLowerCase();
    return (!q || text.includes(q)) && (state.category === "all" || p.category === state.category) && p.price <= state.maxPrice;
  });
  if (state.sort === "priceAsc") list.sort((a, b) => a.price - b.price);
  if (state.sort === "priceDesc") list.sort((a, b) => b.price - a.price);
  if (state.sort === "ratingDesc") list.sort((a, b) => b.rating - a.rating);
  return list;
}

function layout(title, body) {
  app.innerHTML = `<div class="page-head"><p class="kicker">AIR+ STORE</p><h1>${title}</h1></div>${body}`;
  updateCounters();
}

function homePage() {
  app.innerHTML = `
    <section class="home-hero">
      <div>
        <p class="kicker">Full ecommerce demo</p>
        <h1>Web thời trang bán hàng hoàn chỉnh.</h1>
        <p>Không còn là landing page: có danh mục, chi tiết sản phẩm, giỏ hàng, checkout, tài khoản, đơn hàng và hỗ trợ.</p>
        <div class="hero-actions"><a class="primary-link" href="#/shop">Mua sắm ngay</a><a class="secondary-link" href="#/account">Đăng nhập demo</a></div>
      </div>
      <div class="hero-visual"><div class="model-card model-one"><span>AIR TEE</span></div><div class="model-card model-two"><span>POLO</span></div><b>NEW<br>DROP</b></div>
    </section>
    <section class="quick-cats">${categories.filter(c => c !== "all").map(c => `<a href="#/shop?cat=${encodeURIComponent(c)}"><span>${c}</span><strong>${products.filter(p => p.category === c).length}</strong></a>`).join("")}</section>
    <section class="section-block"><div class="section-title"><h2>Sản phẩm nổi bật</h2><a href="#/shop">Xem tất cả</a></div><div class="product-grid">${products.slice(0, 4).map(productCard).join("")}</div></section>
    <section class="service-grid"><article><h3>Thanh toán demo</h3><p>Mô phỏng đặt hàng và lưu đơn trong trình duyệt.</p></article><article><h3>Quản lý đơn</h3><p>Xem lại trạng thái đơn, mã đơn và tổng tiền.</p></article><article><h3>Wishlist</h3><p>Lưu sản phẩm yêu thích trong tài khoản demo.</p></article></section>`;
}

function shopPage(params = new URLSearchParams()) {
  if (params.get("cat")) state.category = params.get("cat");
  const list = filteredProducts();
  layout("Cửa hàng", `
    <div class="shop-layout">
      <aside class="filters">
        <label>Tìm kiếm<input data-search-input type="search" value="${escapeHtml(state.search)}" placeholder="Tên sản phẩm..." /></label>
        <label>Danh mục<select data-category-filter>${categories.map(c => `<option value="${c}" ${state.category === c ? "selected" : ""}>${c === "all" ? "Tất cả" : c}</option>`).join("")}</select></label>
        <label>Sắp xếp<select data-sort-filter><option value="featured">Nổi bật</option><option value="priceAsc" ${state.sort === "priceAsc" ? "selected" : ""}>Giá tăng dần</option><option value="priceDesc" ${state.sort === "priceDesc" ? "selected" : ""}>Giá giảm dần</option><option value="ratingDesc" ${state.sort === "ratingDesc" ? "selected" : ""}>Đánh giá cao</option></select></label>
        <label>Giá tối đa: <strong>${price(state.maxPrice)}</strong><input data-price-filter type="range" min="199000" max="900000" step="50000" value="${state.maxPrice}" /></label>
        <button class="secondary-link" type="button" data-reset-filter>Đặt lại lọc</button>
      </aside>
      <section><div class="shop-summary"><strong>${list.length} sản phẩm</strong><span>Click vào sản phẩm để xem trang chi tiết.</span></div><div class="product-grid">${list.map(productCard).join("") || empty("Không tìm thấy sản phẩm", "Thử đổi bộ lọc hoặc từ khóa.")}</div></section>
    </div>`);
}

function productCard(p) {
  const wished = state.wishlist.includes(p.id);
  return `<article class="product-card">
    <button class="wish-button ${wished ? "active" : ""}" type="button" data-wishlist="${p.id}">♥</button>
    <a href="#/product/${p.id}" class="product-art ${p.tone}"><span class="badge">${p.badge}</span><div class="shirt-shape"></div></a>
    <div class="product-body"><a href="#/product/${p.id}"><h3>${p.name}</h3></a><p>${p.description}</p><div class="product-meta"><strong>${price(p.price)}</strong><span>★ ${p.rating}</span></div></div>
    <div class="product-actions"><a href="#/product/${p.id}">Chi tiết</a><button type="button" data-add-cart="${p.id}">Thêm giỏ</button></div>
  </article>`;
}

function productPage(id) {
  const p = product(id);
  if (!p) return notFound();
  const related = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  layout(p.name, `<section class="product-detail">
    <div class="product-art detail-art ${p.tone}"><span class="badge">${p.badge}</span><div class="shirt-shape big"></div></div>
    <div class="detail-info"><p class="kicker">${p.category} · Còn ${p.stock}</p><h2>${p.name}</h2><p>${p.description}</p><div class="price-row"><strong>${price(p.price)}</strong><del>${price(p.oldPrice)}</del><span>★ ${p.rating}</span></div>
      <label>Size<select data-detail-size>${p.sizes.map(s => `<option>${s}</option>`).join("")}</select></label>
      <label>Màu sắc<select data-detail-color>${p.colors.map(c => `<option>${c}</option>`).join("")}</select></label>
      <div class="detail-actions"><button class="primary-link" type="button" data-detail-add="${p.id}">Thêm vào giỏ</button><button class="secondary-link" type="button" data-wishlist="${p.id}">Thêm yêu thích</button></div>
      <div class="detail-tabs"><details open><summary>Chất liệu</summary><p>${p.material}</p></details><details><summary>Bảo quản</summary><p>${p.care}</p></details><details><summary>Giao hàng</summary><p>Giao tiêu chuẩn 2-4 ngày. Miễn phí từ 999.000đ.</p></details></div>
    </div>
  </section><section class="section-block"><div class="section-title"><h2>Sản phẩm liên quan</h2><a href="#/shop?cat=${encodeURIComponent(p.category)}">Xem danh mục</a></div><div class="product-grid">${related.map(productCard).join("")}</div></section>`);
}

function cartPage() {
  const t = totals();
  layout("Giỏ hàng", `<div class="cart-page"><section class="cart-lines">${state.cart.length ? state.cart.map(cartLine).join("") : empty("Giỏ hàng trống", "Hãy thêm sản phẩm từ cửa hàng.")}</section>${summaryBox(t, true)}</div>`);
}
function cartLine(line) {
  const p = product(line.id);
  if (!p) return "";
  return `<article class="cart-line"><div class="cart-thumb ${p.tone}"><span></span></div><div><h3><a href="#/product/${p.id}">${p.name}</a></h3><p>${line.color} / ${line.size} · ${price(p.price)}</p><div class="qty-control"><button data-qty="${cartKey(line)}" data-delta="-1">−</button><span>${line.qty}</span><button data-qty="${cartKey(line)}" data-delta="1">+</button></div></div><button class="remove-button" data-remove="${cartKey(line)}">Xóa</button></article>`;
}
function summaryBox(t, withCheckout) {
  return `<aside class="summary-box"><h2>Tổng đơn</h2><div><span>Tạm tính</span><strong>${price(t.subtotal)}</strong></div><div><span>Giảm giá</span><strong>-${price(t.discount)}</strong></div><div><span>Giao hàng</span><strong>${t.shipping ? price(t.shipping) : "Miễn phí"}</strong></div><div class="total"><span>Tổng cộng</span><strong>${price(t.total)}</strong></div><div class="promo-form"><input data-promo-input value="${state.promo}" placeholder="Mã AIR10" /><button data-apply-promo>Áp dụng</button></div>${withCheckout ? `<a class="primary-link wide" href="#/checkout">Thanh toán</a>` : ""}</aside>`;
}

function checkoutPage() {
  if (!state.cart.length) return cartPage();
  const t = totals();
  layout("Thanh toán", `<div class="checkout-layout"><form class="checkout-main" data-checkout-form>
    <h2>Thông tin giao hàng</h2><div class="form-grid"><input name="name" required placeholder="Họ tên" value="${state.user?.name || ""}" /><input name="phone" required placeholder="Số điện thoại" /><input name="email" type="email" required placeholder="Email" value="${state.user?.email || ""}" /><select name="city"><option>TP.HCM</option><option>Hà Nội</option><option>Đà Nẵng</option><option>Cần Thơ</option></select></div><input name="address" required placeholder="Địa chỉ nhận hàng" />
    <h2>Phương thức thanh toán</h2><div class="payment-methods"><label><input type="radio" name="payment" value="COD" checked /> Thanh toán khi nhận hàng</label><label><input type="radio" name="payment" value="Bank" /> Chuyển khoản ngân hàng</label><label><input type="radio" name="payment" value="Card" /> Thẻ nội địa demo</label></div>
    <textarea name="note" rows="4" placeholder="Ghi chú đơn hàng"></textarea><button class="primary-link wide" type="submit">Đặt hàng</button>
  </form>${summaryBox(t, false)}</div>`);
}

function accountPage() {
  const user = state.user;
  layout("Tài khoản", `<div class="account-layout"><section class="account-card">${user ? `<h2>Xin chào, ${user.name}</h2><p>${user.email}</p><div class="account-actions"><a class="secondary-link" href="#/orders">Xem đơn hàng</a><button class="secondary-link" data-logout>Đăng xuất</button></div>` : `<h2>Đăng nhập demo</h2><p>Tạo tài khoản demo trên trình duyệt để lưu đơn hàng và wishlist.</p><form data-login-form><input name="name" required placeholder="Tên của bạn" /><input name="email" type="email" required placeholder="Email" /><button class="primary-link" type="submit">Đăng nhập / Tạo tài khoản</button></form>`}</section><section class="account-card"><h2>Wishlist</h2><div class="mini-list">${state.wishlist.length ? state.wishlist.map(id => product(id)).filter(Boolean).map(p => `<a href="#/product/${p.id}">${p.name}<strong>${price(p.price)}</strong></a>`).join("") : "<p>Chưa có sản phẩm yêu thích.</p>"}</div></section></div>`);
}

function ordersPage() {
  layout("Đơn hàng", `<section class="orders-list">${state.orders.length ? state.orders.map(o => `<article><div><h3>${o.code}</h3><p>${o.date} · ${o.items.length} sản phẩm · ${o.payment}</p></div><strong>${price(o.total)}</strong><span>${o.status}</span></article>`).join("") : empty("Chưa có đơn hàng", "Sau khi checkout, đơn demo sẽ hiện ở đây.")}</section>`);
}

function lookbookPage() { layout("Lookbook", `<section class="lookbook-page"><article><h2>Đi làm</h2><p>Polo Dry-EX + Smart ankle pants.</p></article><article><h2>Cuối tuần</h2><p>Áo thun AIR + short nylon.</p></article><article><h2>Du lịch</h2><p>Áo khoác UV + áo ba lỗ mesh.</p></article></section>`); }
function supportPage() { layout("Hỗ trợ", `<div class="support-layout"><form data-support-form><input name="name" required placeholder="Họ tên" /><input name="phone" required placeholder="Số điện thoại" /><select name="topic"><option>Tư vấn size</option><option>Đổi trả</option><option>Giao hàng</option></select><textarea required rows="5" placeholder="Nội dung cần hỗ trợ"></textarea><button class="primary-link" type="submit">Gửi hỗ trợ</button></form><section class="faq-box"><h2>FAQ</h2><details open><summary>Đổi trả thế nào?</summary><p>Đổi trả trong 30 ngày với sản phẩm còn nguyên tem.</p></details><details><summary>Thanh toán thật không?</summary><p>Đây là website demo, checkout không thu tiền thật.</p></details><details><summary>Host ở đâu?</summary><p>Đang chạy miễn phí bằng GitHub Pages.</p></details></section></div>`); }
function notFound() { layout("Không tìm thấy trang", `<section>${empty("Trang không tồn tại", "Quay lại cửa hàng để tiếp tục mua sắm.")}<a class="primary-link" href="#/shop">Về cửa hàng</a></section>`); }

function empty(title, text) { return `<div class="empty-state"><h3>${title}</h3><p>${text}</p></div>`; }
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

function addToCart(id, size = "M", color) {
  const p = product(id); if (!p) return;
  const line = { id, size, color: color || p.colors[0], qty: 1 };
  const old = state.cart.find(x => cartKey(x) === cartKey(line));
  old ? old.qty++ : state.cart.push(line);
  save(); updateCounters(); showToast(`Đã thêm ${p.name}`);
}
function toggleWishlist(id) { state.wishlist = state.wishlist.includes(id) ? state.wishlist.filter(x => x !== id) : [...state.wishlist, id]; save(); render(); showToast("Đã cập nhật yêu thích"); }
function changeQty(key, delta) { const line = state.cart.find(x => cartKey(x) === key); if (!line) return; line.qty += delta; if (line.qty <= 0) state.cart = state.cart.filter(x => cartKey(x) !== key); save(); render(); }
function removeLine(key) { state.cart = state.cart.filter(x => cartKey(x) !== key); save(); render(); showToast("Đã xóa sản phẩm"); }
function updateCounters() { $("[data-cart-count]").textContent = state.cart.reduce((s, x) => s + x.qty, 0); $("[data-wishlist-count]").textContent = state.wishlist.length; }

function render() {
  const raw = location.hash || "#/";
  const [path, qs = ""] = raw.slice(1).split("?");
  const params = new URLSearchParams(qs);
  if (path === "/") homePage();
  else if (path === "/shop") shopPage(params);
  else if (path.startsWith("/product/")) productPage(path.split("/")[2]);
  else if (path === "/cart") cartPage();
  else if (path === "/checkout") checkoutPage();
  else if (path === "/account") accountPage();
  else if (path === "/orders") ordersPage();
  else if (path === "/lookbook") lookbookPage();
  else if (path === "/support") supportPage();
  else notFound();
  updateActiveNav(); updateCounters();
}
function updateActiveNav() { const path = (location.hash || "#/").slice(1).split("?")[0]; $$(".main-nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${path}`)); }

function bind() {
  window.addEventListener("hashchange", render);
  document.addEventListener("click", (e) => {
    const el = e.target.closest("button, a"); if (!el) return;
    if (el.matches("[data-menu-toggle]")) $("[data-main-nav]").classList.toggle("open");
    if (el.matches("[data-search-focus]")) { e.preventDefault(); routeTo("#/shop"); setTimeout(() => $("[data-search-input]")?.focus(), 120); }
    if (el.matches("[data-add-cart]")) addToCart(el.dataset.addCart);
    if (el.matches("[data-detail-add]")) addToCart(el.dataset.detailAdd, $("[data-detail-size]")?.value || "M", $("[data-detail-color]")?.value);
    if (el.matches("[data-wishlist]")) toggleWishlist(el.dataset.wishlist);
    if (el.matches("[data-qty]")) changeQty(el.dataset.qty, Number(el.dataset.delta));
    if (el.matches("[data-remove]")) removeLine(el.dataset.remove);
    if (el.matches("[data-apply-promo]")) { const code = $("[data-promo-input]")?.value.trim().toUpperCase(); state.promo = code === "AIR10" ? code : ""; save(); render(); showToast(state.promo ? "Đã áp dụng AIR10" : "Mã không hợp lệ hoặc đã xóa"); }
    if (el.matches("[data-reset-filter]")) { state.search = ""; state.category = "all"; state.sort = "featured"; state.maxPrice = 900000; render(); }
    if (el.matches("[data-logout]")) { state.user = null; save(); render(); showToast("Đã đăng xuất"); }
  });
  document.addEventListener("input", (e) => {
    if (e.target.matches("[data-search-input]")) { state.search = e.target.value; shopPage(); }
    if (e.target.matches("[data-price-filter]")) { state.maxPrice = Number(e.target.value); shopPage(); }
  });
  document.addEventListener("change", (e) => {
    if (e.target.matches("[data-category-filter]")) { state.category = e.target.value; shopPage(); }
    if (e.target.matches("[data-sort-filter]")) { state.sort = e.target.value; shopPage(); }
  });
  document.addEventListener("submit", (e) => {
    if (e.target.matches("[data-login-form]")) { e.preventDefault(); const fd = new FormData(e.target); state.user = { name: fd.get("name"), email: fd.get("email") }; save(); render(); showToast("Đã đăng nhập demo"); }
    if (e.target.matches("[data-support-form]")) { e.preventDefault(); e.target.reset(); showToast("Đã gửi yêu cầu hỗ trợ"); }
    if (e.target.matches("[data-checkout-form]")) { e.preventDefault(); const fd = new FormData(e.target); const t = totals(); const order = { code: `AIR${Date.now().toString().slice(-6)}`, date: new Date().toLocaleString("vi-VN"), status: "Đã tiếp nhận", payment: fd.get("payment"), total: t.total, items: state.cart.map(x => ({...x})) }; state.orders.unshift(order); state.cart = []; state.promo = ""; state.user = state.user || { name: fd.get("name"), email: fd.get("email") }; save(); routeTo("#/orders"); showToast(`Đặt hàng thành công ${order.code}`); }
  });
}

bind();
render();
