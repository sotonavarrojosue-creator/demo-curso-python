// Firebase Auth + Firestore — Curso Python
// Configuración: reemplazar con tu firebaseConfig

const FIREBASE_CONFIG = {
    // PEGAR AQUÍ TU firebaseConfig de la consola de Firebase
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

// Módulos del curso (deben coincidir con los archivos HTML)
const CURSO_MODULOS = [
    { id: "01", slug: "01-Hola-Mundo", titulo: "Hola Mundo" },
    { id: "02", slug: "02-Variables-y-Tipos", titulo: "Variables y Tipos" },
    { id: "03", slug: "03-Operadores", titulo: "Operadores" },
    { id: "04", slug: "04-Input-Output", titulo: "Input / Output" },
    { id: "05", slug: "05-Condicionales", titulo: "Condicionales" },
    { id: "06", slug: "06-Loops", titulo: "Loops" },
    { id: "07", slug: "07-Loop-Proyectos", titulo: "Proyectos con Loops" },
    { id: "08", slug: "08-Listas", titulo: "Listas" },
    { id: "09", slug: "09-Diccionarios", titulo: "Diccionarios" },
    { id: "10", slug: "10-Tuplas-y-Sets", titulo: "Tuplas y Sets" },
    { id: "11", slug: "11-Funciones", titulo: "Funciones" },
    { id: "12", slug: "12-Funciones-Avanzadas", titulo: "Funciones Avanzadas" },
    { id: "13", slug: "13-Archivos", titulo: "Archivos" },
    { id: "14", slug: "14-Errores", titulo: "Manejo de Errores" },
    { id: "15", slug: "15-Clases-y-Objetos", titulo: "Clases y Objetos" },
    { id: "16", slug: "16-POO-Avanzada", titulo: "POO Avanzada" },
    { id: "17", slug: "17-Proyecto-Calculadora", titulo: "Calculadora" },
    { id: "18", slug: "18-Proyecto-Gestor-Tareas", titulo: "Gestor de Tareas" },
    { id: "19", slug: "19-Proyecto-Web-Scraper", titulo: "Web Scraper" }
];

// ========== AUTH ==========
class AuthManager {
    constructor() {
        this.user = null;
        this.listeners = [];
        this._init();
    }

    async _init() {
        // Esperar a que Firebase cargue
        await this._waitForFirebase();
        
        // Observar cambios de auth
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
            this.listeners.forEach(fn => fn(user));
        });
    }

    _waitForFirebase() {
        return new Promise((resolve) => {
            if (typeof firebase !== 'undefined' && firebase.auth) {
                resolve();
            } else {
                setTimeout(() => this._waitForFirebase().then(resolve), 100);
            }
        });
    }

    onAuthChange(callback) {
        this.listeners.push(callback);
        if (this.user) callback(this.user);
    }

    async register(email, password, displayName) {
        const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await cred.user.updateProfile({ displayName });
        
        // Crear documento de usuario en Firestore
        await firebase.firestore().collection('users').doc(cred.user.uid).set({
            displayName,
            email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            modulosCompletados: [],
            ultimoModulo: null
        });
        
        return cred.user;
    }

    async login(email, password) {
        const cred = await firebase.auth().signInWithEmailAndPassword(email, password);
        return cred.user;
    }

    async logout() {
        await firebase.auth().signOut();
    }

    getDisplayName() {
        return this.user?.displayName || this.user?.email?.split('@')[0] || 'Estudiante';
    }

    getUid() {
        return this.user?.uid;
    }

    isLoggedIn() {
        return !!this.user;
    }
}

// ========== PROGRESS ==========
class ProgressManager {
    constructor(auth) {
        this.auth = auth;
        this.db = firebase.firestore();
    }

