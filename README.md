# The Simpsons Web 🍩

Una Landing Page interactiva y responsiva dedicada al universo de Los Simpsons. Este proyecto consume una API externa para mostrar información dinámica sobre los personajes y ofrece una interfaz de usuario temática y amigable.

##  Descripción

Este proyecto fue desarrollado como práctica de Front-End para consolidar conocimientos en manipulación del DOM, consumo de APIs (Fetch) y diseño responsivo utilizando Bootstrap 5. La aplicación permite a los usuarios navegar por una galería de personajes, ver detalles específicos en ventanas modales y explorar información sobre las temporadas.

##  Características Principales

* **Consumo de API REST:** Los personajes se cargan dinámicamente desde *The Simpsons API*.
* **Diseño Responsivo:** Adaptable a móviles, tablets y escritorio gracias a **Bootstrap 5**.
* **Interactividad:**
    * Carrusel/Paginación de personajes (Botones Anterior/Siguiente).
    * **Ventanas Modales:** Al hacer clic en un personaje, se despliega una ficha técnica con detalles (Edad, Ocupación, Estado, Frase).
* **Estilizado Temático:** Uso de variables CSS (`:root`) para manejar la paleta de colores oficial de la serie y tipografía personalizada (*Gloria Hallelujah*).
* **Navbar Inteligente:** La barra de navegación cambia de estilo al hacer scroll y colapsa automáticamente en móviles al seleccionar una opción.

##  Tecnologías Utilizadas

* **HTML5:** Estructura semántica.
* **CSS3:** Animaciones, variables y `media queries`.
* **Bootstrap 5.3:** Grid system, componentes (Modal, Navbar, Cards) e iconos (FontAwesome).
* **JavaScript (ES6+):**
    * `fetch()` / `async-await` para llamadas asíncronas.
    * Manipulación del DOM.
    * Lógica de paginación del cliente.

##  Estructura del Proyecto

```text
├── index.html      # Estructura principal
├── style.css       # Estilos personalizados y variables
├── script.js       # Lógica de personajes, API y Modales
├── episodios.js    # Lógica para la sección de episodios
└── img/            # Recursos gráficos
```  
### [![Ver Web en Vivo](https://img.shields.io/badge/🍩_VER_WEB_EN_VIVO-CLICK_AQUÍ-FFD90F?style=for-the-badge&labelColor=black)](https://rominarg.github.io/Springfield-Web-Project/)

### Vista Previa
<img width="924" alt="simpson_web" src="https://github.com/user-attachments/assets/d0e47225-cd94-4c33-a185-3377bd05dd6b" />


