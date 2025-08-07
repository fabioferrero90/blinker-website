import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import OrganizersSection from '../sections/OrganizersSection';
import WhyBlinkerSection from '../sections/WhyBlinkerSection';
import DownloadSection from '../sections/DownloadSection';

function Homepage() {
    return (
        <div className="app">
            <HeroSection />
            <FeaturesSection />
            <OrganizersSection />
            <WhyBlinkerSection />
            <DownloadSection />
            <Footer />
        </div>
    );
}

export default Homepage;
