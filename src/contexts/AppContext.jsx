import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [currentSection, setCurrentSection] = useState('home');
    const [isLoading, setIsLoading] = useState(false);

    const scrollToSection = (sectionId) => {
        setCurrentSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            // Usa scrollIntoView con offset per la navbar fissa - VERSIONE CACHE BUST
            const navbarHeight = 80;
            const elementPosition = element.offsetTop - navbarHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    const value = {
        currentSection,
        setCurrentSection,
        isLoading,
        setIsLoading,
        scrollToSection
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
