"use client";

import { useEffect, useMemo, useState } from "react";

type Difficulty = "baja" | "media" | "alta";

type Question = {
  id: number;
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type GroupPerformance = {
  name: string;
  total: number;
  correct: number;
  percentage: number;
};

const questions: Question[] = [
  {
    id: 1,
    topic: "Razonamiento",
    subtopic: "Proporcionalidad",
    difficulty: "baja",
    prompt: "Si 3 cuadernos cuestan $12, ¿cuánto cuestan 5 cuadernos al mismo precio unitario?",
    options: ["$18", "$20", "$22", "$24"],
    correctIndex: 1,
    explanation: "Cada cuaderno cuesta $4. Entonces 5 × 4 = $20.",
  },
  {
    id: 2,
    topic: "Radicales",
    subtopic: "Radicales dobles",
    difficulty: "alta",
    prompt: "Simplifique: √(7 + 4√3)",
    options: ["2 + √3", "√7 + √3", "3 + √2", "√4 + √3"],
    correctIndex: 0,
    explanation: "Buscamos √a + √b → a+b=7 y ab=12 → (4,3)",
  },
  {
    id: 3,
    topic: "Razonamiento",
    subtopic: "Patrones numéricos",
    difficulty: "baja",
    prompt: "¿Qué número continúa la secuencia? 2, 4, 8, 16, ...",
    options: ["18", "24", "30", "32"],
    correctIndex: 3,
    explanation: "La secuencia duplica cada término: 16 × 2 = 32.",
  },
  {
    id: 4,
    topic: "Aritmética",
    subtopic: "Operaciones combinadas",
    difficulty: "baja",
    prompt: "Resuelva: 7(3 + 2) - 8 =",
    options: ["19", "27", "27.5", "35"],
    correctIndex: 1,
    explanation: "Primero 3 + 2 = 5. Luego 7 × 5 = 35. Finalmente 35 - 8 = 27.",
  },
  {
    id: 5,
    topic: "Racionalización",
    subtopic: "Caso 2",
    difficulty: "media",
    prompt: "Racionalice: 3 / (√5 + 1)",
    options: ["(3(√5 - 1))/4", "(3(√5 + 1))/4", "(√5 - 1)/3", "(√5 + 1)/3"],
    correctIndex: 0,
    explanation: "Multiplicar por conjugado → 5 - 1 = 4",
  },
  {
    id: 6,
    topic: "Valor absoluto",
    subtopic: "Ecuación con valor absoluto",
    difficulty: "media",
    prompt: "Resuelva: |2x - 5| = 7",
    options: ["x = 6 o x = -1", "x = 6 o x = -2", "x = 1 o x = 6", "x = -6 o x = 1"],
    correctIndex: 0,
    explanation: "2x-5=7 → x=6 y 2x-5=-7 → x=-1",
  },
  {
    id: 7,
    topic: "Potenciación",
    subtopic: "Leyes de exponentes",
    difficulty: "media",
    prompt: "Simplifique: (2³)⁴/(2²)³",
    options: ["4", "32", "64", "128"],
    correctIndex: 2,
    explanation: "Se multiplican exponentes",
  },
  {
    id: 8,
    topic: "Radicales",
    subtopic: "Simplificación de radicales",
    difficulty: "media",
    prompt: "Simplifique: √(18)",
    options: ["9√2", "√2", "3√2", "2√3"],
    correctIndex: 2,
    explanation: "18 = 9×2",
  },
  {
    id: 9,
    topic: "Racionalización",
    subtopic: "Caso 1",
    difficulty: "media",
    prompt: "Racionalice: 3 / √5",
    options: ["5√5 / 5", "√5 / 3", "3 / 5√5", "3√5 / 5"],
    correctIndex: 3,
    explanation: "Multiplicar por √5 arriba y abajo",
  },
  {
    id: 10,
    topic: "Binomio de Newton",
    subtopic: "Expansión binomial",
    difficulty: "media",
    prompt: "Expanda: (x + 1)³",
    options: ["x³ + 2x² + 2x +1", "x³ + 3x² + 3x +1", "x³ + 3x +1", "x³ + 2x² + x +1"],
    correctIndex: 1,
    explanation: "Coeficientes 1,3,3,1",
  },
  {
    id: 11,
    topic: "Inecuaciones",
    subtopic: "Inecuaciones con valor absoluto",
    difficulty: "media",
    prompt: "Resuelva: |x| < 3",
    options: ["-3 < x < 3", "x > 3", "x < -3", "x ≥ 3"],
    correctIndex: 0,
    explanation: "Intervalo centrado en 0",
  },
  {
    id: 12,
    topic: "Funciones",
    subtopic: "Dominio racional",
    difficulty: "media",
    prompt: "Dominio de f(x)=1/(x-2)",
    options: ["x > 2", "x < 2", "x ≠ 2", "Todos los reales"],
    correctIndex: 2,
    explanation: "No se puede dividir por 0",
  },
  {
    id: 13,
    topic: "Logaritmos",
    subtopic: "Evaluación de logaritmos",
    difficulty: "baja",
    prompt: "log(10000) = ?",
    options: ["2", "4", "1", "100"],
    correctIndex: 1,
    explanation: "Base 10",
  },
  {
    id: 14,
    topic: "Exponenciales",
    subtopic: "Ecuaciones exponenciales",
    difficulty: "media",
    prompt: "3^x = 243 → x = ?",
    options: ["1", "2", "4", "5"],
    correctIndex: 3,
    explanation: "243 = 3⁵",
  },
  {
    id: 15,
    topic: "Fracciones",
    subtopic: "Suma de fracciones",
    difficulty: "baja",
    prompt: "3/4 + 2/3 = ?",
    options: ["17/12", "5/7", "1", "13/12"],
    correctIndex: 0,
    explanation: "MCM=12",
  },
  {
    id: 16,
    topic: "Funciones cuadráticas",
    subtopic: "Vértice",
    difficulty: "media",
    prompt: "Vértice de y = x² -4x +4",
    options: ["(2,0)", "(4,0)", "(2,4)", "(0,4)"],
    correctIndex: 0,
    explanation: "(x-2)²",
  },
  {
    id: 17,
    topic: "Funciones",
    subtopic: "Asíntotas",
    difficulty: "media",
    prompt: "Asintota de f(x)=1/x",
    options: ["x=0", "y=0", "Ambas", "Ninguna"],
    correctIndex: 2,
    explanation: "Vertical y horizontal",
  },
  {
    id: 18,
    topic: "Logaritmos",
    subtopic: "Evaluación de logaritmos",
    difficulty: "media",
    prompt: "log6(1296) = ?",
    options: ["2", "3", "4", "8"],
    correctIndex: 2,
    explanation: "6⁴=1296",
  },
  {
    id: 19,
    topic: "Funciones",
    subtopic: "Dominio con radicales",
    difficulty: "media",
    prompt: "Dominio de √(x-3)",
    options: ["x ≥ 3", "x ≤ 3", "x > 3", "Todos los reales"],
    correctIndex: 0,
    explanation: "Radicando ≥ 0",
  },
  {
    id: 20,
    topic: "Fracciones",
    subtopic: "Fracción invertida",
    difficulty: "baja",
    prompt: "1/(1/2) = ?",
    options: ["1/2", "1", "2", "4"],
    correctIndex: 2,
    explanation: "Invertir",
  },
  {
    id: 21,
    topic: "Factorización",
    subtopic: "Trinomio cuadrático",
    difficulty: "media",
    prompt: "x²+5x+6",
    options: ["(x+2)(x+3)", "(x+1)(x+6)", "(x+5)(x+1)", "(x+2)²"],
    correctIndex: 0,
    explanation: "2×3=6 y suman 5",
  },
  {
    id: 22,
    topic: "Inecuaciones",
    subtopic: "Inecuación cuadrática",
    difficulty: "alta",
    prompt: "x² > 4",
    options: ["x>2 o x<-2", "x>2", "x<2", "-2<x<2"],
    correctIndex: 0,
    explanation: "Valor absoluto",
  },
  {
    id: 23,
    topic: "Funciones cuadráticas",
    subtopic: "Eje de simetría",
    difficulty: "media",
    prompt: "Eje de simetría de x² -6x",
    options: ["x=2", "x=-2", "x=-3", "x=3"],
    correctIndex: 3,
    explanation: "-b/2a",
  },
  {
    id: 24,
    topic: "Logaritmos",
    subtopic: "Evaluación de logaritmos",
    difficulty: "baja",
    prompt: "log(1)=?",
    options: ["0", "1", "10", "-1"],
    correctIndex: 0,
    explanation: "Base cualquiera",
  },
  {
    id: 25,
    topic: "Radicales",
    subtopic: "Simplificación de radicales",
    difficulty: "media",
    prompt: "√(50)",
    options: [ "25√2", "10√5", "2√5","5√2"],
    correctIndex: 3,
    explanation: "50=25×2",
  },
  {
    id: 26,
    topic: "Racionalización",
    subtopic: "Caso 2",
    difficulty: "alta",
    prompt: "Racionalice: 1 / (√3 - √2)",
    options: ["√3 + √2", "√3 - √2", "(√3 + √2)/1", "(√3 + √2)/1"],
    correctIndex: 0,
    explanation: "Multiplicar por conjugado → denominador =1",
  },
  {
    id: 27,
    topic: "Potenciación",
    subtopic: "Ecuación exponencial",
    difficulty: "alta",
    prompt: "Simplifique: (2^x)(4^(x-1)) = 32",
    options: ["x = 2", "x = 3", "x = 4", "x = 5"],
    correctIndex: 1,
    explanation: "4=2² → todo en base 2",
  },
  {
    id: 28,
    topic: "Radicales",
    subtopic: "Radicales dobles",
    difficulty: "alta",
    prompt: "Simplifique: √(5 + 2√6)",
    options: ["√3 + √2", "√5 + √6", "√6 + √1", "√2 + √1"],
    correctIndex: 0,
    explanation: "Forma √a + √b → a+b=5 y ab=6",
  },
  {
    id: 29,
    topic: "Binomio de Newton",
    subtopic: "Coeficiente binomial",
    difficulty: "alta",
    prompt: "Coeficiente de x³ en (x + 2)^5",
    options: ["60", "40", "20", "10"],
    correctIndex: 1,
    explanation: "C(5,3)*2² = 10*4=40 ",
  },
  {
    id: 30,
    topic: "Valor absoluto",
    subtopic: "Igualdad de expresiones con valor absoluto",
    difficulty: "alta",
    prompt: "Resuelva: |x - 2| = |2x + 1|",
    options: ["x = 1 o x = -3", "x = -1 o x = 3", "x = 0 o x = -1", "x = 1 o x = 3"],
    correctIndex: 0,
    explanation: "Casos: x-2=2x+1 y x-2=-(2x+1)",
  },
  {
    id: 31,
    topic: "Funciones exponenciales",
    subtopic: "Traslación",
    difficulty: "alta",
    prompt: "Traslación de y = 2^x → y = 2^(x-3) + 1",
    options: [ "Izquierda 3, arriba 1", "Derecha 1, arriba 3", "Izquierda 1, abajo 3","Derecha 3, arriba 1"],
    correctIndex: 3,
    explanation: "x-3 desplaza a la derecha",
  },
  {
    id: 32,
    topic: "Funciones logarítmicas",
    subtopic: "Dominio",
    difficulty: "alta",
    prompt: "Dominio de log(x² - 4)",
    options: ["x < -2 o x > 2", "-2 < x < 2", "x > 2", "Todos"],
    correctIndex: 0,
    explanation: "Argumento > 0",
  },
  {
    id: 33,
    topic: "Funciones logarítmicas",
    subtopic: "Asíntota vertical",
    difficulty: "alta",
    prompt: "Asíntota vertical de f(x)=ln(x-3)",
    options: ["x = -3", "x = 3", "y = -3", "y = 3"],
    correctIndex: 1,
    explanation: "Argumento → 0",
  },
  {
    id: 34,
    topic: "Funciones cuadráticas",
    subtopic: "Vértice",
    difficulty: "alta",
    prompt: "Vértice de y = 2x² - 8x + 5",
    options: ["(2, -3)", "(2, -1)", "(4, -3)", "(4, -1)"],
    correctIndex: 0,
    explanation: "x = -b/2a = 2",
  },
  {
    id: 35,
    topic: "Factorización",
    subtopic: "Diferencia de cuadrados",
    difficulty: "alta",
    prompt: "Factorice: x⁴ - 16",
    options: ["(x²-4)(x²-4)", "(x-2)(x+2)(x²+4)", "(x-4)(x+4)", "Todas"],
    correctIndex: 1,
    explanation: "Factorización completa",
  },
  {
    id: 36,
    topic: "Productos notables",
    subtopic: "Estructura del binomio",
    difficulty: "media",
    prompt: "(x + y)^4 tiene cuántos términos?",
    options: ["5", "4", "6", "3"],
    correctIndex: 0,
    explanation: "Grado 4 → 5 términos",
  },
  {
    id: 37,
    topic: "Exponenciales",
    subtopic: "Ecuación exponencial",
    difficulty: "media",
    prompt: "Resuelva: 3^(x + 1) = 81",
    options: ["x = 2", "x = 3", "x = 4", "x = 1"],
    correctIndex: 1,
    explanation: "81 = 3^4, entonces x + 1 = 4 y por tanto x = 3.",
  },
  {
    id: 38,
    topic: "Fracciones",
    subtopic: "Fracciones algebraicas",
    difficulty: "alta",
    prompt: "(1/(x+1)) + (1/(x-1)) = ?",
    options: ["2/(x²-1)", "x/(x²-1)", "(x+1)/(x²-1)","2x/(x²-1)"],
    correctIndex: 3,
    explanation: "Sumar fracciones",
  },
  {
    id: 39,
    topic: "Teoría de números",
    subtopic: "Conteo de divisores",
    difficulty: "alta",
    prompt: "Número de divisores de 72",
    options: ["8", "10", "12", "16"],
    correctIndex: 2,
    explanation: "72=2³·3² → (3+1)(2+1)=12",
  },
  {
    id: 40,
    topic: "Racionalización",
    subtopic: "Caso 3",
    difficulty: "alta",
    prompt: "Racionalice: 1/(∛2 + ∛4)",
    options: ["(∛4 - ∛2)/2", "(∛4 + ∛2)/2", "1/2", "(∛2)/2"],
    correctIndex: 0,
    explanation: "Usar identidad cubos",
  },
  {
    id: 41,
    topic: "Inecuaciones",
    subtopic: "Inecuaciones con valor absoluto",
    difficulty: "media",
    prompt: "|x-1| ≥ 2",
    options: ["x ≥ 3 o x ≤ -1", "-1 ≤ x ≤ 3", "x ≥ 2", "x ≤ -2"],
    correctIndex: 0,
    explanation: "Fuera del intervalo",
  },
  {
    id: 42,
    topic: "Logaritmos",
    subtopic: "Ecuaciones logarítmicas",
    difficulty: "alta",
    prompt: "Resuelva: log₂(4x - 1) = 3",
    options: ["x = 4/3", "x = 9/4", "x = 4/9", "x = 3/4"],
    correctIndex: 1,
    explanation: "4x -1 = 2^3 = 8 → x = 9/4 ",
  },
  {
    id: 43,
    topic: "Logaritmos",
    subtopic: "Ecuaciones logarítmicas",
    difficulty: "alta",
    prompt: "Resuelva: 2log(x) - 2log(x + 1) = 0",
    options: ["Sin solución real", "x = 0", "x = -1", "x = 1"],
    correctIndex: 0,
    explanation: "2log(x) - 2log(x + 1) = 0 implica log((x/(x+1))^2)=0. Esto exige (x/(x+1))^2 = 1, pero ninguna solución cumple el dominio logarítmico.",
  },
  {
    id: 44,
    topic: "Exponenciales",
    subtopic: "Ecuaciones exponenciales",
    difficulty: "alta",
    prompt: "Resuelva: 2^(1 - x²) = 1/8",
    options: ["x = ±2", "x = ±√3", "x = ±1", "x = ±3"],
    correctIndex: 0,
    explanation: "1/8 = 2^-3 → 1 - x² = -3 → x² = 4 → x = ±2",
  },
  {
    id: 45,
    topic: "Funciones cuadráticas",
    subtopic: "Rango",
    difficulty: "media",
    prompt: "Rango de f(x)=-x²+1",
    options: ["y ≥ 1", "Todos", "y ≤ 1", "y > 0"],
    correctIndex: 2,
    explanation: "La parábola abre hacia abajo y su valor máximo es y = 1, por eso el rango es y ≤ 1.",
  }
];

const TOTAL_SECONDS = 2400;

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const getLevelLabel = (percentage: number) => {
  if (percentage < 40) return "Bajo";
  if (percentage < 60) return "Básico";
  if (percentage < 75) return "Intermedio";
  if (percentage < 90) return "Alto";
  return "Muy alto";
};

const getRecommendation = (percentage: number, weakSubtopics: string[]) => {
  if (percentage >= 85) {
    return "Tienes bases sólidas! Mantente practicando con ejercicios de alta dificultad y así podrás mejorar tu velocidad de respuesta. Prioriza realizar operaciones mentales en cuanto te sea posible, ponte a prueba.";
  }

  if (percentage >= 60) {
    if (weakSubtopics.length > 0) {
      return `Tienes una base aceptable, pero puedes reforzar ${weakSubtopics.join(", ")}.`;
    }
    return "Tienes un nivel intermedio, pero puedes reforzar precisión y consolidar los temas con más errores.";
  }

  if (weakSubtopics.length > 0) {
    return `Necesitas reforzar fundamentos antes de aumentar la dificultad. Empieza por: ${weakSubtopics.join(", ")}.`;
  }

  return "Necesitas fortalecer bases conceptuales y la verdad, una práctica guiada antes de pasar a ejercicios complejos te vendría super bien.";
};

export default function QuizSimulador() {
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

  const isTimeUp = timeLeft <= 0;

  const answeredCount = useMemo(
    () => questions.filter((q) => selected[q.id] !== undefined).length,
    [selected]
  );

  const score = useMemo(
    () => questions.filter((q) => selected[q.id] === q.correctIndex).length,
    [selected]
  );

  const groupPerformance = (
    key: keyof Pick<Question, "topic" | "subtopic" | "difficulty">
  ): GroupPerformance[] => {
    const grouped: Record<string, { total: number; correct: number }> = {};

    questions.forEach((q) => {
      const groupKey = String(q[key]);
      const isCorrect = selected[q.id] === q.correctIndex;

      if (!grouped[groupKey]) {
        grouped[groupKey] = { total: 0, correct: 0 };
      }

      grouped[groupKey].total += 1;
      if (isCorrect) grouped[groupKey].correct += 1;
    });

    return Object.entries(grouped).map(([name, data]) => {
      const percentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;
      return {
        name,
        total: data.total,
        correct: data.correct,
        percentage,
      };
    });
  };

  const totalPercentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
  const levelLabel = getLevelLabel(totalPercentage);

  const topicPerformance = groupPerformance("topic").sort((a, b) => b.percentage - a.percentage);
  const subtopicPerformance = groupPerformance("subtopic").sort((a, b) => b.percentage - a.percentage);
  const difficultyPerformance = groupPerformance("difficulty").sort((a, b) => b.percentage - a.percentage);

  const strengths = topicPerformance.filter((item) => item.total >= 2 && item.percentage >= 80);
  const weaknesses = topicPerformance.filter((item) => item.total >= 2 && item.percentage < 50);

  const topWeakSubtopics = subtopicPerformance
    .filter((item) => item.total >= 1 && item.percentage < 50)
    .slice(0, 3);

  const recommendation = getRecommendation(
    totalPercentage,
    topWeakSubtopics.map((item) => item.name)
  );

  const handleSelect = (optionIndex: number) => {
    if (locked[currentQuestion.id]) return;

    setSelected((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));

    setLocked((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Simulador de cuestionario</h1>
            <p className="text-slate-300 mt-2">
              Con temporizador, retroalimentación inmediata y diagnóstico automático por tema.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:flex md:flex-row">
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <div className="text-xs uppercase text-slate-400">Tiempo</div>
              <div className={`text-2xl font-bold ${timeLeft <= 120 ? "text-red-400" : "text-cyan-300"}`}>
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
            <h2 className="text-2xl font-semibold">Prueba diagnóstica de Matemática</h2>
            <p className="mt-3 text-slate-300 leading-7">
              Responde cada pregunta y recibirás retroalimentación inmediata. Al finalizar, verás un informe automático con fortalezas, debilidades y recomendación pedagógica.
            </p>

            <div className="mt-6 grid gap-3 text-slate-200">
              <div>• {questions.length} preguntas</div>
              <div>• {TOTAL_SECONDS / 60} minutos</div>
              <div>• Clasificación por tema, subtema y dificultad</div>
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

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="text-sm text-slate-400">Puntaje</div>
                <div className="text-3xl font-bold text-green-300">{score}/{questions.length}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="text-sm text-slate-400">Respondidas</div>
                <div className="text-3xl font-bold text-cyan-300">{answeredCount}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="text-sm text-slate-400">Nivel general</div>
                <div className="text-3xl font-bold text-fuchsia-300">{levelLabel}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="text-sm text-slate-400">Tiempo restante</div>
                <div className="text-3xl font-bold text-amber-300">{formatTime(Math.max(0, timeLeft))}</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <div className="text-sm text-slate-400">Porcentaje total</div>
              <div className="mt-2 text-3xl font-bold text-cyan-300">{totalPercentage.toFixed(1)}%</div>
              <p className="mt-3 text-slate-300 leading-7">{recommendation}</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-green-400/20 bg-green-400/5 p-5">
                <h3 className="text-xl font-semibold text-green-300">Fortalezas</h3>
                <div className="mt-3 space-y-2">
                  {strengths.length > 0 ? (
                    strengths.slice(0, 4).map((item) => (
                      <div key={item.name} className="text-slate-200">
                        • {item.name} — {item.correct}/{item.total} ({item.percentage.toFixed(0)}%)
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-300">Aún no se detectan fortalezas consistentes por tema.</div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
                <h3 className="text-xl font-semibold text-red-300">Debilidades prioritarias</h3>
                <div className="mt-3 space-y-2">
                  {weaknesses.length > 0 ? (
                    weaknesses.slice(0, 4).map((item) => (
                      <div key={item.name} className="text-slate-200">
                        • {item.name} — {item.correct}/{item.total} ({item.percentage.toFixed(0)}%)
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-300">No se observan debilidades graves por tema.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-xl font-semibold">Subtemas que debes reforzar</h3>
                <div className="mt-4 space-y-3">
                  {topWeakSubtopics.length > 0 ? (
                    topWeakSubtopics.map((item) => (
                      <div key={item.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="font-medium text-slate-100">{item.name}</div>
                        <div className="mt-1 text-sm text-slate-300">
                          {item.correct} de {item.total} correctas · {item.percentage.toFixed(0)}%
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-300">No hay subtemas críticos identificados.</div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-xl font-semibold">Desempeño por dificultad</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {difficultyPerformance.map((item) => (
                    <div key={item.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm uppercase text-slate-400">{item.name}</div>
                      <div className="mt-2 text-2xl font-bold text-cyan-300">
                        {item.percentage.toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h3 className="text-xl font-semibold">Desglose por tema</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {topicPerformance.map((item) => (
                  <div key={item.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium text-slate-100">{item.name}</div>
                    <div className="mt-1 text-sm text-slate-300">
                      {item.correct} de {item.total} correctas
                    </div>
                    <div className="mt-2 text-lg font-semibold text-fuchsia-300">
                      {item.percentage.toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {questions.map((q, idx) => {
                const answer = selected[q.id];
                const correct = answer === q.correctIndex;

                return (
                  <div key={q.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                    <div className="text-sm text-slate-400">
                      Pregunta {idx + 1} · {q.topic} · {q.subtopic} · dificultad {q.difficulty}
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
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-wide text-cyan-300">
                    {currentQuestion.topic} · {currentQuestion.subtopic}
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Pregunta {current + 1} de {questions.length}
                  </h2>
                </div>

                <div className="rounded-xl bg-slate-900/60 px-3 py-2 text-sm text-slate-300 border border-white/10">
                  {locked[currentQuestion.id] ? "Respondida" : "Pendiente"}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Dificultad: {currentQuestion.difficulty}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Tema: {currentQuestion.topic}
                </span>
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
                    {selected[currentQuestion.id] === currentQuestion.correctIndex
                      ? "✅ Correcto"
                      : "❌ Incorrecto"}
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
