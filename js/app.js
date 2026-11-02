// ================= CONFIGURACIÓN AUDIO =================
const audio=document.getElementById('audio'),playBtn=document.getElementById('play'),progress=document.getElementById('progress'),progressBar=document.getElementById('progress-bar'),timeDisplay=document.getElementById('time');
let isPlaying=false;
playBtn.addEventListener('click',async()=>{if(isPlaying){audio.pause();playBtn.textContent='▶';}else{await audio.play();playBtn.textContent='II';}isPlaying=!isPlaying;});
function formatTime(s){if(!isFinite(s))return'0:00';const m=Math.floor(s/60),sec=Math.floor(s%60).toString().padStart(2,'0');return m+':'+sec;}
audio.addEventListener('timeupdate',()=>{const p=(audio.currentTime/audio.duration)*100;progressBar.style.width=(p||0)+'%';timeDisplay.textContent=formatTime(audio.currentTime)+' / '+formatTime(audio.duration);});
progress.addEventListener('click',e=>{const r=progress.getBoundingClientRect(),p=(e.clientX-r.left)/r.width;if(isFinite(audio.duration))audio.currentTime=p*audio.duration;});

// ================= ESCENA 3D =================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Función para crear textura de estrella con brillo extremo
function createStarTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.1, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 230, 255, 0.7)');
    gradient.addColorStop(0.7, 'rgba(255, 182, 193, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
}

// Fondo de estrellas masivo
const starTexture = createStarTexture();
const starGeometry = new THREE.BufferGeometry();
const starPos = [];
const starCount = 25000; 

for(let i=0; i<starCount; i++) {
    // Esparcir estrellas en un área mayor para el efecto de movimiento
    starPos.push((Math.random()-0.5)*4000, (Math.random()-0.5)*4000, (Math.random()-0.5)*4000);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));

const starMaterial = new THREE.PointsMaterial({ 
    color: 0xffffff, 
    size: 12, 
    map: starTexture,
    transparent: true, 
    opacity: 1.0,
    blending: THREE.AdditiveBlending, 
    depthWrite: false
});
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Textura de Saturno
function createSaturnTexture() {
    const c = document.createElement('canvas'); c.width = 512; c.height = 256;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#1a0d0d');
    grad.addColorStop(0.3, '#5c3a3a');
    grad.addColorStop(0.5, '#a37c7c');
    grad.addColorStop(0.7, '#5c3a3a');
    grad.addColorStop(1, '#1a0d0d');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
    return new THREE.CanvasTexture(c);
}

const planetGeom = new THREE.SphereGeometry(50, 64, 64);
const planetMat = new THREE.MeshPhongMaterial({ map: createSaturnTexture(), shininess: 15 });
const saturn = new THREE.Mesh(planetGeom, planetMat);
saturn.rotation.z = 0.4;
scene.add(saturn);

// Anillos
function createRingTexture() {
    const c = document.createElement('canvas'); c.width = 512; c.height = 64;
    const ctx = c.getContext('2d');
    for(let i=0; i<512; i++) {
        const op = 0.2 + Math.abs(Math.sin(i * 0.08)) * 0.4;
        const color = (i > 320 && i < 340) ? 'rgba(0,0,0,0)' : `rgba(255, 182, 193, ${op})`;
        ctx.fillStyle = color;
        ctx.fillRect(i, 0, 1, 64);
    }
    return new THREE.CanvasTexture(c);
}

const ringGeom = new THREE.RingGeometry(65, 125, 128);
const pos = ringGeom.attributes.position;
const v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);
    ringGeom.attributes.uv.setXY(i, (v3.length() - 65) / (125 - 65), 0);
}
const ringMat = new THREE.MeshBasicMaterial({ map: createRingTexture(), transparent: true, side: THREE.DoubleSide, opacity: 0.85 });
const rings = new THREE.Mesh(ringGeom, ringMat);
rings.rotation.x = Math.PI/2;
saturn.add(rings);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
sunLight.position.set(150, 100, 150);
scene.add(sunLight);
scene.add(new THREE.AmbientLight(0x442233, 0.5));

