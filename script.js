const instagram = "https://www.instagram.com/bloom.ora26/";

const products = [

  {
    name: "Lavender Bloom",
    description: "A beautiful handmade floral creation.",
    image: "assets/product1.jpg"
  },

  {
    name: "Pink Daisy",
    description: "A little flower made with love.",
    image: "assets/product2.jpg"
  },

  {
    name: "Blue Blossom",
    description: "A colorful handmade creation.",
    image: "assets/product3.jpg"
  },

  {
    name: "Pastel Petals",
    description: "Sweet details and soft pastel colors.",
    image: "assets/product4.jpg"
  },

  {
    name: "Floral Charm",
    description: "A tiny handmade piece of happiness.",
    image: "assets/product5.jpg"
  },

  {
    name: "Bloom Collection",
    description: "Unique creations made by hand.",
    image: "assets/product6.jpg"
  }

];

const gallery = document.getElementById("productGrid");

products.forEach(product => {

  const card = document.createElement("div");

  card.className = "product-card";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.loading = "lazy";

  const info = document.createElement("div");
  info.className = "product-info";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const description = document.createElement("p");
  description.textContent = product.description;

  const link = document.createElement("a");
  link.href = instagram;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "DM US TO KNOW THE PRICE ↗";

  info.append(title, description, link);
  card.append(img, info);
  gallery.appendChild(card);

});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("active");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("active");
  });
});
