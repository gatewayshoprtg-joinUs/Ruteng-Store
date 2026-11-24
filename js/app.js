const daftarProduk = [
  { nama: "Kopi Flores 250g", harga: 45000, kategori: "Makanan", ikon: "☕" },
  { nama: "Kaos Polos", harga: 65000, kategori: "Fashion", ikon: "👕" },
  { nama: "Tas Selempang", harga: 120000, kategori: "Fashion", ikon: "👜" },
  { nama: "Earphone", harga: 85000, kategori: "Elektronik", ikon: "🎧" },
  { nama: "Keripik Pisang", harga: 15000, kategori: "Makanan", ikon: "🍌" },
  { nama: "Power Bank", harga: 150000, kategori: "Elektronik", ikon: "🔋" }
];

let kategoriAktif = "Semua";
let kataCari = "";

const elKategori = document.getElementById("kategori");
const elProduk = document.getElementById("produk");
const elCari = document.getElementById("cari");

function rupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function tampilKategori() {
  const semua = ["Semua", ...new Set(daftarProduk.map(p => p.kategori))];
  elKategori.innerHTML = "";
  semua.forEach(nama => {
    const tombol = document.createElement("button");
    tombol.className = "chip" + (nama === kategoriAktif ? " aktif" : "");
    tombol.textContent = nama;
    tombol.onclick = () => {
      kategoriAktif = nama;
      tampilKategori();
      tampilProduk();
    };
    elKategori.appendChild(tombol);
  });
}

function tampilProduk() {
  const hasil = daftarProduk.filter(p =>
    (kategoriAktif === "Semua" || p.kategori === kategoriAktif) &&
    p.nama.toLowerCase().includes(kataCari.toLowerCase())
  );
  if (hasil.length === 0) {
    elProduk.innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }
  elProduk.innerHTML = hasil.map(p => `
    <div class="kartu">
      <div class="foto">${p.ikon}</div>
      <div class="info">
        <h3>${p.nama}</h3>
        <p class="harga">${rupiah(p.harga)}</p>
        <button>Tambah</button>
      </div>
    </div>
  `).join("");
}

elCari.addEventListener("input", e => {
  kataCari = e.target.value;
  tampilProduk();
});

tampilKategori();
tampilProduk();
