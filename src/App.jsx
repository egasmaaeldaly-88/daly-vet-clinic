import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { dict } from './i18n.js'
import { pets, vaccinations, summaries, clinic } from './mockData.js'

const read = (k, d) => { try { return localStorage.getItem(k) || d } catch { return d } }
const write = (k, v) => { try { localStorage.setItem(k, v) } catch { /* storage unavailable */ } }

const Paw = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <ellipse cx="5" cy="11" rx="2" ry="2.6" /><ellipse cx="9.5" cy="6.5" rx="2" ry="2.8" />
    <ellipse cx="14.5" cy="6.5" rx="2" ry="2.8" /><ellipse cx="19" cy="11" rx="2" ry="2.6" />
    <path d="M12 12c-3 0-6 3.2-6 5.6 0 1.7 1.4 2.4 3 2.4 1.2 0 2-.5 3-.5s1.8.5 3 .5c1.6 0 3-.7 3-2.4C18 15.2 15 12 12 12z" />
  </svg>
)

/** Image with a safe fallback when the local file is missing. */
function PetImg({ src, label, className }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div role="img" aria-label={label} className={`${className} grid place-items-center bg-tint text-brand`}>
        <Paw className="h-12 w-12" />
      </div>
    )
  }
  return <img src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} className={`${className} object-cover`} />
}

