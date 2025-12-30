// Fetch company details
export const fetchCompanyDetails = async () => {
    try {
        const response = await fetch(`/company-details.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
