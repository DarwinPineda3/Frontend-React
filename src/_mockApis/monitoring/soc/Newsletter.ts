import mock from '../../mock'; // Ensure correct path to mock

interface NewsletterType {
    id: string | undefined;
    mimeType: string;
    size: number;
    name: string;
    modifiedTime: string;
    url: string;
}

let newsletters: NewsletterType[] = [
    {
        "mimeType": "application/pdf",
        "size": 396511,
        "id": "1bdc9tg6Q8VrikR98p92WFM5udZ00Di44",
        "name": "Boletín semanal de Ciberseguridad 7 de octubre 2024.pdf",
        "modifiedTime": "2024-07-29T14:36:24",
        "url": "https://drive.google.com/file/d/15gSlJMwh9CHYkjuMYNczTg8zWCkYL2ph/preview"
    },
    {
        "mimeType": "application/pdf",
        "size": 703711,
        "id": "1bdc9tg6Q8VrikR98p92WFM5udZ00Di43",
        "name": "Boletin de Ciberseguridad 13 de junio 2024.pdf",
        "modifiedTime": "2024-07-29T14:36:24",
        "url": "https://drive.google.com/file/d/1f_-QePSFz53txR2VoSQ1jphT1jQWB9IB/preview"
    },
    {
        "mimeType": "application/pdf",
        "size": 701351,
        "id": "1j5YG2VsYcxkKvturjM8CffKzH_VG3Ssm",
        "name": "Boletin de Ciberseguridad 23 de mayo 2024.pdf",
        "modifiedTime": "2024-07-24T16:24:31.292000",
        "url": "https://drive.google.com/file/d/1E3LQgur2yAKU6fSMUAvP4CC2i9Xa7Jq3/preview"
    },
    {
        "mimeType": "application/pdf",
        "size": 908374,
        "id": "1V8ErszHDyBD-7x6Ften40k3Yg_U2aW4x",
        "name": "Boletin de Ciberseguridad 09 de mayo 2024.pdf",
        "modifiedTime": "2024-07-24T15:45:53",
        "url": "https://drive.google.com/file/d/1WBDSW0zhU29nefECBq7rcH746RSh1dzg/preview"
    },
    {
        "mimeType": "application/pdf",
        "size": 921134,
        "id": "1u3ZEHlTO7JaFfJGfqRsWaMMl-4k73W52",
        "name": "Boletin de Ciberseguridad 17 de mayo 2024.pdf",
        "modifiedTime": "2024-07-24T15:45:50",
        "url": "https://drive.google.com/file/d/1HZl0xk57WS4qWbsAJATwncMuNYwhRfq5/preview"
    },

];


// GET: Fetch tecnology inventory
mock.onGet(new RegExp('/api/data/newsletter/detail/*')).reply((config) => {
    try {
        const newsletterId = config.url!.split('/').pop(); // Extract the asset ID from the URL
        console.log('newsletterId MOCKUPI', newsletterId);
        const newsletterIndex = newsletters.findIndex((result) => result.id === newsletterId);
        if (newsletterIndex === -1) {
            return [404, { message: 'Newsletter not found' }];
        }
        return [
            200,
            {
                newsletter: newsletters[newsletterIndex]
            },
        ];
    } catch (error) {
        console.error('Error in newsletters API:', error);
        return [500, { message: 'Internal server error' }];
    }
});

// GET: Fetch paginated tecnology inventory
mock.onGet(new RegExp('/api/data/newsletter')).reply((config) => {
    try {
        const urlParams = new URLSearchParams(config.url!.split('?')[1]);

        const limit = 5;
        const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedNewsletter = newsletters.slice(startIndex, endIndex);
        const totalNewsletters = newsletters.length;
        const totalPages = Math.ceil(totalNewsletters / limit);
        return [
            200,
            {
                newsletters: paginatedNewsletter,
                currentPage: page,
                totalPages,
            },
        ];
    } catch (error) {
        console.error('Error in newsletters API:', error);
        return [500, { message: 'Internal server error' }];
    }
});



