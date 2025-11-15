"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PageLayout from "@/components/pages/page-layout"
import Footer from "@/components/footer"

const businessFields = ["Kuliner", "Fashion", "Kerajinan", "Jasa Kreatif", "Pertanian", "Lainnya"]
const schedules = ["Setiap Hari", "Senin - Jumat", "Weekdays", "Weekend", "By Appointment"]
const termsList = [
  "Adalah Warga Negara Indonesia yang memiliki kartu identitas resmi yang diakui oleh Republik Indonesia.",
  "Memiliki produk yang tidak bertentangan dengan ketentuan dan aturan hukum di Indonesia.",
  "Mitra UMKM tunduk terhadap hukum negara Indonesia dan juga peraturan yang berlaku di nemuinaja.",
  "Mitra UMKM tidak memiliki catatan hukum apapun yang mengakibatkan dirugikannya pihak lain.",
  "Mitra UMKM mengizinkan nemuinaja untuk mengirimkan informasi kepada data kontak mitra.",
  "Mitra UMKM mengizinkan nemuinaja untuk mengolah data profil UMKM untuk kepentingan pemetaan produk dan monitoring.",
]

export default function AjukanPage() {
  const router = useRouter()
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [ownerForm, setOwnerForm] = useState({
    nama: "",
    nik: "",
    telp: "",
    email: "",
    alamat: "",
    brand: "",
    bidang: "",
    nib: "",
    jadwal: "",
    agree: false,
  })

  useEffect(() => {
    document.body.style.overflow = showTermsModal ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showTermsModal])

  const handleOwnerSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    router.push("/ajukan/tambah-produk")
  }

  return (
    <>
      <div className={showTermsModal ? "apply-blur" : undefined}>
        <PageLayout containerClassName="apply-container" mainClassName="apply-page" hideAppBar>
          <header className="apply-page-header">
            <img src="/logo-light.webp" alt="nemuinaja" width={84} height={84} />
            <span>nemuinaja</span>
            <h1>
              Formulir Pengajuan <span>UMKM</span>
            </h1>
          </header>

          <form className="apply-card apply-form" onSubmit={handleOwnerSubmit}>
            <InputField
              label="Nama Pemilik"
              placeholder="Pastikan penulisan sesuai KTP"
              value={ownerForm.nama}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, nama: value }))}
            />
            <InputField
              label="NIK"
              placeholder="Masukkan nomor NIK Anda"
              value={ownerForm.nik}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, nik: value }))}
            />
            <InputField
              label="No. Telepon"
              placeholder="Pastikan No telepon aktif"
              value={ownerForm.telp}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, telp: value }))}
            />
            <InputField
              label="Email"
              placeholder="Masukkan Email Anda"
              type="email"
              value={ownerForm.email}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, email: value }))}
            />
            <InputField
              label="Alamat Lengkap"
              placeholder="Tulis alamat lengkap Anda"
              value={ownerForm.alamat}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, alamat: value }))}
              multiline
            />
            <InputField
              label="Nama Merek"
              placeholder="Tulis nama merek usaha Anda"
              value={ownerForm.brand}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, brand: value }))}
            />
            <SelectField
              label="Bidang Usaha"
              placeholder="Pilih bidang"
              options={businessFields}
              value={ownerForm.bidang}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, bidang: value }))}
            />
            <InputField
              label="NIB (Opsional)"
              placeholder="Tulis bila ada (opsional)"
              value={ownerForm.nib}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, nib: value }))}
            />
            <SelectField
              label="Jadwal Operasional"
              placeholder="Pilih jadwal buka toko Anda"
              options={schedules}
              value={ownerForm.jadwal}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, jadwal: value }))}
            />
            <label className="apply-checkbox">
              <input
                type="checkbox"
                checked={ownerForm.agree}
                onChange={(event) => setOwnerForm((prev) => ({ ...prev, agree: event.target.checked }))}
                required
              />
              <span>
                Saya setuju dengan nemuinaja{" "}
                <button type="button" className="apply-terms-link" onClick={() => setShowTermsModal(true)}>
                  Syarat & ketentuan
                </button>
              </span>
            </label>
            <button className="apply-submit" type="submit">
              Ajukan
            </button>
          </form>
        </PageLayout>
      </div>

      {showTermsModal ? <TermsModal terms={termsList} onClose={() => setShowTermsModal(false)} /> : null}
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
        <span className="apply-select-arrow">v</span>
      </div>
    </label>
  )
}

function TermsModal({ terms, onClose }: { terms: string[]; onClose: () => void }) {
  return (
    <div className="apply-modal-backdrop">
      <div className="apply-modal apply-terms-modal">
        <button className="apply-modal-close" onClick={onClose} aria-label="Tutup">
          &times;
        </button>
        <header className="apply-modal-header">
          <img src="/logo-light.webp" alt="nemuinaja" width={64} height={64} />
          <h2>
            Syarat & <span>Ketentuan</span>
          </h2>
        </header>
        <ol>
          {terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
