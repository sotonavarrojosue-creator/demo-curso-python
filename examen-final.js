// =============================================================================
// Examen Final — Curso de Python
// Sistema de evaluación con 50 preguntas de opción múltiple
// =============================================================================

(function () {
    "use strict";

    // --------------------------------------------------------------------------
    // Banco de 50 preguntas — preguntas reales de Python
    // --------------------------------------------------------------------------
    const ALL_QUESTIONS = [
        // ---- Módulo 01: Hola Mundo (3) ----
        {
            q: "¿Cuál es el output de print('Hola Mundo')?",
            options: ["Hola Mundo", "'Hola Mundo'", "Hola'Mundo", "Error de sintaxis"],
            correct: 0,
            module: "01"
        },
        {
            q: "¿Cómo se escribe un comentario de una línea en Python?",
            options: ["// comentario", "/* comentario */", "# comentario", "-- comentario"],
            correct: 2,
            module: "01"
        },
        {
            q: "¿Qué longitud tiene el string 'Python' usando len()?",
            options: ["5", "6", "7", "4"],
            correct: 1,
            module: "01"
        },

        // ---- Módulo 02: Variables (4) ----
        {
            q: "¿Cuál es el output de print(type(3.14))?",
            options: ["<class 'int'>", "<class 'float'>", "<class 'decimal'>", "<class 'number'>"],
            correct: 1,
            module: "02"
        },
        {
            q: "¿Cuál de estas es una variable válida en Python?",
            options: ["2nombre", "mi-variable", "_privada", "clase"],
            correct: 2,
            module: "02"
        },
        {
            q: "¿Cuál es el tipo de dato de True en Python?",
            options: ["str", "int", "bool", "float"],
            correct: 2,
            module: "02"
        },
        {
            q: "¿Qué resultado da type(None)?",
            options: ["<class 'NoneType'>", "<class 'null'>", "<class 'void'>", "<class 'undefined'>"],
            correct: 0,
            module: "02"
        },

        // ---- Módulo 03: Operadores (3) ----
        {
            q: "¿Cuál es el resultado de 17 // 3?",
            options: ["5.66", "5", "6", "5.0"],
            correct: 1,
            module: "03"
        },
        {
            q: "¿Qué retorna 2 ** 3 ** 2?",
            options: ["64", "512", "36", "8"],
            correct: 1,
            module: "03"
        },
        {
            q: "¿Cuál es el resultado de bool('') and True?",
            options: ["True", "False", "0", "None"],
            correct: 1,
            module: "03"
        },

        // ---- Módulo 04: Input/Output (2) ----
        {
            q: "¿Qué función se usa para leer entrada del usuario?",
            options: ["get()", "read()", "input()", "scan()"],
            correct: 2,
            module: "04"
        },
        {
            q: "¿Cuál es el output de print(f'{3 + 4 = }') en Python 3.8+?",
            options: ["3 + 4 = 7", "7", "f'{3 + 4 = }'", "Error de sintaxis"],
            correct: 0,
            module: "04"
        },

        // ---- Módulo 05: Condicionales (4) ----
        {
            q: "¿Qué palabra clave se usa para una condición intermedia en Python?",
            options: ["else if", "elif", "elseif", "case"],
            correct: 1,
            module: "05"
        },
        {
            q: "¿Cuál es el output de: x = 5; print('par' if x % 2 == 0 else 'impar')?",
            options: ["par", "impar", "5", "Error"],
            correct: 1,
            module: "05"
        },
        {
            q: "¿Qué evalúa: not (True or False) and False?",
            options: ["True", "False", "None", "Error"],
            correct: 1,
            module: "05"
        },

        // ---- Módulo 06: Loops (4) ----
        {
            q: "¿Qué produce list(range(1, 10, 2))?",
            options: ["[1, 2, 3, 4, 5, 6, 7, 8, 9]", "[1, 3, 5, 7, 9]", "[2, 4, 6, 8]", "[1, 3, 5, 7]"],
            correct: 1,
            module: "06"
        },
        {
            q: "¿Qué hace la sentencia 'continue' dentro de un loop?",
            options: ["Termina el loop", "Salta a la siguiente iteración", "Repite la iteración actual", "Sale del programa"],
            correct: 1,
            module: "06"
        },
        {
            q: "¿Cuál es el output de: for i in range(3): print(i, end=' ')?",
            options: ["0 1 2", "1 2 3", "0 1 2 3", "1 2"],
            correct: 0,
            module: "06"
        },
        {
            q: "¿Qué resultado da el siguiente código?\nfor i in range(5):\n    if i == 3: break\nprint(i)",
            options: ["3", "2", "4", "5"],
            correct: 0,
            module: "06"
        },

        // ---- Módulo 07: Proyectos con Loops (2) ----
        {
            q: "¿Cuál es el output de:\nfor i in range(4):\n    for j in range(i):\n        print('*', end='')\nprint()",
            options: ["*", "**", "***", "****"],
            correct: 1,
            module: "07"
        },
        {
            q: "¿Cuántas veces se ejecuta el cuerpo del while?\ncount = 0\nwhile count < 3:\n    count += 1",
            options: ["2", "3", "4", "Infinito"],
            correct: 1,
            module: "07"
        },

        // ---- Módulo 08: Listas (4) ----
        {
            q: "¿Cuál es el output de [1, 2, 3, 4][1:3]?",
            options: ["[1, 2, 3]", "[2, 3]", "[2, 3, 4]", "[1, 2]"],
            correct: 1,
            module: "08"
        },
        {
            q: "¿Qué método agrega un elemento al final de una lista?",
            options: ["add()", "insert()", "append()", "push()"],
            correct: 2,
            module: "08"
        },
        {
            q: "¿Cuál es el output de [3, 1, 4, 1, 5].count(1)?",
            options: ["1", "2", "3", "4"],
            correct: 1,
            module: "08"
        },
        {
            q: "¿Qué retorna [x**2 for x in range(5)]?",
            options: ["[1, 4, 9, 16]", "[0, 1, 4, 9, 16]", "[0, 2, 4, 6, 8]", "[0, 1, 2, 3, 4]"],
            correct: 1,
            module: "08"
        },

        // ---- Módulo 09: Diccionarios (3) ----
        {
            q: "¿Cómo se accede al valor de la clave 'edad' en un diccionario d?",
            options: ["d.edad", "d('edad')", "d['edad']", "d[edad]"],
            correct: 2,
            module: "09"
        },
        {
            q: "¿Qué método retorna todas las claves de un diccionario?",
            options: ["keys()", "values()", "items()", "claves()"],
            correct: 0,
            module: "09"
        },
        {
            q: "¿Cuál es el output de: d = {'a': 1, 'b': 2}; print(len(d))?",
            options: ["1", "2", "3", "4"],
            correct: 1,
            module: "09"
        },

        // ---- Módulo 10: Tuplas y Sets (2) ----
        {
            q: "¿Por qué se dice que las tuplas son inmutables?",
            options: ["No pueden contener elementos duplicados", "No pueden cambiar su tamaño ni contenido después de crearlas", "No pueden contener tipos mixtos", "Solo pueden tener 2 elementos"],
            correct: 1,
            module: "10"
        },
        {
            q: "¿Qué resultado da len({1, 2, 2, 3, 3, 3})?",
            options: ["6", "5", "3", "Error"],
            correct: 2,
            module: "10"
        },

        // ---- Módulo 11: Funciones (4) ----
        {
            q: "¿Qué palabra clave se usa para definir una función en Python?",
            options: ["function", "func", "def", "fn"],
            correct: 2,
            module: "11"
        },
        {
            q: "¿Cuál es el output de:\ndef f(x, y=5):\n    return x + y\nprint(f(3))",
            options: ["8", "3", "5", "Error"],
            correct: 0,
            module: "11"
        },
        {
            q: "¿Qué concepto describe que una variable local sobrescribe una global dentro de una función?",
            options: ["Namespace", "Scope", "Closure", "Decorator"],
            correct: 1,
            module: "11"
        },

        // ---- Módulo 12: Funciones Avanzadas (3) ----
        {
            q: "¿Cuál es el output de list(map(lambda x: x * 2, [1, 2, 3]))?",
            options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "[2, 3, 4]"],
            correct: 1,
            module: "12"
        },
        {
            q: "¿Qué retorna list(filter(lambda x: x > 3, [1, 5, 2, 8, 3]))?",
            options: ["[1, 2, 3]", "[5, 8]", "[1, 5, 2, 8]", "[5, 2, 8]"],
            correct: 1,
            module: "12"
        },
        {
            q: "¿Cuál es la diferencia entre map() y una list comprehension?",
            options: [
                "map() es más rápido siempre",
                "La comprehension es más legible y funciona con cualquier iterable",
                "Son exactamente iguales",
                "map() no acepta funciones lambda"
            ],
            correct: 1,
            module: "12"
        },

        // ---- Módulo 13: Archivos (3) ----
        {
            q: "¿Qué hace la sentencia 'with open() as f:'?",
            options: ["Abre el archivo en modo lectura únicamente", "Cierra automáticamente el archivo al salir del bloque", "Crea un backup del archivo", "Bloquea el archivo para otros procesos"],
            correct: 1,
            module: "13"
        },
        {
            q: "¿Qué modo de apertura sobrescribe el contenido del archivo?",
            options: ["'r'", "'a'", "'w'", "'x'"],
            correct: 2,
            module: "13"
        },
        {
            q: "¿Qué retorna f.readlines() en Python?",
            options: ["Un string con todo el contenido", "Una lista de líneas", "Un generador de caracteres", "Un diccionario con líneas"],
            correct: 1,
            module: "13"
        },

        // ---- Módulo 14: Manejo de Errores (3) ----
        {
            q: "¿Qué bloque se ejecuta siempre, haya error o no?",
            options: ["try", "except", "finally", "else"],
            correct: 2,
            module: "14"
        },
        {
            q: "¿Qué sentencia lanza un error intencionalmente?",
            options: ["throw", "raise", "error", "panic"],
            correct: 1,
            module: "14"
        },
        {
            q: "¿Cuál es el output de:\ntry:\n    print(1/0)\nexcept ZeroDivisionError as e:\n    print(f'Error: {e}')\nfinally:\n    print('Fin')",
            options: ["Error: division by zero", "Fin", "Error: division by zero\\nFin", "Inf"],
            correct: 2,
            module: "14"
        },

        // ---- Módulo 15: Clases (3) ----
        {
            q: "¿Qué método se llama al crear una instancia de una clase?",
            options: ["__str__", "__new__", "__init__", "__create__"],
            correct: 2,
            module: "15"
        },
        {
            q: "¿Qué palabra clave se usa como primer parámetro de todos los métodos de instancia?",
            options: ["this", "self", "cls", "me"],
            correct: 1,
            module: "15"
        },
        {
            q: "¿Qué hace el siguiente código?\nclass Perro:\n    especie = 'Canino'",
            options: [
                "Crea un método de instancia",
                "Define un atributo de clase",
                "Inicializa un objeto",
                "Declara una función"
            ],
            correct: 1,
            module: "15"
        },

        // ---- Módulo 16: POO Avanzada (3) ----
        {
            q: "¿Qué método permite que una subclase llame al constructor de la clase padre?",
            options: ["parent()", "base()", "super().__init__()", "self.__parent__()"],
            correct: 2,
            module: "16"
        },
        {
            q: "¿Qué es el polimorfismo en POO?",
            options: [
                "Usar la misma interfaz para objetos de diferentes tipos",
                "Crear múltiples instancias de una clase",
                "Definir múltiples constructores",
                "Heredar de varias clases a la vez"
            ],
            correct: 0,
            module: "16"
        },
        {
            q: "¿Cuál es el output de:\nclass A:\n    def greet(self): return 'Hola'\nclass B(A):\n    def greet(self): return 'Hi'\nprint(B().greet())",
            options: ["Hola", "Hi", "Hola Hi", "Error"],
            correct: 1,
            module: "16"
        },

        // ---- Módulo 17-19: Proyectos Aplicados (2) ----
        {
            q: "¿Qué patrón de diseño se usa al separar lógica de negocio de presentación?",
            options: ["Singleton", "MVC", "Factory", "Observer"],
            correct: 1,
            module: "17"
        },
        {
            q: "¿Cuál es la mejor práctica para gestionar dependencias en un proyecto Python?",
            options: [
                "Hardcodear rutas en el código",
                "Usar virtual environments y requirements.txt",
                "Copiar librerías directamente al proyecto",
                "Instalar todo en el sistema global"
            ],
            correct: 1,
            module: "19"
        }
    ];

    // --------------------------------------------------------------------------
    // Clase ExamenFinal
    // --------------------------------------------------------------------------
    class ExamenFinal {
        constructor() {
            this.questions = ALL_QUESTIONS;
            this.currentQuestion = 0;
            this.answers = {};
            this.timer = null;
            this.timeLeft = 0;
            this.isPremium = false;
            this.finished = false;
        }

        // --------------------------------------------------------------------------
        // Determinar tier del usuario
        // --------------------------------------------------------------------------
        _resolveTier() {
            if (typeof window !== "undefined" && typeof window.__userTier === "string") {
                this.isPremium = window.__userTier === "premium";
            } else {
                this.isPremium = false;
            }
        }

        // --------------------------------------------------------------------------
        // Obtener preguntas activas según tier
        // --------------------------------------------------------------------------
        _getActiveQuestions() {
            this._resolveTier();
            if (this.isPremium) {
                return this.questions;
            }
            return this.questions.slice(0, 25);
        }

        // --------------------------------------------------------------------------
        // Tiempo según tier
        // --------------------------------------------------------------------------
        _getTimerSeconds() {
            return this.isPremium ? 70 * 60 : 35 * 60;
        }

        // --------------------------------------------------------------------------
        // Formato MM:SS
        // --------------------------------------------------------------------------
        _formatTime(seconds) {
            var m = Math.floor(seconds / 60);
            var s = seconds % 60;
            return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        }

        // --------------------------------------------------------------------------
        // Render principal
        // --------------------------------------------------------------------------
        render(containerId) {
            var container = document.getElementById(containerId);
            if (!container) {
                console.error("Contenedor no encontrado:", containerId);
                return;
            }

            // Cargar fuentes
            if (!document.getElementById("examen-fonts")) {
                var link = document.createElement("link");
                link.id = "examen-fonts";
                link.rel = "stylesheet";
                link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
                document.head.appendChild(link);
            }

            // Cargar estilos
            if (!document.getElementById("examen-styles")) {
                var style = document.createElement("style");
                style.id = "examen-styles";
                style.textContent = this._getCSS();
                document.head.appendChild(style);
            }

            container.innerHTML = "";

            var active = this._getActiveQuestions();
            var total = active.length;

            if (this.finished) {
                this._renderResults(container, total);
                return;
            }

            var q = active[this.currentQuestion];
            var idx = this.currentQuestion;
            var letters = ["A", "B", "C", "D"];

            var html = '<div class="exam-container">';

            // Header
            html += '<div class="exam-header">';
            html += '<div class="exam-timer-large" id="exam-timer">' + this._formatTime(this.timeLeft) + '</div>';
            html += '<div class="exam-meta">Pregunta ' + (idx + 1) + ' de ' + total + ' &middot; Tiempo restante</div>';
            html += '</div>';

            // Barra de progreso
            var progress = ((idx + 1) / total) * 100;
            html += '<div class="exam-progress-bar"><div class="exam-progress-fill" style="width:' + progress + '%"></div></div>';

            // Indicador del módulo
            html += '<div class="exam-module-badge">Módulo ' + q.module + '</div>';

            // Pregunta
            html += '<div class="quiz-question">';
            html += '<div class="quiz-question-text">' + q.q.replace(/\n/g, '<br>') + '</div>';
            html += '<div class="quiz-options">';

            for (var i = 0; i < q.options.length; i++) {
                var selected = this.answers[idx] === i ? " selected" : "";
                html += '<div class="quiz-option' + selected + '" data-index="' + i + '">';
                html += '<span class="quiz-option-letter">' + letters[i] + '</span>';
                html += '<span>' + q.options[i] + '</span>';
                html += '</div>';
            }

            html += '</div>';
            html += '</div>';

            // Navegación
            html += '<div class="quiz-nav">';
            html += '<button class="exercise-btn" id="exam-prev"' + (idx === 0 ? ' disabled' : '') + '>&#8592; Anterior</button>';
            html += '<button class="exercise-btn exercise-btn-verify" id="exam-submit">Entregar Examen</button>';

            if (idx < total - 1) {
                html += '<button class="exercise-btn exercise-btn-verify" id="exam-next">&#8594; Siguiente</button>';
            }

            html += '</div>';

            // Mini mapa de respuestas
            html += '<div class="exam-map">';
            for (var j = 0; j < total; j++) {
                var answered = this.answers[j] !== undefined;
                var current = j === idx;
                var cls = "exam-map-dot";
                if (current) cls += " current";
                if (answered) cls += " answered";
                html += '<div class="' + cls + '" data-q="' + j + '">' + (j + 1) + '</div>';
            }
            html += '</div>';

            html += '</div>';

            container.innerHTML = html;

            this._bindEvents(container);
            this._startTimer();
        }

        // --------------------------------------------------------------------------
        // Eventos
        // --------------------------------------------------------------------------
        _bindEvents(container) {
            var self = this;
            var active = this._getActiveQuestions();

            // Click en opciones
            var options = container.querySelectorAll(".quiz-option");
            for (var i = 0; i < options.length; i++) {
                (function (opt) {
                    opt.addEventListener("click", function () {
                        var idx = parseInt(opt.getAttribute("data-index"), 10);
                        self.answers[self.currentQuestion] = idx;

                        var allOpts = container.querySelectorAll(".quiz-option");
                        for (var j = 0; j < allOpts.length; j++) {
                            allOpts[j].classList.remove("selected");
                        }
                        opt.classList.add("selected");

                        // Actualizar mapa
                        var mapDots = container.querySelectorAll(".exam-map-dot");
                        mapDots[self.currentQuestion].classList.add("answered");
                    });
                })(options[i]);
            }

            // Botón Anterior
            var prevBtn = document.getElementById("exam-prev");
            if (prevBtn) {
                prevBtn.addEventListener("click", function () {
                    if (self.currentQuestion > 0) {
                        self.currentQuestion--;
                        self.render(container.id);
                    }
                });
            }

            // Botón Siguiente
            var nextBtn = document.getElementById("exam-next");
            if (nextBtn) {
                nextBtn.addEventListener("click", function () {
                    if (self.currentQuestion < active.length - 1) {
                        self.currentQuestion++;
                        self.render(container.id);
                    }
                });
            }

            // Botón Entregar
            var submitBtn = document.getElementById("exam-submit");
            if (submitBtn) {
                submitBtn.addEventListener("click", function () {
                    self.submit();
                });
            }

            // Mini mapa
            var mapDots = container.querySelectorAll(".exam-map-dot");
            for (var k = 0; k < mapDots.length; k++) {
                (function (dot) {
                    dot.addEventListener("click", function () {
                        var qNum = parseInt(dot.getAttribute("data-q"), 10);
                        self.currentQuestion = qNum;
                        self.render(container.id);
                    });
                })(mapDots[k]);
            }
        }

        // --------------------------------------------------------------------------
        // Timer
        // --------------------------------------------------------------------------
        _startTimer() {
            var self = this;

            if (this.timer) {
                clearInterval(this.timer);
            }

            if (this.timeLeft <= 0) {
                this.timeLeft = this._getTimerSeconds();
            }

            this.timer = setInterval(function () {
                self.timeLeft--;

                var timerEl = document.getElementById("exam-timer");
                if (timerEl) {
                    timerEl.textContent = self._formatTime(self.timeLeft);

                    timerEl.classList.remove("warning", "danger");
                    if (self.timeLeft < 60) {
                        timerEl.classList.add("danger");
                    } else if (self.timeLeft < 300) {
                        timerEl.classList.add("warning");
                    }
                }

                if (self.timeLeft <= 0) {
                    clearInterval(self.timer);
                    self.submit();
                }
            }, 1000);
        }

        // --------------------------------------------------------------------------
        // Entregar examen
        // --------------------------------------------------------------------------
        submit() {
            if (this.finished) return;

            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }

            this.finished = true;

            var active = this._getActiveQuestions();
            var total = active.length;
            var correct = 0;

            for (var i = 0; i < total; i++) {
                if (this.answers[i] !== undefined && this.answers[i] === active[i].correct) {
                    correct++;
                }
            }

            var score = Math.round((correct / total) * 100);
            var passed = score >= 60;

            // Guardar resultado global
            if (typeof window !== "undefined") {
                window.__examenResult = {
                    score: score,
                    total: total,
                    correct: correct,
                    passed: passed,
                    timestamp: new Date().toISOString()
                };
            }

            // Re-render con resultados
            var container = document.getElementById("examen-final-container");
            if (container) {
                this._renderResults(container, total, correct, score, passed);
            }
        }

        // --------------------------------------------------------------------------
        // Pantalla de resultados
        // --------------------------------------------------------------------------
        _renderResults(container, total, correct, score, passed) {
            var active = this._getActiveQuestions();
            total = total || active.length;
            correct = correct || 0;
            score = score || 0;
            passed = passed !== undefined ? passed : false;

            var html = '<div class="exam-container exam-results">';

            html += '<div class="exam-results-header">';
            html += '<div class="exam-results-icon">' + (passed ? '&#10003;' : '&#10007;') + '</div>';
            html += '<h2 class="exam-results-title">' + (passed ? 'Examen Aprobado' : 'Examen No Aprobado') + '</h2>';
            html += '</div>';

            html += '<div class="exam-score-circle">';
            html += '<div class="exam-score-value">' + score + '%</div>';
            html += '<div class="exam-score-label">' + correct + ' de ' + total + ' correctas</div>';
            html += '</div>';

            if (passed) {
                html += '<div class="exam-result-message exam-pass">';
                html += '<p>Felicitaciones. Has aprobado el examen final del curso de Python.</p>';
                html += '<div class="exam-certificate-section">';
                html += '<p class="exam-cert-text">Certificado disponible</p>';
                html += '<button class="exercise-btn exercise-btn-verify" id="exam-cert-btn">Descargar Certificado</button>';
                html += '</div>';
                html += '</div>';
            } else {
                html += '<div class="exam-result-message exam-fail">';
                html += '<p>Necesitas al menos 60% para aprobar. Podés intentar de nuevo.</p>';
                html += '<button class="exercise-btn" id="exam-retry-btn">Intentar de Nuevo</button>';
                html += '</div>';
            }

            // Desglose por módulo
            var modules = {};
            for (var i = 0; i < active.length; i++) {
                var mod = active[i].module;
                if (!modules[mod]) {
                    modules[mod] = { total: 0, correct: 0 };
                }
                modules[mod].total++;
                if (this.answers[i] !== undefined && this.answers[i] === active[i].correct) {
                    modules[mod].correct++;
                }
            }

            html += '<div class="exam-breakdown">';
            html += '<h3>Desglose por Módulo</h3>';
            html += '<div class="exam-breakdown-grid">';

            var sortedModules = Object.keys(modules).sort();
            for (var m = 0; m < sortedModules.length; m++) {
                var modKey = sortedModules[m];
                var modData = modules[modKey];
                var modScore = Math.round((modData.correct / modData.total) * 100);
                var barClass = modScore >= 80 ? "bar-good" : modScore >= 60 ? "bar-ok" : "bar-bad";

                html += '<div class="exam-breakdown-item">';
                html += '<div class="exam-breakdown-label">Módulo ' + modKey + '</div>';
                html += '<div class="exam-breakdown-bar"><div class="exam-breakdown-fill ' + barClass + '" style="width:' + modScore + '%"></div></div>';
                html += '<div class="exam-breakdown-score">' + modData.correct + '/' + modData.total + '</div>';
                html += '</div>';
            }

            html += '</div>';
            html += '</div>';

            // Revisar respuestas
            html += '<div class="exam-review">';
            html += '<h3>Revisión de Respuestas</h3>';
            var letters = ["A", "B", "C", "D"];
            for (var r = 0; r < active.length; r++) {
                var rq = active[r];
                var userAns = this.answers[r];
                var isCorrect = userAns === rq.correct;
                var statusClass = isCorrect ? "review-correct" : (userAns !== undefined ? "review-wrong" : "review-unanswered");

                html += '<div class="exam-review-item ' + statusClass + '">';
                html += '<div class="exam-review-q"><strong>' + (r + 1) + '.</strong> ' + rq.q.replace(/\n/g, ' ') + '</div>';

                for (var o = 0; o < rq.options.length; o++) {
                    var optClass = "";
                    if (o === rq.correct) optClass = " correct-answer";
                    if (userAns === o && !isCorrect) optClass = " wrong-answer";
                    html += '<div class="exam-review-option' + optClass + '">' + letters[o] + ') ' + rq.options[o] + '</div>';
                }

                html += '</div>';
            }
            html += '</div>';

            html += '</div>';

            container.innerHTML = html;

            // Bind eventos
            var certBtn = document.getElementById("exam-cert-btn");
            if (certBtn) {
                certBtn.addEventListener("click", function () {
                    if (typeof window.__examenPassed === "function") {
                        window.__examenPassed();
                    }
                });
            }

            var retryBtn = document.getElementById("exam-retry-btn");
            if (retryBtn) {
                var self = this;
                retryBtn.addEventListener("click", function () {
                    self.currentQuestion = 0;
                    self.answers = {};
                    self.finished = false;
                    self.timeLeft = 0;
                    self.render("examen-final-container");
                });
            }
        }

        // --------------------------------------------------------------------------
        // CSS
        // --------------------------------------------------------------------------
        _getCSS() {
            return `
:root {
    --bg: #0a0a0f;
    --surface: #12121a;
    --border: #2a2a3a;
    --text: #e0e0ec;
    --muted: #7a7a8e;
    --accent: #00d4aa;
    --red: #ff6b6b;
    --yellow: #ffd93d;
}

#examen-final-container {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--text);
    padding: 0;
    min-height: 400px;
}

.exam-container {
    max-width: 720px;
    margin: 0 auto;
    padding: 24px;
}

/* --- Header --- */
.exam-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
}

.exam-timer-large {
    font-family: 'JetBrains Mono', monospace;
    font-size: 2rem;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 2px;
}

.exam-timer-large.warning {
    color: var(--yellow);
}

.exam-timer-large.danger {
    color: var(--red);
    animation: pulse-danger 1s ease-in-out infinite;
}

@keyframes pulse-danger {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.exam-meta {
    color: var(--muted);
    font-size: 0.875rem;
}

/* --- Barra de progreso --- */
.exam-progress-bar {
    width: 100%;
    height: 4px;
    background: var(--border);
    border-radius: 2px;
    margin-bottom: 20px;
    overflow: hidden;
}

.exam-progress-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 2px;
    transition: width 0.3s ease;
}

/* --- Badge de módulo --- */
.exam-module-badge {
    display: inline-block;
    background: rgba(0, 212, 170, 0.1);
    color: var(--accent);
    border: 1px solid rgba(0, 212, 170, 0.3);
    border-radius: 12px;
    padding: 4px 12px;
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 16px;
}

/* --- Pregunta --- */
.quiz-question {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px;
    margin-bottom: 20px;
}

.quiz-question-text {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 24px;
    color: var(--text);
    font-family: 'Inter', sans-serif;
}

.quiz-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.quiz-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.95rem;
}

.quiz-option:hover {
    border-color: var(--accent);
    background: rgba(0, 212, 170, 0.05);
}

.quiz-option.selected {
    border-color: var(--accent);
    background: rgba(0, 212, 170, 0.1);
}

.quiz-option-letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--border);
    color: var(--muted);
    font-weight: 600;
    font-size: 0.8rem;
    flex-shrink: 0;
}

.quiz-option.selected .quiz-option-letter {
    background: var(--accent);
    color: var(--bg);
}

/* --- Navegación --- */
.quiz-nav {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
}

.exercise-btn {
    font-family: 'Inter', sans-serif;
    padding: 10px 20px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
}

.exercise-btn:hover:not(:disabled) {
    border-color: var(--accent);
    background: rgba(0, 212, 170, 0.05);
}

.exercise-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.exercise-btn-verify {
    background: var(--accent);
    color: var(--bg);
    border-color: var(--accent);
}

.exercise-btn-verify:hover:not(:disabled) {
    background: #00b894;
    border-color: #00b894;
}

/* --- Mini mapa --- */
.exam-map {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin-bottom: 16px;
}

.exam-map-dot {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--muted);
    font-size: 0.7rem;
    font-family: 'JetBrains Mono', monospace;
    cursor: pointer;
    transition: all 0.2s ease;
}

.exam-map-dot:hover {
    border-color: var(--accent);
}

.exam-map-dot.current {
    border-color: var(--accent);
    color: var(--accent);
}

.exam-map-dot.answered {
    background: rgba(0, 212, 170, 0.2);
    border-color: var(--accent);
    color: var(--accent);
}

/* --- Resultados --- */
.exam-results {
    text-align: center;
}

.exam-results-header {
    margin-bottom: 32px;
}

.exam-results-icon {
    font-size: 3rem;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-weight: 700;
}

.exam-results .exam-results-icon {
    background: rgba(0, 212, 170, 0.15);
    color: var(--accent);
}

.exam-results:not(.exam-results) .exam-results-icon,
.exam-results .exam-results-header:has(.exam-results-icon) + .exam-fail .exam-results-icon {
    background: rgba(255, 107, 107, 0.15);
    color: var(--red);
}

.exam-results-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
}

.exam-score-circle {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 4px solid var(--accent);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
}

.exam-score-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--accent);
}

.exam-score-label {
    font-size: 0.8rem;
    color: var(--muted);
}

.exam-result-message {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 32px;
}

.exam-pass {
    border-color: var(--accent);
}

.exam-fail {
    border-color: var(--red);
}

.exam-certificate-section {
    margin-top: 16px;
}

.exam-cert-text {
    color: var(--accent);
    font-weight: 600;
    margin-bottom: 12px;
}

/* --- Desglose por módulo --- */
.exam-breakdown {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    text-align: left;
}

.exam-breakdown h3 {
    margin: 0 0 16px 0;
    font-size: 1rem;
    color: var(--text);
}

.exam-breakdown-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.exam-breakdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.exam-breakdown-label {
    width: 100px;
    font-size: 0.8rem;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
}

.exam-breakdown-bar {
    flex: 1;
    height: 8px;
    background: var(--border);
    border-radius: 4px;
    overflow: hidden;
}

.exam-breakdown-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
}

.bar-good {
    background: var(--accent);
}

.bar-ok {
    background: var(--yellow);
}

.bar-bad {
    background: var(--red);
}

.exam-breakdown-score {
    width: 40px;
    text-align: right;
    font-size: 0.8rem;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
}

/* --- Revisión --- */
.exam-review {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    text-align: left;
}

.exam-review h3 {
    margin: 0 0 20px 0;
    font-size: 1rem;
}

.exam-review-item {
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    border: 1px solid var(--border);
}

.review-correct {
    border-color: rgba(0, 212, 170, 0.3);
    background: rgba(0, 212, 170, 0.05);
}

.review-wrong {
    border-color: rgba(255, 107, 107, 0.3);
    background: rgba(255, 107, 107, 0.05);
}

.review-unanswered {
    border-color: rgba(255, 217, 61, 0.3);
    background: rgba(255, 217, 61, 0.05);
}

.exam-review-q {
    margin-bottom: 8px;
    font-size: 0.95rem;
    line-height: 1.5;
}

.exam-review-option {
    font-size: 0.875rem;
    padding: 4px 0 4px 20px;
    color: var(--muted);
}

.correct-answer {
    color: var(--accent);
    font-weight: 600;
}

.wrong-answer {
    color: var(--red);
    text-decoration: line-through;
}

/* --- Responsive --- */
@media (max-width: 600px) {
    .exam-container {
        padding: 16px;
    }

    .exam-header {
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
    }

    .exam-timer-large {
        font-size: 1.5rem;
    }

    .quiz-question {
        padding: 20px;
    }

    .quiz-option {
        padding: 12px 14px;
    }

    .quiz-nav {
        flex-wrap: wrap;
    }

    .exam-breakdown-item {
        flex-wrap: wrap;
    }

    .exam-breakdown-label {
        width: 100%;
    }
}`;
        }
    }

    // --------------------------------------------------------------------------
    // Hook global para la página padre
    // --------------------------------------------------------------------------
    if (typeof window !== "undefined") {
        window.__examenPassed = window.__examenPassed || function () {
            console.log("Examen aprobado. Sobreescribir window.__examenPassed() para personalizar.");
        };
    }

    // --------------------------------------------------------------------------
    // Exportar
    // --------------------------------------------------------------------------
    if (typeof window !== "undefined") {
        window.ExamenFinal = ExamenFinal;
    }

})();
