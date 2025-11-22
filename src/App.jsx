import Hero from './components/Hero'
import Catalog from './components/Catalog'
import OrderForm from './components/OrderForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-200 text-sm">Fast • Aman • 24/7</div>
        </div>
        <Hero />
        <Catalog />
        <OrderForm />
        <footer className="mt-16 text-center text-blue-300/70 text-sm">© {new Date().getFullYear()} Topup & Sosmed Store</footer>
      </div>
    </div>
  )
}

export default App