const Chip = ({ tone = 'ok', children }) => (
  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tone === 'ok' ? 'bg-tint text-brand' : 'bg-warn-tint text-warn'}`}>{children}</span>
)

const Card = ({ title, children, className = '' }) => (
  <section className={`rounded-2xl border border-line bg-card p-5 ${className}`}>
    {title && <h2 className="mb-3 text-lg font-semibold">{title}</h2>}
    {children}
  </section>
)

export default function App() {
  const [lang, setLang] = useState(() => read('dv-lang', 'ar'))
  const [theme, setTheme] = useState(() => read('dv-theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [tab, setTab] = useState('home')
  const t = dict[lang]
  const L = (o) => o[lang]
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB'
  const fmt = (d) => new Date(d).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })

  useEffect(() => {
    const h = document.documentElement
    h.lang = lang; h.dir = lang === 'ar' ? 'rtl' : 'ltr'; write('dv-lang', lang)
  }, [lang])
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark'); write('dv-theme', theme)
  }, [theme])

  const petOf = (id) => pets.find((p) => p.id === id)
  const tabs = ['home', 'reception', 'consult', 'passport']
  const icons = { home: 'M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z', reception: 'M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z', consult: 'M9 12h6m-6 4h6M7 3h7l5 5v13H7z', passport: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v6h-4v-2' }
  const NavIcon = ({ id }) => (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[id]} /></svg>
  )

  const Home = () => (
    <div className="space-y-6">
      <div className="grid items-center gap-6 overflow-hidden rounded-3xl border border-line bg-card p-6 md:grid-cols-2 md:p-8">
        <div>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">{t.welcome}</h1>
          <p className="mt-3 max-w-md leading-relaxed text-muted">{t.welcomeSub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[['pets', pets.length], ['due', vaccinations.filter((v) => v.state !== 'ok').length], ['boarded', pets.filter((p) => p.boarding === 'boarding').length]].map(([k, n]) => (
              <div key={k} className="rounded-2xl bg-tint px-4 py-3">
                <div className="text-2xl font-bold text-brand">{n}</div>
                <div className="text-sm text-muted">{t.stats[k]}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <PetImg src="/images/dog-3d.jpg" label={t.species.dog} className="h-[82%] w-[82%] rounded-[2.5rem]" />
          <PetImg src="/images/cat-3d.jpg" label={t.species.cat} className="absolute bottom-0 end-0 h-[52%] w-[52%] rounded-[2rem] border-4 border-card shadow-lg" />
        </div>
      </div>
      <p className="text-sm text-muted">{t.demoNote}</p>
    </div>
  )

  const Reception = () => (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card title={t.reception.due} className="lg:col-span-3">
        <ul className="divide-y divide-line">
          {vaccinations.map((v) => {
            const p = petOf(v.petId)
            const href = `https://wa.me/${p.phone}?text=${encodeURIComponent(t.reception.msg(L(p.name), L(v.vaccine)))}`
            return (
              <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <div className="font-medium">{L(p.name)} <span className="text-muted">· {L(v.vaccine)}</span></div>
                  <div className="text-sm text-muted">{t.reception.owner}: {L(p.owner)} · {t.reception.due_on}: {fmt(v.due)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Chip tone={v.state === 'ok' ? 'ok' : 'warn'}>{t.status[v.state]}</Chip>
                  <a href={href} target="_blank" rel="noreferrer" className="rounded-full bg-brand px-3.5 py-1.5 text-sm font-medium text-brand-ink hover:opacity-90">{t.reception.whatsapp}</a>
                </div>
              </li>
            )
          })}
        </ul>
      </Card>
      <Card title={t.reception.boarding} className="lg:col-span-2">
        <ul className="space-y-3">
          {pets.map((p) => (
            <li key={p.id} className="flex items-center justify-between">
              <span className="font-medium">{L(p.name)}</span>
              <Chip tone={p.boarding === 'none' ? 'ok' : 'warn'}>{t.status[p.boarding]}</Chip>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )

  const Consult = () => {
    const p = pets[1]
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title={t.consult.patient}>
          <div className="flex items-center gap-4">
            <PetImg src={`/images/${p.species}-3d.jpg`} label={t.species[p.species]} className="h-20 w-20 rounded-2xl" />
            <div>
              <div className="text-xl font-semibold">{L(p.name)}</div>
              <div className="text-muted">{L(p.breed)}</div>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-sunk p-3"><dt className="text-muted">{t.consult.species}</dt><dd className="font-medium">{t.species[p.species]}</dd></div>
            <div className="rounded-xl bg-sunk p-3"><dt className="text-muted">{t.consult.weight}</dt><dd className="font-medium">{p.weight} {t.kg}</dd></div>
          </dl>
        </Card>
        <Card title={t.consult.exam}>
          <p className="leading-relaxed">{L(summaries.exam)}</p>
          <p className="mt-2 leading-relaxed">{L(summaries.xray)}</p>
          <p className="mt-5 rounded-xl border border-dashed border-line p-3 text-sm text-muted">{t.consult.next}</p>
        </Card>
      </div>
    )
  }

  const Passport = () => {
    const p = pets[0]
    const url = `${location.origin}/passport/${p.uuid}`
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <Card>
          <div className="flex items-center gap-4">
            <PetImg src={`/images/${p.species}-3d.jpg`} label={t.species[p.species]} className="h-24 w-24 rounded-3xl" />
            <div className="min-w-0 flex-1">
              <div className="text-sm text-muted">{t.passport.title}</div>
              <div className="text-2xl font-bold">{L(p.name)}</div>
              <div className="text-muted">{t.species[p.species]} · {L(p.breed)} · {p.weight} {t.kg}</div>
            </div>
            <div className="rounded-xl bg-white p-2" title={t.passport.scan}><QRCodeSVG value={url} size={84} /></div>
          </div>
          <div className="mt-4 rounded-xl bg-warn-tint px-4 py-2.5 text-sm text-warn">{t.passport.allergies}: {L(p.allergies)}</div>
        </Card>
        <Card title={t.passport.vacc}>
          <ul className="space-y-2">
            {vaccinations.filter((v) => v.petId === p.id).map((v) => (
              <li key={v.id} className="flex justify-between"><span>{L(v.vaccine)}</span><span className="text-muted">{t.passport.next}: {fmt(v.due)}</span></li>
            ))}
          </ul>
        </Card>
        <Card title={t.passport.summaries}>
          <p className="leading-relaxed">{L(summaries.xray)}</p>
        </Card>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand px-5 py-4 text-brand-ink">
          <span className="font-medium">{t.passport.emergency}</span>
          <a dir="ltr" href={`tel:+${clinic.phone}`} className="font-semibold underline">+{clinic.phone}</a>
        </div>
        <p className="text-center text-xs text-muted">{t.passport.privacy}</p>
      </div>
    )
  }

  const screens = { home: Home, reception: Reception, consult: Consult, passport: Passport }
  const Screen = screens[tab]

  return (
    <div className="min-h-screen md:flex">
      <aside className="no-print hidden w-64 shrink-0 flex-col border-e border-line bg-card p-5 md:flex">
        <div className="mb-8 flex items-center gap-2 text-brand"><Paw className="h-7 w-7" /><span className="text-xl font-bold text-ink">{t.app}</span></div>
        <nav className="space-y-1">
          {tabs.map((id) => (
            <button key={id} onClick={() => setTab(id)} aria-current={tab === id ? 'page' : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors ${tab === id ? 'bg-tint font-semibold text-brand' : 'text-muted hover:bg-sunk'}`}>
              <NavIcon id={id} />
              <span>
                {t.nav[id]}
                {id !== 'home' && <span className="block text-xs font-normal opacity-80">{t.role[id]}</span>}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <header className="no-print flex items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-8">
          <div className="flex items-center gap-2 md:hidden text-brand"><Paw className="h-6 w-6" /><span className="font-bold text-ink">{t.app}</span></div>
          <p className="hidden text-sm text-muted md:block">{t.tagline}</p>
          <div className="flex gap-2">
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="rounded-full border border-line px-3.5 py-1.5 text-sm hover:bg-sunk">{t.lang}</button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-full border border-line px-3.5 py-1.5 text-sm hover:bg-sunk">{theme === 'dark' ? t.themeLight : t.themeDark}</button>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8"><Screen /></main>
      </div>

      <nav className="no-print fixed inset-x-0 bottom-0 z-10 grid grid-cols-4 border-t border-line bg-card md:hidden">
        {tabs.map((id) => (
          <button key={id} onClick={() => setTab(id)} aria-current={tab === id ? 'page' : undefined}
            className={`flex flex-col items-center gap-1 px-1 py-2.5 text-[11px] ${tab === id ? 'font-semibold text-brand' : 'text-muted'}`}>
            <NavIcon id={id} /><span className="line-clamp-1">{t.nav[id]}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
