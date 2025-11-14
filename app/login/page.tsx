"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Masukkan alamat email atau nomor telepon";
    if (!password) newErrors.password = "Masukkan sandi";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login berhasil:", { email, password });
      // Lanjutkan ke halaman berikutnya
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Logo & Judul */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="mt-2 text-xl font-medium text-gray-900">
          Masuk ke akun{" "}
          <span className="text-emerald-600 font-semibold">nemuin</span> anda
        </h1>
        <Image
          src="./logo-light.webp"
          alt="nemuin"
          width={60}
          height={60}
          className="black"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs flex flex-col gap-3"
      >
        {/* Input Email */}
        <div>
          <div
            className={`flex items-center rounded-md px-3 py-2 bg-gray-200 focus-within:bg-gray-100 ${
              errors.email
                ? "border border-red-500"
                : "border border-transparent"
            }`}
          >
            <Mail className="text-gray-500 w-7 h-10" />
            <input
              type="text"
              placeholder="Email/Telepon"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-sm ptext-gray-800"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Input Password */}
        <div>
          <div
            className={`flex items-center rounded-md px-3 py-2 bg-gray-200 focus-within:bg-gray-100 ${
              errors.password
                ? "border border-red-500"
                : "border border-transparent"
            }`}
          >
            <Lock className="text-gray-500 w-5 h-5 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-sm text-gray-800"
            />
            {showPassword ? (
              <EyeOff
                onClick={() => setShowPassword(false)}
                className="w-5 h-5 text-gray-500 cursor-pointer"
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(true)}
                className="w-5 h-5 text-gray-500 cursor-pointer"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Lupa Sandi */}
        <div className="text-right">
          <Link href="#" className="text-xs text-teal-800 hover:underline">
            Lupa sandi?
          </Link>
        </div>

        {/* Tombol Masuk */}
        <button
          type="submit"
          className="w-full bg-emerald-400 text-gray-800 py-2 rounded-md font-medium mt-2 hover:bg-emerald-500 transition"
        >
          Masuk
        </button>

        {/* Link Daftar */}
        <p className="text-center text-sm text-gray-600 mt-3">
          Tidak memiliki akun?{" "}
          <Link
            href="/register"
            className="text-teal-800 font-medium hover:underline"
          >
            Buat
          </Link>
        </p>

        {/* Garis pembatas */}
        <div className="flex items-center my-3">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500 px-3">Masuk dengan</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Tombol Sosial */}
        <div className="flex justify-center gap-6">
          <button type="button" className="text-gray-600 hover:opacity-70">
            <Image src="/facebook.svg" alt="Facebook" width={30} height={30} />
          </button>
          <button type="button" className="text-gray-600 hover:opacity-70">
            <Image src="/google.svg" alt="Google" width={30} height={30} />
          </button>
        </div>
      </form>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-700">
        <p>
          <span className="font-semibold">Follow</span> nemuinaja
        </p>
        <div className="flex justify-center gap-5 mt-2">
          <Image src="/instagram.svg" alt="Instagram" width={20} height={20} />
          <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
          <Image src="/x.svg" alt="Twitter X" width={20} height={20} />
        </div>
        <p className="mt-4 text-xs text-gray-500">
          © 2025 - nemuin. All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
