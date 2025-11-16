"use client"

import { useState } from "react"
import PageLayout from "@/components/pages/page-layout"
import Footer from "@/components/footer"

const productCategories = ["Makanan & Minuman", "Fashion", "Kerajinan", "Jasa", "Souvenir", "Lainnya"]

export default function TambahProdukPage() {
  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    deskripsi: "",
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    alert("Produk berhasil ditambahkan.")
    setForm({
      nama: "",
      kategori: "",
      deskripsi: "",
    })
  }

  return (
    <>
      <PageLayout containerClassName="apply-container" mainClassName="apply-page" hideAppBar>
        <header className="apply-page-header">
          <img src="/logo-light.webp" alt="nemuinaja" width={84} height={84} />
          <span>nemuinaja</span>
          <h1 className="pengajuan">
            Yuk Tambahin Produk-mu
          </h1>
        </header>

        <form className="apply-card apply-form" onSubmit={handleSubmit}>
          <InputField
            label="Nama Produk"
            placeholder="Tulis nama produk Anda"
            value={form.nama}
            onChange={(value) => setForm((prev) => ({ ...prev, nama: value }))}
          />
          <SelectField
            label="Kategori Produk"
            placeholder="Pilih kategori"
            options={productCategories}
            value={form.kategori}
            onChange={(value) => setForm((prev) => ({ ...prev, kategori: value }))}
          />
          <div className="apply-upload">
            <p className="apply-upload-title">Pilih foto terbaik produkmu</p>
            <p className="apply-upload-desc">
              Untuk meningkatkan pengalaman yang lebih baik untuk pengunjung (bisa lebih dari 1 foto)
            </p>
            <button type="button" className="apply-upload-btn">
              Unggah Gambar
            </button>
          </div>
          <InputField
            label="Deskripsi produk"
            placeholder="Tulis deskripsi produk Anda"
            value={form.deskripsi}
            onChange={(value) => setForm((prev) => ({ ...prev, deskripsi: value }))}
            multiline
          />
          <button className="apply-submit" type="submit">
            Tambahkan
          </button>
        </form>
      </PageLayout>
      <Footer />
    </>
  )
}

type InputFieldProps = {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: string
  multiline?: boolean
}

function InputField({ label, placeholder, value, onChange, type = "text", multiline }: InputFieldProps) {
  return (
    <label className={`apply-field ${multiline ? "textarea" : ""}`}>
      <span>{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      )}
    </label>
  )
}

type SelectFieldProps = {
  label: string
  placeholder: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

function SelectField({ label, placeholder, options, value, onChange }: SelectFieldProps) {
  return (
    <label className="apply-field">
      <span>{label}</span>
      <div className="apply-select">
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}
