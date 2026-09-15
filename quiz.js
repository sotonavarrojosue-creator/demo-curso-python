// Quiz per-module para curso de Python
// Vanilla JS, sin frameworks

(function () {
    "use strict";

    class QuizManager {
        constructor(moduleId) {
            this.moduleId = moduleId;
            this.questions = this.getQuestions();
            this.currentQ = 0;
            this.answers = {};
            this.timer = null;
            this.timeLeft = 0;
            this.finished = false;
            this.timerDuration =
                window.__userTier === "premium" ? 70 * 60 : 35 * 60;
        }

        getQuestions() {
            const bank = {
                "01": [
                    {
                        q: "Cual es la forma correcta de imprimir 'Hola mundo' en Python?",
                        options: [
                            "print(Hola mundo)",
                            'print("Hola mundo")',
                            "echo Hola mundo",
                            "console.log('Hola mundo')",
                        ],
                        correct: 1,
                    },
                    {
                        q: "En Python 3, print() retorna:",
                        options: [
                            "El texto impreso",
                            "None",
                            "True",
                            "Una lista vacia",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Como se escribe un comentario de una sola linea en Python?",
                        options: [
                            "// comentario",
                            "/* comentario */",
                            "# comentario",
                            "-- comentario",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Cual de las siguientes es una sintaxis invalida?",
                        options: [
                            'print("hola")',
                            'print("hola", "mundo")',
                            "print 'hola'",
                            'print(42)',
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que hace print(3 * 2)?",
                        options: [
                            "Imprime 32",
                            "Imprime 3 2",
                            "Imprime 6",
                            "Imprime 5",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Cual es el resultado de print(2 ** 3)?",
                        options: ["6", "8", "5", "9"],
                        correct: 1,
                    },
                    {
                        q: "Que separador usa print() entre argumentos por defecto?",
                        options: ["|", ",", ":", " "],
                        correct: 3,
                    },
                    {
                        q: "print('a', 'b', sep='-') imprime:",
                        options: ["a b", "a-b", "a,b", "ab"],
                        correct: 1,
                    },
                    {
                        q: "Para que sirve el parametro end en print()?",
                        options: [
                            "Termina el programa",
                            "Define el separador entre argumentos",
                            "Define el caracter final en vez de salto de linea",
                            "Cierra el archivo de salida",
                        ],
                        correct: 2,
                    },
                    {
                        q: "print('Hola', end='!') produce como salida:",
                        options: [
                            "Hola!",
                            "Hola!",
                            "Hola!",
                            "Hola!",
                        ],
                        correct: 1,
                    },
                ],
                "02": [
                    {
                        q: "En Python, que tipo de dato es type(3.14)?",
                        options: ["int", "float", "decimal", "number"],
                        correct: 1,
                    },
                    {
                        q: "Cual de las siguientes es una variable valida en Python?",
                        options: ["2nombre", "_edad", "class", "my-var"],
                        correct: 1,
                    },
                    {
                        q: "Que imprime x = 5; print(type(x))?",
                        options: [
                            "<class 'int'>",
                            "<class 'float'>",
                            "<class 'number'>",
                            "<class 'integer'>",
                        ],
                        correct: 0,
                    },
                    {
                        q: "En Python, True + True evalua a:",
                        options: ["True", "2", "1", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Cual es el valor de bool('')?",
                        options: ["True", "False", "None", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que tipo de dato es type(None)?",
                        options: ["NoneType", "null", "void", "empty"],
                        correct: 0,
                    },
                    {
                        q: "Cual de las siguientes variables viola las convenciones de nombrado en Python?",
                        options: [
                            "mi_variable",
                            "_privada",
                            "2daVariable",
                            "__dunder",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que retorna isinstance(True, int)?",
                        options: ["True", "False", "1", "Error"],
                        correct: 0,
                    },
                    {
                        q: "En Python, que es 'Hola' + ' Mundo'?",
                        options: [
                            "Error de tipo",
                            "Concatenacion: 'Hola Mundo'",
                            "Multiplicacion",
                            "None",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que valor tiene bool(0)?",
                        options: ["True", "False", "0", "None"],
                        correct: 1,
                    },
                ],
                "03": [
                    {
                        q: "Cual es el resultado de 10 // 3?",
                        options: ["3.33", "3", "4", "3.0"],
                        correct: 1,
                    },
                    {
                        q: "Que operador calcula el modulo (residuo)?",
                        options: ["%", "//", "**", "mod"],
                        correct: 0,
                    },
                    {
                        q: "Cual es el resultado de 7 % 2?",
                        options: ["3", "1", "3.5", "2"],
                        correct: 1,
                    },
                    {
                        q: "Que retorna 2 ** 3 ** 2?",
                        options: ["64", "512", "36", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que es True and False?",
                        options: ["True", "False", "None", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que retorna not True?",
                        options: ["True", "False", "None", "1"],
                        correct: 1,
                    },
                    {
                        q: "Cual es el resultado de 5 > 3 and 2 < 1?",
                        options: ["True", "False", "None", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que retorna 10 == 10.0?",
                        options: ["False", "True", "Error", "None"],
                        correct: 1,
                    },
                    {
                        q: "Que operador tiene mayor precedencia?",
                        options: ["+", "*", "**", "//"],
                        correct: 2,
                    },
                    {
                        q: "Que retorna 1 or 0?",
                        options: ["0", "1", "True", "False"],
                        correct: 1,
                    },
                ],
                "04": [
                    {
                        q: "Cual es el resultado de float(input('Edad: ')) si el usuario escribe 25?",
                        options: ["25", "25.0", "'25'", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que hace input() en Python 3?",
                        options: [
                            "Lee un entero",
                            "Lee una cadena de texto",
                            "Lee un float",
                            "Lee un booleano",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Cual es el resultado de f'Hien {2 + 2}'?",
                        options: [
                            "Hien 2 + 2",
                            "Hien 4",
                            "Hien2+2",
                            "Error de sintaxis",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que imprime nombre = 'Ana'; print(f'Hola {nombre}')?",
                        options: [
                            "Hola nombre",
                            "Hola Ana",
                            "Hola {nombre}",
                            "Error",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Cual es la diferencia entre print(f'{x}') y print('{}'.format(x))?",
                        options: [
                            "Son completamente diferentes",
                            "f-string es solo Python 2",
                            "Ambos logran lo mismo, f-string es mas conciso",
                            "format() es mas rapido",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que imprime f'{10:.2f}'?",
                        options: ["10.0", "10.00", "10", "10,00"],
                        correct: 1,
                    },
                    {
                        q: "Cual es el resultado de print(f'{5:>10}')?",
                        options: [
                            "         5",
                            "5         ",
                            "0000000005",
                            "Error",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que retorna input('Nom: ') si el usuario presiona Enter sin escribir nada?",
                        options: ["None", "''", "Error", "null"],
                        correct: 1,
                    },
                    {
                        q: "Que imprime f'{0.12345:.3f}'?",
                        options: ["0.123", "0.12", "0.1234", "0.1235"],
                        correct: 0,
                    },
                    {
                        q: "Para convertir la entrada del usuario a entero se usa:",
                        options: [
                            "int(input(...))",
                            "input(int(...))",
                            "integer(input(...))",
                            "parse(input(...))",
                        ],
                        correct: 0,
                    },
                ],
                "05": [
                    {
                        q: "Cual es la sintaxis correcta de if/elif/else en Python?",
                        options: [
                            "if (cond) { } else { }",
                            "if cond: ... elif cond: ... else: ...",
                            "if cond then ... else ...",
                            "if (cond) ... elif (cond) ... else ...",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que valor es falsy en Python?",
                        options: [
                            "1",
                            "'0'",
                            "'False'",
                            "None",
                        ],
                        correct: 3,
                    },
                    {
                        q: "Que retorna 3 > 2 > 1?",
                        options: ["True", "False", "Error", "None"],
                        correct: 0,
                    },
                    {
                        q: "Que pasa si no pongo dos puntos despues de if?",
                        options: [
                            "Python lo infiere",
                            "Error de sintaxis",
                            "Se ejecuta como else",
                            "Nada, es opcional",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna 'si' if True else 'no'?",
                        options: ["True", "si", "no", "None"],
                        correct: 1,
                    },
                    {
                        q: "Cual es la diferencia entre == e is?",
                        options: [
                            "Son iguales",
                            "== compara valor, is compara identidad",
                            "is compara valor, == compara identidad",
                            "is solo sirve para None",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna 5 in [1, 2, 3, 5]?",
                        options: ["False", "True", "5", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que sucede con if 1 and 0?",
                        options: [
                            "Ejecuta el bloque if",
                            "Ejecuta el bloque else",
                            "Error de tipo",
                            "Ejecuta ambos",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna 'a' not in 'banana'?",
                        options: ["True", "False", "Error", "None"],
                        correct: 1,
                    },
                    {
                        q: "En el operador ternario x if cond else y, que se evalua primero?",
                        options: [
                            "x",
                            "y",
                            "cond",
                            "Depende del valor de x",
                        ],
                        correct: 2,
                    },
                ],
                "06": [
                    {
                        q: "Que retorna list(range(5))?",
                        options: [
                            "[1, 2, 3, 4, 5]",
                            "[0, 1, 2, 3, 4]",
                            "[0, 1, 2, 3, 4, 5]",
                            "[1, 2, 3, 4]",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace break dentro de un bucle?",
                        options: [
                            "Salta a la siguiente iteracion",
                            "Termina el bucle completamente",
                            "Reinicia el bucle",
                            "Pausa el bucle",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace continue en un bucle?",
                        options: [
                            "Termina el bucle",
                            "Salta a la siguiente iteracion",
                            "Reinicia el bucle",
                            "Rompe el bucle",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Cual es el valor por defecto del paso en range()?",
                        options: ["0", "1", "-1", "2"],
                        correct: 1,
                    },
                    {
                        q: "Que retorna range(0, 10, 2)?",
                        options: [
                            "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
                            "[0, 2, 4, 6, 8]",
                            "[0, 2, 4, 6, 8, 10]",
                            "[2, 4, 6, 8]",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que sucede con un bucle while cuya condicion nunca es True?",
                        options: [
                            "Se ejecuta una vez",
                            "Se ejecuta infinitamente",
                            "Nunca se ejecuta",
                            "Error de sintaxis",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que retorna len(list(range(0)))?",
                        options: ["0", "1", "Error", "None"],
                        correct: 0,
                    },
                    {
                        q: "Cual es la forma correcta de iterar sobre una cadena?",
                        options: [
                            "for i in range(len(s))",
                            "for c in s",
                            "Ambas A y B son correctas",
                            "Ninguna es correcta",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que retorna list(range(10, 0, -1))?",
                        options: [
                            "[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]",
                            "[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]",
                            "[9, 8, 7, 6, 5, 4, 3, 2, 1]",
                            "Error",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Un while True sin break causa:",
                        options: [
                            "Un error de compilacion",
                            "Un bucle infinito",
                            "Un warning",
                            "Se detiene solo despues de 100 iteraciones",
                        ],
                        correct: 1,
                    },
                ],
                "07": [
                    {
                        q: "Que patron se usa para contar elementos que cumplen una condicion?",
                        options: [
                            "Acumulador con += 1",
                            "Slicing",
                            "Comprension de lista",
                            "Funcion lambda",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Cual es la forma idiomatica de sumar una lista en Python?",
                        options: [
                            "Usar un for con acumulador",
                            "Usar sum()",
                            "Usar reduce()",
                            "Todas las anteriores funcionan",
                        ],
                        correct: 3,
                    },
                    {
                        q: "Que retorna total = 0; for x in [1,2,3]: total += x; total?",
                        options: ["3", "6", "0", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Para encontrar el maximo sin usar max(), cual patron se usa?",
                        options: [
                            "Comparar cada elemento con un acumulador",
                            "Usar sort()",
                            "Usar len()",
                            "Usar count()",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que hace el patron de intercambio (swap) a, b = b, a?",
                        options: [
                            "Asigna b a ambas variables",
                            "Intercambia los valores de a y b",
                            "Crea una tupla",
                            "Error de sintaxis",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna 'Frecuencia de caracteres': len(set('banana'))?",
                        options: ["3", "4", "6", "5"],
                        correct: 0,
                    },
                    {
                        q: "Para invertir una lista, cual es la forma mas pythonica?",
                        options: [
                            "for inverso con range",
                            "lista[::-1]",
                            "reverse() y luego copy()",
                            "reversed() y list()",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que patron se usa para filtrar y transformar al mismo tiempo?",
                        options: [
                            "For con if y append",
                            "Comprension de lista con condicion",
                            "Ambas A y B",
                            "Ninguna",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que retorna '[x**2 for x in range(5) if x % 2 == 0]'?",
                        options: [
                            "[0, 1, 4, 9, 16]",
                            "[1, 9]",
                            "[0, 4, 16]",
                            "[4, 16]",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Para contar pares en una lista, que retorno espera el acumulador?",
                        options: [
                            "Los elementos pares",
                            "La cantidad de pares",
                            "True o False",
                            "El promedio",
                        ],
                        correct: 1,
                    },
                ],
                "08": [
                    {
                        q: "Que retorna mi_lista = [1, 2, 3]; mi_lista[1]?",
                        options: ["1", "2", "3", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que es slicing en listas?",
                        options: [
                            "Eliminar elementos",
                            "Obtener un subconjunto con [start:stop:step]",
                            "Ordenar la lista",
                            "Copiar la lista",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna [1,2,3,4,5][1:4]?",
                        options: [
                            "[1, 2, 3, 4]",
                            "[2, 3, 4]",
                            "[2, 3]",
                            "[1, 2, 3]",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace append() en una lista?",
                        options: [
                            "Agrega al inicio",
                            "Agrega al final",
                            "Elimina el ultimo",
                            "Ordena la lista",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna 'Hola' in ['Hola', 'Mundo']?",
                        options: ["False", "True", "0", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que diferencia hay entre lista1 = lista2 y lista1 = lista2[:]?",
                        options: [
                            "Son iguales",
                            "La primera crea referencia, la segunda crea copia",
                            "La segunda crea referencia, la primera crea copia",
                            "Ambas crean copias",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna [1,2] * 3?",
                        options: [
                            "[1, 2, 3]",
                            "[1, 2, 1, 2, 1, 2]",
                            "[3, 6]",
                            "Error",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace list.extend([4, 5])?",
                        options: [
                            "Agrega [4, 5] como elemento",
                            "Agrega 4 y 5 individualmente al final",
                            "Reemplaza la lista",
                            "Crea una nueva lista",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna [-1] en una lista?",
                        options: [
                            "El primer elemento",
                            "El ultimo elemento",
                            "Error",
                            "None",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace pop() sin argumentos?",
                        options: [
                            "Elimina el primer elemento",
                            "Elimina y retorna el ultimo elemento",
                            "Elimina todos los elementos",
                            "Error",
                        ],
                        correct: 1,
                    },
                ],
                "09": [
                    {
                        q: "Que retorna {'a': 1, 'b': 2}['a']?",
                        options: ["'a'", 1, 2, "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que hace el metodo keys() en un diccionario?",
                        options: [
                            "Retorna los valores",
                            "Retorna las claves",
                            "Retorna pares clave-valor",
                            "Elimina claves",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna len({'x': 1, 'y': 2, 'z': 3})?",
                        options: ["6", "3", "2", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que pasa al intentar acceder a una clave que no existe con d['clave']?",
                        options: [
                            "Retorna None",
                            "Retorna 'clave'",
                            "Lanza KeyError",
                            "Crea la clave",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que metodo retorna el valor de una clave o un valor por defecto?",
                        options: ["get()", "pop()", "setdefault()", "Both A y C"],
                        correct: 3,
                    },
                    {
                        q: "Que retorna {'a':1}.update({'b':2, 'a':3})?",
                        options: [
                            "{'a': 1, 'b': 2}",
                            "{'a': 3, 'b': 2}",
                            "None, modifica in-place",
                            "Error",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Para iterar sobre un diccionario, que retorna for k in d?",
                        options: [
                            "Los valores",
                            "Los pares",
                            "Las claves",
                            "Una tupla",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que retorna {'a': 1}.get('b', 0)?",
                        options: ["'b'", "1", "0", "KeyError"],
                        correct: 2,
                    },
                    {
                        q: "Que hace pop('clave', default) en un diccionario?",
                        options: [
                            "Elimina la clave y retorna su valor, o retorna default si no existe",
                            "Solo retorna el valor sin eliminar",
                            "Agrega la clave con default",
                            "Error si no existe",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que retorna dict.fromkeys(['a','b'], 0)?",
                        options: [
                            "{'a': 0, 'b': 0}",
                            "{'a': None, 'b': None}",
                            "['a', 'b']",
                            "Error",
                        ],
                        correct: 0,
                    },
                ],
                "10": [
                    {
                        q: "Que retorna t = (1, 2, 3); t[1]?",
                        options: ["1", "2", "3", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Por que las tuplas son inmutables?",
                        options: [
                            "No se pueden crear",
                            "Una vez creadas, no se pueden modificar",
                            "Son mas lentas",
                            "Solo aceptan strings",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna set([1, 2, 2, 3, 3])?",
                        options: [
                            "[1, 2, 3]",
                            "{1, 2, 2, 3, 3}",
                            "{1, 2, 3}",
                            "Error",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que retorna frozenset([1, 2])?",
                        options: [
                            "Un set mutable",
                            "Un set inmutable",
                            "Una tupla",
                            "Error",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que operacion es comun entre sets?",
                        options: [
                            "Union con |",
                            "Indexacion con []",
                            "Slicing",
                            "Append",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que retorna set('aabbc') & set('bbccd')?",
                        options: [
                            "{'b', 'c'}",
                            "{'a', 'b', 'c', 'd'}",
                            "{'a', 'd'}",
                            "set()",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Para que sirve la desempaquetacion a, b, c = (1, 2, 3)?",
                        options: [
                            "Crea una lista",
                            "Asigna valores individuales a variables",
                            "Crea un diccionario",
                            "Error",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna tuple([1, 2, 3])?",
                        options: [
                            "[1, 2, 3]",
                            "(1, 2, 3)",
                            "{1, 2, 3}",
                            "Error",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna {1,2,3} - {2,3,4}?",
                        options: [
                            "{1}",
                            "{4}",
                            "{1, 2, 3, 4}",
                            "set()",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que pasa si intentas modificar un elemento de una tupla?",
                        options: [
                            "Se modifica normalmente",
                            "Se crea una nueva tupla",
                            "Lanza TypeError",
                            "Lanza ValueError",
                        ],
                        correct: 2,
                    },
                ],
                "11": [
                    {
                        q: "Que es un parametro por defecto en una funcion?",
                        options: [
                            "Un parametro que es obligatorio",
                            "Un parametro con valor predefinido",
                            "Un parametro de retorno",
                            "Un parametro global",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna def f(x): return x * 2; f(5)?",
                        options: ["5", "10", "25", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que sucede si una funcion no tiene return?",
                        options: [
                            "Error de sintaxis",
                            "Retorna None implicitamente",
                            "Retorna 0",
                            "Retorna True",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es *args en una funcion?",
                        options: [
                            "Un diccionario de argumentos",
                            "Una tupla de argumentos posicionales",
                            "Un argumento con valor por defecto",
                            "Un argumento keyword",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es **kwargs en una funcion?",
                        options: [
                            "Una lista de argumentos",
                            "Una tupla de argumentos",
                            "Un diccionario de argumentos por palabra clave",
                            "Un argumento global",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que es el scope local de una funcion?",
                        options: [
                            "Variables accesibles en todo el programa",
                            "Variables definidas dentro de la funcion",
                            "Variables del modulo",
                            "Variables globales",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Para acceder a una variable global dentro de una funcion se usa:",
                        options: [
                            "local var",
                            "global var",
                            "var directamente",
                            "No es posible",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna def f(a, b=10): return a + b; f(5)?",
                        options: ["5", "10", "15", "Error"],
                        correct: 2,
                    },
                    {
                        q: "Que es return en una funcion?",
                        options: [
                            "Imprime un valor",
                            "Retorna un valor al que llama",
                            "Termina el programa",
                            "Elimina variables",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que pasa si llamas una funcion antes de definirla?",
                        options: [
                            "Funciona normalmente",
                            "Se ejecuta vacia",
                            "Lanza NameError",
                            "Lanza SyntaxError",
                        ],
                        correct: 2,
                    },
                ],
                "12": [
                    {
                        q: "Que retorna lambda x: x * 2?",
                        options: [
                            "2",
                            "Una funcion que duplica",
                            "Error",
                            "None",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna list(map(lambda x: x**2, [1,2,3]))?",
                        options: [
                            "[1, 2, 3]",
                            "[1, 4, 9]",
                            "[2, 4, 6]",
                            "Error",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace filter()?",
                        options: [
                            "Filtra por indice",
                            "Filtra elementos que cumplen una condicion",
                            "Filtra por tipo",
                            "Filtra por longitud",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna list(filter(lambda x: x > 2, [1,2,3,4]))?",
                        options: [
                            "[1, 2]",
                            "[3, 4]",
                            "[2, 3, 4]",
                            "[1, 2, 3, 4]",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace reduce() en functools?",
                        options: [
                            "Reduce la lista a un solo valor acumulado",
                            "Reduce el tamano de la lista",
                            "Filtra elementos",
                            "Ordena la lista",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que retorna list(map(str, [1, 2, 3]))?",
                        options: [
                            "[1, 2, 3]",
                            "['1', '2', '3']",
                            "['123']",
                            "Error",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es mas pythonico: map con lambda o comprension de lista?",
                        options: [
                            "Siempre map",
                            "Comprension de lista es generalmente preferida",
                            "Siempre lambda",
                            "Son igual de rapidos",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna reduce(lambda a, b: a + b, [1,2,3,4])?",
                        options: ["10", "24", "[1,2,3,4]", "Error"],
                        correct: 0,
                    },
                    {
                        q: "Que pasa si filter() recibe None como funcion de filtro?",
                        options: [
                            "Filtra todo",
                            "Filtra nada",
                            "Elimina los falsy",
                            "Error",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que retorna list(map(lambda x,y: x+y, [1,2], [3,4]))?",
                        options: [
                            "[4, 6]",
                            "[1, 3, 2, 4]",
                            "[3, 6]",
                            "Error",
                        ],
                        correct: 0,
                    },
                ],
                "13": [
                    {
                        q: "Que retorna open('archivo.txt', 'r')?",
                        options: [
                            "El contenido del archivo",
                            "Un objeto archivo (file handle)",
                            "Una lista de lineas",
                            "Un string",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Para que sirve la sentencia with en archivos?",
                        options: [
                            "Abre el archivo permanentemente",
                            "Cierra el archivo automaticamente al salir del bloque",
                            "Hace backup del archivo",
                            "Bloquea el archivo para otros procesos",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que modo de apertura crea el archivo si no existe?",
                        options: ["'r'", "'x'", "'w'", "'a'"],
                        correct: 2,
                    },
                    {
                        q: "Que diferencia hay entre 'w' y 'a'?",
                        options: [
                            "Son iguales",
                            "'w' sobreescribe, 'a' agrega al final",
                            "'a' sobreescribe, 'w' agrega al final",
                            "'w' solo lee, 'a' escribe",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna read() en un archivo?",
                        options: [
                            "Una linea",
                            "Todo el contenido como string",
                            "Una lista de lineas",
                            "Un bytes object",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna readlines()?",
                        options: [
                            "Un string con todo el archivo",
                            "Una lista de lineas",
                            "Una tupla de lineas",
                            "Un generador",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que pasa si intentas leer un archivo en modo 'w'?",
                        options: [
                            "Lee normalmente",
                            "Lanza IOError o UnsupportedOperation",
                            "Retorna vacio",
                            "Crea el archivo primero",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna 'rb' en open()?",
                        options: [
                            "Lee en modo texto",
                            "Lee en modo binario",
                            "Escribe en binario",
                            "Lee y escribe en binario",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Para leer archivos linea por linea eficientemente se usa:",
                        options: [
                            "read() y splitlines()",
                            "Iterar directamente sobre el objeto archivo",
                            "readlines()",
                            "read(1024) en bucle",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna tell() en un archivo?",
                        options: [
                            "El tamano total del archivo",
                            "La posicion actual del puntero",
                            "El numero de lineas",
                            "True si esta abierto",
                        ],
                        correct: 1,
                    },
                ],
                "14": [
                    {
                        q: "Que sucede cuando ocurre una excepcion no manejada?",
                        options: [
                            "El programa continua",
                            "El programa termina con traceback",
                            "Se ignora el error",
                            "Se guarda en un log",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace finally en un bloque try/except?",
                        options: [
                            "Se ejecuta solo si hay error",
                            "Se ejecuta siempre, haya error o no",
                            "Se ejecuta solo si no hay error",
                            "Reinicia el programa",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna try: x = 1/0 except ZeroDivisionError: x = 0; x?",
                        options: ["Error", "1", "0", "None"],
                        correct: 2,
                    },
                    {
                        q: "Para que sirve raise?",
                        options: [
                            "Captura excepciones",
                            "Lanza una excepcion manualmente",
                            "Ignora excepciones",
                            "Registra errores",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que excepcion se lanza al dividir por cero?",
                        options: [
                            "ValueError",
                            "ZeroDivisionError",
                            "ArithmeticError",
                            "RuntimeError",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna try: x = int('abc') except ValueError as e: x = str(e); x?",
                        options: [
                            "0",
                            "invalid literal",
                            "abc",
                            "Error",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es un bloque else en try/except?",
                        options: [
                            "Se ejecuta si hay excepcion",
                            "Se ejecuta si NO hay excepcion",
                            "Se ejecuta siempre",
                            "Es invalido en Python",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que excepcion lanza 'hola' + 5?",
                        options: [
                            "TypeError",
                            "ValueError",
                            "NameError",
                            "SyntaxError",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que permite la clausula 'as' en except?",
                        options: [
                            "Crear un alias para el archivo",
                            "Capturar la instancia de la excepcion",
                            "Renombrar la excepcion",
                            "Crear una nueva excepcion",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace una excepcion personalizada con class MiError(Exception)?",
                        options: [
                            "Nada, es solo documentacion",
                            "Permite crear excepciones con logica propia",
                            "Reemplaza todas las excepciones",
                            "Error de sintaxis",
                        ],
                        correct: 1,
                    },
                ],
                "15": [
                    {
                        q: "Que hace __init__ en una clase?",
                        options: [
                            "Destruye el objeto",
                            "Inicializa los atributos del objeto al crearlo",
                            "Imprime el objeto",
                            "Crea metodos estaticos",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es self en metodos de clase?",
                        options: [
                            "La clase misma",
                            "Una referencia a la instancia actual",
                            "Un parametro opcional",
                            "Una variable global",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Como se crea una instancia de class Perro: pass?",
                        options: [
                            "Perro()",
                            "new Perro()",
                            "create Perro()",
                            "Perro.new()",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que es un atributo de instancia?",
                        options: [
                            "Una variable definida en la clase",
                            "Una variable unica para cada objeto",
                            "Una constante",
                            "Un metodo estatico",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es un atributo de clase?",
                        options: [
                            "Una variable comun a todas las instancias",
                            "Una variable privada",
                            "Una constante global",
                            "Un tipo de dato",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que retorna type(mi_objeto)?",
                        options: [
                            "object",
                            "La clase del objeto",
                            "instance",
                            "None",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace un metodo como __str__(self)?",
                        options: [
                            "Retorna el hash del objeto",
                            "Define la representacion en string del objeto",
                            "Compara dos objetos",
                            "Elimina el objeto",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es un metodo estatico?",
                        options: [
                            "Un metodo que no recibe self",
                            "Un metodo que solo puede llamarse en estatica",
                            "Un metodo privado",
                            "Un metodo que retorna None",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que pasa si llamas un metodo sin crear instancia primero?",
                        options: [
                            "Funciona igual",
                            "Lanza TypeError o AttributeError",
                            "Crea una instancia automaticamente",
                            "Retorna None",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Para que sirve __repr__(self)?",
                        options: [
                            "Mostrar al usuario",
                            "Representacion no ambigua del objeto para desarrolladores",
                            "Convertir a JSON",
                            "Comparar objetos",
                        ],
                        correct: 1,
                    },
                ],
                "16": [
                    {
                        q: "Que es herencia en POO?",
                        options: [
                            "Copiar metodos",
                            "Una clase hija reutiliza atributos/metodos de una clase padre",
                            "Crear objetos",
                            "Definir interfaces",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace super() en una clase hija?",
                        options: [
                            "Crea una nueva clase",
                            "Llama metodos de la clase padre",
                            "Elimina atributos del padre",
                            "Retorna la clase padre",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es polimorfismo?",
                        options: [
                            "Crear multiples constructores",
                            "Objetos de diferentes clases responden al mismo metodo de forma diferente",
                            "Multiples herencias",
                            "Metodos privados",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorna isinstance(obj, MiClase) si obj es de tipo MiClase?",
                        options: ["False", "True", "None", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que es sobreescritura (override) de metodos?",
                        options: [
                            "Crear metodos nuevos",
                            "Redefinir un metodo del padre en la clase hija",
                            "Eliminar metodos",
                            "Llamar a todos los padres",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que hace class Hija(Padre):?",
                        options: [
                            "Hija hereda de Padre",
                            "Padre hereda de Hija",
                            "Son clases independientes",
                            "Error de sintaxis",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que es una clase abstracta?",
                        options: [
                            "Una clase que no se puede instanciar directamente",
                            "Una clase sin metodos",
                            "Una clase privada",
                            "Una clase base",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que retorna issubclass(Hija, Padre) si Hija hereda de Padre?",
                        options: ["False", "True", "None", "Error"],
                        correct: 1,
                    },
                    {
                        q: "Que es composicion vs herencia?",
                        options: [
                            "Son lo mismo",
                            "Composicion usa objetos como atributos, herencia usa clases padres",
                            "Herencia es mejor que composicion",
                            "Composicion no existe en Python",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que pasaría si Hija define __init__ sin llamar a super().__init__()?",
                        options: [
                            "Funciona igual",
                            "Los atributos del padre no se inicializan",
                            "Error de sintaxis",
                            "Python lo hace automaticamente",
                        ],
                        correct: 1,
                    },
                ],
                "17": [
                    {
                        q: "En un proyecto calculadora, que patron se usa para las operaciones?",
                        options: [
                            "Metodos estaticos o funciones separadas por operacion",
                            "Un solo metodo con if/elif",
                            "Metodos de clase",
                            "Diccionario de operadores",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Como se valida entrada numerica en una calculadora?",
                        options: [
                            "Con input() directo",
                            "Con try/except ValueError al convertir",
                            "Con type()",
                            "Con isinstance()",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que patron de diseno se aplica a una calculadora extensible?",
                        options: [
                            "Patron Strategy para operaciones",
                            "Patron Singleton",
                            "Patron Observer",
                            "Patron Factory",
                        ],
                        correct: 0,
                    },
                    {
                        q: "En un calculadora, que estructura almacena el historial?",
                        options: [
                            "Una lista de diccionarios",
                            "Una cadena de texto",
                            "Un entero",
                            "Un set",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que patron ayuda a agregar nuevas operaciones sin modificar el codigo existente?",
                        options: [
                            "Open/Closed Principle",
                            "Singleton",
                            "Constructor",
                            "Duck Typing",
                        ],
                        correct: 0,
                    },
                    {
                        q: "En Python, como representarias una operacion como objeto?",
                        options: [
                            "Usando una funcion lambda",
                            "Usando una clase con metodo execute()",
                            "Usando una tupla",
                            "Usando un entero",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es mejor para una calculadora: funciones o metodos de clase?",
                        options: [
                            "Funciones simples, metodos si se necesita estado",
                            "Siempre clases",
                            "Siempre funciones",
                            "Ninguna de las anteriores",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Para que sirve eval() en una calculadora?",
                        options: [
                            "Evalua expresiones matematicas de forma segura",
                            "Es la forma segura y recomendada",
                            "No se debe usar en produccion",
                            "Solo para string parsing",
                        ],
                        correct: 2,
                    },
                    {
                        q: "Que valida una calculadora antes de mostrar resultado?",
                        options: [
                            "Que el resultado sea un numero valido",
                            "Que no haya errores de division por cero",
                            "Que los operandos sean numericos",
                            "Todas las anteriores",
                        ],
                        correct: 3,
                    },
                    {
                        q: "Que patrón usa una calculadora para mantener el historial de operaciones?",
                        options: [
                            "Command Pattern",
                            "Observer Pattern",
                            "Factory Pattern",
                            "Strategy Pattern",
                        ],
                        correct: 0,
                    },
                ],
                "18": [
                    {
                        q: "En un task manager, que estructura almacena las tareas?",
                        options: [
                            "Una lista de diccionarios",
                            "Una cadena de texto",
                            "Una matriz",
                            "Un set",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que campo es esencial para cada tarea en un gestor de tareas?",
                        options: [
                            "Solo el titulo",
                            "Titulo, estado y prioridad",
                            "Solo la fecha",
                            "Solo el id",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que patron de diseno aplica un task manager para operaciones CRUD?",
                        options: [
                            "Repository Pattern",
                            "Singleton",
                            "Observer",
                            "Decorator",
                        ],
                        correct: 0,
                    },
                    {
                        q: "En Python, como persistir tareas en archivo?",
                        options: [
                            "Usar pickle o json.dump",
                            "Usar print()",
                            "Usar sys.stdout",
                            "Usar eval()",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que validacion es critica al agregar una tarea?",
                        options: [
                            "Que el titulo no este vacio",
                            "Que la fecha sea futura",
                            "Que tenga descripcion",
                            "Que tenga prioridad maxima",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que es mejor para buscar tareas por estado: for con filtro o list comprehension?",
                        options: [
                            "Ambas funcionan, comprension es mas pythonica",
                            "Siempre for",
                            "Siempre comprension",
                            "Ninguna",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que estructura representa un filtro de tareas por prioridad?",
                        options: [
                            "Comprension de lista con condicion",
                            "Metodo sort",
                            "Funcion max",
                            "Diccionario",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Como se identifica una tarea de forma unica?",
                        options: [
                            "Por su titulo",
                            "Por un ID unico o timestamp",
                            "Por su indice en la lista",
                            "Por su prioridad",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que metodo de archivo se usa para guardar tareas como JSON?",
                        options: [
                            "json.dump()",
                            "json.load()",
                            "json.read()",
                            "json.save()",
                        ],
                        correct: 0,
                    },
                    {
                        q: "En un task manager, que convierte el estado de la tarea en colores en la terminal?",
                        options: [
                            "Diccionario que mapea estados a codigos ANSI",
                            "print() con colores directos",
                            "Libreria colorama exclusivamente",
                            "No se puede",
                        ],
                        correct: 0,
                    },
                ],
                "19": [
                    {
                        q: "Que libreria es comun para hacer web scraping en Python?",
                        options: [
                            "BeautifulSoup y requests",
                            "os y sys",
                            "json y csv",
                            "tkinter",
                        ],
                        correct: 0,
                    },
                    {
                        q: "Que retorna requests.get(url).status_code si la peticion es exitosa?",
                        options: ["404", "200", "500", "301"],
                        correct: 1,
                    },
                    {
                        q: "Que hace BeautifulSoup para parsear HTML?",
                        options: [
                            "Lo ejecuta como codigo",
                            "Crea un arbol de elementos navegable",
                            "Lo convierte a PDF",
                            "Lo comprime",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que selector CSS busca todos los parrafos?",
                        options: [
                            "soup.select('div')",
                            "soup.select('p')",
                            "soup.select('a')",
                            "soup.select('class')",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Para que sirve time.sleep() en scraping?",
                        options: [
                            "Para que el servidor responda",
                            "Para no sobrecargar el servidor con peticiones",
                            "Para esperar que cargue la pagina",
                            "Para medir tiempos de respuesta",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que cabecera HTTP identifica al user agent?",
                        options: [
                            "Accept",
                            "User-Agent",
                            "Content-Type",
                            "Authorization",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que retorno esperas de soup.find('tag')?",
                        options: [
                            "Una lista",
                            "El primer elemento encontrado o None",
                            "Todos los elementos",
                            "Un entero",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Para que sirve requests.exceptions.RequestException?",
                        options: [
                            "Crear peticiones HTTP",
                            "Manejar errores de conexion y red",
                            "Parsear HTML",
                            "Convertir JSON",
                        ],
                        correct: 1,
                    },
                    {
                        q: "Que es un sitio que usa JavaScript dinamico y como lo scrapeas?",
                        options: [
                            "BeautifulSoup es suficiente",
                            "Necesitas Selenium o Playwright para renderizar JS",
                            "requests es suficiente",
                            "No se puede hacer scraping ahi",
                        ],
                        correct: 1,
                    },
                    {
                        q: "En scraping, que patron es etico y legal?",
                        options: [
                            "Scrapear todo sin restricciones",
                            "Respetar robots.txt y limitar velocidad de peticiones",
                            "Ignorar los ToS siempre",
                            "Usar proxys para evadir bans",
                        ],
                        correct: 1,
                    },
                ],
            };

            const titles = {
                "01": "Print, Sintaxis y Comentarios",
                "02": "Variables y Tipos de Datos",
                "03": "Operadores",
                "04": "Entrada del Usuario y Formateo",
                "05": "Condicionales (if/elif/else)",
                "06": "Bucles (for, while, range)",
                "07": "Patrones de Bucles",
                "08": "Listas",
                "09": "Diccionarios",
                "10": "Tuplas y Sets",
                "11": "Funciones",
                "12": "Lambda, Map, Filter, Reduce",
                "13": "Archivos",
                "14": "Manejo de Excepciones",
                "15": "Clases y Objetos",
                "16": "Herencia y Polimorfismo",
                "17": "Proyecto Calculadora",
                "18": "Proyecto Gestor de Tareas",
                "19": "Proyecto Web Scraper",
            };

            this.moduleTitle = titles[this.moduleId] || "Modulo " + this.moduleId;
            return bank[this.moduleId] || [];
        }

        render(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            this.timeLeft = this.timerDuration;
            this.startTimer();

            container.innerHTML = this.buildHTML(containerId);
            this.bindEvents(containerId);
            this.renderQuestion(containerId);
        }

        buildHTML(containerId) {
            return `
                <div class="quiz-container">
                    <div class="quiz-header">
                        <span class="quiz-title">Quiz: ${this.moduleTitle}</span>
                        <span class="quiz-timer" id="quiz-timer">${this.formatTime(this.timeLeft)}</span>
                    </div>
                    <div class="quiz-progress" id="quiz-progress">Pregunta 1 de ${this.questions.length}</div>
                    <div class="quiz-question" id="quiz-question"></div>
                    <div class="quiz-nav">
                        <button class="exercise-btn" id="quiz-prev">← Anterior</button>
                        <button class="exercise-btn exercise-btn-verify" id="quiz-next">Siguiente →</button>
                    </div>
                </div>
            `;
        }

        renderQuestion(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const q = this.questions[this.currentQ];
            const letters = ["A", "B", "C", "D"];

            const questionEl = container.querySelector("#quiz-question");
            const progressEl = container.querySelector("#quiz-progress");
            const prevBtn = container.querySelector("#quiz-prev");
            const nextBtn = container.querySelector("#quiz-next");

            if (progressEl) {
                progressEl.textContent = `Pregunta ${this.currentQ + 1} de ${this.questions.length}`;
            }

            if (prevBtn) {
                prevBtn.style.visibility = this.currentQ === 0 ? "hidden" : "visible";
            }

            if (nextBtn) {
                nextBtn.textContent =
                    this.currentQ === this.questions.length - 1
                        ? "Finalizar"
                        : "Siguiente →";
            }

            if (!questionEl) return;

            const selected = this.answers[this.currentQ];

            let optionsHTML = "";
            q.options.forEach((opt, i) => {
                const selectedClass = selected === i ? " quiz-option-selected" : "";
                optionsHTML += `
                    <div class="quiz-option${selectedClass}" data-index="${i}">
                        <span class="quiz-option-letter">${letters[i]}</span>
                        <span>${opt}</span>
                    </div>
                `;
            });

            questionEl.innerHTML = `
                <div class="quiz-question-text">${this.currentQ + 1}. ${q.q}</div>
                <div class="quiz-options">${optionsHTML}</div>
            `;
        }

        bindEvents(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.addEventListener("click", (e) => {
                const option = e.target.closest(".quiz-option");
                if (option && !this.finished) {
                    const index = parseInt(option.dataset.index);
                    this.answers[this.currentQ] = index;
                    this.renderQuestion(containerId);
                }
            });

            const prevBtn = container.querySelector("#quiz-prev");
            const nextBtn = container.querySelector("#quiz-next");

            if (prevBtn) {
                prevBtn.addEventListener("click", () => {
                    if (this.currentQ > 0) {
                        this.currentQ--;
                        this.renderQuestion(containerId);
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener("click", () => {
                    if (this.currentQ < this.questions.length - 1) {
                        this.currentQ++;
                        this.renderQuestion(containerId);
                    } else {
                        this.submit(containerId);
                    }
                });
            }
        }

        startTimer() {
            this.stopTimer();
            this.timer = setInterval(() => {
                this.timeLeft--;
                const timerEl = document.getElementById("quiz-timer");
                if (timerEl) {
                    timerEl.textContent = this.formatTime(this.timeLeft);
                }
                if (this.timeLeft <= 0) {
                    this.stopTimer();
                    this.submit(
                        Object.keys(this.answers).length > 0
                            ? this.currentQ
                            : 0
                    );
                }
            }, 1000);
        }

        stopTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }

        formatTime(seconds) {
            const m = Math.floor(Math.max(0, seconds) / 60);
            const s = Math.max(0, seconds) % 60;
            return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        }

        submit(containerId) {
            this.finished = true;
            this.stopTimer();

            let score = 0;
            this.questions.forEach((q, i) => {
                if (this.answers[i] === q.correct) {
                    score++;
                }
            });

            const total = this.questions.length;
            const percentage = Math.round((score / total) * 100);
            const passed = percentage >= 70;

            const result = {
                moduleId: this.moduleId,
                score: score,
                total: total,
                passed: passed,
            };

            window.__quizResult = result;

            if (passed && typeof window.__quizPassed === "function") {
                window.__quizPassed(this.moduleId);
            }

            this.showResults(containerId, result, percentage);
        }

        showResults(containerId, result, percentage) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const messageClass = result.passed ? "quiz-pass" : "quiz-fail";
            const message = result.passed
                ? "Aprobado"
                : "No aprobado";

            let reviewHTML = "";
            const letters = ["A", "B", "C", "D"];

            this.questions.forEach((q, i) => {
                const userAnswer = this.answers[i];
                const isCorrect = userAnswer === q.correct;
                const statusClass = isCorrect ? "quiz-review-correct" : "quiz-review-incorrect";
                const statusIcon = isCorrect ? "+" : "X";

                let optionDetails = "";
                q.options.forEach((opt, j) => {
                    let marker = "";
                    if (j === q.correct) marker = " (correcta)";
                    if (j === userAnswer && j !== q.correct) marker = " (tu respuesta)";
                    optionDetails += `<div class="quiz-review-option${j === q.correct ? " quiz-review-correct-opt" : ""}${j === userAnswer && j !== q.correct ? " quiz-review-wrong-opt" : ""}">${letters[j]}. ${opt}${marker}</div>`;
                });

                reviewHTML += `
                    <div class="quiz-review-item ${statusClass}">
                        <div class="quiz-review-header">
                            <span class="quiz-review-icon">[${statusIcon}]</span>
                            <span>${i + 1}. ${q.q}</span>
                        </div>
                        ${optionDetails}
                    </div>
                `;
            });

            container.innerHTML = `
                <div class="quiz-container">
                    <div class="quiz-header">
                        <span class="quiz-title">Quiz: ${this.moduleTitle}</span>
                        <span class="quiz-timer quiz-timer-done">00:00</span>
                    </div>
                    <div class="quiz-results">
                        <div class="quiz-score">
                            <span class="quiz-score-number">${result.score}</span>
                            <span class="quiz-score-divider">/</span>
                            <span class="quiz-score-total">${result.total}</span>
                        </div>
                        <div class="quiz-percentage">${percentage}%</div>
                        <div class="quiz-result-message ${messageClass}">${message}</div>
                        <div class="quiz-review">${reviewHTML}</div>
                        ${!result.passed ? '<button class="exercise-btn exercise-btn-verify quiz-retry" id="quiz-retry">Reintentar</button>' : ""}
                    </div>
                </div>
            `;

            if (!result.passed) {
                const retryBtn = container.querySelector("#quiz-retry");
                if (retryBtn) {
                    retryBtn.addEventListener("click", () => {
                        this.reset(containerId);
                    });
                }
            }
        }

        reset(containerId) {
            this.currentQ = 0;
            this.answers = {};
            this.finished = false;
            this.render(containerId);
        }
    }

    window.__quizPassed = function (moduleId) {};
    window.__quizResult = null;

    document.addEventListener("DOMContentLoaded", () => {
        const body = document.body;
        const moduleId = body.dataset.module;
        if (!moduleId) return;
        const container = document.getElementById("quiz-container");
        if (!container) return;
        const quiz = new QuizManager(moduleId);
        quiz.render("quiz-container");
    });
})();
