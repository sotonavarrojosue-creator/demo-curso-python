/* Pyodide Runner — Python in the browser */
(function() {
    let pyodide = null;
    let loading = false;

    async function loadPyodideOnce() {
        if (pyodide) return pyodide;
        if (loading) {
            while (!pyodide) await new Promise(r => setTimeout(r, 100));
            return pyodide;
        }
        loading = true;
        const el = document.querySelector('.py-loading');
        if (el) el.classList.add('show');

        // Load Pyodide from CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
        });

        pyodide = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
        });

        if (el) el.classList.remove('show');
        loading = false;
        return pyodide;
    }

    // Capture print() output
    function setupCapture(py) {
        py.runPython(`
import sys
from io import StringIO
_capture = StringIO()
sys.stdout = _capture
`);
    }

    function getOutput(py) {
        try {
            const output = py.runPython('_capture.getvalue()');
            py.runPython('sys.stdout = sys.__stdout__');
            return output;
        } catch(e) {
            return '';
        }
    }

    // Run code
    window.pyRun = async function(btn) {
        const playground = btn.closest('.py-playground');
        const editor = playground.querySelector('.py-editor');
        const output = playground.querySelector('.py-output');
        const loadingEl = playground.querySelector('.py-loading');

        const code = editor.value.trim();
        if (!code) return;

        // Disable button
        btn.disabled = true;
        btn.textContent = 'Running...';
        output.className = 'py-output show';
        output.textContent = 'Loading Python...';

        try {
            const py = await loadPyodideOnce();
            setupCapture(py);

            output.textContent = '';
            loadingEl.classList.add('show');

            try {
                py.runPython(code);
                const out = getOutput(py);
                if (out) {
                    output.textContent = out;
                    output.className = 'py-output show success';
                } else {
                    output.textContent = '(sin salida)';
                    output.className = 'py-output show';
                }
            } catch(err) {
                const errMsg = err.message
                    .replace(/PythonError: Traceback.*?\n/g, '')
                    .replace(/File "<exec>",\s*/g, 'Línea ');
                output.textContent = '❌ ' + errMsg;
                output.className = 'py-output show error';
                py.runPython('sys.stdout = sys.__stdout__');
            }
        } catch(e) {
            output.textContent = '❌ Error cargando Python: ' + e.message;
            output.className = 'py-output show error';
        }

        loadingEl.classList.remove('show');
        btn.disabled = false;
        btn.textContent = '▶ Run';
    };

    // Tab support in editors
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('py-editor') && e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            e.target.value = e.target.value.substring(0, start) + '    ' + e.target.value.substring(end);
            e.target.selectionStart = e.target.selectionEnd = start + 4;
        }
    });
})();
