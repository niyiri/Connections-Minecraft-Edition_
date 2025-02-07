let currentCategories = [];
let selectedWords = [];
let mistakes = 0;

// Sample categories - modify these with your own!
const defaultCategories = [
    {
        name: "Programming Languages",
        words: ["Python", "JavaScript", "Java", "C++"],
        color: "#FFB3BA"
    },
    {
        name: "Fruits",
        words: ["Apple", "Banana", "Orange", "Mango"],
        color: "#BAFFC9"
    },
    // Add more categories here
];

function initializeGame() {
    currentCategories = [...defaultCategories];
    renderBoard();
}

function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    // Shuffle and flatten words
    const allWords = currentCategories
        .flatMap(c => c.words)
        .sort(() => Math.random() - 0.5);

    allWords.forEach(word => {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.textContent = word;
        card.onclick = () => toggleWord(word);
        board.appendChild(card);
    });
}

function toggleWord(word) {
    const index = selectedWords.indexOf(word);
    if (index === -1) {
        selectedWords.push(word);
    } else {
        selectedWords.splice(index, 1);
    }
    updateSelection();
}

function updateSelection() {
    document.querySelectorAll('.word-card').forEach(card => {
        card.classList.toggle('selected', selectedWords.includes(card.textContent));
    });
}

function checkGuess() {
    if (selectedWords.length !== 4) return;

    const matchedCategory = currentCategories.find(cat =>
        selectedWords.every(word => cat.words.includes(word))
    );

    if (matchedCategory) {
        revealCategory(matchedCategory);
    } else {
        mistakes++;
        document.getElementById('mistakes').textContent = `Mistakes: ${mistakes}/4`;
    }
    selectedWords = [];
    updateSelection();
}

function addCustomCategory() {
    const name = document.getElementById('category-name').value;
    const words = document.getElementById('category-words').value.split(',');
    
    currentCategories.push({
        name: name.trim(),
        words: words.map(w => w.trim()),
        color: "#" + Math.floor(Math.random()*16777215).toString(16)
    });
    
    renderBoard();
}

// Initialize on load
window.onload = initializeGame;
