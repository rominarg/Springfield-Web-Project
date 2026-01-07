document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('personajes-container');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // --- CONFIGURACIÓN ---
    const API_URL = 'https://thesimpsonsapi.com/api/characters?limit=30';
    const IMG_BASE_URL = 'https://cdn.thesimpsonsapi.com/500'; // img

    let allCharacters = []; // Aquí guardaremos los datos reales de la API
    let currentIndex = 0;   // Índice para saber qué mostrar (0, 3, 6...)
    const itemsToShow = 3;  // Cuántos mostrar a la vez (col-md-4 caben 3)

    // 1. FUNCIÓN PARA TRAER DATOS REALES (FETCH)
    async function fetchCharacters() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            
            // La API devuelve un objeto con "results", ahí están los personajes
            allCharacters = data.results; 
            
            // Una vez tenemos datos, pintamos la primera vez
            renderCharacters();
        } catch (error) {
            console.error("Error al cargar la API:", error);
            container.innerHTML = '<p class="text-danger text-center">Error al cargar los personajes :(</p>';
        }
    }

    // 2. FUNCIÓN PARA GENERAR EL HTML
    function createCharacterCard(personaje) {
        // Concatenamos la URL base con la ruta que viene en el JSON
        // Ejemplo: https://cdn... + /character/1.webp
        const imageUrl = `${IMG_BASE_URL}${personaje.portrait_path}`;
        
        // Usamos el NOMBRE REAL que viene de la API
        const nombrePersonaje = personaje.name; 
        const profesion = personaje.occupation || 'Desconocido';

        return `
            <div class="col-md-4 mb-3 animate-fade"> 
                <div class="card character-card shadow-sm h-100">
                    
                    <img src="${imageUrl}" class="card-img-top" alt="${nombrePersonaje}" 
                         style="height: 300px; object-fit: contain; padding: 10px;"
                         onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
                    
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold text-dark">${nombrePersonaje}</h5>
                        <p class="card-text small text-muted">${profesion}</p>
                    </div>

                </div>
            </div>
        `;
    }

    // 3. FUNCIÓN PRINCIPAL PARA RENDERIZAR
    function renderCharacters() {
        container.innerHTML = ''; // Limpiar lo que haya
        
        // Cortamos el array para tomar solo los 3 que tocan ahora
        // Ejemplo: del 0 al 3, luego del 3 al 6, etc.
        const visibleCharacters = allCharacters.slice(currentIndex, currentIndex + itemsToShow);

        visibleCharacters.forEach(personaje => {
            container.innerHTML += createCharacterCard(personaje);
        });

        updateButtons(); // Actualizar estado de los botones
    }

    // 4. CONTROL DE BOTONES
    function updateButtons() {
        // Si el índice es 0, no podemos ir atrás
        btnPrev.disabled = currentIndex === 0;
        
        // Si ya mostramos todos, no podemos ir adelante
        btnNext.disabled = (currentIndex + itemsToShow) >= allCharacters.length;
    }

    btnNext.addEventListener('click', () => {
        if ((currentIndex + itemsToShow) < allCharacters.length) {
            currentIndex += itemsToShow;
            renderCharacters();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= itemsToShow;
            renderCharacters();
        }
    });

    // INICIAR
    fetchCharacters();
});

//Active Navbar
let nav = document.querySelector(".navigation-wrap");
window.onscroll = function () {
    if(document.documentElement.scrollTop > 20) {
        nav.classList.add("scroll-on");
    }else{
        nav.classList.remove("scroll-on");
    }
}

// Nav Hide
let navBar = document.querySelectorAll('.nav-link');
let navCollapse = document.querySelector('.navbar-collapse.collapse');
navBar.forEach(function(a){
    a.addEventListener("click",function(){
        navCollapse.classList.remove("show");

    })
})

// Script para fijar el navbar al hacer scroll
window.addEventListener('scroll', function() {
    let nav = document.querySelector(".navigation-wrap");
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("scroll-on");
    } else {
        nav.classList.remove("scroll-on");
    }
});