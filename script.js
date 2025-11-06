const playerGrid = document.getElementById('player-grid');
const playersContainer = document.getElementById('players-container');
const playerSearch = document.getElementById('player-search');
const positionFilter = document.getElementById('position-filter');
const languageSelect = document.getElementById('language-select');
const errorContainer = document.getElementById('error-container');

// Stats elements
const teamName = document.getElementById('team-name');
const sportType = document.getElementById('sport-type');
const worldCupYear = document.getElementById('worldcup-year');
const headCoach = document.getElementById('head-coach');
const totalPlayers = document.getElementById('total-players');
const displayedPlayers = document.getElementById('displayed-players');

// Team data
const myFavoriteFootballTeam = {
    team: "Argentina",
    sport: "Football",
    year: 1986,
    isWorldCupWinner: true,
    headCoach: {
        coachName: "Carlos Bilardo",
        matches: 7,
    },
    players: [
        {
            name: "Sergio Almirón",
            position: "forward",
            number: 1,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Sergio Batista",
            position: "midfielder",
            number: 2,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Ricardo Bochini",
            position: "midfielder",
            number: 3,
            isCaptain: false,
            nickname: "El Bocha",
        },
        {
            name: "Claudio Borghi",
            position: "midfielder",
            number: 4,
            isCaptain: false,
            nickname: "Bichi",
        },
        {
            name: "José Luis Brown",
            position: "defender",
            number: 5,
            isCaptain: false,
            nickname: "Tata",
        },
        {
            name: "Daniel Passarella",
            position: "defender",
            number: 6,
            isCaptain: false,
            nickname: "El Gran Capitán",
        },
        {
            name: "Jorge Burruchaga",
            position: "forward",
            number: 7,
            isCaptain: false,
            nickname: "Burru",
        },
        {
            name: "Néstor Clausen",
            position: "defender",
            number: 8,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "José Luis Cuciuffo",
            position: "defender",
            number: 9,
            isCaptain: false,
            nickname: "El Cuchu",
        },
        {
            name: "Diego Maradona",
            position: "midfielder",
            number: 10,
            isCaptain: true,
            nickname: "El Pibe de Oro",
        },
        {
            name: "Jorge Valdano",
            position: "forward",
            number: 11,
            isCaptain: false,
            nickname: "The Philosopher of Football",
        },
        {
            name: "Héctor Enrique",
            position: "midfielder",
            number: 12,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Oscar Garré",
            position: "defender",
            number: 13,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Ricardo Giusti",
            position: "midfielder",
            number: 14,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Luis Islas",
            position: "goalkeeper",
            number: 15,
            isCaptain: false,
            nickname: "El loco",
        },
        {
            name: "Julio Olarticoechea",
            position: "defender",
            number: 16,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Pedro Pasculli",
            position: "forward",
            number: 17,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Nery Pumpido",
            position: "goalkeeper",
            number: 18,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Oscar Ruggeri",
            position: "defender",
            number: 19,
            isCaptain: false,
            nickname: "El Cabezón",
        },
        {
            name: "Carlos Tapia",
            position: "midfielder",
            number: 20,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Marcelo Trobbiani",
            position: "midfielder",
            number: 21,
            isCaptain: false,
            nickname: "Calesita",
        },
        {
            name: "Héctor Zelada",
            position: "goalkeeper",
            number: 22,
            isCaptain: false,
            nickname: null,
        }
    ]
};

let filteredPlayers = [];
let currentLanguage = 'en';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadTeamData();
    setupEventListeners();
    setupKeyboardShortcuts();
});

function loadTeamData() {
    try {
        filteredPlayers = [...myFavoriteFootballTeam.players];
        
        // Update basic info
        teamName.textContent = myFavoriteFootballTeam.team.toUpperCase();
        sportType.textContent = myFavoriteFootballTeam.sport.toUpperCase();
        worldCupYear.textContent = myFavoriteFootballTeam.year;
        headCoach.textContent = myFavoriteFootballTeam.headCoach.coachName;
        
        updateStats();
        displayPlayers(filteredPlayers);
        
    } catch (error) {
        showError(`DATA_LOAD_ERROR: ${error.message}`);
    }
}

