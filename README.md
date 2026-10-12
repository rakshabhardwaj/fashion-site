<div align="center">

<img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop&q=80" alt="Loom banner – clothing rack" width="100%">

# 🧵 Loom

### *Made to be worn, not stored.*

A responsive fashion and clothing website built from scratch with **HTML, CSS and vanilla JavaScript**: no frameworks, no libraries, just the fundamentals done well.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-2F3BD6?style=for-the-badge)
![No Frameworks](https://img.shields.io/badge/Frameworks-None-1A1A2E?style=for-the-badge)

[✨ Features](#-features) •
[🚀 Getting started](#-getting-started) •
[🧠 How it works](#-how-it-works) •
[📱 Responsive design](#-responsive-design) •
[🔮 Future scope](#-future-scope)

</div>

---

## 📖 About the project

**Loom** is a modern fashion storefront that presents clothing collections the way a fashion magazine would: big editorial headlines, generous photography and a calm colour palette.

It was built to show how much a website can do with only the three core web technologies. Every product card, filter, tab, gallery popup and form check is written by hand in plain JavaScript.

| | |
|---|---|
| 🎯 **Goal** | Build a fully working, responsive and user-friendly fashion website |
| 🛠️ **Built with** | HTML5 · CSS3 · JavaScript (ES6) |
| 📄 **Pages** | Single-page website with 7 sections |
| 🖼️ **Images** | 30+ high-quality photos from Unsplash |
| 📦 **Dependencies** | None (only Google Fonts) |

---

## ✨ Features

### 🛍️ Shopping experience
- **Dynamic product grid**: 12 products generated from a JavaScript array, not hard-coded in HTML
- **Category filters**: All, Women, Men, Footwear and Accessories
- **Live search**: results update with every letter you type
- **Smart sorting**: by price (low to high, high to low) or by name (A to Z)
- **Sale and New tags**, with the original price shown crossed out
- **Clickable category cards** that filter the shop and scroll straight to it

### 🍂 Seasonal trends
- Tabbed panels for **Autumn / Winter**, **Spring / Summer** and a **Festive edit**
- Each trend shows **colour swatches** and links to matching products

### 📸 Lookbook gallery
- Magazine-style photo grid with tall and wide tiles
- **Lightbox popup**: click any photo to view it full screen; close with ✕, the `Esc` key or a click outside

### 💬 Feedback form
- Name, email, topic, **interactive 1–5 star rating** and message
- **Real-time validation** with clear, specific error messages
- Shows a summary of the submitted feedback **without reloading the page**

### ⚙️ Extras
- Sticky navigation bar with a **hamburger menu** on mobile
- Newsletter signup with a **pop-up confirmation message**
- **Back-to-top button** that appears as you scroll
- **Automatic image fallback**, so a broken image link never breaks the layout
- **Accessible**: visible keyboard focus, alt text on every image and support for reduced-motion settings

---

## 🖼️ Preview

| Hero | Collection |
|:---:|:---:|
| <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=320&fit=crop&q=80" width="100%" alt="Hero preview"> | <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=320&fit=crop&q=80" width="100%" alt="Collection preview"> |
| **Seasonal trends** | **Lookbook** |
| <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=320&fit=crop&q=80" width="100%" alt="Trends preview"> | <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=320&fit=crop&q=80" width="100%" alt="Lookbook preview"> |

> 💡 **Tip:** Replace these with real screenshots of your website. Save them in a `screenshots/` folder and change the links to `screenshots/hero.png` and so on.

---

## 🚀 Getting started

No installation, no build tools and no server needed.

```bash
# 1. Clone the repository (or download the ZIP)
git clone https://github.com/your-username/loom.git

# 2. Open the folder
cd loom

# 3. Open index.html in your browser
```

Or simply **double-click `index.html`**.

> ⚠️ Images and fonts load from the internet, so stay online for the full experience.

---

## 📁 Project structure

```
loom/
│
├── 📄 index.html    →  Structure: every section and its content
├── 🎨 style.css     →  Design: colours, layout, hover effects, media queries
├── ⚡ script.js     →  Behaviour: products, filters, tabs, lightbox, form
└── 📘 README.md     →  You are here
```

---

## 🧠 How it works

### Rendering products from data

Products live in a JavaScript array. The page reads that array and builds the cards, so adding a new product takes one line of code:

```javascript
const products = [
    { id: 1, name: "Linen wrap dress", category: "women", price: 2499, oldPrice: 3299, tag: "Sale", img: "..." },
    { id: 2, name: "Relaxed cotton shirt", category: "men", price: 1599, tag: "New", img: "..." },
    // add more products here
];
```

### Filter → search → sort pipeline

Each time the user clicks, types or picks a sort option, `renderProducts()` runs the products through three steps:

```javascript
let list = products.filter(p => currentFilter === "all" || p.category === currentFilter); // 1. category
list = list.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));          // 2. search
if (sortType === "low") list.sort((a, b) => a.price - b.price);                             // 3. sort
```

### Form validation

The form is checked in JavaScript before anything is shown:

| Field | Rule |
|---|---|
| Name | Must not be empty |
| Email | Must match the pattern `name@domain.com` |
| Rating | A star must be selected |
| Message | At least 10 characters |

### JavaScript concepts used

<details>
<summary><b>Click to expand</b></summary>

<br>

| Concept | Where it's used |
|---|---|
| DOM selection | `getElementById`, `querySelector`, `querySelectorAll` throughout |
| Event listeners | Clicks, typing, sort changes, form submit, scroll and key presses |
| Arrays and objects | Product data |
| Array methods | `filter`, `sort`, `find`, `forEach`, `map` |
| Template literals | Building product card HTML |
| Conditionals | Validation, filtering, showing and hiding elements |
| Regular expressions | Email validation |
| `preventDefault()` | Stops the form from reloading the page |
| `classList` | Toggling tabs, menus, the lightbox and toasts |
| `setTimeout` | Hiding the pop-up message automatically |
| Event delegation | One listener handles every filter button |

</details>

---

## 📱 Responsive design

| Device | Breakpoint | What changes |
|---|---|---|
| 🖥️ Desktop | above 900px | Two-column hero, four categories per row, multi-column grid |
| 📲 Tablet | 680px – 900px | Hero stacks, two categories per row, single-column trends and form |
| 📱 Mobile | below 680px | Hamburger menu, single column, larger touch areas |

Built with **CSS Grid**, **Flexbox**, `clamp()` for fluid text sizes and **media queries**.

---

## 🎨 Design system

| Colour | Hex | Role |
|---|---|---|
| ![#FBFAF8](https://placehold.co/15x15/FBFAF8/FBFAF8.png) Paper | `#FBFAF8` | Background |
| ![#1A1A2E](https://placehold.co/15x15/1A1A2E/1A1A2E.png) Ink | `#1A1A2E` | Text and dark sections |
| ![#2F3BD6](https://placehold.co/15x15/2F3BD6/2F3BD6.png) Cobalt | `#2F3BD6` | Accent: buttons and highlights |
| ![#F2DCD5](https://placehold.co/15x15/F2DCD5/F2DCD5.png) Blush | `#F2DCD5` | Soft panels |
| ![#A7B8A1](https://placehold.co/15x15/A7B8A1/A7B8A1.png) Sage | `#A7B8A1` | Secondary accent |

**Typography:** *Bodoni Moda* (fashion-magazine headings) paired with *DM Sans* (clean, readable body text).

All colours are CSS variables, so the whole site can be re-themed by editing a few lines at the top of `style.css`.

---

## 🔮 Future scope

- [ ] Shopping cart with checkout
- [ ] Wishlist saved in the browser with `localStorage`
- [ ] Product detail page with size selection
- [ ] Dark mode toggle
- [ ] User login and order history
- [ ] Connect the feedback form to a real backend or email service

---

## 📚 What I learned

- Structuring a real website with **semantic HTML**
- Building layouts with **CSS Grid and Flexbox**, and making them responsive
- Generating page content from **data with JavaScript**
- Handling **user events** and **validating forms**
- Writing clean, **commented and organised** code across separate files

---

## 🙏 Credits

- 📷 Photos: [Unsplash](https://unsplash.com) (free to use under the Unsplash License)
- 🔤 Fonts: [Google Fonts](https://fonts.google.com) (Bodoni Moda and DM Sans)
- 🏷️ Badges: [Shields.io](https://shields.io)

---

<div align="center">

### 👤 Author

**Your Name**
*Your Course / Class* · *Submission Date*

[![GitHub](https://img.shields.io/badge/GitHub-your--username-181717?style=flat&logo=github)](https://github.com/your-username)

<sub>This is a student project made for learning purposes. Products and prices are not real.</sub>

⭐ *If you liked this project, give it a star!* ⭐

</div>
