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
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-50 py-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl animate-pulse-soft" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-gold-200/40 blur-3xl" />
        <Reveal className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700 animate-bounce-soft">
            <IconUserPlus className="h-4 w-4" />
            Bergabung Bersama Kami
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold text-slate-800">
            Pendaftaran Anggota Baru
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Isi formulir di bawah ini. Setelah mendaftar, kamu akan otomatis mendapatkan link grup
            WhatsApp sesuai bidang pilihanmu.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {submitted ? (
          <Reveal>
            <div className="card p-10 text-center md:p-16">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-900/25 animate-scale-in">
                <IconCheck className="h-12 w-12" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold text-ink">
                Pendaftaran Berhasil, {submitted.nama.split(' ')[0]}!
              </h2>
              <p className="mx-auto mt-4 max-w-md text-slate-500">
                Terima kasih sudah mendaftar di bidang <span className="font-bold text-brand-700">{submitted.bidang}</span>.
                Berikut link grup WhatsApp untuk bergabung.
              </p>

              <div className="mx-auto mt-8 max-w-md rounded-3xl border border-brand-200 bg-brand-50/60 p-6 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Link Grup WhatsApp
                </p>
                <p className="mt-4 text-sm text-slate-600">
                  Klik tombol di bawah ini untuk bergabung dengan grup <span className="font-bold text-ink">{submitted.bidang}</span>:
                </p>
                {hasGroupLink ? (
                  <>
                    <a href={groupLink} target="_blank" rel="noreferrer" className="btn-primary mt-4 w-full">
                      <IconUsers className="h-5 w-5" />
                      Bergabung ke Grup {submitted.bidang}
                    </a>
                    <p className="mt-3 break-all text-xs text-slate-400">{groupLink}</p>
                  </>
                ) : (
                  <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-600">
                    Link grup belum tersedia. Hubungi pembina ekskul untuk mendapatkan undangan.
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => setSubmitted(null)} className="btn-secondary">
                  Daftar Anggota Lainnya
                </button>
                <Link to="/" className="btn-primary">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} className="card space-y-7 p-7 md:p-10">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">Data Diri</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Lengkapi identitas kamu dengan benar.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="cth: Budi Santoso"
                    className="input-field"
                  />
                  {errors.nama && <p className="mt-1 text-xs font-medium text-red-500">{errors.nama}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Kelas <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="kelas"
                    value={form.kelas}
                    onChange={handleChange}
                    placeholder="cth: XI RPL 1"
                    className="input-field"
                  />
                  {errors.kelas && <p className="mt-1 text-xs font-medium text-red-500">{errors.kelas}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Nomor HP/WA <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="nohp"
                    value={form.nohp}
                    onChange={handleChange}
                    placeholder="cth: 0812-3456-7890"
                    className="input-field"
                  />
                  {errors.nohp && <p className="mt-1 text-xs font-medium text-red-500">{errors.nohp}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="kamu@email.com"
                    className="input-field"
                  />
                  {errors.email && <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-ink">
                    Bidang Pilihan <span className="text-red-500">*</span>
                  </label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {bidangList.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => handleChange({ target: { name: 'bidang', value: b } })}
                        className={`rounded-2xl border-2 px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
                          form.bidang === b
                            ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-soft'
                            : 'border-stone-200 bg-white text-stone-500 hover:border-brand-300'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {errors.bidang && <p className="mt-1 text-xs font-medium text-red-500">{errors.bidang}</p>}
                </div>
              </div>

              {submitError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <button type="submit" className="btn-primary w-full py-4 text-base" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Mengirim data...
                  </>
                ) : (
                  <>
                    <IconSend className="h-5 w-5" />
                    Daftar Sekarang
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-400">
                Setelah mendaftar, kamu akan otomatis mendapatkan link grup WhatsApp bidang pilihanmu.
              </p>
            </form>
          </Reveal>
        )}

        {/* Info jadwal */}
        <Reveal delay={150}>
          <div className="mt-8 card overflow-hidden">
            <div className="flex items-center gap-3 border-b border-stone-200/70 bg-brand-50 px-6 py-5">
              <IconCalendar className="h-6 w-6 text-brand-700" />
              <h3 className="font-display text-lg font-semibold text-ink">Jadwal Kegiatan Ekskul</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-100 text-sm">
                <thead className="bg-cream text-left text-xs font-bold uppercase tracking-wider text-stone-500">
                  <tr>
                    <th className="px-6 py-3">Bidang</th>
                    <th className="px-6 py-3">Hari</th>
                    <th className="px-6 py-3">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {data.jadwal.map((j) => (
                    <tr key={j.id} className="transition hover:bg-brand-50/50">
                      <td className="px-6 py-3.5 font-semibold text-ink">{j.bidang}</td>
                      <td className="px-6 py-3.5 text-stone-600">{j.hari}</td>
                      <td className="px-6 py-3.5 text-stone-600">{j.waktu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-stone-200/70 bg-cream px-6 py-4">
              <Link to="/galeri" className="inline-flex items-center gap-2 text-sm font-bold text-brand-700">
                Lihat dokumentasi kegiatan
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
