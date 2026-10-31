
const instagram = "https://www.instagram.com/bloom.ora26/";

const gallery = document.getElementById("productGrid");

const repoAPI =
  "https://api.github.com/repos/bloomorahandmade/bloomoraa/contents/assets";

async function loadProducts() {
  try {
    const response = await fetch(repoAPI);

    if (!response.ok) {
      throw new Error("Could not access GitHub photos.");
    }

    const files = await response.json();

    const photos = files
      .filter(file => {
        const name = file.name.toLowerCase();

        return (
          file.type === "file" &&
          /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(name) &&
          name !== "about.jpg" &&
          name !== "bloomora-banner.jpg"
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    gallery.innerHTML = "";

    if (photos.length === 0) {
      gallery.innerHTML =
        '<p class="gallery-message">Our little creations are coming soon! ♡</p>';
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

      img.onerror = () => {
        card.remove();
        console.error("Image failed to load:", photo.name);
      };

      info.appendChild(link);
      card.appendChild(img);
      card.appendChild(info);

      gallery.appendChild(card);
    });

  } catch (error) {
    console.error("Bloomora error:", error);

    gallery.innerHTML =
      '<p class="gallery-message">Photos could not load. Please try again later. ♡</p>';
  }
}

loadProducts();

/* MOBILE NAVIGATION */

const menuButton = document.getElementById("menuToggle");
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

