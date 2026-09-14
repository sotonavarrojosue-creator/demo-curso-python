#!/usr/bin/env python3
"""Genera HTMLs interactivos del curso de Python desde los markdowns"""
import re
import os
import html as html_mod

VAULT = os.path.expanduser("~/OBSIIDIAN/prueba_de_claude/Python")
OUTPUT = os.path.expanduser("~/proyectos/demos/curso-python")

TEMPLATE = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} — Aprende Python</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="interactive.css">
    <style>
        :root {{ --bg: #0a0a0f; --surface: #12121a; --border: #2a2a3a; --text: #e0e0ec; --muted: #7a7a8e; --accent: #00d4aa; --purple: #a29bfe; --yellow: #ffd93d; --blue: #4ecdc4; }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; }}
        nav {{ position: fixed; top: 0; width: 100%; background: rgba(10,10,15,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); padding: 0.6rem 1rem; z-index: 100; display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; overflow-x: auto; }}
        nav a {{ color: var(--accent); text-decoration: none; font-weight: 600; font-size: 0.85rem; white-space: nowrap; }}
        nav .back {{ color: var(--muted); }}
        #user-section {{ display: flex; gap: 0.4rem; align-items: center; flex-shrink: 0; }}
        .container {{ max-width: 750px; margin: 0 auto; padding: 6.5rem 2rem 4rem; }}
        h1 {{ font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; }}
        h1 span {{ color: var(--accent); }}
        .meta {{ color: var(--muted); font-size: 0.85rem; margin-bottom: 2.5rem; font-family: 'JetBrains Mono', monospace; }}
        h2 {{ font-size: 1.4rem; font-weight: 700; margin: 2.5rem 0 1rem; color: var(--accent); border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }}
        h3 {{ font-size: 1.1rem; font-weight: 600; margin: 1.5rem 0 0.5rem; }}
        p {{ margin-bottom: 1rem; color: var(--text); }}
        ul, ol {{ margin: 0.5rem 0 1rem 1.5rem; }}
        li {{ margin-bottom: 0.3rem; }}
        pre {{ display: none; }}
        code {{ font-family: 'JetBrains Mono', monospace; font-size: 0.85em; }}
        :not(pre) > code {{ background: var(--surface); padding: 0.15rem 0.4rem; border-radius: 4px; border: 1px solid var(--border); }}
        table {{ width: 100%; border-collapse: collapse; margin: 1rem 0; }}
        th, td {{ padding: 0.6rem 1rem; border: 1px solid var(--border); text-align: left; }}
        th {{ background: var(--surface); font-weight: 600; }}
        blockquote {{ border-left: 3px solid var(--accent); padding-left: 1rem; color: var(--muted); margin: 1rem 0; }}
        strong {{ color: var(--yellow); }}
        hr {{ border: none; border-top: 1px solid var(--border); margin: 2rem 0; }}
        .nav-buttons {{ display: flex; justify-content: space-between; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border); }}
        .nav-buttons a {{ color: var(--accent); text-decoration: none; font-weight: 600; padding: 0.8rem 1.5rem; border: 1px solid var(--border); border-radius: 6px; transition: all 0.2s; }}
        .nav-buttons a:hover {{ border-color: var(--accent); background: rgba(0,212,170,0.1); }}
        @media (max-width: 640px) {{ .container {{ padding: 6rem 1rem 3rem; }} h1 {{ font-size: 1.6rem; }} nav {{ padding: 0.5rem 0.6rem; gap: 0.3rem; }} .nav-btn {{ padding: 0.25rem 0.4rem !important; font-size: 0.65rem !important; }} }}
    </style>
</head>
<body data-module="{num}">
    <nav>
        <a href="index.html" class="back">← Curso Python</a>
        <span class="mono" style="color:var(--muted);font-size:0.8rem;">Módulo {num}</span>
        <div id="user-section"></div>
    </nav>
    <div id="user-bar" style="position:fixed;top:42px;width:100%;background:rgba(10,10,15,0.95);border-bottom:1px solid var(--border);z-index:99;display:flex;justify-content:flex-end;padding:0.3rem 1rem;gap:0.4rem"></div>

    <!-- Lock overlay for modules 2+ -->
    <div id="module-lock" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,10,15,0.97);z-index:200;justify-content:center;align-items:center;flex-direction:column;text-align:center;padding:2rem">
        <div style="font-size:4rem;margin-bottom:1rem">🔒</div>
        <h2 style="color:var(--text);font-size:1.6rem;margin-bottom:0.5rem">Este módulo está bloqueado</h2>
        <p style="color:var(--muted);margin-bottom:1.5rem;max-width:400px">Registrate gratis para acceder a todos los módulos, guardar tu progreso y obtener tu certificado.</p>
        <button onclick="ui.showRegister()" style="padding:0.8rem 2.5rem;background:var(--accent);color:var(--bg);border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer;margin-bottom:1rem">Registrarse gratis</button>
        <button onclick="ui.showLogin()" style="padding:0.6rem 1.5rem;background:transparent;color:var(--accent);border:1px solid var(--accent);border-radius:6px;font-weight:600;font-size:0.9rem;cursor:pointer">Ya tengo cuenta</button>
    </div>

    <div class="container">
        {content}

        <div style="margin-top:3rem;padding:1.5rem;background:var(--surface);border:1px solid var(--border);border-radius:8px;text-align:center">
            <p style="color:var(--muted);font-size:0.85rem;margin-bottom:1rem">¿Completaste este módulo?</p>
            <button onclick="completeModule()" style="padding:0.7rem 2rem;background:var(--accent);color:var(--bg);border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer">
                ✅ Marcar como completado
            </button>
        </div>

        <div class="nav-buttons">
            {prev_link}
            {next_link}
        </div>
    </div>

    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
    <script>
        firebase.initializeApp({{
            apiKey: "AIzaSyDLkx5cRmuaFt_1pRcX8ZnsFYIZLp6IxWM",
            authDomain: "curso-python-app.firebaseapp.com",
            projectId: "curso-python-app",
            storageBucket: "curso-python-app.firebasestorage.app",
            messagingSenderId: "792219958902",
            appId: "1:792219958902:web:29290b541a8b58a0ffe957",
            measurementId: "G-S2HCJWVSMM"
        }});
    </script>
    <script src="app.js"></script>
    <script src="interactive.js"></script>
