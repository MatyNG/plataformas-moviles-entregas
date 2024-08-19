const pokemonList = document.getElementById('pokemon-list');
const pokemonDetails = document.getElementById('pokemon-details');
const loadMoreBtn = document.getElementById('load-more');
const spinner = document.getElementById('spinner');

let offset = 0;
const limit = 151;

// Diccionario de traducción de tipos y habilidades
const translations = {
    types: {
        "normal": "Normal",
        "fire": "Fuego",
        "water": "Agua",
        "electric": "Eléctrico",
        "grass": "Planta",
        "ice": "Hielo",
        "fighting": "Lucha",
        "poison": "Veneno",
        "ground": "Tierra",
        "flying": "Volador",
        "psychic": "Psíquico",
        "bug": "Bicho",
        "rock": "Roca",
        "ghost": "Fantasma",
        "dragon": "Dragón",
        "dark": "Siniestro",
        "steel": "Acero",
        "fairy": "Hada"
    },
    abilities: {
        "overgrow": "Espesura",
        "blaze": "Mar Llamas",
        "torrent": "Torrente",
        "synchronize": "Sincronía",
        "serene-grace": "Gracia Serenidad",
        // Añadir más habilidades según sea necesario
    },
    moves: {
        // Aquí puedes añadir traducciones para los movimientos si es necesario
    }
};

// Función para traducir tipos y habilidades
const translate = (type, dictionary) => {
    return dictionary[type] || type;
};

const fetchPokemons = async () => {
    spinner.style.display = 'block';
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        displayPokemons(data.results);
    } catch (error) {
        console.error('Error al obtener datos de los Pokémon:', error);
    } finally {
        spinner.style.display = 'none';
    }
};

const displayPokemons = async (pokemons) => {
    for (const pokemon of pokemons) {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="${data.name}">
            <h3>${data.name}</h3>
        `;
        card.onclick = () => showDetails(data);
        pokemonList.appendChild(card);
    }
};

const showDetails = (pokemon) => {
    pokemonDetails.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
        <p>Tipos: ${pokemon.types.map(typeInfo => translate(typeInfo.type.name, translations.types)).join(', ')}</p>
        <p>Habilidades: ${pokemon.abilities.map(abilityInfo => translate(abilityInfo.ability.name, translations.abilities)).join(', ')}</p>
        <p>Movimientos: ${pokemon.moves.slice(0, 4).map(moveInfo => translate(moveInfo.move.name, translations.moves)).join(', ')}</p>
    `;
};

loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    fetchPokemons();
});

// Carga inicial
fetchPokemons();
