const UI_SERVICE = (function() {
    function updateMissionInfo(roverManifest, currentRover) {
        if (!roverManifest?.photo_manifest) return;

        const manifest = roverManifest.photo_manifest;
        document.getElementById('mission-days').textContent = `${manifest.max_sol} sols`;

        const statusDisplay = roverManifest.photo_manifest.status === 'active' ? 'Active' : 'Complete';
        document.getElementById('rover-status').textContent = statusDisplay;

        document.getElementById('launch-date').textContent = formatDate(manifest.launch_date);
        document.getElementById('landing-date').textContent = formatDate(manifest.landing_date);
        document.getElementById('total-photos').textContent = manifest.total_photos.toLocaleString();
        document.getElementById('rover-name').textContent = manifest.name;
    }

    function displayPhotoInfo(photo) {
        document.getElementById('earth-date').textContent = formatDate(photo.earth_date);
        document.getElementById('martian-sol').textContent = photo.sol;
        document.getElementById('camera-name').textContent = photo.camera.full_name;

        const roverImage = document.getElementById('rover-image');
        roverImage.alt = `Mars surface captured by ${photo.camera.full_name} on Sol ${photo.sol}`;

        roverImage.onload = function() {
            this.classList.add('loaded');
            document.getElementById('loading-indicator').style.display = 'none';
            document.getElementById('postcard-container').style.display = 'flex';
        };

        roverImage.onerror = function() {
            document.getElementById('loading-indicator').style.display = 'none';
            document.getElementById('postcard-container').style.display = 'flex';
            document.getElementById('ascii-retry').style.display = 'block';
        };

        roverImage.src = photo.img_src;
        roverImage.classList.remove('loaded');
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function showNoPhotosError(sol) {
        document.getElementById('loading-indicator').innerHTML = `
            <div class="loading-text">No Photos Found</div>
            <div class="loading-subtext">Sol ${sol} • Try another camera</div>
        `;
        document.getElementById('ascii-retry').style.display = 'block';
    }

    function showApiError(error) {
        console.error('API Error:', error);
        document.getElementById('loading-indicator').innerHTML = `
            <div class="loading-text">Connection Issue</div>
            <div class="loading-subtext">Mars connection unstable • Try again</div>
        `;
        document.getElementById('ascii-retry').style.display = 'block';
    }

    return {
        updateMissionInfo,
        displayPhotoInfo,
        showNoPhotosError,
        showApiError
    };
})();
