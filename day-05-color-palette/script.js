// DAY 5: COLOR PALETTE GENERATOR
// Goal: Generate a set of 5 random colors and display them as cards

// New concepts:
// - Generating random hex color strings (#RRGGBB)
// - toString(16) to convert a number to hexadecimal
// - padStart(6, "0") to ensure the hex is always 6 characters
// - createElement + setting element styles directly via JS



// Create a function that returns a random hex color string
function generateHexColor() {
    // Math.floor(Math.random() * 0xFFFFFF) gives a random number in that range
    // .toString(16) converts it to hex, .padStart(6, "0") ensures it's always 6 digits
    return "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");
}

// get references to the DOM elements
const paletteContainer = document.querySelector("#paletteContainer");
const generateBtn = document.querySelector("#generateBtn");
const palette = document.querySelector(".palette");


// Create a function to generate Color Palette  
function generatePalette(count) {
    // Empty the palette container first
    paletteContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        // Generate a hex color
        const hexColor = generateHexColor();
        //create a card element
        const card = document.createElement('div');
        // Set class and styles for the card
        card.className = 'color-card';
        card.style.backgroundColor = hexColor;
        // Set the text content to the hex color
        card.innerHTML = `<p>${hexColor}</p>`;
        //append to container
        paletteContainer.appendChild(card);

        // Add click event listener to copy hex code to clipboard
        card.addEventListener('click', () => {
            navigator.clipboard.writeText(hexColor).then(() => {
                card.innerHTML = `<p>Copied ${hexColor}!</p>`;
                setTimeout(() => {
                    card.innerHTML = `<p>${hexColor}</p>`;
                }, 1500); // Reset after 1.5 seconds
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    };  
};

// Add a click event listener to the "Generate" button
generateBtn.addEventListener('click', () => {
    //5 for calling generatePalette with 5 colors
    generatePalette(5);
});

// 4. Call generatePalette(5) once on page load
generatePalette(5);

    