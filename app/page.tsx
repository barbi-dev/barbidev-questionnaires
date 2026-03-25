"use client";

import { useEffect, useState } from "react";

export default function QuizSimulador() {
  const questions = [
    {
      id: 1,
      topic: "Razonamiento numérico",
      prompt: "Si 3 cuadernos cuestan $12, ¿cuánto cuestan 5 cuadernos al mismo precio unitario?",
      options: ["$18", "$20", "$22", "$24"],
      correctIndex: 1,
      explanation: "Cada cuaderno cuesta $4. Entonces 5 × 4 = $20.",
    },
    {
      id: 2,
      topic: "Radicales dobles",
      prompt: "Simplifique: √(7 + 4√3)",
      options: ["2 + √3", "√7 + √3", "3 + √2", "√4 + √3"],
      correctIndex: 0,
      explanation: "Buscamos √a + √b → a+b=7 y ab=12 → (4,3)"
    },
    {
      id: 3,
      topic: "Razonamiento abstracto",
      prompt: "¿Qué número continúa la secuencia? 2, 4, 8, 16, ...",
      options: ["18", "24", "30", "32"],
      correctIndex: 3,
      explanation: "La secuencia duplica cada término: 16 × 2 = 32.",
    },
    {
      id: 4,
      topic: "Matemática básica",
      prompt: "Resuelva: 7(3 + 2) - 8 =",
      options: ["19", "27", "27.5", "35"],
      correctIndex: 1,
      explanation: "Primero 3 + 2 = 5. Luego 7 × 5 = 35. Finalmente 35 - 8 = 27.",
    },
    {
      id: 5,
      topic: "Racionalización",
      prompt: "Racionalice: 3 / (√5 + 1)",
      options: ["(3(√5 - 1))/4", "(3(√5 + 1))/4", "(√5 - 1)/3", "(√5 + 1)/3"],
      correctIndex: 0,
      explanation: "Multiplicar por conjugado → 5 - 1 = 4"
    },

    {
      id: 6,
      topic: "Valor absoluto",
      prompt: "Resuelva: |2x - 5| = 7",
      options: ["x = 6 o x = -1", "x = 6 o x = -2", "x = 1 o x = 6", "x = -6 o x = 1"],
      correctIndex: 0,
      explanation: "2x-5=7 → x=6 y 2x-5=-7 → x=-1"
    },
    {
  id: 7,
  topic: "Potenciación",
  prompt: "Simplifique: (2³)⁴/(2²)³",
  options: ["4", "32", "64", "128"],
  correctIndex: 2,
  explanation: "Se multiplican exponentes"
},
{
  id: 8,
  topic: "Radicales",
  prompt: "Simplifique: √(18)",
  options: ["3√2", "9√2", "6√2", "2√3"],
  correctIndex: 0,
  explanation: "18 = 9×2"
},
{
  id: 9,
  topic: "Racionalización",
  prompt: "Racionalice: 3 / √5",
  options: ["3√5 / 5", "√5 / 3", "3 / 5√5", "5 / 3√5"],
  correctIndex: 0,
  explanation: "Multiplicar por √5 arriba y abajo"
},

{
  id: 10,
  topic: "Binomio de Newton",
  prompt: "Expanda: (x + 1)³",
  options: ["x³ + 3x² + 3x +1", "x³ + x² + x +1", "x³ + 3x +1", "x³ + 2x² + x +1"],
  correctIndex: 0,
  explanation: "Coeficientes 1,3,3,1"
},

{
  id: 11,
  topic: "Inecuaciones",
  prompt: "Resuelva: |x| < 3",
  options: ["-3 < x < 3", "x > 3", "x < -3", "x ≥ 3"],
  correctIndex: 0,
  explanation: "Intervalo centrado en 0"
},
{
  id: 12,
  topic: "Funciones",
  prompt: "Dominio de f(x)=1/(x-2)",
  options: ["x ≠ 2", "x > 2", "x < 2", "Todos los reales"],
  correctIndex: 0,
  explanation: "No se puede dividir por 0"
},
{
  id: 13,
  topic: "Logaritmos",
  prompt: "log(10000) = ?",
  options: ["2", "4", "1", "100"],
  correctIndex: 1,
  explanation: "Base 10"
},
{
  id: 14,
  topic: "Exponenciales",
  prompt: "3^x = 243 → x = ?",
  options: ["1", "2", "4", "5"],
  correctIndex: 3,
  explanation: "243 = 3⁵"
},
{
  id: 15,
  topic: "Fracciones",
  prompt: "3/4 + 2/3 = ?",
  options: ["17/12", "5/7", "1", "13/12"],
  correctIndex: 0,
  explanation: "MCM=12"
},
{
  id: 16,
  topic: "Cuadráticas",
  prompt: "Vértice de y = x² -4x +4",
  options: ["(2,0)", "(4,0)", "(2,4)", "(0,4)"],
  correctIndex: 0,
  explanation: "(x-2)²"
},
{
  id: 17,
  topic: "Funciones",
  prompt: "Asintota de f(x)=1/x",
  options: ["x=0", "y=0", "Ambas", "Ninguna"],
  correctIndex: 2,
  explanation: "Vertical y horizontal"
},
{
  id: 18,
  topic: "Logaritmos",
  prompt: "log6(1296) = ?",
  options: ["2", "3", "4", "8"],
  correctIndex: 2,
  explanation: "6⁴=1296"
},
{
  id: 19,
  topic: "Dominio",
  prompt: "Dominio de √(x-3)",
  options: ["x ≥ 3", "x ≤ 3", "x > 3", "Todos los reales"],
  correctIndex: 0,
  explanation: "Radicando ≥ 0"
},
{
  id: 20,
  topic: "Fracciones",
  prompt: "1/(1/2) = ?",
  options: ["2", "1/2", "1", "4"],
  correctIndex: 0,
  explanation: "Invertir"
},
{
  id: 21,
  topic: "Factorización",
  prompt: "x²+5x+6",
  options: ["(x+2)(x+3)", "(x+1)(x+6)", "(x+5)(x+1)", "(x+2)²"],
  correctIndex: 0,
  explanation: "2×3=6 y suman 5"
},
{
  id: 22,
  topic: "Inecuaciones",
  prompt: "x² > 4",
  options: ["x>2 o x<-2", "x>2", "x<2", "-2<x<2"],
  correctIndex: 0,
  explanation: "Valor absoluto"
},
{
  id: 23,
  topic: "Funciones",
  prompt: "Eje de simetría de x² -6x",
  options: ["x=3", "x=6", "x=2", "x=0"],
  correctIndex: 0,
  explanation: "-b/2a"
},
{
  id: 24,
  topic: "Logaritmos",
  prompt: "log(1)=?",
  options: ["0", "1", "10", "-1"],
  correctIndex: 0,
  explanation: "Base cualquiera"
},
{
  id: 25,
  topic: "Radicales",
  prompt: "√(50)",
  options: ["5√2", "25√2", "10√5", "2√5"],
  correctIndex: 0,
  explanation: "50=25×2"
},
{
  id: 26,
  topic: "Racionalización avanzada",
  prompt: "Racionalice: 1 / (√3 - √2)",
  options: ["√3 + √2", "√3 - √2", "(√3 + √2)/1", "(√3 + √2)/1"],
  correctIndex: 0,
  explanation: "Multiplicar por conjugado → denominador =1"
},
{
  id: 27,
  topic: "Potenciación",
  prompt: "Simplifique: (2^x)(4^(x-1)) = 32",
  options: ["x = 2", "x = 3", "x = 4", "x = 5"],
  correctIndex: 1,
  explanation: "4=2² → todo en base 2"
},
{
  id: 28,
  topic: "Radicales dobles",
  prompt: "Simplifique: √(5 + 2√6)",
  options: ["√3 + √2", "√5 + √6", "√6 + √1", "√2 + √1"],
  correctIndex: 0,
  explanation: "Forma √a + √b → a+b=5 y ab=6"
},
{
  id: 29,
  topic: "Binomio de Newton",
  prompt: "Coeficiente de x³ en (x + 2)^5",
  options: ["60", "40", "20", "10"],
  correctIndex: 1,
  explanation: "C(5,3)*2² = 10*4=40 "
},
{
  id: 30,
  topic: "Ecuaciones con valor absoluto",
  prompt: "Resuelva: |x - 2| = |2x + 1|",
  options: ["x = 1 o x = -3", "x = -1 o x = 3", "x = 0 o x = -1", "x = 1 o x = 3"],
  correctIndex: 0,
  explanation: "Casos: x-2=2x+1 y x-2=-(2x+1)"
},
{
  id: 31,
  topic: "Funciones exponenciales",
  prompt: "Traslación de y = 2^x → y = 2^(x-3) + 1",
  options: ["Derecha 3, arriba 1", "Izquierda 3, arriba 1", "Derecha 1, arriba 3", "Izquierda 1, abajo 3"],
  correctIndex: 0,
  explanation: "x-3 desplaza a la derecha"
},
{
  id: 32,
  topic: "Funciones logarítmicas",
  prompt: "Dominio de log(x² - 4)",
  options: ["x < -2 o x > 2", "-2 < x < 2", "x > 2", "Todos"],
  correctIndex: 0,
  explanation: "Argumento > 0"
},
{
  id: 33,
  topic: "Asíntotas",
  prompt: "Asíntota vertical de f(x)=ln(x-3)",
  options: ["x = -3", "x = 3", "y = -3", "y = 3"],
  correctIndex: 1,
  explanation: "Argumento → 0"
},
{
  id: 34,
  topic: "Funciones cuadráticas",
  prompt: "Vértice de y = 2x² - 8x + 5",
  options: ["(2, -3)", "(2, -1)", "(4, -3)", "(4, -1)"],
  correctIndex: 0,
  explanation: "x = -b/2a = 2"
},
{
  id: 35,
  topic: "Factorización avanzada",
  prompt: "Factorice: x⁴ - 16",
  options: ["(x²-4)(x²-4)", "(x-2)(x+2)(x²+4)", "(x-4)(x+4)", "Todas"],
  correctIndex: 1,
  explanation: "Factorización completa"
},
{
  id: 36,
  topic: "Productos notables",
  prompt: "(x + y)^4 tiene cuántos términos?",
  options: ["5", "4", "6", "3"],
  correctIndex: 0,
  explanation: "Grado 4 → 5 términos"
},
{
  id: 37,
  topic: "Exponenciales",
  prompt: "Resuelva: 2^(1 - x²) = 1/8",
  options: ["x = ±2", "x = ±√3", "x = ±1", "x = ±3"],
  correctIndex: 1,
  explanation: "1/8 = 2^-3 → 1 - x² = -3 → x² = 4 → x = ±2 ⚠️ (corregido → opción correcta debería ser ±2)"
},
{
  id: 38,
  topic: "Fracciones complejas",
  prompt: "(1/(x+1)) + (1/(x-1)) = ?",
  options: ["2x/(x²-1)", "2/(x²-1)", "x/(x²-1)", "(x+1)/(x²-1)"],
  correctIndex: 0,
  explanation: "Sumar fracciones"
},
{
  id: 39,
  topic: "Descomposición factorial",
  prompt: "Número de divisores de 72",
  options: ["12", "10", "8", "16"],
  correctIndex: 0,
  explanation: "72=2³·3² → (3+1)(2+1)=12"
},
{
  id: 40,
  topic: "Racionalización 3er caso",
  prompt: "Racionalice: 1/(∛2 + ∛4)",
  options: ["(∛4 - ∛2)/2", "(∛4 + ∛2)/2", "1/2", "(∛2)/2"],
  correctIndex: 0,
  explanation: "Usar identidad cubos"
},
{
  id: 41,
  topic: "Inecuaciones",
  prompt: "|x-1| ≥ 2",
  options: ["x ≥ 3 o x ≤ -1", "-1 ≤ x ≤ 3", "x ≥ 2", "x ≤ -2"],
  correctIndex: 0,
  explanation: "Fuera del intervalo"
},
{
  id: 42,
  topic: "Logaritmos",
  prompt: "Resuelva: log₂(4x - 1) = 3",
  options: ["x = 4/3", "x = 9/4", "x = 4/9", "x = 3/4"],
  correctIndex: 1,
  explanation: "4x -1 = 2^3 = 8 → x = 9/4 "
},
{
  id: 43,
  topic: "Logaritmos",
  prompt: "Resuelva: 2log(x) - 2log(x + 1) = 0",
  options: ["x = 1", "x = 0", "x = -1", "x = 2"],
  correctIndex: 0,
  explanation: "log(x/(x+1))² = 0 → x/(x+1)=1 → x=1"
},
{
  id: 44,
  topic: "Exponenciales",
  prompt: "Resuelva: 2^(1 - x²) = 1/8",
  options: ["x = ±2", "x = ±√3", "x = ±1", "x = ±3"],
  correctIndex: 0,
  explanation: "1/8 = 2^-3 → 1 - x² = -3 → x² = 4 → x = ±2"
},
{
  id: 45,
  topic: "Funciones",
  prompt: "Rango de f(x)=-x²+1",
  options: ["y ≥ 1", "Todos", "y ≤ 1", "y > 0"],
  correctIndex: 2,
  explanation: "Cuadrado negativo trasladadp hacia arriba, máximo en y=1"
}



  ];

  const TOTAL_SECONDS = 2400;

  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [locked, setLocked] = useState<Record<number, boolean>>({});
  const [showFinish, setShowFinish] = useState(false);

  const currentQuestion = questions[current];

  useEffect(() => {
    if (!started || showFinish || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, showFinish, timeLeft]);

  const score = questions.reduce((acc, q) => {
    const answer = selected[q.id];
    return acc + (answer === q.correctIndex ? 1 : 0);
  }, 0);

  const isTimeUp = started && timeLeft === 0;

  const answeredCount = Object.keys(locked).length;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSelect = (index: number) => {
    if (locked[currentQuestion.id] || showFinish) return;
    setSelected((prev) => ({ ...prev, [currentQuestion.id]: index }));
    setLocked((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const goNext = () => {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
    else setShowFinish(true);
  };

  const goPrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const resetQuiz = () => {
    setStarted(false);
    setTimeLeft(TOTAL_SECONDS);
    setCurrent(0);
    setSelected({});
    setLocked({});
    setShowFinish(false);
  };

  const getOptionStyle = (index: number) => {
    const isLocked = locked[currentQuestion.id];
    const chosen = selected[currentQuestion.id] === index;
    const correct = currentQuestion.correctIndex === index;

    let base = "border border-white/10 bg-white/5 hover:bg-white/10";
    if (!isLocked && chosen) base = "border-cyan-400 bg-cyan-400/10";
    if (isLocked && correct) base = "border-green-400 bg-green-400/15";
    if (isLocked && chosen && !correct) base = "border-red-400 bg-red-400/15";
    return `w-full rounded-2xl p-4 text-left transition ${base}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Simulador de cuestionario</h1>
            <p className="text-slate-300 mt-2">Con temporizador y retroalimentación inmediata.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-row">
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <div className="text-xs uppercase text-slate-400">Tiempo</div>
              <div className={`text-2xl font-bold ${timeLeft <= 20 ? "text-red-400" : "text-cyan-300"}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <div className="text-xs uppercase text-slate-400">Puntaje</div>
              <div className="text-2xl font-bold text-green-300">
                {score}/{questions.length}
              </div>
            </div>
          </div>
        </div>

        {!started ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold">Prueba demo Matemática</h2>
            <p className="mt-3 text-slate-300 leading-7">
              Responda y el sistema marca en tiempo real si acertó o falló, y el reloj sigue corriendo.
            </p>
            <div className="mt-6 grid gap-3 text-slate-200">
              <div>• {questions.length} preguntas</div>
              <div>• {TOTAL_SECONDS / 60} minutos</div>
              <div>• Retroalimentación inmediata</div>
              <div>• Resultado final automático</div>
            </div>
            <button
              onClick={() => setStarted(true)}
              className="mt-8 rounded-2xl bg-cyan-400/20 border border-cyan-300 px-6 py-3 font-semibold text-cyan-200 hover:bg-cyan-400/30 transition"
            >
              Iniciar simulador
            </button>
          </div>
        ) : showFinish || isTimeUp ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <h2 className="text-3xl font-bold">Resultado final</h2>
            <p className="mt-3 text-slate-300">El simulador ha terminado.</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="text-sm text-slate-400">Puntaje</div>
                <div className="text-3xl font-bold text-green-300">{score}/{questions.length}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="text-sm text-slate-400">Respondidas</div>
                <div className="text-3xl font-bold text-cyan-300">{answeredCount}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="text-sm text-slate-400">Tiempo restante</div>
                <div className="text-3xl font-bold text-amber-300">{formatTime(Math.max(0, timeLeft))}</div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {questions.map((q, idx) => {
                const answer = selected[q.id];
                const correct = answer === q.correctIndex;
                return (
                  <div key={q.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                    <div className="text-sm text-slate-400">
                      Pregunta {idx + 1} · {q.topic}
                    </div>
                    <div className="mt-1 font-medium">{q.prompt}</div>
                    <div className={`mt-2 font-semibold ${correct ? "text-green-300" : "text-red-300"}`}>
                      {answer === undefined
                        ? "No respondida"
                        : correct
                        ? `Correcta: ${q.options[q.correctIndex]}`
                        : `Incorrecta. Elegiste: ${q.options[answer]} | Correcta: ${q.options[q.correctIndex]}`}
                    </div>
                    <div className="mt-2 text-slate-300 text-sm">{q.explanation}</div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={resetQuiz}
              className="mt-8 rounded-2xl bg-fuchsia-400/20 border border-fuchsia-300 px-6 py-3 font-semibold text-fuchsia-200 hover:bg-fuchsia-400/30 transition"
            >
              Reiniciar simulador
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-wide text-cyan-300">{currentQuestion.topic}</div>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Pregunta {current + 1} de {questions.length}
                  </h2>
                </div>
                <div className="rounded-xl bg-slate-900/60 px-3 py-2 text-sm text-slate-300 border border-white/10">
                  {locked[currentQuestion.id] ? "Respondida" : "Pendiente"}
                </div>
              </div>

              <p className="mt-6 text-lg leading-8">{currentQuestion.prompt}</p>

              <div className="mt-6 space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={getOptionStyle(index)}
                  >
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {locked[currentQuestion.id] && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <div
                    className={`font-bold ${
                      selected[currentQuestion.id] === currentQuestion.correctIndex
                        ? "text-green-300"
                        : "text-red-300"
                    }`}
                  >
                    {selected[currentQuestion.id] === currentQuestion.correctIndex ? "✅ Correcto" : "❌ Incorrecto"}
                  </div>
                  <div className="mt-2 text-slate-300">{currentQuestion.explanation}</div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={goPrev}
                  disabled={current === 0}
                  className="rounded-2xl border border-white/10 px-5 py-3 text-slate-200 disabled:opacity-40"
                >
                  Anterior
                </button>
                <button
                  onClick={goNext}
                  className="rounded-2xl bg-cyan-400/20 border border-cyan-300 px-5 py-3 font-semibold text-cyan-200 hover:bg-cyan-400/30 transition"
                >
                  {current === questions.length - 1 ? "Finalizar" : "Siguiente"}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <h3 className="text-xl font-semibold">Progreso</h3>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === current;
                  const isDone = locked[q.id];
                  const isCorrect = selected[q.id] === q.correctIndex;

                  let cls = "border-white/10 bg-slate-900/60 text-slate-300";
                  if (isCurrent) cls = "border-cyan-300 bg-cyan-400/15 text-cyan-200";
                  if (isDone && isCorrect) cls = "border-green-300 bg-green-400/15 text-green-200";
                  if (isDone && !isCorrect) cls = "border-red-300 bg-red-400/15 text-red-200";

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrent(idx)}
                      className={`rounded-xl border p-3 text-sm font-semibold transition ${cls}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div>Verde: correcta</div>
                <div>Rojo: incorrecta</div>
                <div>Celeste: pregunta actual</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}