"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PageLayout from "@/components/pages/page-layout"
import Footer from "@/components/footer"
import { useAuth } from "@/lib/auth-context"

const businessFields = ["Kuliner", "Fashion", "Kerajinan", "Jasa Kreatif", "Pertanian", "Lainnya"]
const defaultSchedule = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => ({
  day,
  checked: false,
  start: "08:00",
  end: "17:00",
}))
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
  const { isAuthenticated, isReady, user } = useAuth()
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [scheduleError, setScheduleError] = useState(false)
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
  const [scheduleDays, setScheduleDays] = useState(defaultSchedule)
  const [showFieldErrors, setShowFieldErrors] = useState(false)

  const overlayOpen = showTermsModal || showScheduleModal

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [overlayOpen])

  useEffect(() => {
    if (!isReady) return
    if (!isAuthenticated) {
      router.replace("/profil")
      return
    }
    if (user?.hasUmkm) {
      router.replace("/ajukan/tambah-produk")
    }
  }, [isAuthenticated, isReady, user, router])

  const handleOwnerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowFieldErrors(true)
    const form = event.currentTarget
    if (!ownerForm.jadwal) {
      setScheduleError(true)
      return
    }
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setShowFieldErrors(false)
    router.push("/ajukan/tambah-produk")
  }

  if (!isReady) {
    return null
  }

  if (!isAuthenticated || user?.hasUmkm) {
    return null
  }

  return (
    <>
      <div className={overlayOpen ? "apply-blur" : undefined}>
        <PageLayout containerClassName="apply-container" mainClassName="apply-page" hideAppBar>
          <header className="apply-page-header">
            <img src="/logo-light.webp" alt="nemuinaja" width={84} height={84} />
            <span>nemuinaja</span>
            <h1 className="pengajuan">
              Formulir Pengajuan UMKM 
            </h1>
          </header>

          <form className="apply-card apply-form" onSubmit={handleOwnerSubmit}>
            <InputField
              label="Nama Pemilik"
              placeholder="Pastikan penulisan sesuai KTP"
              value={ownerForm.nama}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, nama: value }))}
              showErrorHint={showFieldErrors}
            />
            <InputField
              label="NIK"
              placeholder="Masukkan nomor NIK Anda"
              value={ownerForm.nik}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, nik: value }))}
              pattern="[0-9]{16}"
              maxLength={16}
              inputMode="numeric"
              showErrorHint={showFieldErrors}
            />
            <InputField
              label="No. Telepon"
              placeholder="Pastikan No telepon aktif"
              value={ownerForm.telp}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, telp: value }))}
              pattern="[0-9]+"
              inputMode="numeric"
              showErrorHint={showFieldErrors}
            />
            <InputField
              label="Email"
              placeholder="Masukkan Email Anda"
              type="email"
              value={ownerForm.email}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, email: value }))}
              showErrorHint={showFieldErrors}
            />
            <InputField
              label="Alamat Lengkap"
              placeholder="Tulis alamat lengkap Anda"
              value={ownerForm.alamat}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, alamat: value }))}
              multiline
              showErrorHint={showFieldErrors}
            />
            <InputField
              label="Nama Merek"
              placeholder="Tulis nama merek usaha Anda"
              value={ownerForm.brand}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, brand: value }))}
              showErrorHint={showFieldErrors}
            />
            <SelectField
              label="Bidang Usaha"
              placeholder="Pilih bidang"
              options={businessFields}
              value={ownerForm.bidang}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, bidang: value }))}
              showErrorHint={showFieldErrors}
            />
            <InputField
              label="NIB"
              placeholder="Tulis NIB Anda"
              value={ownerForm.nib}
              onChange={(value) => setOwnerForm((prev) => ({ ...prev, nib: value }))}
              required
              showErrorHint={showFieldErrors}
            />
            <div className="apply-field">
              <span>Jadwal Operasional</span>
              <button
                type="button"
                className={`apply-select-button ${ownerForm.jadwal ? "filled" : ""}`}
                onClick={() => { setScheduleError(false); setShowScheduleModal(true) }}
              >
                {ownerForm.jadwal || "Pilih jadwal buka toko Anda"}
              </button>
              {scheduleError && <p className="apply-input-hint">Harap isi kolom ini</p>}
            </div>
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

      {showScheduleModal ? (
        <ScheduleModal
          days={scheduleDays}
          onClose={() => setShowScheduleModal(false)}
          onSave={(days) => {
            setScheduleDays(days)
            const summary = days
              .filter((day) => day.checked)
              .map((day) => `${day.day} ${day.start}-${day.end}`)
              .join(", ")
            setOwnerForm((prev) => ({ ...prev, jadwal: summary || "" }))
            setShowScheduleModal(false)
          }}
        />
      ) : null}

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
  required?: boolean
  pattern?: string
  maxLength?: number
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  showErrorHint?: boolean
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  multiline,
  required = true,
  pattern,
  maxLength,
  inputMode,
  showErrorHint = false,
}: InputFieldProps) {
  const setValidity = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.setCustomValidity("")
  }

  const noteInvalid = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault()
    event.currentTarget.setCustomValidity("Harap isi kolom ini")
  }
  const shouldShowRequiredHint = showErrorHint && required && !value.trim()

  return (
    <label className={`apply-field ${multiline ? "textarea" : ""}`}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          onInvalid={noteInvalid}
          onInput={setValidity}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          maxLength={maxLength}
          inputMode={inputMode}
          onInvalid={noteInvalid}
          onInput={setValidity}
        />
      )}
      {shouldShowRequiredHint ? <p className="apply-input-hint">Harap isi kolom ini</p> : null}
    </label>
  )
}

