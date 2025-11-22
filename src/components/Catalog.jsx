import { useEffect, useState } from 'react'

const TABS = [
  { key: 'topup', label: 'Topup Game' },
  { key: 'sosmed', label: 'Jasa Sosmed' },
  { key: 'number', label: 'Nomor Kosong' },
]

export default function Catalog() {
  const [active, setActive] = useState('topup')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => { fetchItems(active) }, [active])

  const fetchItems = async (tab) => {
    setLoading(true)
    try {
      const path = tab === 'topup' ? '/api/topup' : tab === 'sosmed' ? '/api/sosmed' : '/api/numbers'
      const res = await fetch(baseUrl + path)
      const data = await res.json()
      setItems(data)
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-12">
      <div className="flex gap-2 justify-center">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-full border transition ${active===t.key? 'bg-blue-500 text-white border-blue-400' : 'bg-white/5 text-blue-100 border-white/10 hover:bg-white/10'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_,i)=> (
            <div key={i} className="h-28 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full text-center text-blue-200">Belum ada data. Tambahkan via API.</div>
        ) : items.map((it, idx) => (
          <div key={idx} className="rounded-xl bg-white/5 border border-white/10 p-5">
            <p className="text-white font-semibold">{it.name || it.provider || 'Produk'}</p>
            <p className="text-blue-300 text-sm mt-1">{it.game || it.platform || it.country}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-white font-bold">Rp{Number(it.price||0).toLocaleString()}</span>
              <button className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Pilih</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
