import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faUserGroup, faCar, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { fetchGlobalStats } from '../utils/supabaseStats'

/**
 * Refresh dei numeri: la RPC ritorna il vero count(*) live, ogni minuto
 * e' abbastanza per dare la sensazione "real-time" senza pestare il DB.
 */
const POLL_INTERVAL_MS = 60_000

/**
 * Durata dell'animazione iniziale "incremento veloce" da 0 al valore
 * corrente. ~1.2s con ease-out e' lo standard di queste hero counters
 * (vedi mailchimp, stripe, vercel).
 */
const ANIM_DURATION_MS = 1200

/**
 * Configurazione delle 4 card. Ordine = ordine di rendering.
 * Le label sono tradotte via i18n key `stats.<key>.label`.
 */
const STAT_CARDS = [
    { key: 'users',    icon: faUsers,        accent: '#f97316' }, // arancio brand
    { key: 'crews',    icon: faUserGroup,    accent: '#0ea5e9' }, // ciano
    { key: 'vehicles', icon: faCar,          accent: '#a855f7' }, // viola
    { key: 'events',   icon: faCalendarDays, accent: '#22c55e' }, // verde
]

/* ─── animated number ─────────────────────────────────────────────────
 * Usa requestAnimationFrame per andare da `from` a `to` in `duration`ms
 * con curva ease-out cubic. Quando `to` cambia (es. dopo un poll),
 * riparte dall'ultimo valore mostrato — niente "salto a 0 e poi sale".
 * ─────────────────────────────────────────────────────────────────────*/
function useAnimatedNumber(target, duration = ANIM_DURATION_MS) {
    const [display, setDisplay] = useState(0)
    const rafRef = useRef(null)
    const fromRef = useRef(0)

    useEffect(() => {
        if (target == null || Number.isNaN(target)) return

        // Riparte dal display corrente (non da 0) cosi' aggiornamenti
        // successivi sono "smooth" invece di flash a zero.
        const start = performance.now()
        const from = fromRef.current
        const delta = target - from

        if (delta === 0) {
            setDisplay(target)
            return
        }

        const tick = (now) => {
            const elapsed = now - start
            const t = Math.min(1, elapsed / duration)
            // ease-out cubic: parte veloce, rallenta verso la fine —
            // visivamente "esplode" da 0 e si stabilizza sul valore.
            const eased = 1 - Math.pow(1 - t, 3)
            const value = from + delta * eased
            setDisplay(value)
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick)
            } else {
                fromRef.current = target
                setDisplay(target)
            }
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [target, duration])

    return Math.round(display)
}

/* ─── formatter ──────────────────────────────────────────────────────
 * 1234 → "1.234" (separatore migliaia per i18n). `Intl.NumberFormat`
 * rispetta la lingua attiva del browser: in italiano "1.234", in
 * inglese "1,234".
 * ─────────────────────────────────────────────────────────────────────*/
function formatNumber(n, locale) {
    try {
        return new Intl.NumberFormat(locale).format(n)
    } catch {
        return String(n)
    }
}

function StatCard({ icon, accent, value, label, sublabel, locale }) {
    const animated = useAnimatedNumber(value)
    return (
        <div
            className="relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:border-white/20"
            style={{ boxShadow: `0 8px 30px -12px ${accent}33` }}
        >
            <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${accent}26`, color: accent }}
            >
                <FontAwesomeIcon icon={icon} className="text-base" />
            </div>
            <div
                className="font-bold text-3xl md:text-4xl tabular-nums tracking-tight text-white"
                aria-live="polite"
            >
                {value == null ? '—' : formatNumber(animated, locale)}
            </div>
            <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
            {sublabel ? <div className="text-[10px] text-white/40">{sublabel}</div> : null}
        </div>
    )
}

function StatsSection() {
    const { t, i18n } = useTranslation()
    const [stats, setStats] = useState(null)
    const [error, setError] = useState(false)

    /* Single fetch + intervallo: fa una prima chiamata al mount e poi
     * ogni POLL_INTERVAL_MS. AbortController copre i casi di unmount
     * mid-flight (es. SSR rehydration o page transitions). */
    useEffect(() => {
        let cancelled = false
        let intervalId = null
        const controllers = new Set()

        const run = async () => {
            const ctrl = new AbortController()
            controllers.add(ctrl)
            try {
                const data = await fetchGlobalStats({ signal: ctrl.signal })
                if (cancelled) return
                setStats(data)
                setError(false)
            } catch (err) {
                if (err?.name === 'AbortError') return
                if (cancelled) return
                console.warn('[StatsSection] fetch fallita:', err?.message)
                setError(true)
            } finally {
                controllers.delete(ctrl)
            }
        }

        run()
        intervalId = setInterval(run, POLL_INTERVAL_MS)
        return () => {
            cancelled = true
            if (intervalId) clearInterval(intervalId)
            controllers.forEach((c) => c.abort())
        }
    }, [])

    // In caso di errore (Supabase down, env mancante, ecc.) la sezione
    // non si renderizza: non vogliamo placeholder "—" tristi in homepage.
    if (error && !stats) return null

    return (
        <section id="stats" className="relative bg-black py-12 md:py-16">
            {/* Gradient sottile coerente con la hero (arancio→nero). */}
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    background:
                        'radial-gradient(ellipse at top, rgba(249,115,22,0.15), transparent 60%)',
                }}
            />
            <div className="container relative mx-auto px-4">
                <div className="mb-8 text-center">
                    <h2 className="font-bold text-2xl md:text-3xl text-white">
                        {t('stats.title')}
                    </h2>
                    <p className="mt-2 text-sm text-white/60">{t('stats.subtitle')}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                    {STAT_CARDS.map(({ key, icon, accent }) => (
                        <StatCard
                            key={key}
                            icon={icon}
                            accent={accent}
                            value={stats ? stats[key] : null}
                            label={t(`stats.${key}.label`)}
                            locale={i18n.language || 'it'}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsSection
