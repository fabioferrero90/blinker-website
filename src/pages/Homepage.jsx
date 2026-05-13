import HeroSection from '../sections/HeroSection';
import StatsSection from '../sections/StatsSection';
import FeaturesSection from '../sections/FeaturesSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import OrganizersSection from '../sections/OrganizersSection';
import WhyBlinkerSection from '../sections/WhyBlinkerSection';
import FAQSection from '../sections/FAQSection';
import DownloadSection from '../sections/DownloadSection';
import Footer from '../components/Footer';

function Homepage() {
    return (
        <div className="app">
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
            <HowItWorksSection />
            <WhyBlinkerSection />
            <OrganizersSection />
            <FAQSection />
            <DownloadSection />
            <Footer />
        </div>
    );
}

export default Homepage;
