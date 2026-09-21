import { useState } from 'react'
import { useData } from '../context/DataContext'
import ImageUploader from '../components/ImageUploader'
import {
  IconImage,
  IconCalendar,
  IconMegaphone,
  IconMail,
  IconPlus,
  IconEdit,
  IconTrash,
IconX,
  IconAlert,
  IconSave,
  IconLock,
  IconUserPlus,
  IconUsers,
  IconDownload,
} from '../components/icons'

const tabs = [
  { id: 'kegiatan', label: 'Kegiatan', Icon: IconImage },
  { id: 'jadwal', label: 'Jadwal', Icon: IconCalendar },
  { id: 'pengumuman', label: 'Pengumuman', Icon: IconMegaphone },
  { id: 'pendaftar', label: 'Pendaftar', Icon: IconUsers },
  { id: 'kontak', label: 'Kontak & Sosmed', Icon: IconMail },
]

const emptyKegiatan = { bidang: 'Robotic', judul: '', deskripsi: '', gambar: '' }
const emptyJadwal = { bidang: 'Robotic', hari: '', waktu: '', tempat: '' }
const emptyPengumuman = { judul: '', isi: '', tanggal: '' }
const emptyPendaftar = { nama: '', kelas: '', nohp: '', email: '', bidang: 'Robotic', status: 'Baru' }
const bidangTabs = ['Robotic', 'Website', 'Desain Grafis']

const inputClass =
  'w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-ink placeholder-stone-400 transition-all duration-300 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100'
const labelClass = 'mb-1.5 block text-sm font-semibold text-ink'
const thClass = 'px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-stone-500'
const tdClass = 'px-5 py-3.5 text-sm text-stone-700 align-top'

