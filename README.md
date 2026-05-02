<div align="center">

<img src="./public/icon.avif" alt="Blinker" width="96" height="96" style="border-radius:22px"/>

# Blinker Website

**Never miss a car event again.**

Sito istituzionale di **Blinker**, la piattaforma per scoprire e organizzare eventi automotive: car meet, raduni, track day, ritrovi serali e molto altro.

<br/>

[![Sito](https://img.shields.io/badge/Sito-1A1A1A?style=for-the-badge&logo=safari&logoColor=white)](https://get.blinker-app.com)
[![Web App](https://img.shields.io/badge/Web_App-FF0067?style=for-the-badge&logo=react&logoColor=white)](https://blinker-app.com)
[![App Store](https://img.shields.io/badge/App_Store-0D96F6?style=for-the-badge&logo=apple&logoColor=white)](https://apps.apple.com/it/app/blinker/id6751835774)
[![Google Play](https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.blinker.app)

</div>

---

## Cos'è questo repo

Questo repository contiene il **sito istituzionale** di Blinker (`get.blinker-app.com`): la landing page one-page che presenta il prodotto, raccoglie i download e fa SEO sul mondo automotive italiano ed europeo.

Non contiene la web app vera e propria (quella vive su `blinker-app.com`) né il codice delle app native iOS/Android. Questo è solo il "biglietto da visita" pubblico: convertire visitatori in utenti registrati e indicizzare il prodotto sui motori di ricerca.

**Ecosistema Blinker:**

| Piattaforma | Link | Cosa fa |
|---|---|---|
| **Sito** (questo repo) | [get.blinker-app.com](https://get.blinker-app.com) | Landing istituzionale, SEO, download |
| **Web App** | [blinker-app.com](https://blinker-app.com) | Dashboard web completa |
| **iOS** | [App Store](https://apps.apple.com/it/app/blinker/id6751835774) | App nativa iOS |
| **Android** | [Google Play](https://play.google.com/store/apps/details?id=com.blinker.app) | App nativa Android |

---

## Cosa fa il sito

- 🚀 **Landing one-page** ottimizzata per conversione (download app + accesso web)
- 🌍 **Multilingua nativo**: IT, EN, ES, FR, DE — con `hreflang`, `og:locale` dinamico, lingua persistente via querystring + localStorage
- 🔍 **SEO strutturato**: JSON-LD per `MobileApplication`, `WebApplication`, `Organization`, `FAQPage` — più canonical, sitemap e robots.txt allineati
- ❓ **FAQ dinamica** con 9 domande SEO-pensate (gratuito, mappa, organizzazione, selezioni, dispositivi, account, crew, copertura geografica, GDPR)
- 🎨 **Hero animato** con video di sfondo + typing effect e fallback `sr-only` per i bot
- 📱 **Performance-first**: AVIF/WebP per le immagini, lazy-load delle sezioni, video hero con poster, Tailwind v4 con `manualChunks`
- 🍪 **Cookie consent GDPR-compliant** (essential / analytics / marketing) con persistenza e modale
- 📜 **Privacy Policy + Terms of Service** allineate alla web app (stessa fonte di verità: i due repo restano in sync)
- 🔗 **Smooth scroll** alle sezioni via context React, navbar con stato `scrolled` e mobile drawer
- 📈 **Google Analytics 4** integrato dietro consenso esplicito

---

## Stack tecnologico

<table>
<tr>
<td><strong>Frontend</strong></td>
<td>React 19 · Vite · Tailwind CSS v4 · React Context (no router, è one-page)</td>
</tr>
<tr>
<td><strong>i18n</strong></td>
<td>i18next + react-i18next, detection ordine <code>querystring → localStorage → navigator</code></td>
</tr>
<tr>
<td><strong>Asset pipeline</strong></td>
<td>Sharp per generazione WebP/AVIF, ottimizzazioni manuali per video hero</td>
</tr>
<tr>
<td><strong>SEO</strong></td>
<td>JSON-LD (MobileApplication, WebApplication, Organization, FAQPage), Open Graph, Twitter Cards, canonical, hreflang, sitemap-index</td>
</tr>
<tr>
<td><strong>Analytics</strong></td>
<td>Google Analytics 4 (caricato solo dopo consenso cookie)</td>
</tr>
<tr>
<td><strong>Hosting</strong></td>
<td>Bundle statico Vite servito da Nginx (HTTPS via Let's Encrypt, HTTP/2, caching aggressivo per asset hashati)</td>
</tr>
</table>

---

## Sviluppo

```bash
# 1. Installa le dipendenze
npm install

# 2. Configura le variabili d'ambiente (opzionale per il dev locale)
cp env.example .env
#   VITE_GA_TRACKING_ID=...        # solo se vuoi testare GA in locale
#   VITE_API_URL=...               # endpoint web app (per link cross-domain)

# 3. Lancia in dev
npm run dev
```

Il server di sviluppo gira su `http://localhost:3000` di default. Se hai certificati SSL locali (`./ssl/localhost.pem` + `./ssl/localhost-key.pem`) e imposti `VITE_SSL_ENABLED=true` parte direttamente in HTTPS.

### Build di produzione

```bash
npm run build      # genera dist/ con asset hashati e cache busting
npm run preview    # preview locale del bundle di produzione
```

### Lighthouse audit

```bash
npm run lighthouse
```

Genera un `lighthouse-report.html` puntando alla versione live del sito. Utile dopo cambi grossi a Hero/Features per non rompere il punteggio Performance/SEO.

### Ottimizzazione immagini

```bash
node scripts/optimize-images.js
```

Genera versioni WebP/AVIF per gli asset in `public/`. Per scontornare un mockup (rimozione sfondo) usiamo `rembg` come tool esterno, non integrato nella pipeline.

---

## Struttura del progetto

```
blinker-website/
├── public/                    # Asset statici, mockup, video hero, icone, sitemap, robots.txt
├── index.html                 # Head con tutto il SEO: meta, OG, JSON-LD, hreflang, canonical
├── src/
│   ├── App.jsx                # Wrapper + sync <html lang> con i18next
│   ├── main.jsx
│   ├── i18n.js                # Setup multilingua (5 lingue, querystring detection)
│   ├── pages/
│   │   ├── Homepage.jsx       # Compone tutte le sezioni one-page
│   │   └── PrivacyPolicy.jsx  # Render Privacy Policy (consuma translation.json)
│   ├── sections/
│   │   ├── HeroSection.jsx    # Hero con video, typing animation, sr-only SEO
│   │   ├── FeaturesSection.jsx
│   │   ├── HowItWorksSection.jsx
│   │   ├── WhyBlinkerSection.jsx
│   │   ├── OrganizersSection.jsx
│   │   ├── FAQSection.jsx     # FAQ con <details>/<summary> (accessibile + SEO)
│   │   └── DownloadSection.jsx
│   ├── components/
│   │   ├── Navbar.jsx         # Logo cliccabile, mobile drawer, scrolled state
│   │   ├── Footer.jsx
│   │   ├── LanguageSelector.jsx  # Cambio lingua + update ?lng= in URL
│   │   ├── CookieConsent.jsx     # Banner GDPR (essential/analytics/marketing)
│   │   ├── PolicyModal.jsx       # Modal wrapper per Privacy/Cookie/Terms
│   │   ├── CookiePolicy.jsx
│   │   ├── TermsOfService.jsx
│   │   └── OptimizedVideo.jsx
│   ├── contexts/              # AppContext (scrollToSection, app state)
│   ├── hooks/                 # useGoogleAnalytics, useCookieConsent, useCache, useLazyLoad
│   ├── locales/
│   │   ├── it/translation.json
│   │   ├── en/translation.json
│   │   ├── es/translation.json
│   │   ├── fr/translation.json
│   │   └── de/translation.json
│   ├── config/                # Performance, preload, lighthouse, warning suppression
│   └── utils/                 # logger, performanceMonitor
├── scripts/
│   └── optimize-images.js     # Sharp pipeline per WebP/AVIF
└── ops/
    ├── scripts/               # deploy.js, helper SSH/Nginx (uso interno)
    ├── nginx/                 # Configurazione Nginx di produzione
    └── docs/                  # Note operative (rinnovo SSL, debug Nginx)
```

---

## Multilingua e SEO

Il sito è una SPA Vite che serve sempre la stessa `index.html` con `lang="it"` di default. La lingua effettiva viene scelta lato client da i18next nel seguente ordine:

1. `?lng=` nella querystring (es. `https://get.blinker-app.com/?lng=en`)
2. `localStorage` (`blinker-language`)
3. Lingua del browser (`navigator.language`)

Quando l'utente cambia lingua da `LanguageSelector`, l'URL viene riscritto via `history.replaceState` con il parametro `?lng=`, così il link è condivisibile e indicizzabile.

Tag `<link rel="alternate" hreflang>` per tutte e 5 le lingue + `x-default` sono presenti in `index.html`. `<html lang>` e `<meta property="og:locale">` vengono sincronizzati a runtime in `App.jsx` quando i18next emette il cambio lingua.

---

## Coerenza con le altre repo Blinker

Privacy Policy ed EULA / Terms of Service sono importati dal repo della web app (`blinker-web-dashboard`), così il sito istituzionale e l'app web restano sempre allineati. Per propagare aggiornamenti:

```bash
# Esempio: dopo un update delle policy nella dashboard
python3 -c "
import json, os
DASH='/path/to/blinker-web-dashboard/src/locales/policies'
SITE='./src/locales'
for lng in ['it','en','es','fr','de']:
    dash=json.load(open(f'{DASH}/{lng}.json'))
    site=json.load(open(f'{SITE}/{lng}/translation.json'))
    site['privacyPolicy']=dash['privacyPolicy']
    site['termsOfService']=dash['eula']
    json.dump(site,open(f'{SITE}/{lng}/translation.json','w'),ensure_ascii=False,indent=4)
"
```

La Cookie Policy invece è specifica del sito istituzionale (contesto pre-account, consent banner) e non deve essere sincronizzata 1:1.

---

## Link utili

- 🌐 **Sito**: [get.blinker-app.com](https://get.blinker-app.com)
- 🚀 **Web App**: [blinker-app.com](https://blinker-app.com)
- 📱 **App Store**: [apps.apple.com/it/app/blinker](https://apps.apple.com/it/app/blinker/id6751835774)
- 🤖 **Google Play**: [play.google.com/blinker](https://play.google.com/store/apps/details?id=com.blinker.app)
- 📧 **Supporto**: [support@blinker-app.com](mailto:support@blinker-app.com)
- 🔒 **Privacy**: [privacy@blinker-app.com](mailto:privacy@blinker-app.com)

---

<div align="center">

Made with <span style="color:#ff0067">♥</span> in Italy

</div>
