"use client";

// Import AuthProvider dari app/page.tsx (tetap dipertahankan)
import { AuthProvider } from "@/lib/auth-context";

// Import-import yang di-copy dari components/pages/beranda.tsx
// Perhatikan: Path-nya harus diperbaiki agar menunjuk dari root (menggunakan '@/')
import PageLayout from "@/components/pages/page-layout";
import Hero from "@/components/hero";
import Carousel from "@/components/carousel";
import Categories from "@/components/categories";
import CtaDark from "@/components/cta-dark";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

// Kita tidak perlu lagi import 'Home' atau 'BerandaPage'

export default function Page() {
  return (
    // AuthProvider tetap membungkus semuanya
    <AuthProvider>
      
      {/* Ini adalah kode JSX yang di-copy dari components/pages/beranda.tsx */}
      <PageLayout mainClassName="home-content">
        <Hero />
        <Carousel />
        <Categories />
        <CtaDark />
        <Faq />
        <Footer />
      </PageLayout>
      
    </AuthProvider>
  );
}