    async markModuleComplete(moduleId) {
        if (!this.auth.isLoggedIn()) return;
        
        const uid = this.auth.getUid();
        const userRef = this.db.collection('users').doc(uid);
        
        await userRef.update({
            modulosCompletados: firebase.firestore.FieldValue.arrayUnion(moduleId),
            ultimoModulo: moduleId,
            lastActivity: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    async getCompletedModules() {
        if (!this.auth.isLoggedIn()) return [];
        
        const uid = this.auth.getUid();
        const doc = await this.db.collection('users').doc(uid).get();
        
        if (doc.exists) {
            return doc.data().modulosCompletados || [];
        }
        return [];
    }

    async isModuleComplete(moduleId) {
        const completed = await this.getCompletedModules();
        return completed.includes(moduleId);
    }

    async getProgress() {
        const completed = await this.getCompletedModules();
        return {
            completed: completed.length,
            total: CURSO_MODULOS.length,
            percentage: Math.round((completed.length / CURSO_MODULOS.length) * 100),
            isComplete: completed.length >= CURSO_MODULOS.length
        };
    }

    async getLastModule() {
        if (!this.auth.isLoggedIn()) return null;
        
        const uid = this.auth.getUid();
        const doc = await this.db.collection('users').doc(uid).get();
        
        if (doc.exists) {
            return doc.data().ultimoModulo;
        }
        return null;
    }
}

// ========== CERTIFICATE ==========
class CertificateGenerator {
    constructor(auth, progress) {
        this.auth = auth;
        this.progress = progress;
    }

    async generate() {
        if (!this.auth.isLoggedIn()) {
            alert('Debés iniciar sesión para generar tu certificado');
            return;
        }

        const prog = await this.progress.getProgress();
        if (!prog.isComplete) {
            alert(`Faltan ${prog.total - prog.completed} módulos para completar el curso`);
            return;
        }

        const nombre = this.auth.getDisplayName();
        const fecha = new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', month: 'long', day: 'numeric' 
        });

        // Crear canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 850;
        const ctx = canvas.getContext('2d');

        // Fondo
        const grad = ctx.createLinearGradient(0, 0, 1200, 850);
        grad.addColorStop(0, '#0a0a0f');
        grad.addColorStop(0.5, '#12121a');
        grad.addColorStop(1, '#0a0a0f');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1200, 850);

        // Borde decorativo
        ctx.strokeStyle = '#00d4aa';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, 1140, 790);
        ctx.strokeRect(40, 40, 1120, 770);

        // Esquinas decorativas
        const cornerSize = 60;
        ctx.strokeStyle = '#00d4aa';
        ctx.lineWidth = 2;
        
        // Top-left
        ctx.beginPath();
        ctx.moveTo(50, 50 + cornerSize);
        ctx.lineTo(50, 50);
        ctx.lineTo(50 + cornerSize, 50);
        ctx.stroke();
        
        // Top-right
        ctx.beginPath();
        ctx.moveTo(1150 - cornerSize, 50);
        ctx.lineTo(1150, 50);
        ctx.lineTo(1150, 50 + cornerSize);
        ctx.stroke();
        
        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(50, 800 - cornerSize);
        ctx.lineTo(50, 800);
        ctx.lineTo(50 + cornerSize, 800);
        ctx.stroke();
        
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(1150 - cornerSize, 800);
        ctx.lineTo(1150, 800);
        ctx.lineTo(1150, 800 - cornerSize);
        ctx.stroke();

        // Línea decorativa superior
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(100, 180);
        ctx.lineTo(1100, 180);
        ctx.stroke();

