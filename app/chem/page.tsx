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
    topic: "Nomenclatura inorgánica",
    subtopic: "Compuestos binarios",
    difficulty: "baja",
    prompt: "¿Qué caracteriza a un compuesto binario?",
    options: [
      "Está formado por dos elementos químicos diferentes.",
      "Está formado por tres elementos químicos diferentes.",
      "Siempre contiene oxígeno, hidrógeno y un metal.",
      "Siempre contiene un radical oxisal.",
    ],
    correctIndex: 0,
    explanation:
      "Un compuesto binario está formado por dos elementos químicos. Por ejemplo, NaCl, MgO o HCl.",
  },
  {
    id: 2,
    topic: "Nomenclatura inorgánica",
    subtopic: "Nomenclatura sistemática",
    difficulty: "baja",
    prompt:
      "En la nomenclatura sistemática, ¿qué indican los prefijos mono-, di-, tri-, tetra-?",
    options: [
      "La carga eléctrica del compuesto.",
      "El número de átomos de cada elemento en la fórmula.",
      "El estado físico de la sustancia.",
      "La acidez o basicidad del compuesto.",
    ],
    correctIndex: 1,
    explanation:
      "La nomenclatura sistemática usa prefijos griegos para indicar la cantidad de átomos: mono = 1, di = 2, tri = 3, tetra = 4.",
  },
  {
    id: 3,
    topic: "Nomenclatura inorgánica",
    subtopic: "Nomenclatura Stock",
    difficulty: "baja",
    prompt: "¿Qué se coloca entre paréntesis en la nomenclatura Stock?",
    options: [
      "La masa molecular del compuesto.",
      "El número de átomos de oxígeno.",
      "El estado de oxidación del elemento, en números romanos.",
      "El nombre tradicional del compuesto.",
    ],
    correctIndex: 2,
    explanation:
      "La nomenclatura Stock indica el estado de oxidación con números romanos. Ejemplo: óxido de hierro (III).",
  },
  {
    id: 4,
    topic: "Compuestos binarios",
    subtopic: "Óxidos metálicos",
    difficulty: "baja",
    prompt: "¿Cuál es la función química de Na₂O?",
    options: ["Anhídrido", "Óxido metálico", "Ácido hidrácido", "Sal oxisal"],
    correctIndex: 1,
    explanation:
      "Na₂O está formado por un metal, sodio, y oxígeno. Por eso es un óxido metálico u óxido básico.",
  },
  {
    id: 5,
    topic: "Compuestos binarios",
    subtopic: "Óxidos metálicos",
    difficulty: "baja",
    prompt: "¿Cuál es el nombre de MgO en nomenclatura tradicional/simple?",
    options: [
      "Óxido de magnesio",
      "Peróxido de magnesio",
      "Hidruro de magnesio",
      "Anhídrido magnésico",
    ],
    correctIndex: 0,
    explanation:
      "MgO es un óxido metálico. El magnesio trabaja normalmente con +2, por eso se nombra como óxido de magnesio.",
  },
  {
    id: 6,
    topic: "Compuestos binarios",
    subtopic: "Anhídridos",
    difficulty: "media",
    prompt: "SO₃ se nombra tradicionalmente como:",
    options: [
      "Óxido sulfuroso",
      "Anhídrido sulfúrico",
      "Sulfuro de oxígeno",
      "Ácido sulfúrico",
    ],
    correctIndex: 1,
    explanation:
      "SO₃ es un óxido ácido del azufre. Con azufre en estado de oxidación +6 corresponde el nombre anhídrido sulfúrico.",
  },
  {
    id: 7,
    topic: "Compuestos binarios",
    subtopic: "Nomenclatura sistemática",
    difficulty: "media",
    prompt: "¿Cuál es el nombre sistemático de CO₂?",
    options: [
      "Monóxido de carbono",
      "Dióxido de carbono",
      "Óxido de carbono (I)",
      "Anhídrido carbonoso",
    ],
    correctIndex: 1,
    explanation:
      "CO₂ tiene dos átomos de oxígeno, por eso se usa el prefijo di-: dióxido de carbono.",
  },
  {
    id: 8,
    topic: "Compuestos binarios",
    subtopic: "Nomenclatura Stock",
    difficulty: "media",
    prompt: "¿Cuál es el nombre Stock de FeCl₃?",
    options: [
      "Cloruro ferroso",
      "Cloruro de hierro (II)",
      "Cloruro de hierro (III)",
      "Tricloruro de hierro (I)",
    ],
    correctIndex: 2,
    explanation:
      "Cada Cl tiene -1. Hay tres cloros: carga total -3. Por neutralidad, Fe debe ser +3. Nombre Stock: cloruro de hierro (III).",
  },
  {
    id: 9,
    topic: "Compuestos binarios",
    subtopic: "Hidruros metálicos",
    difficulty: "media",
    prompt: "AlH₃ corresponde a:",
    options: [
      "Ácido hidrácido",
      "Hidruro de aluminio",
      "Anhídrido de aluminio",
      "Peróxido de aluminio",
    ],
    correctIndex: 1,
    explanation:
      "AlH₃ está formado por un metal, aluminio, y el hidrógeno con estado de oxidación -1. Es un hidruro metálico.",
  },
  {
    id: 10,
    topic: "Compuestos binarios",
    subtopic: "Ácidos hidrácidos",
    difficulty: "media",
    prompt: "¿Cuál es el nombre tradicional de HCl en disolución acuosa?",
    options: [
      "Ácido clórico",
      "Ácido cloroso",
      "Ácido clorhídrico",
      "Cloruro de hidrógeno (III)",
    ],
    correctIndex: 2,
    explanation:
      "HCl es un ácido hidrácido. Los hidrácidos se nombran como ácido + raíz del no metal + hídrico: ácido clorhídrico.",
  },
  {
    id: 11,
    topic: "Compuestos binarios",
    subtopic: "Peróxidos",
    difficulty: "media",
    prompt: "¿Cuál de las siguientes fórmulas corresponde a un peróxido?",
    options: ["Na₂O", "Na₂O₂", "HCl", "SO₂"],
    correctIndex: 1,
    explanation:
      "Los peróxidos contienen el grupo O₂²⁻ y sus fórmulas no se simplifican. Na₂O₂ es peróxido de sodio.",
  },
  {
    id: 12,
    topic: "Compuestos binarios",
    subtopic: "Sales binarias",
    difficulty: "media",
    prompt: "CuS se puede nombrar en Stock como:",
    options: [
      "Sulfuro de cobre (I)",
      "Sulfuro de cobre (II)",
      "Sulfato de cobre (II)",
      "Óxido de cobre (II)",
    ],
    correctIndex: 1,
    explanation:
      "El azufre en sulfuro trabaja con -2. Para que CuS sea neutro, el cobre debe ser +2. Por eso: sulfuro de cobre (II).",
  },
  {
    id: 13,
    topic: "Compuestos binarios",
    subtopic: "Compuestos especiales",
    difficulty: "baja",
    prompt: "¿Cuál es el nombre propio de CH₄?",
    options: ["Silano", "Amoníaco", "Metano", "Fosfina"],
    correctIndex: 2,
    explanation:
      "CH₄ es un compuesto especial del carbono con hidrógeno y su nombre propio es metano.",
  },
  {
    id: 14,
    topic: "Compuestos ternarios",
    subtopic: "Definición",
    difficulty: "baja",
    prompt: "¿Qué caracteriza a un compuesto ternario?",
    options: [
      "Está formado por dos elementos.",
      "Está formado por tres elementos químicos diferentes.",
      "Siempre tiene dos metales y un radical.",
      "Siempre contiene el grupo peróxido.",
    ],
    correctIndex: 1,
    explanation:
      "Los compuestos ternarios están formados por tres elementos. Ejemplos: NaOH, H₂SO₄, Ca(NO₃)₂.",
  },
  {
    id: 15,
    topic: "Compuestos ternarios",
    subtopic: "Hidróxidos",
    difficulty: "baja",
    prompt: "¿Qué grupo caracteriza a los hidróxidos metálicos o bases?",
    options: ["OH⁻", "O₂²⁻", "Cl⁻", "CO₃²⁻"],
    correctIndex: 0,
    explanation:
      "Los hidróxidos contienen el grupo hidroxilo u oxidrilo, OH⁻, unido a un metal.",
  },
  {
    id: 16,
    topic: "Compuestos ternarios",
    subtopic: "Hidróxidos",
    difficulty: "media",
    prompt: "¿Cuál es el nombre de Fe(OH)₃ en nomenclatura Stock?",
    options: [
      "Hidróxido de hierro (II)",
      "Hidróxido de hierro (III)",
      "Trióxido de hierro",
      "Hidruro de hierro (III)",
    ],
    correctIndex: 1,
    explanation:
      "Cada OH tiene carga -1. Hay tres grupos OH, carga total -3. Por neutralidad, Fe es +3: hidróxido de hierro (III).",
  },
  {
    id: 17,
    topic: "Compuestos ternarios",
    subtopic: "Hidróxidos",
    difficulty: "media",
    prompt: "¿Cuál es la fórmula del hidróxido de calcio?",
    options: ["CaOH", "Ca(OH)₂", "Ca₂OH", "CaO₂H"],
    correctIndex: 1,
    explanation:
      "El calcio trabaja con +2 y el grupo OH con -1. Se necesitan dos grupos OH⁻: Ca(OH)₂.",
  },
  {
    id: 18,
    topic: "Compuestos ternarios",
    subtopic: "Ácidos oxácidos",
    difficulty: "media",
    prompt: "H₂SO₄ corresponde a:",
    options: [
      "Ácido sulfuroso",
      "Ácido sulfúrico",
      "Sulfato de hidrógeno",
      "Hidróxido de azufre",
    ],
    correctIndex: 1,
    explanation:
      "H₂SO₄ es un ácido oxácido del azufre con su mayor valencia común (+6). Su nombre tradicional es ácido sulfúrico.",
  },
  {
    id: 19,
    topic: "Compuestos ternarios",
    subtopic: "Ácidos oxácidos",
    difficulty: "media",
    prompt: "HClO se nombra como:",
    options: [
      "Ácido cloroso",
      "Ácido clórico",
      "Ácido hipocloroso",
      "Ácido perclórico",
    ],
    correctIndex: 2,
    explanation:
      "En los oxácidos del cloro, la menor valencia positiva usa hipo-...-oso. HClO es ácido hipocloroso.",
  },
  {
    id: 20,
    topic: "Compuestos ternarios",
    subtopic: "Radicales oxisales",
    difficulty: "media",
    prompt: "¿Cuál es el radical nitrato?",
    options: ["NO₂⁻", "NO₃⁻", "SO₄²⁻", "CO₃²⁻"],
    correctIndex: 1,
    explanation: "El nitrato es NO₃⁻. El nitrito es NO₂⁻.",
  },
  {
    id: 21,
    topic: "Compuestos ternarios",
    subtopic: "Radicales oxisales",
    difficulty: "media",
    prompt: "¿Cuál es el radical sulfato?",
    options: ["SO₃²⁻", "SO₄²⁻", "S²⁻", "HSO₄⁻"],
    correctIndex: 1,
    explanation: "El sulfato es SO₄²⁻. El sulfito es SO₃²⁻.",
  },
  {
    id: 22,
    topic: "Compuestos ternarios",
    subtopic: "Sales oxisales",
    difficulty: "media",
    prompt: "Ca(NO₃)₂ se nombra como:",
    options: [
      "Nitrito de calcio",
      "Nitrato de calcio",
      "Carbonato de calcio",
      "Hidróxido de calcio",
    ],
    correctIndex: 1,
    explanation:
      "NO₃⁻ es nitrato. Como está unido al calcio, Ca²⁺, el compuesto se llama nitrato de calcio.",
  },
  {
    id: 23,
    topic: "Compuestos ternarios",
    subtopic: "Sales oxisales",
    difficulty: "media",
    prompt: "¿Cuál es la fórmula del carbonato de calcio?",
    options: ["CaCO₃", "Ca(CO₃)₂", "Ca₂CO₃", "CaOHCO₃"],
    correctIndex: 0,
    explanation:
      "El calcio es Ca²⁺ y el carbonato es CO₃²⁻. Las cargas se compensan 1:1, por eso la fórmula es CaCO₃.",
  },
  {
    id: 24,
    topic: "Compuestos ternarios",
    subtopic: "Sales oxisales",
    difficulty: "media",
    prompt: "¿Cuál es la fórmula del sulfato de aluminio?",
    options: ["AlSO₄", "Al₂(SO₄)₃", "Al₃(SO₄)₂", "Al₂SO₄"],
    correctIndex: 1,
    explanation:
      "Al³⁺ y SO₄²⁻ deben neutralizarse. El mínimo común múltiplo de 3 y 2 es 6: se necesitan 2 Al³⁺ y 3 SO₄²⁻. Fórmula: Al₂(SO₄)₃.",
  },
  {
    id: 25,
    topic: "Compuestos ternarios",
    subtopic: "Obtención de hidróxidos",
    difficulty: "media",
    prompt:
      "Según la regla general, un hidróxido metálico puede obtenerse a partir de:",
    options: [
      "Óxido metálico + agua",
      "Anhídrido + agua",
      "Ácido hidrácido + metal",
      "Sal oxisal + oxígeno",
    ],
    correctIndex: 0,
    explanation:
      "Los hidróxidos metálicos o bases se obtienen, de forma general, a partir de óxido metálico + agua.",
  },
  {
    id: 26,
    topic: "Compuestos ternarios",
    subtopic: "Obtención de ácidos oxácidos",
    difficulty: "media",
    prompt:
      "Según la regla general, un ácido oxácido puede obtenerse a partir de:",
    options: [
      "Metal + oxígeno",
      "Anhídrido + agua",
      "Hidróxido + sal",
      "Peróxido + ácido",
    ],
    correctIndex: 1,
    explanation:
      "Los ácidos oxácidos se obtienen, en general, por reacción de un anhídrido u óxido ácido con agua.",
  },
  {
    id: 27,
    topic: "Compuestos cuaternarios",
    subtopic: "Definición",
    difficulty: "baja",
    prompt: "¿Qué caracteriza a un compuesto cuaternario?",
    options: [
      "Está formado por cuatro elementos químicos diferentes.",
      "Está formado solo por carbono e hidrógeno.",
      "Siempre es un ácido hidrácido.",
      "Siempre tiene un solo metal y oxígeno.",
    ],
    correctIndex: 0,
    explanation:
      "Los compuestos cuaternarios están constituidos por cuatro elementos químicos diferentes.",
  },
  {
    id: 28,
    topic: "Compuestos cuaternarios",
    subtopic: "Oxisales ácidas",
    difficulty: "media",
    prompt: "¿Cuál de las siguientes fórmulas representa una sal oxisal ácida?",
    options: ["Na₂SO₄", "NaHCO₃", "NaOH", "CaCO₃"],
    correctIndex: 1,
    explanation:
      "Una oxisal ácida conserva hidrógeno en su estructura. NaHCO₃ contiene H y deriva del ácido carbónico.",
  },
  {
    id: 29,
    topic: "Compuestos cuaternarios",
    subtopic: "Oxisales básicas",
    difficulty: "media",
    prompt: "¿Qué grupo aparece en una oxisal básica?",
    options: ["OH⁻", "H⁺", "O₂²⁻", "Cl⁻"],
    correctIndex: 0,
    explanation:
      "Las oxisales básicas contienen el grupo hidroxilo OH⁻ junto con un metal y un radical oxisal.",
  },
  {
    id: 30,
    topic: "Compuestos cuaternarios",
    subtopic: "Oxisales dobles",
    difficulty: "media",
    prompt: "Una oxisal doble se caracteriza porque:",
    options: [
      "Tiene dos metales diferentes unidos al mismo tipo de radical.",
      "Tiene solo un metal y un no metal.",
      "No contiene oxígeno.",
      "Siempre contiene el grupo peróxido.",
    ],
    correctIndex: 0,
    explanation:
      "En las oxisales dobles participan dos metales diferentes que interactúan con el mismo anión o radical.",
  },
];

