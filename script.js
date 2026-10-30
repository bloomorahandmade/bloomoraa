const gallery = document.getElementById("product-gallery");

const repoAPI =
  "https://api.github.com/repos/bloomorahandmade/bloomoraa/contents/assets";

async function loadProducts() {
  try {
    const response = await fetch(repoAPI);

    if (!response.ok) {
      throw new Error("Unable to load photos");
    }

    const files = await response.json();

    const photos = files.filter(file =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name) &&
      !file.name.toLowerCase().includes("about")
    );

    gallery.innerHTML = "";

    photos.forEach(photo => {
      const item = document.createElement("div");
      item.className = "product";

      const img = document.createElement("img");
      img.src = photo.download_url;
      img.alt = "Bloomora handmade creation";

      const link = document.createElement("a");
      link.className = "button";
      link.href = "https://www.instagram.com/bloom.ora26/";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "DM US TO KNOW THE PRICE ↗";

      item.appendChild(img);
      item.appendChild(link);

      gallery.appendChild(item);
    });

  } catch (error) {
    gallery.textContent = "Our creations are loading. Please visit again soon!";
    console.error(error);
  }
}

loadProducts();
