/* eslint-disable no-console */
// Script audit one-shot: melakukan patch presisi berdasarkan string lama->baru.
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const rep = (rel, pairs) => {
  const file = path.join(root, rel)
  let src = fs.readFileSync(file, 'utf8')
  for (const [oldS, newS] of pairs) {
    if (!src.includes(oldS)) {
      console.error(`MISS: ${rel} :: ${oldS.slice(0, 60).replace(/\n/g, '\\n')}`)
      process.exitCode = 1
      continue
    }
    src = src.split(oldS).join(newS)
  }
  fs.writeFileSync(file, src)
  console.log(`OK: ${rel}`)
}

/* ================= 1. DataContext.jsx ================= */
rep('src/context/DataContext.jsx', [
  [
    `  // Generic CRUD helpers
  const addItem = (key, item) => {`,
    `  // Generic CRUD helpers
  // options.sync: jika false, JANGAN insert ke tabel Supabase di sini
  // (dipakai registerPendaftar agar hanya ada SATU insert per pendaftaran)
  const addItem = (key, item, options = {}) => {`,
  ],
  [
    `    // Jika menambah pendaftar, simpan juga ke tabel Supabase terpisah
    if (key === 'pendaftar') {
      syncPendaftarAdd(record)`,
    `    // Jika menambah pendaftar, simpan juga ke tabel Supabase terpisah
    // (kecuali options.sync === false — pemanggil yang melakukan insert sendiri)
    if (key === 'pendaftar') {
      if (options.sync !== false) syncPendaftarAdd(record)`,
  ],
  [
    `  const registerPendaftar = async (payload) => {
    const id = payload.id ?? \`\${Date.now()}-\${Math.random().toString(36).slice(2, 8)}\`
    const record = {
      ...payload,
      id,
      status: payload.status || 'Menunggu Verifikasi',
      tanggalDaftar: payload.tanggalDaftar || new Date().toISOString().slice(0, 10),
      bidang: payload.bidang || 'Robotic',
    }

    const localResult = addItem('pendaftar', record)
    const { ok, error } = await syncPendaftarAdd(record)

    if (!ok && localResult) {
      console.error('Pendaftaran lokal dibuat, tetapi gagal tersimpan ke Supabase:', error)
    }

    return { ok, error, id: localResult ?? id }
  }`,
    `  // Nomor registrasi unik, format RPL-XXXXXX (tidak bentrok dengan pendaftar lain)
  const generateNomorRegistrasi = (existing) => {
    const used = new Set((existing || []).map((p) => p.nomorRegistrasi).filter(Boolean))
    let nomor
    do {
      nomor = \`RPL-\${Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, '0')}\`
    } while (used.has(nomor))
    return nomor
  }

  const registerPendaftar = async (payload) => {
    const id = payload.id ?? \`\${Date.now()}-\${Math.random().toString(36).slice(2, 8)}\`
    const record = {
      ...payload,
      id,
      nomorRegistrasi: payload.nomorRegistrasi || generateNomorRegistrasi(data.pendaftar),
      status: payload.status || 'Menunggu Verifikasi',
      tanggalDaftar: payload.tanggalDaftar || new Date().toISOString().slice(0, 10),
      bidang: payload.bidang || 'Robotic',
    }

    // Simpan lokal (state + localStorage) TANPA insert ke Supabase,
    // lalu lakukan TEPAT SATU insert ke tabel \`pendaftar\` di sini.
    addItem('pendaftar', record, { sync: false })
    const { ok, error } = await syncPendaftarAdd(record)

    if (!ok) {
      console.error('Pendaftaran tersimpan lokal, tetapi gagal tersimpan ke Supabase:', error)
    }

    return { ok, error, id, nomorRegistrasi: record.nomorRegistrasi }
  }`,
  ],
])
