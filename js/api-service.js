const API_SERVICE = (function() {
const NASA_API_KEY = 'vwzvBKeEWOYFZLlln2NEwMPkbCOwA9SkDsCXG8ev';

    const roverCameras = {
        perseverance: ['EDL_RUCAM', 'EDL_RDCAM', 'FRONT_HAZCAM_LEFT', 'FRONT_HAZCAM_RIGHT', 'REAR_HAZCAM_LEFT', 'REAR_HAZCAM_RIGHT', 'MCZ_LEFT', 'MCZ_RIGHT', 'NAVCAM_LEFT', 'NAVCAM_RIGHT'],
        curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
        opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
        spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
    };

    async function fetchWithRetry(url, retries = 3, delay = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (response.ok) return response;
                throw new Error(`HTTP error! status: ${response.status}`);
            } catch (error) {
                if (i === retries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    async function fetchRoverManifest(rover) {
        try {
            const response = await fetchWithRetry(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${NASA_API_KEY}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching manifest:', error);
            throw error;
        }
    }

    async function fetchPhotos(rover, sol, camera) {
        try {
            const response = await fetchWithRetry(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${NASA_API_KEY}`);
            const data = await response.json();
            return data.photos || [];
        } catch (error) {
            console.error(`Error fetching photos for ${rover}, sol ${sol}, camera ${camera}:`, error);
            return [];
        }
    }

    function getDefaultManifest(rover) {
        const defaults = {
            perseverance: {
                name: 'Perseverance',
                landing_date: '2021-02-18',
                launch_date: '2020-07-30',
                status: 'active',
                max_sol: 1000,
                max_date: new Date().toISOString().split('T')[0],
                total_photos: 300000
            },
            curiosity: {
                name: 'Curiosity',
                landing_date: '2012-08-06',
                launch_date: '2011-11-26',
                status: 'active',
                max_sol: 4000,
                max_date: new Date().toISOString().split('T')[0],
                total_photos: 800000
            },
            opportunity: {
                name: 'Opportunity',
                landing_date: '2004-01-25',
                launch_date: '2003-07-07',
                status: 'complete',
                max_sol: 5111,
                max_date: '2018-06-10',
                total_photos: 228000
            },
            spirit: {
                name: 'Spirit',
                landing_date: '2004-01-04',
                launch_date: '2003-06-10',
                status: 'complete',
                max_sol: 2208,
                max_date: '2010-03-21',
                total_photos: 124000
            }
        };
        return { photo_manifest: defaults[rover] };
    }

    return {
        fetchRoverManifest,
        fetchPhotos,
        getDefaultManifest,
        roverCameras
    };
})();
