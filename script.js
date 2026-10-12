/* =========================================================
   Loom – Fashion & Clothing Website
   script.js : all the interactivity for index.html
   ========================================================= */

/* ------------------------------------------------------
   1. PRODUCT DATA
   Each product is an object. Add or edit items here and
   the shop updates automatically.
   ------------------------------------------------------ */
const products = [
    { id: 1,  name: "Linen wrap dress",      category: "women",       price: 2499, oldPrice: 3299, tag: "Sale", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" },
    { id: 2,  name: "Relaxed cotton shirt",  category: "men",         price: 1599, tag: "New",  img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80" },
    { id: 3,  name: "Classic white tee",     category: "men",         price: 799,                img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" },
    { id: 4,  name: "Leather biker jacket",  category: "women",       price: 6999, tag: "New",  img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" },
    { id: 5,  name: "Straight-fit jeans",    category: "men",         price: 2199,               img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" },
    { id: 6,  name: "Everyday sneakers",     category: "footwear",    price: 3499, oldPrice: 4299, tag: "Sale", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80" },
    { id: 7,  name: "Structured tote bag",   category: "accessories", price: 2899,               img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80" },
    { id: 8,  name: "Brushed fleece hoodie", category: "men",         price: 1899,               img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80" },
    { id: 9,  name: "Knit cardigan",         category: "women",       price: 2299, tag: "New",  img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80" },
    { id: 10, name: "Leather ankle boots",   category: "footwear",    price: 4599,               img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80" },
    { id: 11, name: "Classic wristwatch",    category: "accessories", price: 5499,               img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80" },
    { id: 12, name: "Round sunglasses",      category: "accessories", price: 1299, oldPrice: 1799, tag: "Sale", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" }
];

/* ------------------------------------------------------
   2. APP STATE (variables that change while using the site)
   ------------------------------------------------------ */
let currentFilter = "all";   // which category is selected
let searchText = "";         // what the user typed in search
let sortType = "default";    // chosen sort option

/* ------------------------------------------------------
   3. GRAB HTML ELEMENTS WE NEED
   ------------------------------------------------------ */
const productGrid = document.getElementById("productGrid");
const toast = document.getElementById("toast");

/* Helper: format a number as Indian rupees, e.g. 2499 -> ₹2,499 */
function formatPrice(amount) {
    return "₹" + amount.toLocaleString("en-IN");
}

/* Helper: if a picture fails to load, show a plain placeholder instead */
function imageFallback(img) {
    img.onerror = null;  // stop infinite loop if the fallback also fails
    img.src = "https://picsum.photos/seed/" + encodeURIComponent(img.alt) + "/600/750";
}

// Attach the fallback to every image already in the HTML
document.querySelectorAll("img").forEach(function (img) {
    img.onerror = function () { imageFallback(img); };
});

/* Helper: show a short message at the bottom of the screen */
let toastTimer;
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}

/* ------------------------------------------------------
   4. SHOW PRODUCTS ON THE PAGE
   Filters, searches and sorts, then builds the HTML cards.
   ------------------------------------------------------ */
function renderProducts() {
    // Step 1: filter by category
    let list = products.filter(function (p) {
        return currentFilter === "all" || p.category === currentFilter;
    });

    // Step 2: filter by search text
    list = list.filter(function (p) {
        return p.name.toLowerCase().includes(searchText.toLowerCase());
    });

    // Step 3: sort (slice() makes a copy so the original order is kept)
    list = list.slice();
    if (sortType === "low")  list.sort(function (a, b) { return a.price - b.price; });
    if (sortType === "high") list.sort(function (a, b) { return b.price - a.price; });
    if (sortType === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });

    // Step 4: nothing found? show a helpful message
    if (list.length === 0) {
        productGrid.innerHTML = '<p class="empty-message">No products match "' + searchText +
            '". Try another word or choose "All".</p>';
        return;
    }

    // Step 5: build one card per product
    let html = "";
    list.forEach(function (p) {
        html += `
            <article class="product-card">
                <div class="product-image">
                    <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="imageFallback(this)">
                    ${p.tag ? `<span class="product-tag ${p.tag === "Sale" ? "sale" : ""}">${p.tag}</span>` : ""}
                </div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="product-meta">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</p>
                    <div class="product-bottom">
                        <span class="price">${formatPrice(p.price)}
                            ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}
                        </span>
                    </div>
                </div>
            </article>`;
    });
    productGrid.innerHTML = html;
}

/* Change the active filter and highlight the right button */
function setFilter(category) {
    currentFilter = category;
    document.querySelectorAll(".filter-btn").forEach(function (btn) {
        btn.classList.toggle("active", btn.dataset.filter === category);
    });
    renderProducts();
}

/* ------------------------------------------------------
   5. FILTER / SEARCH / SORT EVENTS
   ------------------------------------------------------ */
document.getElementById("filters").addEventListener("click", function (e) {
    if (e.target.classList.contains("filter-btn")) {
        setFilter(e.target.dataset.filter);
    }
});

document.getElementById("searchBox").addEventListener("input", function (e) {
    searchText = e.target.value.trim();
    renderProducts();
});

document.getElementById("sortSelect").addEventListener("change", function (e) {
    sortType = e.target.value;
    renderProducts();
});

// Clicking a category card filters the shop and scrolls to it
document.querySelectorAll(".category-card").forEach(function (card) {
    card.addEventListener("click", function () {
        setFilter(card.dataset.category);
        document.getElementById("shop").scrollIntoView();
    });
});

// Trend "Shop ..." buttons also set a filter
document.querySelectorAll("[data-goto]").forEach(function (link) {
    link.addEventListener("click", function () {
        setFilter(link.dataset.goto);
    });
});

/* ------------------------------------------------------
   6. SEASONAL TRENDS TABS
   ------------------------------------------------------ */
document.querySelectorAll(".tab-btn").forEach(function (tab) {
    tab.addEventListener("click", function () {
        // remove "active" from all tabs and panels
        document.querySelectorAll(".tab-btn").forEach(function (t) { t.classList.remove("active"); });
        document.querySelectorAll(".trend-panel").forEach(function (p) { p.classList.remove("active"); });

        // add "active" to the clicked tab and its matching panel
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

/* ------------------------------------------------------
   7. FEEDBACK FORM (validation + result message)
   ------------------------------------------------------ */
const form = document.getElementById("feedbackForm");

// Shows or clears an error under a field
function setError(fieldId, message) {
    document.getElementById(fieldId + "Error").textContent = message;
    const field = document.getElementById(fieldId);
    if (field) field.parentElement.classList.toggle("invalid", message !== "");
}

form.addEventListener("submit", function (event) {
    event.preventDefault();   // stop the page from reloading

    // Read the values the user entered
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value;
    const message = document.getElementById("message").value.trim();
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    let isValid = true;

    // Check each field
    if (name === "") { setError("name", "Enter your name."); isValid = false; }
    else setError("name", "");

    // Simple email pattern: something@something.something
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) { setError("email", "Enter a valid email, like you@example.com."); isValid = false; }
    else setError("email", "");

    if (!ratingInput) { setError("rating", "Choose a rating from 1 to 5 stars."); isValid = false; }
    else setError("rating", "");

    if (message.length < 10) { setError("message", "Write at least 10 characters."); isValid = false; }
    else setError("message", "");

    if (!isValid) return;   // stop here if anything is wrong

    // Everything is fine – show the result box
    const rating = Number(ratingInput.value);
    const result = document.getElementById("result");
    result.innerHTML =
        "<strong>Thanks, " + name + "! Your feedback was sent.</strong><br><br>" +
        "Email: " + email + "<br>" +
        "Topic: " + topic + "<br>" +
        "Rating: " + "★".repeat(rating) + "☆".repeat(5 - rating) + "<br>" +
        "Message: " + message;
    result.classList.add("show");

    form.reset();   // clear the form
    showToast("Feedback sent");
});

/* ------------------------------------------------------
   8. NEWSLETTER, MOBILE MENU, BACK TO TOP, FOOTER YEAR
   ------------------------------------------------------ */
document.getElementById("newsletterForm").addEventListener("submit", function (e) {
    e.preventDefault();
    showToast("Subscribed. Watch your inbox for new arrivals.");
    this.reset();
});

// Hamburger menu on phones
const navLinks = document.getElementById("navLinks");
document.getElementById("menuToggle").addEventListener("click", function () {
    navLinks.classList.toggle("open");
});
// Close the mobile menu after a link is tapped
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { navLinks.classList.remove("open"); });
});

// Back-to-top button appears after scrolling down 600px
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", function () {
    backToTop.style.display = window.scrollY > 600 ? "block" : "none";
});
backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0 });
});

// Put the current year in the footer automatically
document.getElementById("year").textContent = new Date().getFullYear();

/* ------------------------------------------------------
   9. START THE APP
   ------------------------------------------------------ */
renderProducts();

/* ------------------------------------------------------
   10. LOOKBOOK LIGHTBOX (click a photo to enlarge it)
   ------------------------------------------------------ */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

document.querySelectorAll(".look").forEach(function (look) {
    look.addEventListener("click", function () {
        const img = look.querySelector("img");
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = look.querySelector("figcaption").textContent;
        lightbox.classList.add("show");
    });
});

function closeLightbox() { lightbox.classList.remove("show"); }

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);

// Clicking the dark background (not the image) also closes it
lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
});
