let intervalId; // Variable to hold the interval ID

document.getElementById('startButton').addEventListener('click', function() {
    const cameraType = document.getElementById('cameraType').value; // Get selected camera type
    const cameraNumber = document.getElementById('cameraNumber').value;
    const baseUrl = `https://micamerasimages.net/thumbs/${cameraType}_${cameraNumber}.flv.jpg`;
    
    if (!cameraNumber) {
        alert('Please enter a camera number.');
        return;
    }

    // Clear any existing interval to prevent switching
    if (intervalId) {
        clearInterval(intervalId);
    }

    // Display the image initially
    document.getElementById('imageOutput').style.display = 'block';

    intervalId = setInterval(() => {
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const fullUrl = `${baseUrl}?timestamp=${unixTimestamp}`;
        document.getElementById('linkOutput').innerText = fullUrl;
        document.getElementById('imageOutput').src = fullUrl; // Update the image source
    }, 1000);
});
