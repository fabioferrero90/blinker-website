# Blinker Website

Sito web one-page moderno e accattivante per l'app mobile Blinker, la piattaforma definitiva per la community automotive italiana.

## 🚗 Caratteristiche

### Design Moderno
- **Design Responsive**: Ottimizzato per desktop, tablet e mobile
- **Animazioni Fluide**: Utilizzo di Framer Motion per animazioni professionali
- **Gradienti Accattivanti**: Colori e stili ispirati all'app mobile
- **Typography Elegante**: Font Inter per una leggibilità ottimale

### Sezioni Principali
- **Hero Section**: Presentazione accattivante con mockup dell'app
- **Features**: Funzionalità principali dell'app con icone e descrizioni
- **About**: Informazioni sul team e la missione
- **Download**: Call-to-action per il download dell'app
- **Footer**: Link utili e informazioni di contatto

### Funzionalità Tecniche
- **Navbar Fissa**: Navigazione fluida con effetti di scroll
- **Scroll Animations**: Animazioni al scroll per migliorare l'engagement
- **Mobile-First**: Design ottimizzato per dispositivi mobili
- **Performance**: Ottimizzato per velocità di caricamento

## 🛠️ Tecnologie Utilizzate

- **React 19**: Framework JavaScript moderno
- **Vite**: Build tool veloce e moderno
- **Framer Motion**: Libreria per animazioni
- **Lucide React**: Icone moderne e scalabili
- **CSS Custom Properties**: Sistema di design token
- **CSS Grid & Flexbox**: Layout moderni e responsive
- **React Context**: Gestione dello stato globale

## 📦 Installazione

### Prerequisiti
- Node.js (v16 o superiore)
- npm o yarn

### Setup
1. **Clona il repository**
   ```bash
   git clone https://github.com/yourusername/blinker-website.git
   cd blinker-website
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

4. **Apri nel browser**
   - Vai su `http://localhost:5173`

## 🚀 Script Disponibili

```bash
npm run dev          # Avvia il server di sviluppo
npm run build        # Build per la produzione
npm run preview      # Anteprima del build di produzione
npm run lint         # Esegue il linter
```

## 🎨 Sistema di Design

### Colori Principali
- **Primary**: `#ff4a1c` (Arancione Blinker)
- **Secondary**: `#182b5c` (Blu scuro)
- **Background**: `#f3f1ef` (Grigio chiaro)
- **Text**: `#000` (Nero)

### Gradienti
- **Primary Gradient**: `linear-gradient(135deg, #ff4a1c 0%, #ff0067 100%)`
- **Secondary Gradient**: `linear-gradient(135deg, #342c99 0%, #530296 100%)`

### Typography
- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700, 800
- **Scale**: Responsive con breakpoints

## 📱 Responsive Design

Il sito è completamente responsive con breakpoints ottimizzati:

- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

### Caratteristiche Mobile
- Menu hamburger per la navigazione
- Layout a colonna singola
- Mockup dell'app ridimensionati
- Touch-friendly interactions

## 🎭 Animazioni

### Framer Motion
- **Fade In**: Animazioni di entrata per le sezioni
- **Hover Effects**: Interazioni al passaggio del mouse
- **Scroll Animations**: Animazioni basate sullo scroll
- **Stagger Effects**: Animazioni sequenziali per le feature cards

### CSS Animations
- **Bounce**: Indicatore di scroll nella hero section
- **Pulse**: Effetti di attenzione
- **Smooth Transitions**: Transizioni fluide per tutti gli elementi

## 🏗️ Struttura del Progetto

```
src/
├── components/          # Componenti riutilizzabili
│   └── Navbar.jsx      # Barra di navigazione
├── contexts/           # React Context per stato globale
│   └── AppContext.jsx  # Context principale dell'app
├── pages/              # Pagine dell'applicazione
│   └── Homepage.jsx    # Pagina principale one-page
├── App.jsx             # Componente root con provider
├── main.jsx            # Entry point
└── index.css           # Stili globali
```

## 🔧 Personalizzazione

### Modificare i Colori
I colori sono definiti come CSS Custom Properties in `src/index.css`:

```css
:root {
  --primary: #ff4a1c;
  --secondary: #182b5c;
  /* ... altri colori */
}
```

### Aggiungere Nuove Sezioni
1. Crea il componente React in `src/pages/Homepage.jsx`
2. Aggiungi gli stili CSS corrispondenti
3. Aggiorna la navigazione in `src/components/Navbar.jsx`

### Modificare il Contenuto
Il contenuto è organizzato in componenti separati:
- **Homepage**: `src/pages/Homepage.jsx`
- **Navbar**: `src/components/Navbar.jsx`
- **Stili**: `src/index.css`
- **Stato globale**: `src/contexts/AppContext.jsx`

### Aggiungere Nuove Pagine
1. Crea un nuovo componente in `src/pages/`
2. Aggiungi il routing in `src/App.jsx`
3. Aggiorna la navigazione se necessario

## 📈 Performance

### Ottimizzazioni Implementate
- **Code Splitting**: Vite gestisce automaticamente il code splitting
- **Tree Shaking**: Rimozione automatica del codice non utilizzato
- **CSS Optimization**: Minificazione automatica del CSS
- **Image Optimization**: Utilizzo di SVG per le icone

### Lighthouse Score Target
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 90
- **SEO**: > 90

## 🌐 Deployment

### Vercel (Raccomandato)
1. Collega il repository a Vercel
2. Configura il build command: `npm run build`
3. Configura l'output directory: `dist`
4. Deploy automatico ad ogni push

### Netlify
1. Collega il repository a Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy automatico

### Altri Provider
Il sito può essere deployato su qualsiasi provider che supporti siti statici:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🤝 Contribuire

1. Fork il repository
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 📞 Supporto

Per supporto o domande:
- Email: support@blinker.app
- GitHub Issues: [Crea una issue](https://github.com/yourusername/blinker-website/issues)

---

**Blinker Team** - Creato con ❤️ per la community automotive italiana