        // Título
        ctx.fillStyle = '#00d4aa';
        ctx.font = 'bold 18px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICADO DE COMPLETACIÓN', 600, 130);

        // Subtítulo
        ctx.fillStyle = '#7a7a8e';
        ctx.font = '14px "Inter", sans-serif';
        ctx.fillText('Curso de Python — De Cero a Programador', 600, 160);

        // "Se certifica que"
        ctx.fillStyle = '#7a7a8e';
        ctx.font = '16px "Inter", sans-serif';
        ctx.fillText('Se certifica que', 600, 250);

        // Nombre del estudiante
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px "Inter", sans-serif';
        ctx.fillText(nombre, 600, 320);

        // Línea bajo el nombre
        ctx.strokeStyle = '#00d4aa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(300, 345);
        ctx.lineTo(900, 345);
        ctx.stroke();

        // Descripción
        ctx.fillStyle = '#b0b0c0';
        ctx.font = '16px "Inter", sans-serif';
        ctx.fillText('ha completado satisfactoriamente el curso completo de Python,', 600, 400);
        ctx.fillText('demostrando competencia en 19 módulos y 3 proyectos prácticos.', 600, 430);

        // Módulos completados
        ctx.fillStyle = '#00d4aa';
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        ctx.fillText('19/19 MÓDULOS · 100+ EJERCICIOS · 3 PROYECTOS', 600, 480);

        // Fecha
        ctx.fillStyle = '#7a7a8e';
        ctx.font = '14px "Inter", sans-serif';
        ctx.fillText(`Fecha de emisión: ${fecha}`, 600, 540);

        // Línea decorativa inferior
        ctx.strokeStyle = 'rgba(0, 212, 170, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(100, 600);
        ctx.lineTo(1100, 600);
        ctx.stroke();

        // Firmas
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px "Inter", sans-serif';
        ctx.fillText('APARECÉ', 300, 660);
        ctx.fillText('Plataforma de Aprendizaje', 300, 680);

        ctx.fillStyle = '#7a7a8e';
        ctx.font = '12px "Inter", sans-serif';
        ctx.fillText('_______________________', 300, 640);
        ctx.fillText('_______________________', 900, 640);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px "Inter", sans-serif';
        ctx.fillText(nombre, 900, 660);
        ctx.fillText('Estudiante Certificado', 900, 680);

        // Footer
        ctx.fillStyle = '#4a4a5a';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText('Verificado en: curso-python.aparece.dev · ' + this.auth.getUid().substring(0, 8), 600, 770);

        // Descargar
        const link = document.createElement('a');
        link.download = `certificado-python-${nombre.replace(/\s/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
    }
}

// ========== UI ==========
class UIManager {
    constructor(auth, progress, certificate) {
        this.auth = auth;
        this.progress = progress;
        this.certificate = certificate;
        this.createUI();
        this.setupListeners();
    }

    createUI() {
        // Barra de usuario en el nav
        const nav = document.querySelector('nav');
        if (!nav) return;

        const userSection = document.createElement('div');
        userSection.id = 'user-section';
        userSection.innerHTML = `
            <div id="user-guest">
                <button class="nav-btn" onclick="ui.showLogin()">Iniciar Sesión</button>
                <button class="nav-btn nav-btn-accent" onclick="ui.showRegister()">Registrarse</button>
            </div>
            <div id="user-logged" style="display:none">
                <span id="user-name" style="color:var(--muted);font-size:0.85rem;margin-right:1rem"></span>
                <button class="nav-btn" onclick="ui.showProgress()">Mi Progreso</button>
                <button class="nav-btn" onclick="ui.logout()">Salir</button>
            </div>
        `;
        nav.appendChild(userSection);

        // Modal de Login/Register
        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="ui.closeModal()">&times;</button>
                <div id="modal-login">
                    <h2>Iniciar Sesión</h2>
                    <form onsubmit="ui.handleLogin(event)">
                        <input type="email" id="login-email" placeholder="Email" required>
                        <input type="password" id="login-pass" placeholder="Contraseña" required>
                        <button type="submit" class="btn-primary">Entrar</button>
                    </form>
                    <p class="modal-switch">¿No tenés cuenta? <a onclick="ui.showRegister()">Registrate</a></p>
                </div>
                <div id="modal-register" style="display:none">
                    <h2>Crear Cuenta</h2>
                    <form onsubmit="ui.handleRegister(event)">
                        <input type="text" id="reg-name" placeholder="Tu nombre" required>
                        <input type="email" id="reg-email" placeholder="Email" required>
                        <input type="password" id="reg-pass" placeholder="Contraseña (mín. 6 caracteres)" required minlength="6">
                        <button type="submit" class="btn-primary">Crear Cuenta</button>
                    </form>
                    <p class="modal-switch">¿Ya tenés cuenta? <a onclick="ui.showLogin()">Iniciar sesión</a></p>
                </div>
                <div id="modal-progress" style="display:none">
                    <h2>Mi Progreso</h2>
                    <div id="progress-content"></div>
                </div>
                <div id="modal-error" class="error-msg" style="display:none"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Estilos del modal
        const style = document.createElement('style');
        style.textContent = `
            .modal { display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000; justify-content:center; align-items:center; }
            .modal.show { display:flex; }
            .modal-content { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:2rem; width:90%; max-width:400px; position:relative; }
            .modal-close { position:absolute; top:1rem; right:1rem; background:none; border:none; color:var(--muted); font-size:1.5rem; cursor:pointer; }
            .modal-content h2 { margin-bottom:1.5rem; font-size:1.3rem; }
            .modal-content input { width:100%; padding:0.8rem 1rem; margin-bottom:1rem; background:var(--bg); border:1px solid var(--border); border-radius:6px; color:var(--text); font-size:0.9rem; outline:none; }
            .modal-content input:focus { border-color:var(--accent); }
            .btn-primary { width:100%; padding:0.8rem; background:var(--accent); color:var(--bg); border:none; border-radius:6px; font-weight:700; font-size:0.95rem; cursor:pointer; }
            .btn-primary:hover { background:#00b894; }
            .modal-switch { text-align:center; margin-top:1rem; color:var(--muted); font-size:0.85rem; }
            .modal-switch a { color:var(--accent); cursor:pointer; text-decoration:underline; }
            .error-msg { color:#ff6b6b; font-size:0.85rem; margin-top:0.5rem; text-align:center; }
            .nav-btn { background:transparent; border:1px solid var(--border); color:var(--text); padding:0.4rem 0.8rem; border-radius:4px; font-size:0.8rem; cursor:pointer; font-family:inherit; }
            .nav-btn:hover { border-color:var(--accent); color:var(--accent); }
            .nav-btn-accent { background:var(--accent); color:var(--bg); border-color:var(--accent); font-weight:600; }
            .nav-btn-accent:hover { background:#00b894; }
            .progress-bar { width:100%; height:8px; background:var(--border); border-radius:4px; margin:1rem 0; overflow:hidden; }
            .progress-fill { height:100%; background:var(--accent); border-radius:4px; transition:width 0.3s; }
            .module-check { display:flex; align-items:center; gap:0.5rem; padding:0.3rem 0; font-size:0.85rem; }
            .module-check.done { color:var(--accent); }
            .module-check.pending { color:var(--muted); }
            .btn-certificate { width:100%; padding:0.8rem; background:var(--yellow); color:var(--bg); border:none; border-radius:6px; font-weight:700; cursor:pointer; margin-top:1rem; }
            .btn-certificate:disabled { opacity:0.5; cursor:not-allowed; }
        `;
        document.head.appendChild(style);
    }

    setupListeners() {
        this.auth.onAuthChange(user => {
            document.getElementById('user-guest').style.display = user ? 'none' : 'flex';
            document.getElementById('user-logged').style.display = user ? 'flex' : 'none';
            if (user) {
                document.getElementById('user-name').textContent = this.auth.getDisplayName();
            }
        });
    }

    showLogin() {
        this.closeModal();
        document.getElementById('modal-login').style.display = 'block';
        document.getElementById('modal-register').style.display = 'none';
        document.getElementById('modal-progress').style.display = 'none';
        document.getElementById('auth-modal').classList.add('show');
    }

    showRegister() {
        this.closeModal();
        document.getElementById('modal-login').style.display = 'none';
        document.getElementById('modal-register').style.display = 'block';
        document.getElementById('modal-progress').style.display = 'none';
        document.getElementById('auth-modal').classList.add('show');
    }

    async showProgress() {
        this.closeModal();
        document.getElementById('modal-login').style.display = 'none';
        document.getElementById('modal-register').style.display = 'none';
        document.getElementById('modal-progress').style.display = 'block';
        document.getElementById('auth-modal').classList.add('show');

        const prog = await this.progress.getProgress();
        const completed = await this.progress.getCompletedModules();

        let html = `
            <div class="progress-bar">
                <div class="progress-fill" style="width:${prog.percentage}%"></div>
            </div>
            <p style="text-align:center;margin-bottom:1rem">${prog.completed}/${prog.total} módulos (${prog.percentage}%)</p>
        `;

        CURSO_MODULOS.forEach(m => {
            const done = completed.includes(m.id);
            html += `<div class="module-check ${done ? 'done' : 'pending'}">
                ${done ? '✅' : '⬜'} ${m.id}. ${m.titulo}
            </div>`;
        });

        if (prog.isComplete) {
            html += `<button class="btn-certificate" onclick="ui.downloadCertificate()">📜 Descargar Certificado</button>`;
        } else {
            html += `<p style="text-align:center;color:var(--muted);margin-top:1rem;font-size:0.85rem">
                Completá todos los módulos para desbloquear tu certificado
            </p>`;
        }

        document.getElementById('progress-content').innerHTML = html;
    }

    closeModal() {
        document.getElementById('auth-modal').classList.remove('show');
        document.getElementById('modal-error').style.display = 'none';
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        try {
            await this.auth.login(email, pass);
            this.closeModal();
        } catch(err) {
            this.showError(this.translateError(err.code));
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;
        try {
            await this.auth.register(email, pass, name);
            this.closeModal();
        } catch(err) {
            this.showError(this.translateError(err.code));
        }
    }

    async logout() {
        await this.auth.logout();
    }

    async downloadCertificate() {
        await this.certificate.generate();
    }

    showError(msg) {
        const el = document.getElementById('modal-error');
        el.textContent = msg;
        el.style.display = 'block';
    }

    translateError(code) {
        const errors = {
            'auth/email-already-in-use': 'Este email ya está registrado',
            'auth/invalid-email': 'Email no válido',
            'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
            'auth/user-not-found': 'No existe cuenta con este email',
            'auth/wrong-password': 'Contraseña incorrecta',
            'auth/too-many-requests': 'Demasiados intentos. Esperá un momento',
        };
        return errors[code] || 'Error: ' + code;
    }
}

// ========== INIT ==========
let auth, progress, certificate, ui;

document.addEventListener('DOMContentLoaded', () => {
    auth = new AuthManager();
    progress = new ProgressManager(auth);
    certificate = new CertificateGenerator(auth, progress);
    ui = new UIManager(auth, progress, certificate);

    // Marcar módulo actual como visto (auto-track)
    const currentSlug = window.location.pathname.split('/').pop().replace('.html', '');
    const currentModule = CURSO_MODULOS.find(m => m.slug === currentSlug);
    if (currentModule) {
        // Cuando el usuario completa un módulo (llamar desde botón)
        window.completeModule = async () => {
            if (!auth.isLoggedIn()) {
                ui.showRegister();
                return;
            }
            await progress.markModuleComplete(currentModule.id);
            alert('✅ Módulo completado');
        };
    }
});
