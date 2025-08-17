document.addEventListener('DOMContentLoaded', function() {
    let roverManifest = null;
    let currentRover = 'perseverance';

    function setupCameraOptions() {
        const cameraSelect = document.getElementById('camera-select');
        cameraSelect.innerHTML = '<option value="all">All Cameras</option>';
        API_SERVICE.roverCameras[currentRover].forEach(cam => {
            const option = document.createElement('option');
            option.value = cam;
            option.textContent = cam;
            cameraSelect.appendChild(option);
        });
    }

    async function fetchMarsRoverPhoto() {
        const loadingIndicator = document.getElementById('loading-indicator');
        const postcardContainer = document.getElementById('postcard-container');

        loadingIndicator.style.display = 'flex';
        postcardContainer.style.display = 'none';
        document.getElementById('ascii-retry').style.display = 'none';

        const camera = document.getElementById('camera-select').value;
        const sol = roverManifest ? getRandomSol(roverManifest.photo_manifest.max_sol) : 1000;

        try {
            let photos = [];

            if (camera !== 'all') {
                photos = await API_SERVICE.fetchPhotos(currentRover, sol, camera);
            }

            if (photos.length === 0) {
                for (const cam of API_SERVICE.roverCameras[currentRover]) {
                    photos = await API_SERVICE.fetchPhotos(currentRover, sol, cam);
                    if (photos.length > 0) break;
                }
            }

            if (photos.length > 0) {
                UI_SERVICE.displayPhotoInfo(photos[Math.floor(Math.random() * photos.length)]);
            } else {
                UI_SERVICE.showNoPhotosError(sol);
            }
        } catch (error) {
            UI_SERVICE.showApiError(error);
        }
    }

    function getRandomSol(maxSol) {
        return Math.floor(Math.random() * maxSol);
    }

    async function handleRoverChange(e) {
        currentRover = e.target.value;
        setupCameraOptions();

        try {
            roverManifest = await API_SERVICE.fetchRoverManifest(currentRover);
        } catch {
            roverManifest = API_SERVICE.getDefaultManifest(currentRover);
        }

        UI_SERVICE.updateMissionInfo(roverManifest, currentRover);
        fetchMarsRoverPhoto();
    }

    setupCameraOptions();
    document.getElementById('rover-select').addEventListener('change', handleRoverChange);
    document.getElementById('generate-new-postcard').addEventListener('click', fetchMarsRoverPhoto);
    document.getElementById('ascii-retry').addEventListener('click', fetchMarsRoverPhoto);

    (async function() {
        try {
            roverManifest = await API_SERVICE.fetchRoverManifest(currentRover);
        } catch {
            roverManifest = API_SERVICE.getDefaultManifest(currentRover);
        }

        UI_SERVICE.updateMissionInfo(roverManifest, currentRover);
        fetchMarsRoverPhoto();
    })();
});
