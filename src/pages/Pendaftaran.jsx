import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Reveal from '../components/Reveal'
import { supabase } from '../lib/supabase'
import logoRobotic from '../../assets/logo robotic.jpeg'
import logoWebsite from '../../assets/logo website.png'
import logoDesain from '../../assets/logo desain.png'

const bidangOptions = [
  {
    id: 'Robotic',
    name: 'Robotik',
    tagline: 'Robotika, IoT & Mikrokontroler',
    icon: 'fas fa-robot',
    logo: logoRobotic,
    reqDesc: 'Deskripsi ide proyek sains/alat sederhana (opsional).',
  },
  {
    id: 'Website',
    name: 'Website & Pemrograman',
    tagline: 'Aplikasi Web Modern, HTML/CSS & React',
    icon: 'fas fa-code',
    logo: logoWebsite,
    reqDesc: 'Tautan (link) repository GitHub atau website karya sendiri (opsional).',
  },
  {
    id: 'Desain Grafis',
    name: 'Desain Grafis',
    tagline: 'UI/UX, Layout Tipografi & Visual',
    icon: 'fas fa-palette',
    logo: logoDesain,
    reqDesc: 'Upload contoh karya desain visual berupa gambar PNG/JPG (opsional).',
  },
]

const steps = [
  { step: 1, title: 'Pilih Bidang', icon: 'fas fa-layer-group' },
  { step: 2, title: 'Data Diri', icon: 'fas fa-id-card' },
  { step: 3, title: 'Upload Berkas', icon: 'fas fa-file-arrow-up' },
  { step: 4, title: 'Konfirmasi', icon: 'fas fa-clipboard-check' },
  { step: 5, title: 'Status Verifikasi', icon: 'fas fa-circle-check' },
]

