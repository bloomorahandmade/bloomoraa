const instagram = "https://www.instagram.com/bloom.ora26/";

const gallery = document.getElementById("productGrid");

const repoAPI =
  "https://api.github.com/repos/bloomorahandmade/bloomoraa/contents/assets";

async function loadProducts() {
  try {
    const response = await fetch(repoAPI);

    if (!response.ok) {
      throw new Error("Could not load product photos");
    }

    const files = await response.json();

    const photos = files
      .filter(file =>
        file.type === "file" &&
        /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    gallery.innerHTML = "";

    if (photos.length === 0) {
      gallery.textContent = "Our creations are coming soon! ♡";
      return;
    }

    photos.forEach(photo => {
      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = photo.download_url;
      img.alt = "Bloomora handmade creation";
      img.loading = "lazy";

      const info = document.createElement("div");
      info.className = "product-info";

      const link = document.createElement("a");
      link.href = instagram;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "DM US TO KNOW THE PRICE ↗";

      info.appendChild(link);
      card.append(img, info);
      gallery.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    gallery.textContent = "Unable to load photos. Please visit our Instagram!";
  }
}

loadProducts();

// MOBILE MENU

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");
    });
  });
}