</body>
</html>"""


def escape_code(code):
    """Escape HTML inside code blocks"""
    return code.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def make_playground(code, lang="python"):
    """Create an interactive code playground — only for Python blocks"""
    escaped = escape_code(code.strip())
    # Only Python blocks get the Run button
    if lang in ("python", "py"):
        run_btn = '<button class="py-btn py-btn-run" onclick="pyRun(this)">▶ Run</button>'
    else:
        run_btn = ''
    return f'''<div class="py-playground">
<div class="py-playground-header">
<span class="label">{lang}</span>
<div class="py-btn-group">
<button class="py-btn" onclick="this.closest('.py-playground').querySelector('.py-editor').value=`{escaped}`">Reset</button>
{run_btn}
</div>
</div>
<textarea class="py-editor" spellcheck="false">{escaped}</textarea>
<div class="py-loading"><div class="py-spinner"></div> Cargando Python en el navegador...</div>
<div class="py-output"></div>
</div>'''


def md_to_html(md_text):
    """Markdown to HTML with interactive code blocks"""
    lines = md_text.split('\n')
    html_lines = []
    in_code = False
    code_buffer = []
    code_lang = ""
    in_table = False

    # Remove frontmatter
    if lines and lines[0].strip() == '---':
        end = lines.index('---', 1)
        lines = lines[end+1:]

    i = 0
    while i < len(lines):
        stripped = lines[i].strip()

        # Code blocks → interactive playgrounds
        if stripped.startswith('```'):
            if in_code:
                # End of code block — create playground
                code = '\n'.join(code_buffer)
                if code.strip():
                    html_lines.append(make_playground(code, code_lang))
                code_buffer = []
                in_code = False
            else:
                in_code = True
                code_lang = stripped[3:] or "python"
            i += 1
            continue

        if in_code:
            code_buffer.append(lines[i])
            i += 1
            continue

        # Tables
        if '|' in stripped and stripped.startswith('|'):
            cells = [c.strip() for c in stripped.split('|')[1:-1]]
            if all(set(c) <= set('- :') for c in cells):
                i += 1
                continue
            if not in_table:
                html_lines.append('<table>')
                in_table = True
                html_lines.append('<tr>' + ''.join(f'<th>{c}</th>' for c in cells) + '</tr>')
            else:
                html_lines.append('<tr>' + ''.join(f'<td>{c}</td>' for c in cells) + '</tr>')
            i += 1
            continue
        elif in_table:
            html_lines.append('</table>')
            in_table = False

        # Headers
        if stripped.startswith('# '):
            html_lines.append(f'<h1><span>&gt;</span> {stripped[2:]}</h1>')
        elif stripped.startswith('## '):
            html_lines.append(f'<h2>{stripped[3:]}</h2>')
        elif stripped.startswith('### '):
            html_lines.append(f'<h3>{stripped[4:]}</h3>')
        elif stripped.startswith('---'):
            html_lines.append('<hr>')
        elif stripped.startswith('> '):
            html_lines.append(f'<blockquote>{stripped[2:]}</blockquote>')
        elif stripped.startswith(('- ', '* ')):
            html_lines.append(f'<li>{stripped[2:]}</li>')
        elif re.match(r'^\d+\.\s', stripped):
            html_lines.append(f'<li>{stripped.split(".", 1)[1].strip()}</li>')
        elif stripped == '':
            html_lines.append('')
        else:
            text = stripped
            text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
            text = re.sub(r'`(.+?)`', r'<code>\1</code>', text)
            text = re.sub(r'\[(.+?)\]\((.+?)\)', r'<a href="\2" style="color:var(--accent)">\1</a>', text)
            html_lines.append(f'<p>{text}</p>')

        i += 1

    if in_table:
        html_lines.append('</table>')

    return '\n'.join(html_lines)


modules = [
    ("01-Hola-Mundo", "Hola Mundo", "01"),
    ("02-Variables-y-Tipos", "Variables y Tipos", "02"),
    ("03-Operadores", "Operadores", "03"),
    ("04-Input-Output", "Input / Output", "04"),
    ("05-Condicionales", "Condicionales", "05"),
    ("06-Loops", "Loops", "06"),
    ("07-Loop-Proyectos", "Proyectos con Loops", "07"),
    ("08-Listas", "Listas", "08"),
    ("09-Diccionarios", "Diccionarios", "09"),
    ("10-Tuplas-y-Sets", "Tuplas y Sets", "10"),
    ("11-Funciones", "Funciones", "11"),
    ("12-Funciones-Avanzadas", "Funciones Avanzadas", "12"),
    ("13-Archivos", "Archivos", "13"),
    ("14-Errores", "Manejo de Errores", "14"),
    ("15-Clases-y-Objetos", "Clases y Objetos", "15"),
    ("16-POO-Avanzada", "POO Avanzada", "16"),
    ("17-Proyecto-Calculadora", "Calculadora", "17"),
    ("18-Proyecto-Gestor-Tareas", "Gestor de Tareas", "18"),
    ("19-Proyecto-Web-Scraper", "Web Scraper", "19"),
]

for i, (slug, title, num) in enumerate(modules):
    md_path = os.path.join(VAULT, f"{slug}.md")
    html_path = os.path.join(OUTPUT, f"{slug}.html")

    if not os.path.exists(md_path):
        print(f"⚠️  No existe: {md_path}")
        continue

    with open(md_path, 'r') as f:
        md_content = f.read()

    body_html = md_to_html(md_content)

    if i > 0:
        prev_slug, prev_title = modules[i-1][0], modules[i-1][1]
        prev_link = f'<a href="{prev_slug}.html">← {prev_title}</a>'
    else:
        prev_link = '<a href="index.html">← Inicio</a>'

    if i < len(modules) - 1:
        next_slug, next_title = modules[i+1][0], modules[i+1][1]
        next_link = f'<a href="{next_slug}.html">{next_title} →</a>'
    else:
        next_link = '<a href="index.html">Volver al inicio →</a>'

    html = TEMPLATE.format(
        title=title,
        num=num,
        content=body_html,
        prev_link=prev_link,
        next_link=next_link
    )

    with open(html_path, 'w') as f:
        f.write(html)

    print(f"✅ {slug}.html")

print(f"\n🎉 {len(modules)} archivos generados con bloques interactivos")
