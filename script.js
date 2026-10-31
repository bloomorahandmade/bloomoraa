const instagram = "https://www.instagram.com/bloom.ora26/";

const gallery = document.getElementById("productGrid");

const repoAPI =
  "https://api.github.com/repos/bloomorahandmade/bloomoraa/contents/assets";

async function loadProducts() {
  if (!gallery) {
    console.error("productGrid was not found in index.html");
    return;
  }

  try {
    const response = await fetch(repoAPI);

    if (!response.ok) {
      throw new Error("Could not access GitHub photos.");
    }

    const files = await response.json();

    const photos = files
      .filter(file =>
        file.type === "file" &&
        /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(file.name)
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    gallery.innerHTML = "";

    if (photos.length === 0) {
      gallery.innerHTML = "<p>Our little creations are coming soon! ♡</p>";
      return;
    }

    photos.forEach(photo => {
      const item = document.createElement("div");
      item.className = "product";

      const img = document.createElement("img");
      img.src = photo.download_url;
      img.alt = "Handmade creation";
      img.loading = "lazy";

      const link = document.createElement("a");
      link.className = "button";
      link.href = instagram;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "DM US TO KNOW THE PRICE ↗";

      img.onerror = () => {
        console.error("Image failed:", photo.name);
        item.remove();
      };

      item.appendChild(img);
      item.appendChild(link);
      gallery.appendChild(item);
    });

  } catch (error) {
    console.error(error);
    gallery.innerHTML =
      "<p>Photos could not load. Please try again later. ♡</p>";
  }
}

loadProducts();
