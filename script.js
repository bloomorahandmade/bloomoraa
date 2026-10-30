const gallery = document.getElementById("product-gallery");

const repoAPI =
  "https://api.github.com/repos/bloomorahandmade/bloomoraa/contents/assets";

const instagramURL =
  "https://www.instagram.com/bloom.ora26/";

async function loadProducts() {
  try {
    const response = await fetch(repoAPI);

    if (!response.ok) {
      throw new Error("GitHub could not load the assets folder.");
    }

    const files = await response.json();

    const photos = files
      .filter(file =>
        file.type === "file" &&
        /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name) &&
        !file.name.toLowerCase().includes("about")
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    gallery.innerHTML = "";

    if (photos.length === 0) {
      gallery.innerHTML =
        '<p class="empty-message">Our creations are coming soon! ♡</p>';
      return;
    }

    photos.forEach(photo => {
      const item = document.createElement("div");
      item.className = "product";

      const img = document.createElement("img");
      img.src = photo.download_url;
      img.alt = "Bloomora handmade creation";
      img.loading = "lazy";

      const button = document.createElement("a");
      button.className = "product-button";
      button.href = instagramURL;
      button.target = "_blank";
      button.rel = "noopener noreferrer";
      button.textContent = "DM US TO KNOW THE PRICE ↗";

      item.appendChild(img);
      item.appendChild(button);

      gallery.appendChild(item);
    });

  } catch (error) {
    console.error("Bloomora gallery error:", error);

    gallery.innerHTML =
      '<p class="empty-message">Unable to load creations right now. Please visit our Instagram! ♡</p>';
  }
}

loadProducts();