function updateStats() {
    totalPlayers.textContent = myFavoriteFootballTeam.players.length;
    displayedPlayers.textContent = filteredPlayers.length;
}

function displayPlayers(players) {
    if (players.length === 0) {
        playerGrid.innerHTML = `
            <div class="error-msg">
                NO_PLAYERS_FOUND
                ${playerSearch.value ? ` for "${playerSearch.value}"` : ''}
            </div>
        `;
        return;
    }

    playerGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();
    
    players.forEach((player) => {
        const card = document.createElement('div');
        card.className = `player-card ${player.isCaptain ? 'captain' : ''}`;
        
        card.innerHTML = `
            <div class="player-header ${player.isCaptain ? 'captain' : ''}">
                <div class="player-number">${player.number}</div>
                <div class="player-name">
                    ${player.name}
                    ${player.isCaptain ? '<span class="captain-badge">[CAPTAIN]</span>' : ''}
                </div>
            </div>
            <div class="player-body">
                <div class="player-info">
                    <span class="info-label">POSITION:</span>
                    <span class="info-value position-${player.position}">${player.position.toUpperCase()}</span>
                </div>
                <div class="player-info">
                    <span class="info-label">NUMBER:</span>
                    <span class="info-value">${player.number}</span>
                </div>
                <div class="player-info">
                    <span class="info-label">NICKNAME:</span>
                    <span class="${player.nickname ? 'nickname' : 'no-nickname'}">
                        ${player.nickname || 'NONE'}
                    </span>
                </div>
            </div>
        `;
        
        fragment.appendChild(card);
    });
    
    playerGrid.appendChild(fragment);
}

function performSearch() {
    const searchTerm = playerSearch.value.toLowerCase().trim();
    const positionValue = positionFilter.value;
    
    filteredPlayers = myFavoriteFootballTeam.players.filter(player => {
        const matchesSearch = searchTerm === '' || 
            player.name.toLowerCase().includes(searchTerm) ||
            (player.nickname && player.nickname.toLowerCase().includes(searchTerm));
        
        const matchesPosition = positionValue === 'all' || 
            (positionValue === 'nickname' ? player.nickname !== null : player.position === positionValue);
        
        return matchesSearch && matchesPosition;
    });
    
    displayPlayers(filteredPlayers);
    updateStats();
}

function setupEventListeners() {
    // Search with debounce
    let searchTimeout;
    playerSearch.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
    
    // Position filter
    positionFilter.addEventListener('change', performSearch);
    
    // Language selector
    languageSelect.addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        // In a real app, you would load the appropriate language file here
        console.log(`Language changed to: ${e.target.value}`);
    });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // / or Ctrl+K to focus search
        if (e.key === '/' || (e.ctrlKey && e.key === 'k')) {
            e.preventDefault();
            playerSearch.focus();
            playerSearch.select();
        }
        
        // Escape to clear search
        if (e.key === 'Escape' && document.activeElement === playerSearch) {
            playerSearch.value = '';
            performSearch();
        }
    });
}

function showError(message) {
    errorContainer.innerHTML = `
        <strong>SYSTEM_ERROR:</strong> ${message}
        <br><br>
        <button onclick="loadTeamData()" class="terminal-btn" style="margin-top: 8px;">RETRY_LOAD</button>
    `;
    errorContainer.classList.remove('hide');
}

// Handle window controls
document.querySelector('.control.close').addEventListener('click', function() {
    if (confirm('Close football terminal?')) {
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; color: white; font-family: 'Geist Mono', monospace; background: var(--bg-primary);">
                <div style="text-align: center;">
                    <div style="font-size: 2em; margin-bottom: 20px; color: var(--gradient-purple);">TERMINAL_CLOSED</div>
                    <div style="color: var(--text-dim);">Refresh page to restart</div>
                </div>
            </div>
        `;
    }
});

document.querySelector('.control.minimize').addEventListener('click', function() {
    document.body.style.opacity = '0.7';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 1000);
});

document.querySelector('.control.maximize').addEventListener('click', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
});

// Export functions for global access
window.loadTeamData = loadTeamData;
window.performSearch = performSearch;
