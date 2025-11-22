import { useState } from 'react'

export default function OrderForm() {
  const [category, setCategory] = useState('topup')
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [target, setTarget] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [result, setResult] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setResult({loading: true})
    try {
      const res = await fetch(baseUrl + '/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          product_id: productId,
          quantity: Number(quantity),
          target,
          contact_email: email,
          note
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Gagal membuat order')
      setResult({success: true, data})
    } catch (e) {
      setResult({error: e.message})
    }
  }

  return (
    <section className="mt-12">
      <h3 className="text-white text-xl font-semibold mb-4 text-center">Buat Pesanan</h3>
      <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-5 max-w-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-200 text-sm mb-1">Kategori</label>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-slate-900/60 border border-white/10 rounded-lg p-2 text-white">
              <option value="topup">Topup</option>
              <option value="sosmed">Sosmed</option>
              <option value="number">Nomor</option>
            </select>
          </div>
          <div>
            <label className="block text-blue-200 text-sm mb-1">Product ID</label>
            <input value={productId} onChange={e=>setProductId(e.target.value)} placeholder="Masukkan ID produk (ObjectId)" className="w-full bg-slate-900/60 border border-white/10 rounded-lg p-2 text-white" />
          </div>
          <div>
            <label className="block text-blue-200 text-sm mb-1">Quantity</label>
            <input type="number" min={1} value={quantity} onChange={e=>setQuantity(e.target.value)} className="w-full bg-slate-900/60 border border-white/10 rounded-lg p-2 text-white" />
          </div>
          <div>
            <label className="block text-blue-200 text-sm mb-1">Target</label>
            <input value={target} onChange={e=>setTarget(e.target.value)} placeholder="UID Game / Link Profil / Tujuan" className="w-full bg-slate-900/60 border border-white/10 rounded-lg p-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-blue-200 text-sm mb-1">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Opsional" className="w-full bg-slate-900/60 border border-white/10 rounded-lg p-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-blue-200 text-sm mb-1">Catatan</label>
            <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3} className="w-full bg-slate-900/60 border border-white/10 rounded-lg p-2 text-white" />
          </div>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Kirim Pesanan</button>
        {result?.loading && <p className="text-blue-200 mt-3">Mengirim...</p>}
        {result?.success && (
          <p className="text-green-400 mt-3">Order dibuat. Total: Rp{Number(result.data.total_price).toLocaleString()} (ID: {result.data.id})</p>
        )}
        {result?.error && <p className="text-red-400 mt-3">{result.error}</p>}
      </form>
    </section>
  )
}