// Frases de amistad, aprecio y admiración
const words = [
    'Te quiero, mi Alee 💖', 'Eres una mujer virtuosa, Aleee 🌷', 'Eres extremadamente bella ✨', 'Bella por dentro y por fuera 🌸', 'Tienes un corazón precioso 💗',
    'Tu corazón es de oro 💛', 'Tu bondad ilumina 🌟', 'Eres una personita especial 🦋', 'Tu sonrisa alegra mi día 😊', 'Qué lindo es contar contigo 🫂',
    'Eres luz en cualquier lugar ☀️', 'Tienes una esencia única 🌼', 'Tu nobleza se nota siempre 🤍', 'Lo más lindo está en ti 💐', 'Tu alegría se contagia 😄',
    'Admirable en cada detalle 🌷', 'Siempre tan dulce y amable 🍯', 'Qué hermoso corazón tienes 💓', 'Tu forma de ser es un regalo 🎁', 'Eres belleza y bondad 🌺',
    'Tan brillante como las estrellas 🌟', 'Tu mirada transmite paz 🕊️', 'Eres un encanto de persona 🎀', 'El mundo es lindo contigo 🌈', 'Valiosa tal como eres 💎',
    'Tienes una magia especial ✨', 'Me encanta tu manera de ser 🌻', 'Bellísima y auténtica 🦋', 'Tu risa es pura alegría 😁', 'Una mujer de gran corazón 💖',
    'Mereces cosas bonitas 🌹', 'Tu ternura hace bien 🧸', 'Eres un rayito de sol 🌞', 'Tu presencia alegra todo 🎈', 'Noble, fuerte y hermosa 💪',
    'Siempre tienes luz propia 💫', 'Eres una persona increíble 🌍', 'Qué suerte haberte conocido 🍀', 'El bien que haces florece 🌻', 'Tu generosidad es hermosa 🎁',
    'Eres un sueño de persona 💭', 'Una belleza que inspira 🌺', 'Tienes un alma preciosa 🦋', 'Qué lindo es verte sonreír 😊', 'Eres fuerte y maravillosa 🌈',
    'Siempre haces el bien 🤝', 'Qué bonita tu forma de ser 🌷', 'Tu bondad deja huellas 👣', 'La más linda de todas 💐', 'Una persona llena de luz ✨',
    'Tu corazón abraza a todos 🫂', 'Eres un regalo de la vida 🎁', 'Me alegra tenerte cerca ☀️', 'Tu dulzura es especial 🍓', 'Tu belleza viene de adentro 🌸',
    'Eres amable y generosa 🌼', 'Haces todo más bonito 🌈', 'Nunca dejes de brillar 🌟', 'Tu esencia alegra el alma 💛', 'Una sonrisa que da paz 😊',
    'Qué admirable eres 💫', 'Eres como una flor 🌷', 'Corazón noble y sincero 🤍', 'Eres pura luz 💡', 'Hay tanta belleza en ti 🌺',
    'Eres especial a tu manera 🦋', 'Tu corazón merece lo mejor 🎀', 'La alegría te queda linda 😄', 'Eres maravillosa, Alee 🌻', 'Gracias por ser tan especial 💛',
    'Qué dulce es tu energía 🌸', 'Una mujer llena de virtudes 👑', 'Siempre tan genuina 🌼', 'El corazón más bonito 💓', 'Tu bondad inspira a todos 🕊️',
    'Eres única, nunca lo olvides 💎', 'Tu belleza no tiene comparación ✨', 'Qué lindo coincidir contigo 🍀', 'Tienes el don de alegrar 🌞', 'Qué precioso es tu interior 🌷',
    'Me encanta tu noble corazón 💖', 'Tu compañía es un regalo 🎁', 'Alee, eres muy especial 🌟', 'Aleee, eres bellísima 🌸', 'Gracias por ser tan linda 🤗',
    'Eres bonita hasta al hablar 😊', 'Tienes una luz serena 🕯️', 'Mujer virtuosa y admirable 🌹', 'Qué bello es tu corazón 💛', 'Siempre serás muy especial 🫶'
];

