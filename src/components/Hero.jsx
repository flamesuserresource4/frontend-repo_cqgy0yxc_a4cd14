import { useEffect, useState } from 'react'

export default function Hero() {
  const [stats, setStats] = useState({orders: 0, services: 0})
  useEffect(() => {
    setTimeout(() => setStats({orders: 1204, services: 58}), 600)
  }, [])

  return (
    <section className="text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
        Topup Diamond Game, Jasa Sosmed, dan Nomor Kosong
      </h1>
      <p className="mt-4 text-blue-200/80 max-w-2xl mx-auto">
        Cepat, murah, dan terpercaya. Bayar sekali, pesanan diproses otomatis.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{stats.orders.toLocaleString()}+</p>
          <p className="text-blue-300">Order selesai</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{stats.services}</p>
          <p className="text-blue-300">Layanan aktif</p>
        </div>
      </div>
    </section>
  )
}
