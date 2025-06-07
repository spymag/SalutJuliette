document.addEventListener('DOMContentLoaded', () => {
    const screenSaverContainer = document.getElementById('screenSaverContainer');
    const rainbow = document.getElementById('rainbowContainer');
    const unicorn = document.getElementById('unicorn');

    // Rainbow animation
    // Initial position of the rainbow (matches CSS)
    let rainbowX = 50;
    let rainbowY = 50;
    let rainbowSpeedX = 1; // Pixels per frame
    let rainbowSpeedY = 0.5; // Slower vertical movement

    // Apply initial CSS position from JS variables to ensure consistency
    rainbow.style.left = rainbowX + 'px';
    rainbow.style.top = rainbowY + 'px';

    function animateRainbow() {
        const containerWidth = screenSaverContainer.offsetWidth;
        const containerHeight = screenSaverContainer.offsetHeight;
        const rainbowHeight = rainbow.offsetHeight;

        rainbowX += rainbowSpeedX;
        rainbowY += rainbowSpeedY;
        // Bounce off horizontal edges for fixed-width element
        if (rainbowX + rainbowWidth > containerWidth || rainbowX < 0) {
            rainbowSpeedX *= -1; // Reverse horizontal direction

            // Prevent sticking by ensuring it's within bounds after bounce
            if (rainbowX < 0) {
                rainbowX = 0;
            } else if (rainbowX + rainbowWidth > containerWidth) {
                rainbowX = containerWidth - rainbowWidth;
            }
        }

        // Bounce off vertical edges
        if (rainbowY + rainbowHeight > containerHeight || rainbowY < 0) {
            rainbowSpeedY *= -1; // Reverse vertical direction

            // Prevent sticking
            if (rainbowY < 0) {
                rainbowY = 0;
            } else if (rainbowY + rainbowHeight > containerHeight) {
                rainbowY = containerHeight - rainbowHeight;
            }
        }

        rainbow.style.left = rainbowX + 'px';
        rainbow.style.top = rainbowY + 'px';

        requestAnimationFrame(animateRainbow);
    }

    // Unicorn interaction
    let unicornTimeout;

    screenSaverContainer.addEventListener('click', (event) => {
        // Clear any existing timeout to prevent multiple unicorns if clicking rapidly
        if (unicornTimeout) {
            clearTimeout(unicornTimeout);
            // Reset unicorn for immediate next click, if it was visible
            unicorn.classList.remove('show');
            // Force reflow to restart animation if it was in progress
            void unicorn.offsetWidth;
        }

        const clickX = event.clientX;
        const clickY = event.clientY;

        unicorn.style.left = (clickX - unicorn.width / 2) + 'px';
        unicorn.style.top = (clickY - unicorn.height / 2) + 'px';

        unicorn.src = "unicorn.png"; // Ensure src is set, especially if it could change

        // Show unicorn with slide-in animation
        unicorn.classList.add('show');
        unicorn.style.display = 'block'; // Make it block before animation starts

        // Set timeout to hide unicorn with slide-out animation
        unicornTimeout = setTimeout(() => {
            unicorn.classList.remove('show');
            // Optional: Listen for transition end to set display: none
            // For simplicity, we'll rely on opacity making it invisible
            // and pointer-events: none in CSS to prevent interaction
            // To ensure it can be reshown, we might need to set display:none after transition
            setTimeout(() => { // give time for fade out animation
                 unicorn.style.display = 'none';
            }, 300); // matches CSS transition time
            unicornTimeout = null; // Reset timeout id
        }, 3000); // Show for 3 seconds
    });

    // Start rainbow animation
    // Delay start slightly to ensure all elements are loaded and sized
    setTimeout(animateRainbow, 100);
});
