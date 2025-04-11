// Main JavaScript for DEI Statement Archive

document.addEventListener('DOMContentLoaded', function() {
    // Load statements from the data file
    loadStatements();

    // Set up event listeners
    setupEventListeners();

    // Update the last updated date
    updateLastUpdated();
});

// Load statements from the statements.js file
function loadStatements() {
    // We'll use the statements array from statements.js
    renderStatements(statements);
}

// Render statements to the DOM
function renderStatements(statementsToRender) {
    const container = document.getElementById('statement-container');
    container.innerHTML = '';

    if (statementsToRender.length === 0) {
        container.innerHTML = '<p class="no-results">No statements found matching your criteria.</p>';
        return;
    }

    statementsToRender.forEach(statement => {
        const card = document.createElement('div');
        card.className = 'statement-card';
        card.setAttribute('data-category', statement.category);

        card.innerHTML = `
            <h2>${statement.institution}</h2>
            <p class="date">Archived: ${statement.dateArchived}</p>
            <div class="statement-preview">${statement.preview}</div>
            <a href="${statement.url}" class="read-more">Read Full Statement</a>
        `;

        container.appendChild(card);
    });
}

// Set up event listeners for search and filtering
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');

    // Search button click
    searchButton.addEventListener('click', () => {
        applyFilters();
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });

    // Category filter change
    categoryFilter.addEventListener('change', () => {
        applyFilters();
    });
}

// Apply search and category filters
function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;

    let filteredStatements = statements;

    // Apply search filter
    if (searchTerm) {
        filteredStatements = filteredStatements.filter(statement =>
            statement.institution.toLowerCase().includes(searchTerm) ||
            statement.preview.toLowerCase().includes(searchTerm)
        );
    }

    // Apply category filter
    if (category !== 'all') {
        filteredStatements = filteredStatements.filter(statement =>
            statement.category === category
        );
    }

    // Render the filtered statements
    renderStatements(filteredStatements);
}

// Update the last updated date in the footer
function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    const currentDate = new Date();
    lastUpdatedElement.textContent = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