export default function Pendaftaran() {
  const { data, registerPendaftar } = useData()
  const [currentStep, setCurrentStep] = useState(1)

  // Form State
  const [form, setForm] = useState({
    bidang: 'Robotic',
    nama: '',
    kelas: '',
    nohp: '',
    email: '',
    alasanMasuk: '', // Alasan mengapa masuk ekstrakurikuler ini
    robotikProyekDesc: '',
    desainKaryaNama: '', // Simulating PNG/JPG upload
    websiteRepoLink: '',
    setujuAturan: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submittedRecord, setSubmittedRecord] = useState(null)

  // Cek status: wajib nomor registrasi + nomor WhatsApp agar tidak ada
  // yang bisa melihat data hanya dengan menebak satu nomor WA.
  const [searchReg, setSearchReg] = useState('')
  const [searchNoHp, setSearchNoHp] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // Step Validations
  const validateStep1 = () => {
    if (!form.bidang) {
      setErrors({ bidang: 'Pilih salah satu bidang ekstrakurikuler.' })
      return false
    }
    return true
  }

  const validateStep2 = () => {
    const err = {}
    if (!form.nama.trim()) err.nama = 'Nama lengkap wajib diisi.'
    if (!form.kelas.trim()) err.kelas = 'Kelas dan jurusan wajib diisi.'
    if (!form.nohp.trim()) {
      err.nohp = 'Nomor WhatsApp aktif wajib diisi.'
    } else if (!/^[0-9+\-\s]{9,16}$/.test(form.nohp.trim())) {
      err.nohp = 'Format nomor WhatsApp tidak valid.'
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = 'Format email tidak valid.'
    }

    if (Object.keys(err).length > 0) {
      setErrors(err)
      return false
    }
    return true
  }

  const validateStep3 = () => {
    const err = {}
    if (!form.alasanMasuk.trim()) {
      err.alasanMasuk = 'Alasan masuk ekstrakurikuler wajib diisi.'
    } else if (form.alasanMasuk.trim().length < 10) {
      err.alasanMasuk = 'Mohon jelaskan alasan secara lebih detail (minimal 10 karakter).'
    }
    // Semua upload berkas/portofolio sekarang bersifat opsional di setiap bidang
    if (!form.setujuAturan) {
      err.setujuAturan = 'Anda harus menyetujui komitmen kegiatan rutin.'
    }

    if (Object.keys(err).length > 0) {
      setErrors(err)
      return false
    }
    return true
  }

  const goToNextStep = () => {
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 2 && !validateStep2()) return
    if (currentStep === 3 && !validateStep3()) return
    setCurrentStep((prev) => Math.min(prev + 1, 5))
    window.scrollTo({ top: 150, behavior: 'smooth' })
  }

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // Handle final submission in Step 4
  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const payload = {
        nama: form.nama.trim(),
        kelas: form.kelas.trim(),
        nohp: form.nohp.trim(),
        email: form.email.trim(),
        bidang: form.bidang,
        alasanMasuk: form.alasanMasuk.trim(),
        karyaPortofolio:
          form.bidang === 'Robotik'
            ? form.robotikProyekDesc
            : form.bidang === 'Desain Grafis'
              ? form.desainKaryaNama
              : form.websiteRepoLink,
        status: 'Menunggu Verifikasi',
        tanggalDaftar: new Date().toISOString().slice(0, 10),
      }

      const { ok, error, id, nomorRegistrasi } = await registerPendaftar(payload)
      if (!ok) {
        setSubmitError(error?.message || 'Gagal menyimpan pendaftaran ke database.')
        return
      }

      setSubmittedRecord({ ...payload, id, nomorRegistrasi })
      setCurrentStep(5) // Move to Step 5: Status Verifikasi
      window.scrollTo({ top: 150, behavior: 'smooth' })
    } catch (err) {
      setSubmitError(err.message || 'Terjadi kesalahan sistem saat mengirim data.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Status Indicator renderer per PRD Section 4.3
  const renderStatusBadge = (status = 'Menunggu Verifikasi') => {
    switch (status) {
      case 'Diterima':
        // Latar #E3F2FD, Teks/Border #0D47A1, fas fa-circle-check
        return (
          <div className="badge-status-diterima">
            <i className="fas fa-circle-check" />
            <span>Diterima</span>
          </div>
        )
      case 'Butuh Wawancara':
        // Latar #90CAF9, Teks/Border #0D47A1, fas fa-comments
        return (
          <div className="badge-status-wawancara">
            <i className="fas fa-comments" />
            <span>Butuh Wawancara</span>
          </div>
        )
      case 'Ditolak':
        // Latar #E3F2FD, Teks/Border #0D47A1, fas fa-circle-xmark
        return (
          <div className="badge-status-ditolak">
            <i className="fas fa-circle-xmark" />
            <span>Ditolak</span>
          </div>
        )
      case 'Menunggu Verifikasi':
      default:
        // Latar #E3F2FD, Teks/Border #2196F3, fas fa-clock
        return (
          <div className="badge-status-menunggu">
            <i className="fas fa-clock" />
            <span>Menunggu Verifikasi</span>
          </div>
        )
    }
  }

  const handleSearchStatus = async (e) => {
    e.preventDefault()
    setSearched(true)
    const cleanNo = searchNoHp.trim().replace(/\D/g, '')
    const cleanReg = searchReg.trim().toUpperCase()
    if (!cleanNo || !cleanReg) {
      setSearchResult(null)
      return
    }

    // Coba lewat RPC Supabase (aman: hanya mengembalikan kolom terbatas,
    // cocokkan nomor registrasi + nomor WA sekaligus).
    if (supabase) {
      try {
        const { data: rows } = await supabase.rpc('cek_status_pendaftar', {
          p_nomor_registrasi: cleanReg,
          p_nohp: cleanNo,
        })
        if (Array.isArray(rows) && rows.length > 0) {
          setSearchResult(rows[0])
          return
        }
      } catch {
        // fallback ke data lokal di bawah
      }
    }

    // Fallback: data lokal (cache) — cocokkan kedua kriteria
    const found = (data.pendaftar || []).find(
      (p) =>
        String(p.nomorRegistrasi || '').trim().toUpperCase() === cleanReg &&
        String(p.nohp || '').replace(/\D/g, '') === cleanNo,
    )
    setSearchResult(found || null)
  }

  const groupLink = submittedRecord ? data.groupLinks?.[submittedRecord.bidang]?.trim() : ''

  return (
    <div className="space-y-10 pb-20 pt-6">
      {/* ===== Header Banner ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-10 shadow-card">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#90CAF9] bg-[#E3F2FD] px-3 py-1 text-xs font-bold text-[#0D47A1]">
            <i className="fas fa-user-plus text-xs text-[#2196F3]" />
            <span>MODUL PENDAFTARAN SISWA</span>
          </div>
          <h1 className="mt-4 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#0D47A1]">
            Pendaftaran Anggota Ekstrakurikuler
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#0D47A1]/80 max-w-2xl leading-relaxed">
            Alur pendaftaran terstruktur 5 langkah untuk bergabung dengan sub-bidang Robotik, Website & Pemrograman, atau Desain Grafis di SMK Krian 1 Sidoarjo.
          </p>

          {/* Stepper Wizard Bar (PRD Section 4.1) */}
          <div className="mt-8 border-t-2 border-[#90CAF9] pt-6">
            <div className="grid grid-cols-5 gap-2 text-center">
              {steps.map((s) => {
                const isActive = currentStep === s.step
                const isCompleted = currentStep > s.step
                return (
                  <div key={s.step} className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border-2 transition-all font-bold text-xs sm:text-sm ${
                        isActive
                          ? 'border-[#0D47A1] bg-[#2196F3] text-white shadow-md'
                          : isCompleted
                            ? 'border-[#0D47A1] bg-[#0D47A1] text-[#E3F2FD]'
                            : 'border-[#90CAF9] bg-[#E3F2FD] text-[#0D47A1]/60'
                      }`}
                    >
                      {isCompleted ? <i className="fas fa-check" /> : <i className={s.icon} />}
                    </div>
                    <span
                      className={`mt-2 hidden sm:block text-[11px] font-bold ${
                        isActive ? 'text-[#0D47A1]' : 'text-[#0D47A1]/60'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Main Wizard Container ===== */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-10 shadow-card">
          {/* ================= STEP 1: PILIH BIDANG ================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2196F3]">
                  Langkah 1 dari 5
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1]">
                  Pilih Bidang Ekstrakurikuler
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#0D47A1]/80">
                  Tentukan peminatan utama yang ingin kamu tekuni secara mendalam.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {bidangOptions.map((b) => {
                  const selected = form.bidang === b.id
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, bidang: b.id }))}
                      className={`flex flex-col items-start rounded-2xl border-2 p-5 text-left transition ${
                        selected
                          ? 'border-[#0D47A1] bg-[#E3F2FD] shadow-card'
                          : 'border-[#90CAF9] bg-white hover:bg-[#E3F2FD]/50'
                      }`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[#90CAF9] bg-white p-1">
                        <img src={b.logo} alt={b.name} className="h-full w-full object-contain" />
                      </div>
                      <p className="mt-3 font-display text-base font-bold text-[#0D47A1]">{b.name}</p>
                      <p className="mt-1 text-[11px] text-[#0D47A1]/70 leading-relaxed">{b.tagline}</p>
                      {selected && (
                        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#2196F3]">
                          <i className="fas fa-circle-check" />
                          <span>Terpilih</span>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              {errors.bidang && <p className="text-xs font-bold text-red-600">{errors.bidang}</p>}

              <div className="pt-4 border-t border-[#90CAF9]/40 flex justify-end">
                <button type="button" onClick={goToNextStep} className="btn-primary">
                  <span>Lanjut: Data Diri</span>
                  <i className="fas fa-arrow-right text-xs" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: ISI DATA DIRI ================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2196F3]">
                  Langkah 2 dari 5
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1]">
                  Pengisian Data Diri Siswa
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#0D47A1]/80">
                  Pastikan informasi yang kamu masukkan akurat dan nomor WhatsApp aktif.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0D47A1]">
                    Nama Lengkap <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleFieldChange}
                    placeholder="Masukkan nama lengkap"
                    className="input-field"
                  />
                  {errors.nama && <p className="mt-1 text-xs font-bold text-red-600">{errors.nama}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0D47A1]">
                      Kelas & Jurusan <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="kelas"
                      value={form.kelas}
                      onChange={handleFieldChange}
                      placeholder="cth: X RPL 1"
                      className="input-field"
                    />
                    {errors.kelas && <p className="mt-1 text-xs font-bold text-red-600">{errors.kelas}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0D47A1]">
                      Nomor WhatsApp <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="nohp"
                      value={form.nohp}
                      onChange={handleFieldChange}
                      placeholder="cth: 081234567890"
                      className="input-field"
                    />
                    {errors.nohp && <p className="mt-1 text-xs font-bold text-red-600">{errors.nohp}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#0D47A1]">
                    Alamat Email (Opsional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFieldChange}
                    placeholder="nama@gmail.com"
                    className="input-field"
                  />
                  {errors.email && <p className="mt-1 text-xs font-bold text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="pt-4 border-t border-[#90CAF9]/40 flex justify-between">
                <button type="button" onClick={goToPrevStep} className="btn-secondary">
                  <i className="fas fa-arrow-left text-xs" />
                  <span>Kembali</span>
                </button>
                <button type="button" onClick={goToNextStep} className="btn-primary">
                  <span>Lanjut: Upload Berkas</span>
                  <i className="fas fa-arrow-right text-xs" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: UPLOAD BERKAS ================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2196F3]">
                  Langkah 3 dari 5
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1]">
                  Persyaratan & Upload Berkas
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#0D47A1]/80">
                  Isi alasan bergabung dan lampirkan portofolio/berkas pendukung (opsional di semua bidang peminatan).
                </p>
              </div>

              {/* Syarat Umum: Alasan Mengapa Masuk Ekstrakurikuler Ini */}
              <div className="rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0D47A1]">
                  <i className="fas fa-comment-dots text-[#2196F3]" />
                  <span>Alasan Mengapa Masuk Ekstrakurikuler Ini *</span>
                </div>
                <p className="mt-1 text-xs text-[#0D47A1]/80">
                  Ceritakan motivasi, minat, atau tujuanmu bergabung dengan Ekstrakurikuler RPL SMK Krian 1.
                </p>
                <div className="mt-3">
                  <textarea
                    name="alasanMasuk"
                    value={form.alasanMasuk}
                    onChange={handleFieldChange}
                    rows="4"
                    placeholder="Contoh: Saya ingin mendalami pemrograman web dan robotika untuk membuat proyek bermanfaat serta mengembangkan portofolio karya saya..."
                    className="input-field resize-none text-xs"
                  />
                </div>
                {errors.alasanMasuk && <p className="mt-1 text-xs font-bold text-red-600">{errors.alasanMasuk}</p>}
              </div>

              {/* Syarat Khusus Per Bidang (PRD Section 4.2) */}
              <div className="rounded-2xl border-2 border-[#90CAF9] bg-white p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0D47A1]">
                  <i className="fas fa-puzzle-piece text-[#2196F3]" />
                  <span>Syarat Khusus Bidang {form.bidang}</span>
                </div>

                {form.bidang === 'Robotic' && (
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-[#0D47A1] mb-1">
                      Deskripsi Ide/Proyek Sains Sederhana (Opsional)
                    </label>
                    <textarea
                      name="robotikProyekDesc"
                      value={form.robotikProyekDesc}
                      onChange={handleFieldChange}
                      rows="3"
                      placeholder="Ceritakan pengalaman elektronikamu atau ide robot yang ingin kamu buat..."
                      className="input-field resize-none text-xs"
                    />
                  </div>
                )}

                {form.bidang === 'Desain Grafis' && (
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-[#0D47A1] mb-1">
                      Contoh Karya Desain Visual (PNG/JPG) <span className="font-normal text-[#0D47A1]/70">(Opsional)</span>
                    </label>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        setForm((p) => ({ ...p, desainKaryaNama: file ? file.name : '' }))
                      }}
                      className="block w-full text-xs text-[#0D47A1] file:mr-4 file:rounded-xl file:border-0 file:bg-[#2196F3] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-[#0D47A1]"
                    />
                    {form.desainKaryaNama && (
                      <p className="mt-1.5 text-xs font-bold text-[#0D47A1]">
                        <i className="fas fa-check-circle text-[#2196F3] mr-1" />
                        Terlampir: {form.desainKaryaNama}
                      </p>
                    )}
                  </div>
                )}

                {form.bidang === 'Website' && (
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-[#0D47A1] mb-1">
                      Tautan (Link) Repository / Website Portofolio (Opsional)
                    </label>
                    <input
                      type="url"
                      name="websiteRepoLink"
                      value={form.websiteRepoLink}
                      onChange={handleFieldChange}
                      placeholder="https://github.com/username/project"
                      className="input-field text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Komitmen Siswa */}
              <div className="flex items-start gap-2.5 rounded-xl border border-[#90CAF9] bg-[#E3F2FD] p-3.5">
                <input
                  type="checkbox"
                  id="setujuAturan"
                  name="setujuAturan"
                  checked={form.setujuAturan}
                  onChange={handleFieldChange}
                  className="mt-0.5 h-4 w-4 rounded border-[#90CAF9] text-[#2196F3] focus:ring-[#2196F3]"
                />
                <label htmlFor="setujuAturan" className="text-xs font-semibold text-[#0D47A1] leading-snug cursor-pointer">
                  Saya menyatakan data ini benar, berstatus siswa aktif SMK Krian 1, dan bersedia mengikuti kegiatan latihan rutin ekstrakurikuler dengan tertib.
                </label>
              </div>
              {errors.setujuAturan && <p className="text-xs font-bold text-red-600">{errors.setujuAturan}</p>}

              <div className="pt-4 border-t border-[#90CAF9]/40 flex justify-between">
                <button type="button" onClick={goToPrevStep} className="btn-secondary">
                  <i className="fas fa-arrow-left text-xs" />
                  <span>Kembali</span>
                </button>
                <button type="button" onClick={goToNextStep} className="btn-primary">
                  <span>Lanjut: Konfirmasi</span>
                  <i className="fas fa-arrow-right text-xs" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: KONFIRMASI ================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2196F3]">
                  Langkah 4 dari 5
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1]">
                  Konfirmasi Data Pendaftaran
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#0D47A1]/80">
                  Periksa kembali ringkasan data sebelum dikirimkan ke sistem verifikasi Ekstrakurikuler RPL.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-5 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-[#90CAF9]/40 pb-2">
                  <span className="font-bold text-[#0D47A1]/70">Pilihan Bidang:</span>
                  <span className="font-bold text-[#0D47A1]">{form.bidang}</span>
                </div>
                <div className="flex justify-between border-b border-[#90CAF9]/40 pb-2">
                  <span className="font-bold text-[#0D47A1]/70">Nama Lengkap:</span>
                  <span className="font-bold text-[#0D47A1]">{form.nama}</span>
                </div>
                <div className="flex justify-between border-b border-[#90CAF9]/40 pb-2">
                  <span className="font-bold text-[#0D47A1]/70">Kelas & Jurusan:</span>
                  <span className="font-bold text-[#0D47A1]">{form.kelas}</span>
                </div>
                <div className="flex justify-between border-b border-[#90CAF9]/40 pb-2">
                  <span className="font-bold text-[#0D47A1]/70">No. WhatsApp:</span>
                  <span className="font-bold text-[#0D47A1]">{form.nohp}</span>
                </div>
                <div className="flex flex-col border-b border-[#90CAF9]/40 pb-2">
                  <span className="font-bold text-[#0D47A1]/70 mb-1">Alasan Masuk Ekstrakurikuler:</span>
                  <span className="text-xs text-[#0D47A1] leading-relaxed italic bg-white/70 p-2.5 rounded-xl border border-[#90CAF9]/50">
                    "{form.alasanMasuk}"
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#90CAF9]/40 pb-2">
                  <span className="font-bold text-[#0D47A1]/70">Berkas / Portofolio:</span>
                  <span className="font-semibold text-xs text-[#0D47A1]">
                    {form.bidang === 'Robotik'
                      ? form.robotikProyekDesc ? 'Deskripsi ide terlampir' : 'Tidak dilampirkan (Opsional)'
                      : form.bidang === 'Desain Grafis'
                        ? form.desainKaryaNama || 'Tidak dilampirkan (Opsional)'
                        : form.websiteRepoLink || 'Tidak dilampirkan (Opsional)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#0D47A1]/70">Status Awal:</span>
                  {renderStatusBadge('Menunggu Verifikasi')}
                </div>
              </div>

              {submitError && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-xs font-bold text-red-700">
                  {submitError}
                </div>
              )}

              <div className="pt-4 border-t border-[#90CAF9]/40 flex justify-between">
                <button type="button" onClick={goToPrevStep} className="btn-secondary" disabled={isSubmitting}>
                  <i className="fas fa-arrow-left text-xs" />
                  <span>Perbaiki Data</span>
                </button>
                <button type="button" onClick={handleFinalSubmit} className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin text-xs" />
                      <span>Mengirim Formulir...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane text-xs" />
                      <span>Kirim Pendaftaran</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 5: STATUS VERIFIKASI ================= */}
          {currentStep === 5 && submittedRecord && (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] text-[#2196F3] shadow-md">
                <i className="fas fa-clipboard-check text-2xl" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2196F3]">
                  Langkah 5 dari 5: Status Pendaftaran
                </span>
                <h2 className="font-display text-2xl font-bold text-[#0D47A1] mt-1">
                  Pendaftaran Telah Diterima Sistem!
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#0D47A1]/80 max-w-md mx-auto leading-relaxed">
                  Terima kasih <strong className="text-[#0D47A1]">{submittedRecord.nama}</strong>. Data pendaftaranmu di bidang{' '}
                  <strong className="text-[#0D47A1]">{submittedRecord.bidang}</strong> sedang diproses.
                </p>
              </div>

              {/* Status Indicator Card (PRD Section 4.3) */}
              <div className="mx-auto max-w-md rounded-2xl border-2 border-[#90CAF9] bg-white p-6 text-left shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#90CAF9]/30 pb-3">
                  <span className="text-xs font-bold text-[#0D47A1]/70">Status Terkini:</span>
                  {renderStatusBadge(submittedRecord.status)}
                </div>

                <div className="space-y-2 text-xs font-semibold text-[#0D47A1]">
                  <p>
                    <span className="text-[#0D47A1]/60">Nomor Registrasi:</span>{' '}
                    <strong>{submittedRecord.nomorRegistrasi}</strong>
                  </p>
                  <p>
                    <span className="text-[#0D47A1]/60">Tanggal Daftar:</span> {submittedRecord.tanggalDaftar}
                  </p>
                  <p>
                    <span className="text-[#0D47A1]/60">WhatsApp:</span> {submittedRecord.nohp}
                  </p>
                </div>

                {/* WhatsApp Group Box */}
                {groupLink && (
                  <div className="rounded-xl border border-[#90CAF9] bg-[#E3F2FD] p-3.5 mt-4">
                    <p className="text-xs font-bold text-[#0D47A1] mb-2">
                      Grup Komunikasi Calon Anggota:
                    </p>
                    <a
                      href={groupLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary w-full !py-2 text-xs font-bold"
                    >
                      <i className="fab fa-whatsapp" />
                      <span>Masuk Grup WhatsApp {submittedRecord.bidang}</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      bidang: 'Robotic',
                      nama: '',
                      kelas: '',
                      nohp: '',
                      email: '',
                      alasanMasuk: '',
                      robotikProyekDesc: '',
                      desainKaryaNama: '',
                      websiteRepoLink: '',
                      setujuAturan: false,
                    })
                    setSubmittedRecord(null)
                    setCurrentStep(1)
                  }}
                  className="btn-secondary text-xs"
                >
                  Daftar Anggota Lain
                </button>
                <Link to="/" className="btn-primary text-xs">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ===== Panel Cek Status Mandiri Siswa ===== */}
        <div className="mt-8 rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-8 shadow-card">
          <div className="flex items-center gap-2">
            <i className="fas fa-magnifying-glass text-[#2196F3]" />
            <h3 className="font-display text-base font-bold text-[#0D47A1]">
              Cek Status Verifikasi Pendaftaran
            </h3>
          </div>
          <p className="mt-1 text-xs text-[#0D47A1]/80">
            Sudah pernah mendaftar? Masukkan <strong>nomor registrasi</strong> (contoh: RPL-ABC123) dan nomor WhatsApp
            yang didaftarkan untuk memantau status terkini.
          </p>

          <form onSubmit={handleSearchStatus} className="mt-4 flex flex-wrap gap-2">
            <input
              type="text"
              value={searchReg}
              onChange={(e) => setSearchReg(e.target.value)}
              placeholder="Nomor registrasi (RPL-XXXXXX)"
              className="input-field text-xs flex-1 min-w-[180px]"
            />
            <input
              type="tel"
              value={searchNoHp}
              onChange={(e) => setSearchNoHp(e.target.value)}
              placeholder="Nomor WhatsApp terdaftar"
              className="input-field text-xs flex-1 min-w-[180px]"
            />
            <button type="submit" className="btn-primary shrink-0 text-xs">
              <i className="fas fa-search" />
              <span>Cek Status</span>
            </button>
          </form>

          {searched && (
            <div className="mt-4 border-t border-[#90CAF9]/40 pt-4">
              {searchResult ? (
                <div className="rounded-2xl border-2 border-[#90CAF9] bg-[#E3F2FD] p-4 text-xs font-semibold text-[#0D47A1] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#0D47A1]">{searchResult.nomorRegistrasi}</span>
                    {renderStatusBadge(searchResult.status)}
                  </div>
                  <p>Bidang: <strong>{searchResult.bidang}</strong></p>
                  <p>Tanggal Daftar: {searchResult.tanggalDaftar}</p>
                </div>
              ) : (
                <p className="text-xs font-bold text-[#0D47A1]/60">
                  Data pendaftar tidak ditemukan. Pastikan nomor registrasi dan nomor WhatsApp sesuai yang Anda gunakan saat mendaftar.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
