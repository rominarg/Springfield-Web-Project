document.addEventListener("DOMContentLoaded", () => {
    
    // --- CONFIGURACIÓN ---
    const seasonsContainer = document.getElementById('seasons-container');
    const episodesList = document.getElementById('episodios-list');
    
    // Base URL para las imágenes (según documentación de simpsonsapi)
    const URL_IMG_BASE = 'https://cdn.thesimpsonsapi.com/500'; 
    
    let allEpisodes = []; // Episodios descargados
    let seasonActive = 1; // Temporada activa por defecto

    // 1. FUNCIÓN PARA TRAER DATOS (FETCH ASYNC)
    async function cargarEpisodios() {
        try {
            // Como la API pagina de a 20, pedimos 3 páginas para tener las temp 1, 2 y 3 completas
            const urls = [
                'https://thesimpsonsapi.com/api/episodes?page=1',
                'https://thesimpsonsapi.com/api/episodes?page=2',
                'https://thesimpsonsapi.com/api/episodes?page=3'
            ];

            // Peticiones en paralelo
            const responses = await Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all(responses.map(res => res.json()));

            // Unimos los resultados de las 3 páginas en un solo array
            allEpisodes = data.flatMap(page => page.results || page.data);

            // Una vez tenemos los datos, pintamos la interfaz
            generarBotones();
            renderLista(seasonActive);

        } catch (error) {
            console.error("Error al conectar con la API:", error);
            episodesList.innerHTML = '<p class="text-danger text-center">Error al cargar los episodios.</p>';
        }
    }

    // 2. GENERAR BOTONES DE TEMPORADAS
    function generarBotones() {
        // Obtenemos las temporadas únicas disponibles en los datos
        const temporadas = [...new Set(allEpisodes.map(e => e.season))].sort((a,b) => a-b);

        seasonsContainer.innerHTML = '';

        temporadas.forEach(temp => {
            const btn = document.createElement('button');
            
            // Lógica para la clase 'active'
            const claseActiva = (temp === seasonActive) ? 'active' : '';
            btn.className = `btn btn-simpson ${claseActiva}`;
            btn.textContent = `Temporada ${temp}`;
            
            // Evento Click
            btn.onclick = () => {
                seasonActive = temp; // Actualizamos variable global
                renderLista(temp);   // Renderizamos episodios
                generarBotones();    // Re-renderizamos botones para actualizar el 'active'
            };

            seasonsContainer.appendChild(btn);
        });
    }

    // 3. RENDERIZAR LA LISTA DE CARDS (Usando tu HTML)
    function renderLista(season) {
        episodesList.innerHTML = '';

        // Filtramos solo los episodios de la temporada seleccionada
        const episodiosFiltrados = allEpisodes.filter(e => e.season === season);

        episodiosFiltrados.forEach(ep => {
            // Construimos la ruta de la imagen
            // La API devuelve "/episode/1.webp", le pegamos la base delante.
            const imagenSrc = `${URL_IMG_BASE}${ep.image_path}`;

            const cardHTML = `
                <div class="card episode-card shadow-sm border-0">
                    <div class="row g-0 align-items-center">
                        <div class="col-3">
                            <img src="${imagenSrc}" 
                                 class="img-fluid rounded-start" 
                                 style="height: 100px; width: 100%; object-fit: cover;"
                                 alt="${ep.name}"
                                 onerror="this.src='https://via.placeholder.com/150'">
                        </div>
                        <div class="col-9">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">${ep.name}</h5>
                                <p class="card-text text-muted small mb-0 text-truncate">
                                    ${ep.synopsis || 'Sin descripción disponible.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Insertamos el string como HTML
            episodesList.innerHTML += cardHTML;
        });
    }

    // INICIAR
    cargarEpisodios();
});