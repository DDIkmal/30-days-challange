// DAY 4: QUOTE GENERATOR
// Goal: Display a random quote from an array each time the button is clicked

// Learn New concepts:
// - Array of objects (each quote has a "text" and "author" property)
// - Math.random() + Math.floor() to pick a random index from an array
// - Avoiding showing the same quote twice in a row

// Create an array of quote objects
const quotes = [
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
  { text: "So many books, so little time.", author: "Frank Zappa" },
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh" },
  { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
  { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

//Keep track of the last shown quote index to avoid repetition
let lastIndex = null;

//Create a function to get Random Quote from the quotes array
function getRandomQuote() {
    //Picks a random index from the quotes array using Math.random()
    let index = Math.floor(Math.random() * quotes.length);
    //Makes sure the new index is different from lastIndex
    if(index === lastIndex){
        index = (index + 1) % quotes.length; // Ensure a different index
    }

    lastIndex = index; //Updates lastIndex
    //Returns the selected quote object
    return quotes[index];
};

//Create a function for display Quote
function displayQuote() {
    

    const quote = getRandomQuote();//- Calls getRandomQuote()

    // Add fade-out class to trigger transition from css
    document.querySelector("#quoteContainer").classList.add("fade"); 
    setTimeout(() => {
        document.querySelector("#quoteContainer").classList.remove("fade"); // Remove fade-out class after transition
        document.querySelector("#quoteText").textContent = `"${quote.text}"`;//Updates the quote text element
        document.querySelector("#quoteAuthor").textContent = `- ${quote.author} -`;//Updates the quote author element
    }, 500); 

}

//Get the "New Quote" button element
const newQuote = document.querySelector("#newQuote");
// Call displayQuote() when clicked
newQuote.addEventListener("click", displayQuote);

//Call displayQuote() once on page load so a quote shows immediately
displayQuote();

//Add a "Copy to clipboard" button using navigator.clipboard.writeText()
const copyQuote = document.querySelector("#copyQuote");
copyQuote.addEventListener("click", () => {
    const quoteText = document.querySelector("#quoteText").textContent;
    navigator.clipboard.writeText(quoteText).then(() => {
        copyQuote.textContent = "Copied!";
        setTimeout(() => copyQuote.textContent = "Copy", 1500); // reset after 1.5 seconds
    });
});



