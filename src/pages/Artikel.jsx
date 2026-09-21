import { useState } from 'react'
import { useData } from '../context/DataContext'
import Reveal from '../components/Reveal'

const bidangCategories = [
  { id: 'Semua', label: 'Semua Artikel', icon: 'fas fa-newspaper' },
  { id: 'Robotik', label: 'Robotik', icon: 'fas fa-robot' },
  { id: 'Desain Grafis', label: 'Desain Grafis', icon: 'fas fa-palette' },
  { id: 'Website & Pemrograman', label: 'Website & Pemrograman', icon: 'fas fa-code' },
]

export default function Artikel() {
  const { data } = useData()
  const [selectedBidang, setSelectedBidang] = useState('Semua')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const articles = data.artikel || []

  const filteredArticles = articles.filter((item) => {
    const matchBidang = selectedBidang === 'Semua' || item.bidang === selectedBidang
    const matchQuery =
      !searchQuery.trim() ||
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchBidang && matchQuery
  })

  return (
    <div className="space-y-10 pb-20 pt-6">
      {/* ===== Header Banner ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-10 shadow-card">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#90CAF9] bg-[#E3F2FD] px-3 py-1 text-xs font-bold text-[#0D47A1]">
            <i className="fas fa-newspaper text-xs text-[#2196F3]" />
            <span>MODUL ARTIKEL SISWA</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0D47A1] sm:text-4xl">
            Sains, Teknologi & Desain
          </h1>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-[#0D47A1]/80 leading-relaxed">
            Publikasi artikel edukasi, catatan eksperimen robotika, panduan pemrograman web, dan prinsip desain visual karya anggota Ekstrakurikuler RPL.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md">
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D47A1]/60">
                <i className="fas fa-search text-xs" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul artikel atau topik..."
                className="input-field !pl-9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Filter Kategori Bidang ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-[#90CAF9] pb-4">
          {bidangCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedBidang(c.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition ${
                selectedBidang === c.id
                  ? 'bg-[#0D47A1] text-[#E3F2FD] shadow-sm'
                  : 'border border-[#90CAF9] bg-white text-[#0D47A1] hover:bg-[#E3F2FD]'
              }`}
            >
              <i className={`${c.icon} text-xs`} />
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* ===== Grid Artikel ===== */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((art, idx) => (
            <Reveal key={art.id} delay={idx * 80}>
              <div className="card-hover flex h-full flex-col overflow-hidden">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden border-b-2 border-[#90CAF9] bg-[#0D47A1]">
                  <img
                    src={art.gambar}
                    alt={art.judul}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Badge Bidang (PRD 3.4: Latar #E3F2FD, border #90CAF9, teks & ikon #0D47A1) */}
                  <div className="absolute left-3.5 top-3.5 rounded-lg border border-[#90CAF9] bg-[#E3F2FD] px-2.5 py-1 text-xs font-bold text-[#0D47A1] shadow-sm">
                    <i className={`${art.icon || 'fas fa-newspaper'} mr-1.5 text-xs text-[#2196F3]`} />
                    <span>{art.bidang}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#0D47A1]/60">
                      <span>{art.tanggal}</span>
                      <span>•</span>
                      <span>{art.penulis}</span>
                    </div>

                    {/* Judul & Summary (PRD 3.4: Teks tebal #0D47A1 font Space Grotesk) */}
                    <h3 className="mt-2.5 font-display text-base sm:text-lg font-bold text-[#0D47A1] leading-snug">
                      {art.judul}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#0D47A1]/80 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  {/* Tombol Aksi (PRD 3.4: Tombol "Baca Selengkapnya" warna #2196F3 dengan fas fa-arrow-right) */}
                  <div className="mt-5 pt-4 border-t border-[#90CAF9]/40">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(art)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2196F3] px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-[#0D47A1] active:scale-[0.98]"
                    >
                      <span>Baca Selengkapnya</span>
                      <i className="fas fa-arrow-right text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {filteredArticles.length === 0 && (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-[#90CAF9] bg-white p-12 text-center text-[#0D47A1]/60">
              <i className="fas fa-newspaper text-3xl text-[#90CAF9] mb-3 block" />
              <p className="font-bold">Tidak ada artikel yang cocok dengan filter yang dipilih.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== Modal Baca Selengkapnya ===== */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-[#90CAF9] bg-white p-6 sm:p-8 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#90CAF9]/40 pb-4">
              <div className="badge-bidang">
                <i className={`${selectedArticle.icon || 'fas fa-newspaper'} text-xs text-[#2196F3]`} />
                <span>{selectedArticle.bidang}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#90CAF9] text-[#0D47A1] hover:bg-[#E3F2FD]"
              >
                <i className="fas fa-xmark text-sm" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-5">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1] leading-tight">
                {selectedArticle.judul}
              </h2>
              <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#0D47A1]/60">
                <i className="fas fa-user-pen" />
                <span>{selectedArticle.penulis}</span>
                <span>•</span>
                <i className="fas fa-calendar" />
                <span>{selectedArticle.tanggal}</span>
              </div>

              <div className="my-5 overflow-hidden rounded-2xl border border-[#90CAF9]">
                <img
                  src={selectedArticle.gambar}
                  alt={selectedArticle.judul}
                  className="max-h-72 w-full object-cover"
                />
              </div>

              <div className="rounded-xl border border-[#90CAF9] bg-[#E3F2FD] p-4 text-xs sm:text-sm font-semibold text-[#0D47A1] leading-relaxed">
                <strong className="block mb-1 font-bold">Ringkasan Materi:</strong>
                {selectedArticle.summary}
              </div>

              <div className="mt-5 space-y-3 text-xs sm:text-sm text-[#0D47A1] leading-relaxed">
                <p>{selectedArticle.konten}</p>
                <p>
                  Melalui praktikum berkelanjutan di Ekstrakurikuler RPL, siswa dilatih menguasai materi ini langkah demi langkah, mulai dari memahami dokumentasi teknis, memecahkan kendala logika (troubleshooting), hingga siap menyusun portofolio karya.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 border-t border-[#90CAF9]/40 pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="btn-primary"
              >
                <span>Tutup Pembaca</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
