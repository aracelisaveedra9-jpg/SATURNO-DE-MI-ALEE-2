# Saturno de Amistad

Sitio web estático con una escena 3D de Saturno, frases animadas, controles para girar y acercar la cámara, y un reproductor de audio.

## Tecnologías

- **HTML5**: estructura de la página y reproductor de audio.
- **CSS3**: diseño adaptable y estilos del reproductor.
- **JavaScript (ES6+)**: animaciones, frases e interacción.
- **Three.js r128**: escena 3D, Saturno, anillos y estrellas. Se carga desde cdnjs.
- **WebGL**: renderizado de la escena 3D en el navegador.
- **Canvas API**: creación de texturas y frases como sprites.
- **HTML Audio**: reproducción del archivo MP3 local.

No requiere Node.js, npm, un framework ni un proceso de compilación. Para cargar Three.js se necesita conexión a Internet.

## Abrir en Visual Studio Code

1. Abre Visual Studio Code.
2. Selecciona **Archivo > Abrir carpeta…**.
3. Elige la carpeta `Saturno-de-Amor`.
4. Abre `index.html` en un navegador. También puedes usar una extensión como Live Server para previsualizarlo.

## Archivos

```text
Saturno-de-Amor/
├── .gitignore
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── assets/
    └── audio.mp3
```

## Publicar en GitHub

Con GitHub Desktop:

1. Crea un repositorio vacío en GitHub.
2. En GitHub Desktop, agrega la carpeta local `Saturno-de-Amor` como repositorio.
3. Selecciona **Publish repository** y elige si será público o privado.

Para publicarlo como sitio con GitHub Pages, abre **Settings > Pages**, elige **Deploy from a branch**, y selecciona la rama `main` y la carpeta raíz (`/`). El archivo `index.html` está en la raíz del proyecto.

`assets/audio.mp3` contiene el audio compartido por la usuaria, convertido desde M4A y recortado para quitar aproximadamente 2.99 segundos de silencio inicial. La duración del MP3 es de aproximadamente 4:35.

## Ayuda oficial

- [Abrir una carpeta en Visual Studio Code](https://code.visualstudio.com/docs/getstarted/overview)
- [Agregar un proyecto existente a GitHub Desktop](https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop)
- [Publicar un sitio con GitHub Pages](https://docs.github.com/en/pages/quickstart)