function makeTextSprite(message) {
    const c = document.createElement('canvas'); c.width = 512; c.height = 128;
    const ctx = c.getContext('2d');
    let fontSize = 46;
    ctx.font = `bold ${fontSize}px Arial`;
    while (ctx.measureText(message).width > c.width - 28 && fontSize > 26) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px Arial`;
    }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.shadowColor = '#ff69b4'; ctx.shadowBlur = 18;
    ctx.fillText(message, 256, 64);
    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    return new THREE.Sprite(mat);
}

const wordGroup = new THREE.Group();
scene.add(wordGroup);

words.forEach((w, i) => {
    const sprite = makeTextSprite(w);
    const isMobile = window.innerWidth < 600;
    const scale = isMobile ? 68 : 58; 
    sprite.scale.set(scale, scale/4, 1);
    
    const angle = (i / words.length) * Math.PI * 2;
    const radius = (isMobile ? 140 : 170) + Math.random() * 120;
    const height = (Math.random() - 0.5) * 180;
    
    sprite.userData = { angle, radius, height, speed: 0.0005 + Math.random()*0.0012 };
    wordGroup.add(sprite);
});

// Interacción
let rotY = 0, rotX = 0, targetDist = window.innerWidth < 600 ? 400 : 360, curDist = targetDist;
let isDragging = false, lastX, lastY;

const onPointerDown = (x, y) => { isDragging = true; lastX = x; lastY = y; };
const onPointerMove = (x, y) => {
    if(!isDragging) return;
    rotY += (x - lastX) * 0.005;
    rotX = Math.max(-Math.PI/3, Math.min(Math.PI/3, rotX + (y - lastY) * 0.005));
    lastX = x; lastY = y;
};

window.addEventListener('mousedown', e => onPointerDown(e.clientX, e.clientY));
window.addEventListener('mousemove', e => onPointerMove(e.clientX, e.clientY));
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('touchstart', e => onPointerDown(e.touches[0].clientX, e.touches[0].clientY));
window.addEventListener('touchmove', e => onPointerMove(e.touches[0].clientX, e.touches[0].clientY));
window.addEventListener('touchend', () => isDragging = false);
window.addEventListener('wheel', e => { targetDist = Math.max(180, Math.min(1000, targetDist + e.deltaY * 0.5)); }, { passive: true });

// Animación
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    
    saturn.rotation.y += 0.004;
    
    // EFECTO DE VIAJE: Mover estrellas hacia la cámara y rotarlas
    stars.rotation.y += 0.0008;
    stars.rotation.x += 0.0004;
    
    // Mover ligeramente el objeto estrellas para simular desplazamiento espacial
    stars.position.z = Math.sin(time * 0.1) * 50; 
    
    starMaterial.opacity = 0.85 + Math.sin(time * 2.5) * 0.15;
    
    wordGroup.children.forEach(sprite => {
        sprite.userData.angle += sprite.userData.speed;
        sprite.position.x = Math.cos(sprite.userData.angle) * sprite.userData.radius;
        sprite.position.z = Math.sin(sprite.userData.angle) * sprite.userData.radius;
        sprite.position.y = sprite.userData.height + Math.sin(time * 0.6 + sprite.userData.angle) * 20;
    });

    curDist += (targetDist - curDist) * 0.08;
    camera.position.x = curDist * Math.sin(rotY) * Math.cos(rotX);
    camera.position.z = curDist * Math.cos(rotY) * Math.cos(rotX);
    camera.position.y = curDist * Math.sin(rotX);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    targetDist = width < 600 ? 400 : 360;
});

animate();