const TOTAL_SECONDS = 1200;

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const getLevelLabel = (percentage: number) => {
  if (percentage < 40) return "Nivel inicial";
  if (percentage < 60) return "Base en construcción";
  if (percentage < 80) return "Nivel funcional";
  return "Buen dominio";
};

const getRecommendation = (
  percentage: number,
  weakTopics: string[],
  weakSubtopics: string[],
) => {
  if (percentage >= 85) {
    return "Muy buen resultado. Ahora conviene practicar ejercicios mixtos de formulación y nomenclatura, especialmente con sales oxisales y compuestos cuaternarios para ganar velocidad.";
  }

  if (percentage >= 70) {
    return weakSubtopics.length > 0
      ? `Tienes una base funcional. Refuerza de forma puntual: ${weakSubtopics.join(", ")}. Después pasa a ejercicios donde debas formular y nombrar sin opciones.`
      : "Tienes una base funcional. Para subir de nivel, practica formulación directa y nomenclatura inversa sin mirar la tabla de radicales.";
  }

  if (percentage >= 50) {
    return weakTopics.length > 0
      ? `La base está en construcción. Prioriza estos bloques: ${weakTopics.join(", ")}. No avances a ejercicios largos hasta dominar estados de oxidación, radicales y tipos de compuesto.`
      : "La base está en construcción. Refuerza estados de oxidación, clasificación de compuestos y reconocimiento de radicales antes de aumentar la dificultad.";
  }

  return weakSubtopics.length > 0
    ? `Necesitas volver a fundamentos. Empieza por reconocer el tipo de compuesto y memorizar radicales esenciales. Subtemas urgentes: ${weakSubtopics.join(", ")}.`
    : "Necesitas volver a fundamentos: diferencia entre binarios, ternarios y cuaternarios; estados de oxidación; y reglas básicas de nomenclatura.";
};

