/* Exercise Validation System — Python Course */
(function () {
    const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
    const PYODIDE_INDEX = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/';
    const STORAGE_PREFIX = 'exercise_';
    const STORAGE_SUFFIX = '_done';

    let pyodideInstance = null;
    let pyodideLoading = false;

    async function ensurePyodide() {
        if (pyodideInstance) return pyodideInstance;

        if (pyodideLoading) {
            while (!pyodideInstance) await new Promise(r => setTimeout(r, 100));
            return pyodideInstance;
        }

        pyodideLoading = true;

        // Cargar script de Pyodide
        const script = document.createElement('script');
        script.src = PYODIDE_CDN;
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
        });

        pyodideInstance = await loadPyodide({ indexURL: PYODIDE_INDEX });
        window._pyodideInstance = pyodideInstance;
        pyodideLoading = false;
        return pyodideInstance;
    }

    function isCompleted(exerciseId) {
        try {
            return localStorage.getItem(STORAGE_PREFIX + exerciseId + STORAGE_SUFFIX) === 'true';
        } catch (e) {
            return false;
        }
    }

    function markCompleted(exerciseId) {
        try {
            localStorage.setItem(STORAGE_PREFIX + exerciseId + STORAGE_SUFFIX, 'true');
        } catch (e) {
            // localStorage no disponible
        }
    }

    class ExerciseRunner {
        constructor() {
            this.exercises = [];
        }

        init() {
            this.exercises = Array.from(document.querySelectorAll('.exercise-block'));

            this.exercises.forEach(block => {
                const id = block.dataset.exerciseId;
                if (!id) return;

                // Marcar como completados si ya estaban en localStorage
                if (isCompleted(id)) {
                    const feedback = document.getElementById('feedback-' + id);
                    if (feedback) {
                        feedback.textContent = 'Ya completado';
                        feedback.className = 'exercise-feedback show correct';
                    }
                }

                // Hint inicialmente oculto
                const hint = document.getElementById('hint-' + id);
                if (hint) {
                    hint.style.display = 'none';
                }
            });
        }

        async verify(exerciseId, btn) {
            const block = document.querySelector('[data-exercise-id="' + exerciseId + '"]');
            if (!block) return;

            const editor = block.querySelector('.py-editor');
            const expectedOutput = block.dataset.expectedOutput.trim();
            const code = editor.value.trim();

            if (!code) return;

            btn.disabled = true;
            btn.textContent = 'Verificando...';

            const feedback = document.getElementById('feedback-' + exerciseId);

            try {
                const py = await ensurePyodide();

                // Capturar stdout del usuario
                py.runPython(`
import sys
from io import StringIO
__exercise_capture = StringIO()
sys.stdout = __exercise_capture
`);

                py.runPython(code);

                const rawOutput = py.runPython('__exercise_capture.getvalue()');
                py.runPython('sys.stdout = sys.__stdout__');

                const output = rawOutput.trim();

                if (output === expectedOutput) {
                    feedback.textContent = 'Correcto!';
                    feedback.className = 'exercise-feedback show correct';
                    markCompleted(exerciseId);
                } else {
                    feedback.textContent = 'Resultado: "' + output + '" — Esperado: "' + expectedOutput + '"';
                    feedback.className = 'exercise-feedback show wrong';
                }
            } catch (err) {
                // Restaurar stdout en caso de error
                try {
                    const py = await ensurePyodide();
                    py.runPython('import sys; sys.stdout = sys.__stdout__');
                } catch (e) {
                    // Ignorar si no se puede restaurar
                }

                const message = err.message
                    .replace(/PythonError: Traceback.*?\n/g, '')
                    .replace(/File "<exec>",\s*/g, 'Linea ');
                feedback.textContent = 'Error: ' + message;
                feedback.className = 'exercise-feedback show wrong';
            }

            btn.disabled = false;
            btn.textContent = 'Verificar';
        }

        showHint(exerciseId) {
            const hint = document.getElementById('hint-' + exerciseId);
            if (!hint) return;

            if (hint.style.display === 'none' || hint.style.display === '') {
                hint.style.display = 'block';
            } else {
                hint.style.display = 'none';
            }
        }
    }

    let exerciseRunner;
    document.addEventListener('DOMContentLoaded', function () {
        exerciseRunner = new ExerciseRunner();
        exerciseRunner.init();
        window.exerciseRunner = exerciseRunner;
    });
})();
