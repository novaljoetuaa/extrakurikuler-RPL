import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Reveal from '../components/Reveal'
import {
  IconUserPlus,
  IconArrowRight,
  IconCalendar,
  IconCheck,
  IconSend,
  IconUsers,
} from '../components/icons'

const emptyForm = {
  nama: '',
  kelas: '',
  nohp: '',
  email: '',
  bidang: 'Robotic',
}

const bidangList = ['Robotic', 'Website', 'Desain Grafis']

export default function Pendaftaran() {
  const { data, registerPendaftar } = useData()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const err = {}
    if (!form.nama.trim()) err.nama = 'Nama lengkap wajib diisi.'
    if (!form.kelas.trim()) err.kelas = 'Kelas wajib diisi.'
    if (!form.nohp.trim()) {
      err.nohp = 'Nomor HP/WA wajib diisi.'
    } else if (!/^[0-9+\-\s]{9,15}$/.test(form.nohp.trim())) {
      err.nohp = 'Nomor HP tidak valid.'
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Format email tidak valid.'
    if (!form.bidang) err.bidang = 'Pilih bidang yang diminati.'
    return err
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length > 0) {
      setErrors(err)
      setSubmitError('')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const payload = {
        ...form,
        status: 'Baru',
        tanggalDaftar: new Date().toISOString().slice(0, 10),
      }

      const { ok, error, id } = await registerPendaftar(payload)
      if (!ok) {
        setSubmitError(error?.message || 'Pendaftaran gagal disimpan. Mohon coba beberapa saat lagi.')
        return
      }

      setForm(emptyForm)
      setSubmitted({ ...payload, id })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setSubmitError(error?.message || 'Terjadi kesalahan saat mengirim data pendaftaran.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const groupLink = submitted ? data.groupLinks[submitted.bidang]?.trim() : ''
  const hasGroupLink = /^https:\/\/chat\.whatsapp\.com\//.test(groupLink)

  return (
    <div className="space-y-12 pb-16 md:space-y-16 md:pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50/50 py-16 md:py-20 border-b border-slate-200/60">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="badge-pill">
              <IconUserPlus className="h-3.5 w-3.5 text-brand-600" />
              <span>Pendaftaran Terbuka</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Pendaftaran Anggota Baru
            </h1>
            <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-600">
              Lengkapi formulir pendaftaran di bawah ini. Setelah terdaftar, kamu akan langsung terhubung ke grup komunikasi resmi sub-bidang pilihanmu.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {submitted ? (
          <Reveal>
            <div className="card p-8 text-center sm:p-12 md:p-14">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-600 text-white shadow-lg shadow-brand-600/25 animate-scale-in">
                <IconCheck className="h-10 w-10" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold text-slate-900">
                Pendaftaran Berhasil, {submitted.nama.split(' ')[0]}!
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm sm:text-base text-slate-600">
                Terima kasih telah bergabung di sub-bidang <strong className="text-brand-700 font-bold">{submitted.bidang}</strong>.
                Silakan bergabung ke grup WhatsApp resmi melalui tombol berikut:
              </p>

              <div className="mx-auto mt-8 max-w-md rounded-3xl border border-brand-200 bg-brand-50/60 p-6 text-left shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Grup Komunikasi WhatsApp
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Klik tautan di bawah untuk bergabung dengan komunitas <strong className="text-slate-900">{submitted.bidang}</strong>:
                </p>
                {hasGroupLink ? (
                  <>
                    <a
                      href={groupLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary mt-4 w-full !py-3 font-bold"
                    >
                      <IconUsers className="h-4 w-4" />
                      Gabung Grup WhatsApp {submitted.bidang}
                    </a>
                    <p className="mt-2.5 break-all text-center text-xs text-slate-400">{groupLink}</p>
                  </>
                ) : (
                  <p className="mt-4 rounded-xl border border-slate-200 bg-white p-3.5 text-center text-xs text-slate-600">
                    Tautan grup otomatis sedang dipersiapkan oleh pembina ekskul.
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => setSubmitted(null)} className="btn-secondary">
                  Daftarkan Anggota Lain
                </button>
                <Link to="/" className="btn-primary">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} className="card space-y-8 p-6 sm:p-10">
              <div className="border-b border-slate-100 pb-5">
                <h2 className="font-display text-2xl font-bold text-slate-900">Formulir Pendaftaran</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Pastikan data diri yang diisi sudah sesuai dan nomor WhatsApp aktif.
                </p>
              </div>

              <div className="space-y-6">
                {/* Field Bidang Pilihan */}
                <div>
                  <label className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Pilih Sub-Bidang <span className="text-red-500">*</span>
                  </label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {bidangList.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => handleChange({ target: { name: 'bidang', value: b } })}
                        className={`rounded-2xl border-2 p-4 text-center text-sm font-bold transition-all duration-200 ${
                          form.bidang === b
                            ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <p className="text-base">{b}</p>
                        <p className="mt-0.5 text-xs font-normal text-slate-500">
                          {b === 'Robotic' ? 'Robotika & IoT' : b === 'Website' ? 'Web Development' : 'Desain Grafis & UI'}
                        </p>
                      </button>
                    ))}
                  </div>
                  {errors.bidang && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.bidang}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="cth: Rafi Ahmad"
                      className="input-field"
                    />
                    {errors.nama && <p className="mt-1 text-xs font-semibold text-red-500">{errors.nama}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                      Kelas & Jurusan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="kelas"
                      value={form.kelas}
                      onChange={handleChange}
                      placeholder="cth: X RPL 1"
                      className="input-field"
                    />
                    {errors.kelas && <p className="mt-1 text-xs font-semibold text-red-500">{errors.kelas}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="nohp"
                      value={form.nohp}
                      onChange={handleChange}
                      placeholder="cth: 081234567890"
                      className="input-field"
                    />
                    {errors.nohp && <p className="mt-1 text-xs font-semibold text-red-500">{errors.nohp}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                      Alamat Email (Opsional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="cth: siswa@email.com"
                      className="input-field"
                    />
                    {errors.email && <p className="mt-1 text-xs font-semibold text-red-500">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
                  {submitError}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-primary w-full !py-3.5 !text-base font-bold shadow-md hover:shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sedang Memproses...</span>
                    </>
                  ) : (
                    <>
                      <IconSend className="h-4 w-4" />
                      <span>Kirim Pendaftaran Sekarang</span>
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-slate-400">
                  Dengan mendaftar, kamu bersedia mengikuti kegiatan ekstrakurikuler dengan tertib.
                </p>
              </div>
            </form>
          </Reveal>
        )}

        {/* Schedule Reference Card */}
        <Reveal delay={150}>
          <div className="mt-10 card overflow-hidden">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-4">
              <IconCalendar className="h-5 w-5 text-brand-600" />
              <h3 className="font-display text-base font-bold text-slate-900">Jadwal Latihan Mingguan</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50/40 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Bidang</th>
                    <th className="px-6 py-3">Hari Pertemuan</th>
                    <th className="px-6 py-3">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {data.jadwal.map((j) => (
                    <tr key={j.id} className="transition hover:bg-slate-50/60">
                      <td className="px-6 py-3.5 font-bold text-slate-900">{j.bidang}</td>
                      <td className="px-6 py-3.5 text-slate-600">{j.hari}</td>
                      <td className="px-6 py-3.5 text-slate-600">{j.waktu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
