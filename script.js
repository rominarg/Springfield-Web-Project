document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('personajes-container');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // --- CONFIGURACIÓN ---
    const API_URL = 'https://thesimpsonsapi.com/api/characters?limit=30';
    const IMG_BASE_URL = 'https://cdn.thesimpsonsapi.com/500';

    let allCharacters = []; 
    let currentIndex = 0;   
    const itemsToShow = 3;  

    // 1. FETCH
    async function fetchCharacters() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            allCharacters = data.results; 
            renderCharacters();
        } catch (error) {
            console.error("Error al cargar la API:", error);
            container.innerHTML = '<p class="text-danger text-center">Error al cargar los personajes :(</p>';
        }
    }

    // 2. GENERAR HTML
    window.createCharacterCard = function(personaje, index) {
        const imageUrl = `${IMG_BASE_URL}${personaje.portrait_path}`;
        const nombrePersonaje = personaje.name; 
        const profesion = personaje.occupation || 'Desconocido';

        //onclick="openModal(${index})" 
        //style="cursor: pointer" para que parezca un botón
        return `
            <div class="col-md-4 mb-3 animate-fade"> 
                <div class="card character-card shadow-sm h-100" onclick="openModal(${index})" style="cursor: pointer; transition: transform 0.2s;">
                    
                    <img src="${imageUrl}" class="card-img-top" alt="${nombrePersonaje}" 
                         style="height: 300px; object-fit: contain; padding: 10px;"
                         onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
                    
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold text-dark">${nombrePersonaje}</h5>
                        <p class="card-text small text-muted">${profesion}</p>
                        <button class="btn btn-sm btn-outline-primary mt-2">Ver Info</button>
                    </div>

                </div>
            </div>
        `;
    }

    // 3. RENDERIZAR
    function renderCharacters() {
        container.innerHTML = '';
        
        const visibleCharacters = allCharacters.slice(currentIndex, currentIndex + itemsToShow);

        visibleCharacters.forEach((personaje, i) => {
            let realIndex = currentIndex + i;
            container.innerHTML += createCharacterCard(personaje, realIndex);
        });

        updateButtons();
    }

    // 4. MODAL
    window.openModal = function(index) {
        const char = allCharacters[index];
        const imageUrl = `${IMG_BASE_URL}${char.portrait_path}`;

        // Llenar datos en el HTML del Modal
        document.getElementById('modalTitle').innerText = char.name;
        document.getElementById('modalImg').src = imageUrl;
        document.getElementById('modalOccupation').innerText = char.occupation || "No especificado";
        document.getElementById('modalStatus').innerText = char.status || "Vivo"; // La API a veces no trae esto
        
        // Datos simulados si la API no los trae (muchas APIs de Simpsons son limitadas)
        document.getElementById('modalAge').innerText = char.age || "Desconocida"; 
        document.getElementById('modalGender').innerText = char.gender || "Desconocido"; 
        document.getElementById('modalPhrase').innerText = char.catchphrase || "¡D'oh!"; // O frase por defecto

        // Abrir el modal usando Bootstrap 5
        var myModal = new bootstrap.Modal(document.getElementById('personajeModal'));
        myModal.show();
    }

    // 5. CONTROL DE BOTONES
    function updateButtons() {
        btnPrev.disabled = currentIndex === 0;
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

    fetchCharacters();
});

// --- NAVBAR SCROLL ---
let nav = document.querySelector(".navigation-wrap");
let navCollapse = document.querySelector('.navbar-collapse.collapse');

// Cerrar menú al hacer click en link (Móvil)
document.querySelectorAll('.nav-link').forEach(function(a){
    a.addEventListener("click",function(){
        navCollapse.classList.remove("show");
    })
});

// Scroll Effect
window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("scroll-on");
    } else {
        nav.classList.remove("scroll-on");
    }
});