type SelectFieldProps = {
  label: string
  placeholder: string
  options: string[]
  value: string
  onChange: (value: string) => void
  required?: boolean
  showErrorHint?: boolean
}

function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
  required = true,
  showErrorHint = false,
}: SelectFieldProps) {
  const noteInvalid = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault()
    event.currentTarget.setCustomValidity("Harap isi kolom ini")
  }
  const setValidity = (event: React.FormEvent<HTMLSelectElement>) => {
    event.currentTarget.setCustomValidity("")
  }
  const showRequiredHint = showErrorHint && required && !value

  return (
    <label className="apply-field">
      <span>{label}</span>
      <div className="apply-select">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          onInvalid={noteInvalid}
          onInput={setValidity}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {showRequiredHint ? <p className="apply-input-hint">Harap isi kolom ini</p> : null}
    </label>
  )
}

type ScheduleDay = {
  day: string
  checked: boolean
  start: string
  end: string
}

function ScheduleModal({
  days,
  onClose,
  onSave,
}: {
  days: ScheduleDay[]
  onClose: () => void
  onSave: (days: ScheduleDay[]) => void
}) {
  const [draft, setDraft] = useState(days)

  const toggleDay = (index: number) => {
    setDraft((prev) =>
      prev.map((day, idx) => (idx === index ? { ...day, checked: !day.checked } : day)),
    )
  }

  const updateTime = (index: number, field: "start" | "end", value: string) => {
    setDraft((prev) =>
      prev.map((day, idx) => (idx === index ? { ...day, [field]: value } : day)),
    )
  }

  return (
    <div className="apply-modal-backdrop">
      <div className="apply-modal apply-terms-modal">
        <button className="apply-modal-close" onClick={onClose} aria-label="Tutup">
          &times;
        </button>
        <header className="apply-modal-header">
          <img src="/logo-light.webp" alt="nemuinaja" width={64} height={64} />
          <h2>
            Atur <span>Jadwal Operasional</span>
          </h2>
        </header>
        <div className="apply-schedule-list">
          {draft.map((day, index) => (
            <div key={day.day} className="apply-schedule-row">
              <button
                type="button"
                className={`apply-schedule-check ${day.checked ? "checked" : ""}`}
                onClick={() => toggleDay(index)}
              >
                {day.checked && <span />}
              </button>
              <span className="apply-schedule-day">{day.day}</span>
              <input
                type="time"
                value={day.start}
                disabled={!day.checked}
                onChange={(event) => updateTime(index, "start", event.target.value)}
              />
              <span className="apply-schedule-sep">-</span>
              <input
                type="time"
                value={day.end}
                disabled={!day.checked}
                onChange={(event) => updateTime(index, "end", event.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="apply-submit" type="button" onClick={() => onSave(draft)}>
          Simpan jadwal
        </button>
      </div>
    </div>
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








