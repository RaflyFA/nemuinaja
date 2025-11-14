export type AppPageConfig = {
  key: string
  label: string
  href?: string
  subPages?: AppPageConfig[]
}

export const APP_PAGES: AppPageConfig[] = [
  { key: "profil", label: "Profil", href: "/profil", subPages: [] },
  { key: "beranda", label: "Beranda", href: "/" },
  { key: "direktori", label: "Direktori", href: "/direktori" },
  { key: "ajukan", label: "Ajukan UMKM", href: "/ajukan" },
  { key: "favorit", label: "Favorit Saya", href: "/favorit" },
  { key: "koleksi", label: "Koleksi Saya", href: "/koleksi" },
  { key: "tentang", label: "Tentang Kami", href: "/tentang" },
  { key: "bantuan", label: "Bantuan", href: "/bantuan" },
]

export const PAGE_REGISTRY = APP_PAGES.reduce<Record<string, AppPageConfig>>((acc, page) => {
  acc[page.key] = page
  return acc
}, {})