export default function QuizSimuladorQuimica() {
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
    [selected],
  );

  const score = useMemo(
    () => questions.filter((q) => selected[q.id] === q.correctIndex).length,
    [selected],
  );

  const groupPerformance = (
    key: keyof Pick<Question, "topic" | "subtopic" | "difficulty">,
  ): GroupPerformance[] => {
    const grouped: Record<string, { total: number; correct: number }> = {};

    questions.forEach((q) => {
      const groupKey = String(q[key]);
      const isCorrect = selected[q.id] === q.correctIndex;

      if (!grouped[groupKey]) grouped[groupKey] = { total: 0, correct: 0 };

      grouped[groupKey].total += 1;
      if (isCorrect) grouped[groupKey].correct += 1;
    });

    return Object.entries(grouped).map(([name, data]) => {
      const percentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;
      return { name, total: data.total, correct: data.correct, percentage };
    });
  };

  const totalPercentage =
    questions.length > 0 ? (score / questions.length) * 100 : 0;
  const levelLabel = getLevelLabel(totalPercentage);

  const topicPerformance = groupPerformance("topic").sort(
    (a, b) => b.percentage - a.percentage,
  );
  const subtopicPerformance = groupPerformance("subtopic").sort(
    (a, b) => b.percentage - a.percentage,
  );
  const difficultyPerformance = groupPerformance("difficulty").sort((a, b) => {
    const order: Record<string, number> = { baja: 1, media: 2, alta: 3 };
    return order[a.name] - order[b.name];
  });

  const strengths = topicPerformance.filter(
    (item) => item.total >= 2 && item.percentage >= 70,
  );
  const weaknesses = topicPerformance.filter(
    (item) => item.total >= 2 && item.percentage < 60,
  );

  const topWeakSubtopics = subtopicPerformance
    .filter((item) => item.total >= 1 && item.percentage < 60)
    .slice(0, 5);

  const recommendation = getRecommendation(
    totalPercentage,
    weaknesses.map((item) => item.name).slice(0, 3),
    topWeakSubtopics.map((item) => item.name).slice(0, 4),
  );

  const handleSelect = (optionIndex: number) => {
    if (locked[currentQuestion.id]) return;

    setSelected((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
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

    let base =
      "border-white/10 bg-white/[0.06] hover:border-cyan-300/50 hover:bg-cyan-300/10";
    if (!isLocked && chosen) base = "border-cyan-300 bg-cyan-300/10";
    if (isLocked && correct)
      base =
        "border-emerald-300 bg-emerald-400/15 shadow-[0_0_22px_rgba(52,211,153,0.14)]";
    if (isLocked && chosen && !correct)
      base =
        "border-rose-400 bg-rose-500/15 shadow-[0_0_22px_rgba(244,63,94,0.14)]";

    return `w-full rounded-2xl border p-4 text-left transition ${base}`;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050516] px-4 py-6 text-white md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(217,70,239,0.18),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(124,58,237,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-size-[44px_44px]" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300 to-transparent" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 rounded-4xl border border-white/10 bg-white/5.5 p-5 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:p-7">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              BarbiDev
            </div>
            <h1 className="text-1xl font-black tracking-tight md:text-2xl">
              Simulador de Química
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              Formulación y nomenclatura inorgánica: compuestos binarios,
              ternarios y cuaternarios. Práctica con feedback inmediato y
              diagnóstico automático.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
            <div className="rounded-3xl border border-cyan-300/20 bg-slate-950/60 p-4 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
              <div className="text-xs uppercase tracking-widest text-slate-400">
                Tiempo
              </div>
              <div
                className={`mt-1 text-3xl font-black ${timeLeft <= 120 ? "text-rose-300" : "text-cyan-200"}`}
              >
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="rounded-3xl border border-fuchsia-300/20 bg-slate-950/60 p-4 shadow-[0_0_30px_rgba(217,70,239,0.08)]">
              <div className="text-xs uppercase tracking-widest text-slate-400">
                Puntaje
              </div>
              <div className="mt-1 text-3xl font-black text-fuchsia-200">
                {score}/{questions.length}
              </div>
            </div>
          </div>
        </header>

        {!started ? (
          <section className="rounded-4xl border border-white/10 bg-white/6 p-7 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:p-10">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                Práctica y refuerzo
              </div>
              <h2 className="text-1xl font-bold md:text-2xl">
                Cuestionario interactivo de Química
              </h2>
              <p className="mt-4 text-slate-300 leading-7">
                Responde cada pregunta y revisa la explicación inmediatamente.
                Al finalizar obtendrás un informe por tema, subtema y dificultad
                para saber qué reforzar primero.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <div className="text-3xl font-black text-cyan-200">30</div>
                <div className="mt-1 text-sm text-slate-300">preguntas</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <div className="text-3xl font-black text-fuchsia-200">30</div>
                <div className="mt-1 text-sm text-slate-300">minutos</div>
              </div>
              <div className="rounded-3l border border-white/10 bg-slate-950/50 p-5">
                <div className="text-3xl font-black text-violet-200">3</div>
                <div className="mt-1 text-sm text-slate-300">
                  bloques temáticos
                </div>
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="mt-8 rounded-2xl border border-cyan-300 bg-cyan-300/15 px-7 py-4 font-bold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.22)] transition hover:bg-cyan-300/25"
            >
              Iniciar simulador
            </button>
          </section>
        ) : showFinish || isTimeUp ? (
          <section className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.26em] text-cyan-200">
                  Diagnóstico final
                </div>
                <h2 className="mt-2 text-1xl font-black md:text-2xl">
                  Resultado del simulador
                </h2>
              </div>
              <button
                onClick={resetQuiz}
                className="rounded-2xl border border-fuchsia-300 bg-fuchsia-300/15 px-6 py-3 font-bold text-fuchsia-100 shadow-[0_0_25px_rgba(217,70,239,0.18)] transition hover:bg-fuchsia-300/25"
              >
                Reiniciar
              </button>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-sm text-slate-400">Puntaje</div>
                <div className="text-3xl font-black text-emerald-300">
                  {score}/{questions.length}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-sm text-slate-400">Respondidas</div>
                <div className="text-3xl font-black text-cyan-300">
                  {answeredCount}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-sm text-slate-400">Nivel general</div>
                <div className="text-2xl font-black text-fuchsia-300">
                  {levelLabel}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-sm text-slate-400">Porcentaje</div>
                <div className="text-3xl font-black text-violet-300">
                  {totalPercentage.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <h3 className="font-bold text-cyan-100">
                Recomendación automática
              </h3>
              <p className="mt-2 leading-7 text-slate-200">{recommendation}</p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/5 p-5">
                <h3 className="text-xl font-bold text-emerald-200">
                  Fortalezas
                </h3>
                <div className="mt-3 space-y-2 text-slate-200">
                  {strengths.length > 0 ? (
                    strengths.map((item) => (
                      <div key={item.name}>
                        • {item.name}: {item.correct}/{item.total} (
                        {item.percentage.toFixed(0)}%)
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-300">
                      Aún no se detectan fortalezas consistentes por tema.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-rose-300/20 bg-rose-300/5 p-5">
                <h3 className="text-xl font-bold text-rose-200">
                  Debilidades prioritarias
                </h3>
                <div className="mt-3 space-y-2 text-slate-200">
                  {weaknesses.length > 0 ? (
                    weaknesses.map((item) => (
                      <div key={item.name}>
                        • {item.name}: {item.correct}/{item.total} (
                        {item.percentage.toFixed(0)}%)
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-300">
                      No se observan debilidades graves por tema.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <h3 className="text-xl font-bold">Subtemas a reforzar</h3>
                <div className="mt-4 space-y-3">
                  {topWeakSubtopics.length > 0 ? (
                    topWeakSubtopics.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="font-semibold text-slate-100">
                          {item.name}
                        </div>
                        <div className="mt-1 text-sm text-slate-300">
                          {item.correct} de {item.total} correctas ·{" "}
                          {item.percentage.toFixed(0)}%
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-300">
                      No hay subtemas críticos identificados.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <h3 className="text-xl font-bold">Desempeño por dificultad</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {difficultyPerformance.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="text-xs uppercase tracking-widest text-slate-400">
                        {item.name}
                      </div>
                      <div className="mt-2 text-3xl font-black text-cyan-300">
                        {item.percentage.toFixed(0)}%
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {item.correct}/{item.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-5">
              <h3 className="text-xl font-bold">Desglose por tema</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {topicPerformance.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="font-semibold text-slate-100">
                      {item.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      {item.correct} de {item.total} correctas
                    </div>
                    <div className="mt-2 text-2xl font-black text-fuchsia-300">
                      {item.percentage.toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-bold">
                Revisión pregunta por pregunta
              </h3>
              {questions.map((q, idx) => {
                const answer = selected[q.id];
                const correct = answer === q.correctIndex;

                return (
                  <article
                    key={q.id}
                    className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
                  >
                    <div className="text-xs uppercase tracking-widest text-slate-400">
                      Pregunta {idx + 1} · {q.topic} · {q.subtopic} ·{" "}
                      {q.difficulty}
                    </div>
                    <div className="mt-2 font-semibold text-slate-100">
                      {q.prompt}
                    </div>
                    <div
                      className={`mt-3 font-bold ${correct ? "text-emerald-300" : "text-rose-300"}`}
                    >
                      {answer === undefined
                        ? `No respondida. Correcta: ${q.options[q.correctIndex]}`
                        : correct
                          ? `Correcta: ${q.options[q.correctIndex]}`
                          : `Incorrecta. Elegiste: ${q.options[answer]} | Correcta: ${q.options[q.correctIndex]}`}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {q.explanation}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <article className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    {currentQuestion.topic}
                  </div>
                  <h2 className="mt-2 text-1xl font-black md:text-2xl">
                    Pregunta {current + 1} de {questions.length}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1 text-xs text-fuchsia-100">
                      {currentQuestion.subtopic}
                    </span>
                    <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs text-violet-100">
                      dificultad {currentQuestion.difficulty}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                  {locked[currentQuestion.id] ? "Respondida" : "Pendiente"}
                </div>
              </div>

              <p className="mt-4 text-lg leading-8 text-slate-100 md:text-xl">
                {currentQuestion.prompt}
              </p>

              <div className="mt-1 space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={getOptionStyle(index)}
                  >
                    <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-slate-950/50 font-black text-cyan-200">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="align-middle text-slate-100">
                      {option}
                    </span>
                  </button>
                ))}
              </div>

              {locked[currentQuestion.id] && (
                <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <div
                    className={`text-sm font-black ${
                      selected[currentQuestion.id] ===
                      currentQuestion.correctIndex
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }`}
                  >
                    {selected[currentQuestion.id] ===
                    currentQuestion.correctIndex
                      ? "Correcto"
                      : "Incorrecto"}
                  </div>
                  <p className="mt-2 leading-7 text-slate-300">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={goPrev}
                  disabled={current === 0}
                  className="rounded-2xl border border-white/10 bg-white/4 px-5 py-1 font-semibold text-slate-200 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Anterior
                </button>

                <button
                  onClick={goNext}
                  className="rounded-2xl border border-cyan-300 bg-cyan-300/15 px-6 py-3 font-bold text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,0.18)] transition hover:bg-cyan-300/25"
                >
                  {current === questions.length - 1 ? "Finalizar" : "Siguiente"}
                </button>
              </div>
            </article>

            <aside className="rounded-xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl lg:sticky lg:top-6 lg:h-fit">
              <h3 className="text-xl font-black">Progreso</h3>
              <p className="mt-2 text-sm text-slate-300">
                Verde: correcta · Rojo: incorrecta · Cyan: actual
              </p>

              <div className="mt-2 grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === current;
                  const isDone = locked[q.id];
                  const isCorrect = selected[q.id] === q.correctIndex;

                  let cls = "border-white/10 bg-slate-950/60 text-slate-300";
                  if (isCurrent)
                    cls =
                      "border-cyan-300 bg-cyan-300/15 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.18)]";
                  if (isDone && isCorrect)
                    cls =
                      "border-emerald-300 bg-emerald-300/15 text-emerald-100";
                  if (isDone && !isCorrect)
                    cls = "border-rose-300 bg-rose-300/15 text-rose-100";

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrent(idx)}
                      className={`rounded-xl border p-3 text-xs font-black transition ${cls}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <div className="text-sm text-slate-400">Avance</div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-cyan-300 via-fuchsia-300 to-violet-400"
                    style={{
                      width: `${(answeredCount / questions.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-2 text-sm text-slate-300">
                  {answeredCount}/{questions.length} respondidas
                </div>
              </div>
            </aside>
          </section>
        )}
      </section>
    </main>
  );
}