function Modal({ open, title, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-950/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7 shadow-lift animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
            aria-label="Tutup modal"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-950/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-lift animate-scale-in">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <IconAlert className="h-7 w-7" />
        </div>
        <p className="mt-4 text-center font-semibold text-ink">{message}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPanel() {
  const { data, addItem, updateItem, removeItem, updateKontak, updateSosmed, resetData, newPendaftarCount, clearPendaftarNotif } = useData()
  const [tab, setTab] = useState('kegiatan')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyKegiatan)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [kontakForm, setKontakForm] = useState({ ...data.kontak })
  const [sosmedForm, setSosmedForm] = useState({ ...data.sosmed })
const [savedMsg, setSavedMsg] = useState('')
  const [resetConfirm, setResetConfirm] = useState(false)
  const [pendaftarFilter, setPendaftarFilter] = useState('')

  const openAdd = (type) => {
    const base =
      type === 'kegiatan'
        ? emptyKegiatan
        : type === 'jadwal'
          ? emptyJadwal
          : type === 'pengumuman'
            ? emptyPengumuman
            : emptyPendaftar
    setForm(base)
    setModal({ type, editing: null })
  }

  const openEdit = (type, item) => {
    setForm({ ...item })
    setModal({ type, editing: item })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!modal) return
    const { type, editing } = modal
    if (type === 'kegiatan') {
      if (editing) updateItem('kegiatan', editing.id, form)
      else addItem('kegiatan', form)
    } else if (type === 'jadwal') {
      if (editing) updateItem('jadwal', editing.id, form)
      else addItem('jadwal', form)
    } else if (type === 'pengumuman') {
      if (editing) updateItem('pengumuman', editing.id, form)
      else addItem('pengumuman', form)
    } else if (type === 'pendaftar') {
      if (editing) updateItem('pendaftar', editing.id, form)
      else addItem('pendaftar', form)
    }
    setModal(null)
    setForm(emptyKegiatan)
    showToast('Data berhasil disimpan.')
  }

  const exportCSV = (bidang) => {
    const list = bidang ? data.pendaftar.filter((p) => p.bidang === bidang) : data.pendaftar
    if (list.length === 0) {
      showToast('Tidak ada data untuk diekspor.')
      return
    }
    const headers = ['Nama', 'Kelas', 'No HP/WA', 'Email', 'Bidang', 'Status', 'Tanggal Daftar']
    const rows = list.map((p) => [
      p.nama,
      p.kelas,
      p.nohp,
      p.email,
      p.bidang,
      p.status,
      p.tanggalDaftar || '',
    ])
    const csvContent = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pendaftar-${bidang || 'semua'}-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    showToast('CSV berhasil diunduh.')
  }

  const handleSaveKontak = (e) => {
    e.preventDefault()
    updateKontak(kontakForm)
    updateSosmed(sosmedForm)
    showToast('Kontak & sosial media berhasil diperbarui.')
  }

  const showToast = (msg) => {
    setSavedMsg(msg)
    setTimeout(() => setSavedMsg(''), 3000)
  }

  const handleSetTab = (id) => {
    setTab(id)
    if (id === 'pendaftar') {
      // clear unread pendaftar notification when admin views the tab
      if (typeof window !== 'undefined') {
        // access context via callback prop from useData
      }
      if (typeof clearPendaftarNotif === 'function') clearPendaftarNotif()
    }
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50/50 py-12 md:py-16 border-b border-slate-200/60">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="badge-pill">
                <IconShield className="h-3.5 w-3.5 text-brand-600" />
                <span>Dashboard Pengelola</span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Admin Panel</h1>
              <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-600">
                Kelola kegiatan, jadwal pertemuan, pengumuman, data pendaftar, dan informasi kontak Ekstrakurikuler RPL.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setResetConfirm(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
            >
              <IconLock className="h-3.5 w-3.5" />
              Reset Data Default
            </button>
          </div>
        </div>
      </section>

      {/* Toast */}
      {savedMsg && (
        <div className="fixed left-1/2 top-20 z-[90] -translate-x-1/2 animate-scale-in rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white shadow-lift">
          ✅ {savedMsg}
        </div>
      )}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Tabs */}
          <div className="flex flex-wrap gap-2.5">
          {tabs.map((t) => {
            const TIcon = t.Icon
            const isPendaftar = t.id === 'pendaftar'
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSetTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                  tab === t.id
                    ? 'bg-brand-800 text-white shadow-lg shadow-brand-900/20'
                    : 'bg-white text-stone-600 shadow-soft hover:bg-brand-50 hover:text-brand-800'
                }`}
              >
                <TIcon className="h-4 w-4" />
                {t.label}
                {isPendaftar && newPendaftarCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                    {newPendaftarCount}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-7">
          {/* ===== KEGIATAN ===== */}
          {tab === 'kegiatan' && (
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/70 px-6 py-5">
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">Kelola Gambar & Informasi Kegiatan</h2>
                  <p className="text-sm text-stone-500">Tambah, ubah, atau hapus kegiatan per bidang.</p>
                </div>
                <button type="button" onClick={() => openAdd('kegiatan')} className="btn-primary">
                  <IconPlus className="h-4 w-4" />
                  Tambah Kegiatan
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-stone-200">
                  <thead className="bg-cream">
                    <tr>
                      <th className={thClass}>Gambar</th>
                      <th className={thClass}>Bidang</th>
                      <th className={thClass}>Judul</th>
                      <th className={thClass}>Deskripsi</th>
                      <th className={thClass}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 bg-white">
                    {data.kegiatan.map((k) => (
                      <tr key={k.id} className="transition hover:bg-brand-50/40">
                        <td className={tdClass}>
                          <img src={k.gambar} alt={k.judul} className="h-16 w-24 rounded-xl object-cover shadow-soft" />
                        </td>
                        <td className={tdClass}>
                          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
                            {k.bidang}
                          </span>
                        </td>
                        <td className={`${tdClass} font-semibold text-ink`}>{k.judul}</td>
                        <td className={`${tdClass} max-w-xs`}>{k.deskripsi}</td>
                        <td className={tdClass}>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => openEdit('kegiatan', k)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100"
                            >
                              <IconEdit className="h-3.5 w-3.5" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDelete({ key: 'kegiatan', id: k.id })}
                              className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
                            >
                              <IconTrash className="h-3.5 w-3.5" />
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {data.kegiatan.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-5 py-12 text-center text-stone-400">
                          Belum ada kegiatan. Klik "Tambah Kegiatan" untuk memulai.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== JADWAL ===== */}
          {tab === 'jadwal' && (
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/70 px-6 py-5">
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">Kelola Jadwal Latihan</h2>
                  <p className="text-sm text-stone-500">Atur jadwal latihan untuk setiap bidang.</p>
                </div>
                <button type="button" onClick={() => openAdd('jadwal')} className="btn-primary">
                  <IconPlus className="h-4 w-4" />
                  Tambah Jadwal
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-stone-200">
                  <thead className="bg-cream">
                    <tr>
                      <th className={thClass}>Bidang</th>
                      <th className={thClass}>Hari</th>
                      <th className={thClass}>Waktu</th>
                      <th className={thClass}>Tempat</th>
                      <th className={thClass}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 bg-white">
                    {data.jadwal.map((j) => (
                      <tr key={j.id} className="transition hover:bg-brand-50/40">
                        <td className={`${tdClass} font-semibold text-ink`}>{j.bidang}</td>
                        <td className={tdClass}>{j.hari}</td>
                        <td className={tdClass}>{j.waktu}</td>
                        <td className={tdClass}>{j.tempat}</td>
                        <td className={tdClass}>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => openEdit('jadwal', j)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100"
                            >
                              <IconEdit className="h-3.5 w-3.5" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDelete({ key: 'jadwal', id: j.id })}
                              className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
                            >
                              <IconTrash className="h-3.5 w-3.5" />
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {data.jadwal.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-5 py-12 text-center text-stone-400">
                          Belum ada jadwal. Klik "Tambah Jadwal" untuk memulai.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== PENGUMUMAN ===== */}
          {tab === 'pengumuman' && (
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/70 px-6 py-5">
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">Kelola Pengumuman</h2>
                  <p className="text-sm text-stone-500">Sampaikan informasi terbaru kepada anggota.</p>
                </div>
                <button type="button" onClick={() => openAdd('pengumuman')} className="btn-primary">
                  <IconPlus className="h-4 w-4" />
                  Tambah Pengumuman
                </button>
              </div>
              <div className="divide-y divide-stone-100 bg-white">
                {data.pengumuman.map((p) => (
                  <div key={p.id} className="flex flex-wrap items-start justify-between gap-4 px-6 py-5 transition hover:bg-brand-50/40">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-semibold text-ink">{p.judul}</h3>
                        <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-500">
                          {p.tanggal}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-stone-600">{p.isi}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit('pengumuman', p)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100"
                      >
                        <IconEdit className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete({ key: 'pengumuman', id: p.id })}
                        className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
                      >
                        <IconTrash className="h-3.5 w-3.5" />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
                {data.pengumuman.length === 0 && (
                  <div className="px-6 py-12 text-center text-stone-400">
                    Belum ada pengumuman. Klik "Tambah Pengumuman" untuk memulai.
                  </div>
                )}
              </div>
            </div>
          )}

{/* ===== PENDATAR ===== */}
          {tab === 'pendaftar' && (
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/70 px-6 py-5">
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">Kelola Pendaftar / Anggota</h2>
                  <p className="text-sm text-stone-500">Kelola pendaftar per bidang dan ekspor data ke CSV.</p>
                </div>
                <button type="button" onClick={() => openAdd('pendaftar')} className="btn-primary">
                  <IconPlus className="h-4 w-4" />
                  Tambah Pendaftar
                </button>
              </div>

              {/* Filter & export per bidang */}
              <div className="flex flex-wrap items-center gap-2.5 border-b border-stone-100 px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Per Bidang:</span>
                <button
                  type="button"
                  onClick={() => setPendaftarFilter('')}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${!pendaftarFilter ? 'bg-brand-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                >
                  Semua ({data.pendaftar.length})
                </button>
                {bidangTabs.map((b) => {
                  const count = data.pendaftar.filter((p) => p.bidang === b).length
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setPendaftarFilter(b)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${pendaftarFilter === b ? 'bg-brand-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                    >
                      {b} ({count})
                    </button>
                  )
                })}
                <div className="ml-auto flex gap-2">
                  <button type="button" onClick={() => exportCSV(pendaftarFilter || null)} className="btn-secondary !px-4 !py-2 text-xs">
                    <IconDownload className="h-4 w-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-stone-200">
                  <thead className="bg-cream">
                    <tr>
                      <th className={thClass}>Nama</th>
                      <th className={thClass}>Kelas</th>
                      <th className={thClass}>No HP/WA</th>
                      <th className={thClass}>Email</th>
                      <th className={thClass}>Bidang</th>
                      <th className={thClass}>Status</th>
                      <th className={thClass}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 bg-white">
                    {data.pendaftar
                      .filter((p) => !pendaftarFilter || p.bidang === pendaftarFilter)
                      .map((p) => (
                        <tr key={p.id} className="transition hover:bg-brand-50/40">
                          <td className={`${tdClass} font-semibold text-ink`}>{p.nama}</td>
                          <td className={tdClass}>{p.kelas}</td>
                          <td className={tdClass}>{p.nohp}</td>
                          <td className={tdClass}>{p.email || '-'}</td>
                          <td className={tdClass}>
                            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
                              {p.bidang}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                p.status === 'Baru'
                                  ? 'bg-gold-100 text-gold-700'
                                  : p.status === 'Aktif'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-stone-100 text-stone-600'
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => openEdit('pendaftar', p)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100"
                              >
                                <IconEdit className="h-3.5 w-3.5" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDelete({ key: 'pendaftar', id: p.id })}
                                className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
                              >
                                <IconTrash className="h-3.5 w-3.5" />
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {data.pendaftar.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-5 py-12 text-center text-stone-400">
                          Belum ada pendaftar. Silakan daftar melalui halaman Pendaftaran.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== KONTAK & SOSMED ===== */}
          {tab === 'kontak' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <form onSubmit={handleSaveKontak} className="card p-7">
                <h2 className="font-display text-xl font-semibold text-ink">Informasi Kontak</h2>
                <p className="text-sm text-stone-500">Data kontak yang tampil di footer dan halaman.</p>
                <div className="mt-5 space-y-4">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={kontakForm.email}
                      onChange={(e) => setKontakForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Telepon / WhatsApp</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={kontakForm.telepon}
                      onChange={(e) => setKontakForm((p) => ({ ...p, telepon: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Alamat</label>
                    <textarea
                      rows="3"
                      className={`${inputClass} resize-none`}
                      value={kontakForm.alamat}
                      onChange={(e) => setKontakForm((p) => ({ ...p, alamat: e.target.value }))}
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary mt-6 w-full">
                  <IconSave className="h-4 w-4" />
                  Simpan Kontak
                </button>
              </form>

              <form onSubmit={handleSaveKontak} className="card p-7">
                <h2 className="font-display text-xl font-semibold text-ink">Link Akun Sosial Media</h2>
                <p className="text-sm text-stone-500">Perbarui tautan akun media sosial ekskul.</p>
                <div className="mt-5 space-y-4">
                  {Object.keys(sosmedForm).map((name) => (
                    <div key={name}>
                      <label className={`${labelClass} capitalize`}>{name}</label>
                      <input
                        type="url"
                        className={inputClass}
                        placeholder={`https://${name}.com/...`}
                        value={sosmedForm[name]}
                        onChange={(e) => setSosmedForm((p) => ({ ...p, [name]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" className="btn-primary mt-6 w-full">
                  <IconSave className="h-4 w-4" />
                  Simpan Sosial Media
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Modal form */}
      <Modal
        open={!!modal}
        title={
          modal
            ? modal.editing
              ? 'Edit Data'
              : modal.type === 'kegiatan'
                ? 'Tambah Kegiatan'
                : modal.type === 'jadwal'
                  ? 'Tambah Jadwal'
                  : 'Tambah Pengumuman'
            : ''
        }
        onClose={() => setModal(null)}
      >
        {modal?.type === 'kegiatan' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className={labelClass}>Bidang</label>
              <select name="bidang" value={form.bidang} onChange={handleChange} className={inputClass}>
                <option>Robotic</option>
                <option>Website</option>
                <option>Desain Grafis</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Judul Kegiatan</label>
              <input
                name="judul"
                value={form.judul}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="cth: Workshop Robotika"
              />
            </div>
            <div>
              <label className={labelClass}>Deskripsi</label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                required
                rows="3"
                className={`${inputClass} resize-none`}
                placeholder="Deskripsi singkat kegiatan"
              />
            </div>
            <div>
              <ImageUploader
                value={form.gambar}
                onChange={(gambar) => setForm((prev) => ({ ...prev, gambar }))}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="btn-secondary flex-1">
                Batal
              </button>
              <button type="submit" className="btn-primary flex-1">
                Simpan
              </button>
            </div>
          </form>
        )}

        {modal?.type === 'jadwal' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className={labelClass}>Bidang</label>
              <select name="bidang" value={form.bidang} onChange={handleChange} className={inputClass}>
                <option>Robotic</option>
                <option>Website</option>
                <option>Desain Grafis</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Hari</label>
              <select name="hari" value={form.hari} onChange={handleChange} required className={inputClass}>
                <option value="">Pilih hari...</option>
                <option>Senin</option>
                <option>Selasa</option>
                <option>Rabu</option>
                <option>Kamis</option>
                <option>Jumat</option>
                <option>Sabtu</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Waktu</label>
              <input
                name="waktu"
                value={form.waktu}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="cth: 15.00 - 17.00"
              />
            </div>
            <div>
              <label className={labelClass}>Tempat</label>
              <input
                name="tempat"
                value={form.tempat}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="cth: Lab Komputer 1"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="btn-secondary flex-1">
                Batal
              </button>
              <button type="submit" className="btn-primary flex-1">
                Simpan
              </button>
            </div>
          </form>
        )}

        {modal?.type === 'pengumuman' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className={labelClass}>Judul Pengumuman</label>
              <input
                name="judul"
                value={form.judul}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="cth: Persiapan Lomba"
              />
            </div>
            <div>
              <label className={labelClass}>Isi Pengumuman</label>
              <textarea
                name="isi"
                value={form.isi}
                onChange={handleChange}
                required
                rows="4"
                className={`${inputClass} resize-none`}
                placeholder="Tulis isi pengumuman..."
              />
            </div>
            <div>
              <label className={labelClass}>Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
<div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="btn-secondary flex-1">
                Batal
              </button>
              <button type="submit" className="btn-primary flex-1">
                Simpan
              </button>
            </div>
          </form>
        )}

        {modal?.type === 'pendaftar' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className={labelClass}>Nama Lengkap</label>
              <input
                name="nama"
                value={form.nama}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="cth: Budi Santoso"
              />
            </div>
            <div>
              <label className={labelClass}>Kelas</label>
              <input
                name="kelas"
                value={form.kelas}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="cth: XI RPL 1"
              />
            </div>
            <div>
              <label className={labelClass}>No HP / WhatsApp</label>
              <input
                name="nohp"
                value={form.nohp}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="cth: 0812-3456-7890"
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="kamu@email.com"
              />
            </div>
            <div>
              <label className={labelClass}>Bidang</label>
              <select name="bidang" value={form.bidang} onChange={handleChange} className={inputClass}>
                <option>Robotic</option>
                <option>Website</option>
                <option>Desain Grafis</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option>Baru</option>
                <option>Aktif</option>
                <option>Nonaktif</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="btn-secondary flex-1">
                Batal
              </button>
              <button type="submit" className="btn-primary flex-1">
                Simpan
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Konfirmasi hapus */}
      <ConfirmModal
        open={!!confirmDelete}
        message="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => {
          removeItem(confirmDelete.key, confirmDelete.id)
          setConfirmDelete(null)
          showToast('Data berhasil dihapus.')
        }}
      />

      {/* Konfirmasi reset */}
      <ConfirmModal
        open={resetConfirm}
        message="Semua data akan dikembalikan ke pengaturan awal. Lanjutkan?"
        onCancel={() => setResetConfirm(false)}
        onConfirm={() => {
          resetData()
          setResetConfirm(false)
          setKontakForm({ email: 'ekskul.robotik@sekolah.sch.id', telepon: '0812-3456-7890', alamat: 'Jl. Kyai Mojo, Wonoayu, Sidoarjo' })
          setSosmedForm({ instagram: 'https://instagram.com/ekskul.rpl', youtube: 'https://youtube.com/@ekskulrpl', tiktok: 'https://tiktok.com/@ekskulrpl', github: 'https://github.com/ekskul-rpl' })
          showToast('Data dikembalikan ke pengaturan awal.')
        }}
      />
    </div>
  )
}

