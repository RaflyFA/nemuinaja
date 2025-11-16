export type Umkm = {
  id: number
  name: string
  hours: string
  rating?: number
  image?: string
  description?: string
  sellerName?: string
  sellerCity?: string
  avatar?: string
  manager?: string
  instagram?: string
  whatsapp?: string
  gallery?: Array<{ id: number; name: string; image?: string; hours?: string }>
}

export const UMKMS: Umkm[] = [
  { id: 1, name: "Es Bojong", hours: "Buka 08.00 - 17.00", image: "/Foto Produk/Es Bojong/es bojong.webp", description: "Es legendaris dari Bojong, dibuat dengan resep turun-temurun menggunakan bahan pilihan dan sirup spesial yang menyegarkan. Cocok untuk meredakan haus di siang hari dan menjadi favorit keluarga sejak lama.", sellerName: "Es Bojong", sellerCity: "KOTA TASIKMALAYA" },
  { id: 2, name: "Kupat Tahu Mangunreja", hours: "Buka 09.00 - 21.00", image: "/Foto Produk/Kupat Tahu Mangunreja/Kupat Tahu.webp", description: "Kupat tahu tradisional dengan bumbu kacang gurih dan sambal khas. Disajikan hangat dengan suwiran ayam dan kerupuk renyah, membuatnya cocok untuk sarapan maupun makan siang.", sellerName: "Kupat Tahu Mangunreja", sellerCity: "KOTA TASIKMALAYA" },
  { id: 3, name: "Payung Geulis Si Merah", hours: "Buka 08.00 - 17.00", image: "/Foto Produk/Payung Geulis Karya Utama/Si Merah.webp", description: "Payung kerajinan tangan dibuat dari bahan berkualitas, dihias motif tradisional yang detail. Setiap payung melalui proses pengecatan dan finishing oleh pengrajin lokal sehingga memiliki sentuhan estetika dan daya tahan tinggi.", sellerName: "Payung Geulis Karya Utama", sellerCity: "KOTA TASIKMALAYA" },
  { id: 4, name: "Gamis Biru", hours: "Buka 07.15 - 20.00", image: "/Foto Produk/Ibe Store 22/Gamis Biru.webp", description: "Gamis elegan dengan detail bordir di bagian depan, terbuat dari kain lembut yang nyaman dipakai sepanjang hari. Cocok untuk acara formal maupun santai.", sellerName: "Ibe Store 22", sellerCity: "KOTA TASIKMALAYA" },
  { id: 5, name: "Bakul Nasi", hours: "Buka 08.30 - 17.00", image: "/Foto Produk/Kartika Art Collection/Bakul Nasi.webp", description: "Bakul anyaman tangan yang kokoh, dibuat dari rotan pilihan. Desain tradisional berpadu fungsi modern, ideal sebagai wadah atau dekorasi rumah.", sellerName: "Kartika Art Collection", sellerCity: "KOTA TASIKMALAYA" },
  { id: 6, name: "Nusa Indah Florist", hours: "Buka 07.00 - 18.00", image: "/Foto Produk/Nusa Indah Florist/Contoh Produk.webp", description: "Florist yang menawarkan rangkaian bunga segar untuk berbagai acara. Pelayanan cepat dan kemasan rapi menjadi nilai tambah bagi pelanggan setia.", sellerName: "Nusa Indah Florist", sellerCity: "KOTA TASIKMALAYA" },
  { id: 7, name: "Cinderamata", hours: "Buka 08.00 - 20.00", image: "/Foto Produk/Payung Geulis Mandiri/Cinderamata.webp", description: "Oleh-oleh unik dan ramah wisatawan, mulai dari gantungan kunci, pernak-pernik hingga kerajinan kecil yang mudah dibawa pulang.", sellerName: "Payung Geulis Mandiri", sellerCity: "KOTA TASIKMALAYA" },
  { id: 8, name: "Kelom Geulis Biru Bulan", hours: "Buka 09.00 - 23.00", image: "/Foto Produk/PD. Mustika Kelom Geulis/Biru Bulan.webp", description: "Kelom tradisional dengan motif khas, diproduksi secara lokal dengan teknik pewarnaan yang aman dan tahan lama.", sellerName: "PD. Mustika Kelom Geulis", sellerCity: "KOTA TASIKMALAYA" },
  { id: 9, name: "Kelom Batik Merah", hours: "Buka 09.00 - 17.00", image: "/Foto Produk/Raja Kelom/Batik Merah.webp", description: "Kelom batik berkualitas dengan corak yang menarik. Setiap potong dibuat dengan cermat untuk menjaga detail motif batik.", sellerName: "Raja Kelom", sellerCity: "KOTA TASIKMALAYA" },
  { id: 10, name: "Seblak Komplit", hours: "Buka 07.00 - 23.00", image: "/Foto Produk/Seblak Teh Eni/Seblak Komplit.webp", description: "Seblak pedas nikmat dengan topping lengkap dan kuah gurih yang menggugah selera. Cocok untuk makan malam bersama keluarga.", sellerName: "Seblak Teh Eni", sellerCity: "KOTA TASIKMALAYA" },
]

export function getUmkmById(id: number) {
  return UMKMS.find((u) => u.id === id) ?? null
}
