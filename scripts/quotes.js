$(function () {
    $("#navbar").load("navbar.html");
});

let quoteList = [
    { "Get some": "Jocko Willink" },
    { "All your excuses are lies": "Jocko Willink" },
    { "Lady Luck favors the one who tries": "Law of Serendipidy" },
    { "Do better": "Jocko Willink" },
    { "No factor": "Jocko Willink" },
    { "That which does not kill us makes us stronger": "Friedrich Nietzche" },
    { "Get busy living or get busy dying": "Steven King" },
    { "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do": "Mark Twain" },
    { "Great minds discuss ideas; average minds discuss events; small minds discuss people": "Eleanor Roosevelt" },
    { "Only put off tomorrow what you are willing to die having left undone": "Pablo Picasso" },
    { "Absorb what is useful, discard what is useless, and add what is specifically your own": "Bruce Lee" },
    { "Whether you think you can or think you can't, you're right": "Henry Ford" },
    { "Stand by to get some": "Jocko Willink" }
]

// Generate a quote
function generateQuote() {
    text1 = quoteList[Math.floor(Math.random() * quoteList.length)];
    document.getElementById("quote").innerHTML = Object.keys(text1);
    document.getElementById("author").innerHTML = "- ".concat(Object.values(text1));
}

// Generate quote list
function listOfQuotes() {
    node = document.getElementById("this-list");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    for (i = 0; i < quoteList.length; i++) {
        createLi = document.createElement("li");
        quote = document.createTextNode(Object.keys(quoteList[i]));
        author = document.createTextNode(Object.values(quoteList[i]));
        createLi.append(i + 1, ": ", quote, " - ", author);
        document.getElementById("this-list").appendChild(createLi);
    }
}