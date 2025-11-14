"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  XCircle,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

// Inline SVG untuk ikon Google
const GoogleIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path
      d="M21.99 10.9v.5c0 4.5-3.1 8.6-7.5 8.6-3.7 0-6.9-2.2-8.3-5.3l2.8-.9c.6 1.7 2.3 2.9 4.2 2.9 2.5 0 4.4-1.8 4.8-4.2h-4.8v-3.2h8.3zm-10-6.5c1.4-1.4 3.2-2.1 5.1-2.1 1.9 0 3.7.7 5.1 2.1l-1.5 1.5C19.7 5 18 4.3 16.1 4.3s-3.6.7-4.8 2.1l-1.5-1.5z"
      fill="#4285F4"
    />
  </svg>
);

// Inline SVG untuk ikon Facebook (lebih akurat)
const FacebookIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 7.89 9.8v-7H7.7V12h2.19V9.78c0-2.17 1.3-3.37 3.27-3.37.95 0 1.9.17 1.9.17v2.2h-1.1c-1.07 0-1.4.5-1.4 1.35V12h2.46l-.4 2.8h-2.06v7.01C18.56 20.87 22 16.84 22 12z"
      fill="#1877F2"
    />
  </svg>
);

// Tipe untuk state error
type FormErrors = {
  emailOrPhone?: string;
  password?: string;
};

export default function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!emailOrPhone) {
      newErrors.emailOrPhone = "Masukkan alamat email atau nomor telepon";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Masukkan sandi";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Data Login:", { emailOrPhone, password });
      alert("Login berhasil (silakan cek console F12)");
      setErrors({});
    }
  };

  return (
    // Layout utama: flex column, min-height layar, bg putih
    <div className="flex min-h-screen flex-col bg-white">
      {/* Konten Utama (Form) */}
      {/* Dibuat 'flex-grow' agar footer terdorong ke bawah */}
      <main className="grow flex flex-col items-center justify-center px-6 py-12">
        {/* Container Form (dibatasi max-w-sm agar sesuai desain HP) */}
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Image
              // Ganti '/logo-nemuin.png' dengan path logo Anda di folder /public
              // Saya gunakan placeholder bulat agar sesuai desain
              src="https://placehold.co/80x80/eeeeee/333333?text=N"
              alt="Nemu.in Logo"
              width={80}
              height={80}
              className="mb-2 rounded-full"
            />
            <span className="text-xl font-medium text-gray-800">nemuin</span>
          </div>

          {/* Judul (sesuai desain: text-center, warna 'nemuin') */}
          <h1 className="mt-8 text-center text-2xl font-semibold text-gray-900">
            Masuk ke akun <span className="text-[#45c1a8]">nemuin</span> anda
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full space-y-5"
            noValidate
          >
            {/* Input Email/Telepon */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Email/Telepon"
                  value={emailOrPhone}
                  onChange={(e) => {
                    setEmailOrPhone(e.target.value);
                    if (errors.emailOrPhone) {
                      setErrors({ ...errors, emailOrPhone: undefined });
                    }
                  }}
                  // Desain Input: bg-gray-100, rounded-lg, p-4
                  // Error state: border-red-500
                  className={`w-full rounded-2xl border-2 bg-gray-100 py-5 px-5 text-base text-gray-900 placeholder-gray-500 outline-none transition-all ${
                    errors.emailOrPhone
                      ? "border-red-500"
                      : emailOrPhone
                      ? "border-[#45c1a8]"
                      : "border-transparent"
                  } ${
                    !errors.emailOrPhone
                      ? "focus:ring-2 focus:ring-[#45c1a8]"
                      : ""
                  }`}
                />
                {/* Ikon 'X' (sesuai 'JIKA SUDAH MENGISI.png') */}
                {emailOrPhone && (
                  <button
                    type="button"
                    onClick={() => setEmailOrPhone("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-0 text-gray-500 hover:text-gray-700"
                    aria-label="Clear email"
                  >
                    <XCircle size={18} />
                  </button>
                )}
              </div>
              {/* Pesan Error (sesuai 'JIKA TIDAK MENGISI...') */}
              {errors.emailOrPhone && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.emailOrPhone}
                </p>
              )}
            </div>

            {/* Input Kata Sandi */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: undefined });
                    }
                  }}
                  className={`w-full rounded-2xl border-2 bg-gray-100 py-5 px-5 text-base text-gray-900 placeholder-gray-500 outline-none transition-all ${
                    errors.password
                      ? "border-red-500"
                      : password
                      ? "border-[#45c1a8]"
                      : "border-transparent"
                  } ${
                    !errors.password ? "focus:ring-2 focus:ring-[#45c1a8]" : ""
                  }`}
                />
                {/* Tombol Show/Hide Password (ikon mata) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Lupa Sandi */}
            <div className="flex justify-end">
              <Link
                href="/lupa-sandi"
                className="text-sm font-medium text-[#0b6b62] hover:text-[#0f776d]"
              >
                Lupa sandi?
              </Link>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#45c1a8] py-4 text-lg font-semibold text-[#0b6b62] transition-all hover:bg-[#56cbbd] active:scale-95"
            >
              Masuk
            </button>
          </form>

          {/* Link Daftar */}
          <p className="mt-6 text-center text-base text-gray-600">
            Tidak memiliki akun?{" "}
            <Link
              href="/register" // Kita akan buat halaman ini
              className="font-semibold text-[#45c1a8] hover:text-emerald-600"
            >
              Buat
            </Link>
          </p>

          {/* Pemisah "Masuk dengan" */}
          <div className="my-8 flex w-full items-center">
            <div className="grow border-t border-gray-300"></div>
            <span className="mx-4 shrink-0 text-sm text-gray-500">
              Masuk dengan
            </span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          {/* Tombol Social Media */}
          <div className="flex justify-center gap-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-all hover:bg-gray-200">
              <FacebookIcon />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-all hover:bg-gray-200">
              <GoogleIcon />
            </button>
          </div>
        </div>
      </main>

      {/* Footer (Sesuai Desain 'HALAMAN LOGIN.png') */}
      <footer className="w-full bg-[#2D2D2D] p-6 text-gray-400">
        <div className="mx-auto max-w-sm">
          <h3 className="font-semibold text-white">Follow nemuinaja</h3>
          <div className="mt-2 flex space-x-4">
            <a href="#" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Twitter size={20} />
            </a>
          </div>
          <hr className="my-4 border-gray-600" />
          <p className="text-xs">© 2025 - nemuin. All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
