const SENDER_API_KEY = import.meta.env.VITE_SENDER_API_KEY;

export const subscribeToNewsletter = async (firstName, lastName, email, language) => {
    return subscribeToSender(firstName, lastName, email, language, "epL39N");
}

export const subscribeToPreregister = async (firstName, lastName, email, language) => {
    return subscribeToSender(firstName, lastName, email, language, "e3VAYO");
}

export const subscribeToSender = async (firstName, lastName,email, language, listId) => {
    if (!SENDER_API_KEY) {
        throw new Error('Sender.net configuration missing');
    }

    if (!email || !email.trim()) {
        throw new Error('Email is required');
    }

    // Validazione email più rigorosa
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        throw new Error('Invalid email format');
    }
        
    try {
        // Assicuriamoci che l'email sia nel formato corretto
        const cleanEmail = email.trim().toLowerCase();
        
        // Proviamo con il campo personalizzato direttamente nel payload principale
        const payload = {
            firstname: firstName || "",
            lastname: lastName || "",
            email: cleanEmail,
            groups: [listId],
            fields: {
                "{$lang}": language
            }
        };
        const response = await fetch(`https://api.sender.net/v2/subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SENDER_API_KEY}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const responseText = await response.text();

        if (!response.ok) {
            let errorData = {};
            try {
                errorData = JSON.parse(responseText);
            } catch (e) {
                errorData = { message: responseText };
            }
            console.error('Sender.net API error response:', errorData);
            throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = responseText ? JSON.parse(responseText) : {};
        return data;
    } catch (error) {
        console.error('Sender.net API error:', error);
        throw error;
    }
};
