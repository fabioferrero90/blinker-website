import { Head } from 'vite-react-ssg';
import { LANG_PATHS, OG_LOCALES, SITE_ORIGIN } from '../i18n';

// Head per-lingua: canonical, <html lang> e og:locale/og:url corretti per ogni
// versione linguistica. L'hreflang è statico in index.html (uguale su tutte le
// pagine). Reso in fase di prerender (SSG) -> ogni /<lang> ha i propri tag.
export function SeoHead({ lang }) {
    const url = `${SITE_ORIGIN}${LANG_PATHS[lang]}`;
    return (
        <Head>
            <html lang={lang} />
            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />
            <meta property="og:locale" content={OG_LOCALES[lang]} />
        </Head>
    );
}
