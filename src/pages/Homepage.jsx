import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import OrganizersSection from '../sections/OrganizersSection';
import WhyBlinkerSection from '../sections/WhyBlinkerSection';
import DownloadSection from '../sections/DownloadSection';
import Footer from '../components/Footer';
import NewsletterSignup from '../components/NewsletterSignup';

function Homepage() {
    return (
        <div className="app">
            <HeroSection />
            <FeaturesSection />
            <WhyBlinkerSection />
            <OrganizersSection />
            <DownloadSection />
            <NewsletterSignup />
            <Footer />
        </div>
    );
}

export default Homepage;
