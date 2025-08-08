import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import OrganizersSection from '../sections/OrganizersSection';
import WhyBlinkerSection from '../sections/WhyBlinkerSection';
import DownloadSection from '../sections/DownloadSection';
import Footer from '../components/Footer';
import NewsletterSignup from '../components/NewsletterSignup';
import BetaSignup from '../components/BetaSignup';

function Homepage() {
    const isReleased = import.meta.env.VITE_RELEASED === 'true';

    return (
        <div className="app">
            <HeroSection />
            <FeaturesSection />
            <WhyBlinkerSection />
            <OrganizersSection />
            
            {isReleased ? (
                <>
                    <DownloadSection />
                    <NewsletterSignup />
                </>
            ) : (
                <BetaSignup />
            )}
            
            <Footer />
        </div>
    );
}

export default Homepage;
