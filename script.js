// script.js

document.addEventListener("DOMContentLoaded", () => {
  // !!! PENTING: Ganti URL di bawah ini dengan URL Web App dari Google Apps Script Anda !!!
  const apiURL = "https://script.google.com/macros/s/AKfycbz9vbOX6CHGUTdadhn4M7O2JdsTBTpr8KI4rvs3NdFMWQaMd7ACx88T6ggtu4uH47XT/exec";

  const catalogContainer = document.getElementById("product-catalog");

  async function fetchProducts() {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      displayProducts(result.data);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
      catalogContainer.innerHTML = `<div class="col-12 text-center text-danger">
                                            <p><strong>Oops!</strong> Gagal memuat produk.</p>
                                            <p>Silakan coba muat ulang halaman beberapa saat lagi.</p>
                                          </div>`;
    }
  }

  function displayProducts(products) {
    // Kosongkan container sebelum menampilkan produk baru
    catalogContainer.innerHTML = "";

    if (!products || products.length === 0) {
      catalogContainer.innerHTML = `<div class="col-12 text-center"><p>Belum ada produk yang tersedia saat ini.</p></div>`;
      return;
    }

    products.forEach((product) => {
      // Hanya tampilkan produk yang memiliki nama
      if (product.nama_makanan) {
        const productCard = `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${product.url_gambar}" class="card-img-top" alt="${product.nama_makanan}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.nama_makanan}</h5>
                                <p class="card-price mt-auto">${product.harga_formatted}</p>
                            </div>
                        </div>
                    </div>
                `;
        catalogContainer.innerHTML += productCard;
      }
    });
  }

  // Panggil fungsi untuk mengambil dan menampilkan data
  fetchProducts();
});