document.addEventListener('DOMContentLoaded', () => {
    const screenSaverContainer = document.getElementById('screenSaverContainer');
    const rainbow = document.getElementById('rainbow');
    const unicorn = document.getElementById('unicorn');

    // Rainbow animation
    let rainbowX = -rainbow.offsetWidth / 2; // Start with half of it off-screen to the left
    let rainbowY = 50; // Initial Y position, matches CSS
    let rainbowSpeedX = 1; // Pixels per frame
    let rainbowSpeedY = 0.5; // Slower vertical movement

    // Adjust rainbow initial position to be more centered vertically for bouncing
    rainbow.style.left = rainbowX + 'px';
    rainbow.style.top = rainbowY + 'px';

    function animateRainbow() {
        const containerWidth = screenSaverContainer.offsetWidth;
        const containerHeight = screenSaverContainer.offsetHeight;
        const rainbowWidth = rainbow.offsetWidth;
        const rainbowHeight = rainbow.offsetHeight;

        rainbowX += rainbowSpeedX;
        rainbowY += rainbowSpeedY;

        // Bounce off horizontal edges
        // We use rainbowWidth / 4 because the rainbow is 200% width of container.
        // So, left edge is when rainbowX > 0 (meaning the actual left edge of the visible part of rainbow hits container left)
        // And right edge is when rainbowX < containerWidth - rainbowWidth / 2 (meaning right edge of visible part hits container right)
        // A simpler way for a 200% width rainbow is to check its 'left' style property
        if (rainbowX > 0 || rainbowX < containerWidth - rainbowWidth ) {
             rainbowSpeedX *= -1;
             // Ensure it doesn't get stuck
             if (rainbowX > 0) rainbowX = 0;
             if (rainbowX < containerWidth - rainbowWidth) rainbowX = containerWidth - rainbowWidth;
        }


        // Bounce off vertical edges
        if (rainbowY + rainbowHeight > containerHeight || rainbowY < 0) {
            rainbowSpeedY *= -1;
            // Ensure it doesn't get stuck
            if (rainbowY < 0) rainbowY = 0;
            if (rainbowY + rainbowHeight > containerHeight) rainbowY = containerHeight - rainbowHeight;
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
            setTimeout(()_ => { // give time for fade out animation
                 unicorn.style.display = 'none';
            }, 300); // matches CSS transition time
            unicornTimeout = null; // Reset timeout id
        }, 3000); // Show for 3 seconds
    });

    // Start rainbow animation
    // Delay start slightly to ensure all elements are loaded and sized
    setTimeout(animateRainbow, 100);
});
