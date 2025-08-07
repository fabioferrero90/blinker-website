import { Instagram, X } from 'lucide-react';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <img src="extended-light.png" alt="Blinker Logo" width={150} />
                        </div>
                        <p className="footer-description text-center">
                            L'unica app che ti salva dalla FOMO automotive
                        </p>
                    </div>
                    <div className="footer-section">
                        <h4>Prodotto</h4>
                        <a href="#features">Funzionalità</a>
                        <a href="#download">Download</a>
                        <a href="#why">Chi Siamo</a>
                    </div>


                    <div className="footer-section">
                        <h4>Supporto</h4>
                        <a href="#">Centro Aiuto</a>
                        <a href="#">Contattaci</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p><span className='text-white font-semibold'>&copy; 2025 Blinker App </span>- Fatto per i car lovers, da gente che non può permettersi una GT-R (ancora).</p>
                    <div className="footer-social">
                        <a href="https://www.instagram.com/blinker.social/" aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="https://x.com/blinker.social" aria-label="X">
                            <X size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
