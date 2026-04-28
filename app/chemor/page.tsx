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
    topic: "Estructura del carbono",
    subtopic: "Configuración electrónica",
    difficulty: "baja",
    prompt: "¿Cuál es la configuración electrónica del carbono en estado fundamental?",
    options: ["1s² 2s² 2p²", "1s² 2s¹ 2p³", "1s² 2s² 2p⁶", "1s¹ 2s² 2p³"],
    correctIndex: 0,
    explanation: "El carbono tiene número atómico 6. Sus seis electrones se distribuyen como 1s² 2s² 2p².",
  },
  {
    id: 2,
    topic: "Estructura del carbono",
    subtopic: "Tetravalencia",
    difficulty: "baja",
    prompt: "¿Por qué el carbono puede formar gran cantidad de compuestos orgánicos?",
    options: ["Porque siempre forma iones positivos.", "Porque puede enlazarse consigo mismo y formar cuatro enlaces covalentes.", "Porque solo se une con oxígeno.", "Porque no forma cadenas."],
    correctIndex: 1,
    explanation: "La tetravalencia y la capacidad de enlazarse con otros carbonos permiten formar cadenas, ciclos y estructuras ramificadas.",
  },
  {
    id: 3,
    topic: "Estructura del carbono",
    subtopic: "Hibridación sp3",
    difficulty: "baja",
    prompt: "Un carbono con cuatro enlaces simples presenta generalmente hibridación:",
    options: ["sp", "sp²", "sp³", "dsp²"],
    correctIndex: 2,
    explanation: "La hibridación sp³ corresponde a carbonos con cuatro enlaces sigma, como en los alcanos.",
  },
  {
    id: 4,
    topic: "Estructura del carbono",
    subtopic: "Hibridación sp2",
    difficulty: "media",
    prompt: "Un carbono que participa en un doble enlace C=C suele presentar hibridación:",
    options: ["sp", "sp²", "sp³", "s²p³"],
    correctIndex: 1,
    explanation: "En los alquenos, los carbonos del doble enlace son sp² y tienen geometría trigonal plana.",
  },
  {
    id: 5,
    topic: "Estructura del carbono",
    subtopic: "Hibridación sp",
    difficulty: "media",
    prompt: "Un carbono que participa en un triple enlace C≡C suele presentar hibridación:",
    options: ["sp", "sp²", "sp³", "p³"],
    correctIndex: 0,
    explanation: "Los alquinos contienen un triple enlace; los carbonos involucrados suelen ser sp y presentan geometría lineal.",
  },
  {
    id: 6,
    topic: "Estructura del carbono",
    subtopic: "Tipos de carbono",
    difficulty: "media",
    prompt: "Un carbono primario es aquel que está unido directamente a:",
    options: ["Un átomo de carbono", "Dos átomos de carbono", "Tres átomos de carbono", "Cuatro átomos de carbono"],
    correctIndex: 0,
    explanation: "El carbono primario está enlazado a un solo carbono. Secundario: a dos; terciario: a tres; cuaternario: a cuatro.",
  },
  {
    id: 7,
    topic: "Fórmulas orgánicas",
    subtopic: "Fórmula molecular",
    difficulty: "baja",
    prompt: "¿Qué indica principalmente una fórmula molecular como C₄H₁₀?",
    options: ["La distribución exacta de todos los enlaces.", "La cantidad de átomos de cada elemento en la molécula.", "La forma tridimensional obligatoria.", "El nombre IUPAC completo."],
    correctIndex: 1,
    explanation: "La fórmula molecular indica cuántos átomos de cada elemento hay, pero no muestra necesariamente cómo están conectados.",
  },
  {
    id: 8,
    topic: "Fórmulas orgánicas",
    subtopic: "Fórmula esquelética",
    difficulty: "baja",
    prompt: "En una fórmula esquelética o de líneas, los vértices y extremos representan principalmente:",
    options: ["Átomos de oxígeno", "Átomos de carbono", "Átomos de hidrógeno aislados", "Cargas eléctricas"],
    correctIndex: 1,
    explanation: "En estructuras de líneas, los carbonos se sobreentienden en vértices y extremos; muchos hidrógenos no se dibujan explícitamente.",
  },
  {
    id: 9,
    topic: "Hidrocarburos",
    subtopic: "Definición",
    difficulty: "baja",
    prompt: "¿Qué elementos forman principalmente a los hidrocarburos?",
    options: ["Carbono e hidrógeno", "Carbono y oxígeno", "Hidrógeno y nitrógeno", "Oxígeno y cloro"],
    correctIndex: 0,
    explanation: "Los hidrocarburos son compuestos orgánicos formados principalmente por carbono e hidrógeno.",
  },
  {
    id: 10,
    topic: "Hidrocarburos",
    subtopic: "Alcanos",
    difficulty: "baja",
    prompt: "Los alcanos son hidrocarburos:",
    options: ["Insaturados con doble enlace", "Insaturados con triple enlace", "Saturados con enlaces simples", "Oxigenados con grupo OH"],
    correctIndex: 2,
    explanation: "Los alcanos son saturados porque sus carbonos están unidos por enlaces simples.",
  },
  {
    id: 11,
    topic: "Hidrocarburos",
    subtopic: "Alquenos",
    difficulty: "baja",
    prompt: "¿Qué tipo de enlace caracteriza a los alquenos?",
    options: ["C-C simple", "C=C doble", "C≡C triple", "C-O-C"],
    correctIndex: 1,
    explanation: "Los alquenos presentan al menos un enlace doble carbono-carbono.",
  },
  {
    id: 12,
    topic: "Hidrocarburos",
    subtopic: "Alquinos",
    difficulty: "baja",
    prompt: "¿Qué tipo de enlace caracteriza a los alquinos?",
    options: ["C-C simple", "C=C doble", "C≡C triple", "C=O"],
    correctIndex: 2,
    explanation: "Los alquinos presentan al menos un enlace triple carbono-carbono.",
  },
  {
    id: 13,
    topic: "Nomenclatura IUPAC",
    subtopic: "Prefijos numéricos",
    difficulty: "baja",
    prompt: "¿Qué prefijo IUPAC corresponde a una cadena principal de 5 carbonos?",
    options: ["but-", "pent-", "hex-", "hept-"],
    correctIndex: 1,
    explanation: "La serie básica es met-, et-, prop-, but-, pent-, hex-, hept-, oct-, non-, dec-.",
  },
  {
    id: 14,
    topic: "Nomenclatura IUPAC",
    subtopic: "Sufijos",
    difficulty: "baja",
    prompt: "El sufijo -ano corresponde a:",
    options: ["Alcano", "Alqueno", "Alquino", "Alcohol"],
    correctIndex: 0,
    explanation: "En hidrocarburos, -ano se usa para alcanos; -eno para alquenos; -ino para alquinos.",
  },
  {
    id: 15,
    topic: "Nomenclatura IUPAC",
    subtopic: "Sufijos",
    difficulty: "baja",
    prompt: "El compuesto CH₃-CH₃ se llama:",
    options: ["Metano", "Etano", "Eteno", "Etino"],
    correctIndex: 1,
    explanation: "Tiene dos carbonos y solo enlaces simples. Por eso se llama etano.",
  },
  {
    id: 16,
    topic: "Nomenclatura IUPAC",
    subtopic: "Sufijos",
    difficulty: "media",
    prompt: "El compuesto CH₂=CH₂ se llama:",
    options: ["Etano", "Eteno", "Etino", "Propeno"],
    correctIndex: 1,
    explanation: "Tiene dos carbonos y un doble enlace. El sufijo correcto es -eno: eteno.",
  },
  {
    id: 17,
    topic: "Nomenclatura IUPAC",
    subtopic: "Sufijos",
    difficulty: "media",
    prompt: "El compuesto HC≡CH se llama:",
    options: ["Etano", "Eteno", "Etino", "Propino"],
    correctIndex: 2,
    explanation: "Tiene dos carbonos y un triple enlace. El sufijo correcto es -ino: etino.",
  },
  {
    id: 18,
    topic: "Nomenclatura IUPAC",
    subtopic: "Cadena principal",
    difficulty: "media",
    prompt: "En un alcano ramificado, la cadena principal debe ser, en general:",
    options: ["La cadena con menos carbonos.", "La cadena continua más larga.", "La cadena que tenga más hidrógenos escritos.", "La cadena que empiece con un grupo metilo."],
    correctIndex: 1,
    explanation: "Para alcanos, se elige la cadena continua más larga como cadena principal.",
  },
  {
    id: 19,
    topic: "Nomenclatura IUPAC",
    subtopic: "Numeración",
    difficulty: "media",
    prompt: "Al numerar una cadena principal con sustituyentes, se busca:",
    options: ["Dar los números más altos posibles.", "Dar los localizadores más bajos posibles.", "Numerar siempre de izquierda a derecha.", "Ignorar las ramificaciones."],
    correctIndex: 1,
    explanation: "La numeración se elige para que sustituyentes, dobles o triples enlaces tengan los localizadores más bajos posibles.",
  },
  {
    id: 20,
    topic: "Nomenclatura IUPAC",
    subtopic: "Orden alfabético",
    difficulty: "media",
    prompt: "Si un compuesto tiene sustituyentes etil y metil en posiciones equivalentes, ¿cuál puede tener prioridad al decidir el sentido de numeración?",
    options: ["El que aparece primero alfabéticamente", "El de menor masa siempre", "El que tenga más hidrógenos", "El que esté dibujado más arriba"],
    correctIndex: 0,
    explanation: "Cuando hay empate en localizadores, puede considerarse el orden alfabético de los sustituyentes.",
  },
  {
    id: 21,
    topic: "Ramificaciones",
    subtopic: "Metil",
    difficulty: "baja",
    prompt: "¿Qué grupo lateral representa el sustituyente metil?",
    options: ["-CH₃", "-CH₂CH₃", "-OH", "-CHO"],
    correctIndex: 0,
    explanation: "El metil es un grupo alquilo de un carbono: -CH₃.",
  },
  {
    id: 22,
    topic: "Ramificaciones",
    subtopic: "Etil",
    difficulty: "baja",
    prompt: "¿Qué grupo lateral corresponde a etil?",
    options: ["-CH₃", "-CH₂CH₃", "-CH₂CH₂CH₃", "-O-CH₃"],
    correctIndex: 1,
    explanation: "Etil tiene dos carbonos y se representa como -CH₂CH₃.",
  },
  {
    id: 23,
    topic: "Ramificaciones",
    subtopic: "Isopropil",
    difficulty: "media",
    prompt: "El grupo isopropil se reconoce porque el carbono de unión está conectado a:",
    options: ["Dos grupos metilo", "Un grupo carboxilo", "Un átomo de oxígeno doblemente enlazado", "Cuatro hidrógenos"],
    correctIndex: 0,
    explanation: "El isopropil tiene forma -CH(CH₃)₂: el carbono de unión está conectado a dos metilos.",
  },
  {
    id: 24,
    topic: "Ramificaciones",
    subtopic: "Terbutil",
    difficulty: "media",
    prompt: "El grupo terbutil se caracteriza porque el carbono que se une a la cadena principal es:",
    options: ["Primario", "Secundario", "Terciario", "Carbonílico"],
    correctIndex: 2,
    explanation: "En el terbutil, el carbono de unión está conectado a tres grupos metilo; por eso es terciario.",
  },
  {
    id: 25,
    topic: "Nomenclatura IUPAC",
    subtopic: "Sustituyentes idénticos",
    difficulty: "media",
    prompt: "Si hay dos sustituyentes metil en una molécula, se usa el prefijo:",
    options: ["mono-", "di-", "tri-", "tetra-"],
    correctIndex: 1,
    explanation: "Para dos sustituyentes idénticos se usa di-. Para tres, tri-; para cuatro, tetra-.",
  },
  {
    id: 26,
    topic: "Nomenclatura IUPAC",
    subtopic: "Nombre de alcanos ramificados",
    difficulty: "media",
    prompt: "¿Cuál es el nombre correcto de CH₃-CH(CH₃)-CH₃?",
    options: ["2-metilpropano", "1-metilpropano", "butano", "2-etilmetano"],
    correctIndex: 0,
    explanation: "La cadena principal tiene 3 carbonos y hay un metil en el carbono 2: 2-metilpropano.",
  },
  {
    id: 27,
    topic: "Nomenclatura IUPAC",
    subtopic: "Nombre de alcanos ramificados",
    difficulty: "media",
    prompt: "¿Cuál es el nombre correcto de CH₃-CH₂-CH(CH₃)-CH₃?",
    options: ["2-metilbutano", "3-metilbutano", "2-etilpropano", "pentano sin ramificación"],
    correctIndex: 0,
    explanation: "Se numera desde el extremo más cercano a la ramificación. El metil queda en C2, no en C3.",
  },
  {
    id: 28,
    topic: "Insaturaciones",
    subtopic: "Cadena principal",
    difficulty: "media",
    prompt: "Para un hidrocarburo insaturado, la cadena principal debe contener:",
    options: ["El máximo número posible de dobles o triples enlaces", "Solo carbonos primarios", "Siempre un grupo OH", "La menor cantidad de carbonos posible"],
    correctIndex: 0,
    explanation: "En compuestos insaturados, la cadena principal debe incluir el mayor número posible de insaturaciones.",
  },
  {
    id: 29,
    topic: "Insaturaciones",
    subtopic: "Numeración de alquenos",
    difficulty: "media",
    prompt: "¿Cuál es el nombre correcto de CH₂=CH-CH₃?",
    options: ["Propano", "Prop-1-eno", "Prop-2-eno", "Propanol"],
    correctIndex: 1,
    explanation: "Tiene tres carbonos y el doble enlace empieza en C1: prop-1-eno.",
  },
  {
    id: 30,
    topic: "Insaturaciones",
    subtopic: "Numeración de alquinos",
    difficulty: "media",
    prompt: "¿Cuál es el nombre correcto de CH₃-C≡CH?",
    options: ["Prop-1-ino", "Prop-2-ino", "Propeno", "Propano"],
    correctIndex: 0,
    explanation: "Se numera desde el extremo más cercano al triple enlace. El triple enlace queda en C1.",
  },
  {
    id: 31,
    topic: "Insaturaciones",
    subtopic: "Dobles y triples enlaces",
    difficulty: "alta",
    prompt: "Si una cadena tiene doble y triple enlace en posiciones equivalentes, según la prioridad indicada en el material, se favorece el menor localizador para:",
    options: ["El doble enlace", "El triple enlace", "El sustituyente más pesado", "El último carbono"],
    correctIndex: 0,
    explanation: "Cuando hay doble y triple enlace en posiciones relativas idénticas, se prioriza dar el menor localizador al doble enlace.",
  },
  {
    id: 32,
    topic: "Compuestos oxigenados",
    subtopic: "Definición",
    difficulty: "baja",
    prompt: "Los compuestos orgánicos oxigenados se caracterizan por contener:",
    options: ["Enlaces carbono-oxígeno", "Solo carbono e hidrógeno", "Metales alcalinos", "Iones halogenuro"],
    correctIndex: 0,
    explanation: "Los compuestos oxigenados contienen enlaces C-O o C=O, como alcoholes, éteres, aldehídos, cetonas y ácidos carboxílicos.",
  },
  {
    id: 33,
    topic: "Compuestos oxigenados",
    subtopic: "Alcoholes",
    difficulty: "baja",
    prompt: "¿Qué grupo funcional caracteriza a los alcoholes?",
    options: ["-OH", "-CHO", ">C=O", "-COOH"],
    correctIndex: 0,
    explanation: "Los alcoholes presentan el grupo hidroxilo -OH unido a una cadena carbonada.",
  },
  {
    id: 34,
    topic: "Compuestos oxigenados",
    subtopic: "Alcoholes",
    difficulty: "media",
    prompt: "CH₃OH se nombra como:",
    options: ["Metanol", "Metanal", "Metanona", "Ácido metanoico"],
    correctIndex: 0,
    explanation: "CH₃OH tiene un carbono y grupo -OH. Es un alcohol: metanol.",
  },
  {
    id: 35,
    topic: "Compuestos oxigenados",
    subtopic: "Éteres",
    difficulty: "media",
    prompt: "¿Qué estructura general identifica mejor a un éter?",
    options: ["R-O-R'", "R-CHO", "R-COOH", "R-C≡C-R"],
    correctIndex: 0,
    explanation: "Los éteres tienen un oxígeno entre dos grupos carbonados: R-O-R'.",
  },
  {
    id: 36,
    topic: "Compuestos oxigenados",
    subtopic: "Aldehídos",
    difficulty: "media",
    prompt: "¿Qué grupo funcional caracteriza a los aldehídos?",
    options: ["-CHO", "-OH", "R-O-R'", ">C=O en el interior de la cadena"],
    correctIndex: 0,
    explanation: "Los aldehídos presentan el grupo formilo -CHO, generalmente al extremo de la cadena.",
  },
  {
    id: 37,
    topic: "Compuestos oxigenados",
    subtopic: "Cetonas",
    difficulty: "media",
    prompt: "¿Cuál es el sufijo característico de las cetonas en nomenclatura IUPAC?",
    options: ["-ol", "-al", "-ona", "ácido -oico"],
    correctIndex: 2,
    explanation: "Las cetonas se nombran con el sufijo -ona cuando el grupo carbonilo es la función principal.",
  },
  {
    id: 38,
    topic: "Compuestos oxigenados",
    subtopic: "Ácidos carboxílicos",
    difficulty: "media",
    prompt: "¿Qué grupo funcional caracteriza a los ácidos carboxílicos?",
    options: ["-COOH", "-OH", "-CHO", "R-O-R'"],
    correctIndex: 0,
    explanation: "Los ácidos carboxílicos contienen el grupo carboxilo -COOH.",
  },
  {
    id: 39,
    topic: "Compuestos oxigenados",
    subtopic: "Prioridad funcional",
    difficulty: "alta",
    prompt: "Según la prioridad funcional presentada, ¿qué grupo tiene mayor prioridad entre alcohol y ácido carboxílico?",
    options: ["Alcohol", "Ácido carboxílico", "Ambos tienen siempre la misma prioridad", "Depende solo del número de carbonos"],
    correctIndex: 1,
    explanation: "En la tabla de prioridad funcional, los ácidos carboxílicos tienen mayor prioridad que alcoholes y éteres.",
  },
  {
    id: 40,
    topic: "Compuestos oxigenados",
    subtopic: "Reconocimiento funcional",
    difficulty: "alta",
    prompt: "¿Cuál opción relaciona correctamente grupo funcional y familia?",
    options: ["-OH: aldehído", "-CHO: alcohol", "R-O-R': éter", "-COOH: cetona"],
    correctIndex: 2,
    explanation: "La relación correcta es R-O-R': éter. -OH es alcohol, -CHO es aldehído y -COOH es ácido carboxílico.",
  },
];

const TOTAL_SECONDS = 2400;

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
    return "Muy buen resultado. Ahora conviene practicar ejercicios mixtos de formulación y nomenclatura, especialmente con hidrocarburos, ramificaciones y compuestos oxigenados para ganar velocidad.";
  }

  if (percentage >= 70) {
    return weakSubtopics.length > 0
      ? `Tienes una base funcional. Refuerza de forma puntual: ${weakSubtopics.join(", ")}. Después pasa a ejercicios donde debas formular y nombrar sin opciones.`
      : "Tienes una base funcional. Para subir de nivel, practica formulación directa y nomenclatura inversa sin mirar la tabla de radicales.";
  }

  if (percentage >= 50) {
    return weakTopics.length > 0
      ? `La base está en construcción. Prioriza estos bloques: ${weakTopics.join(", ")}. No avances a ejercicios largos hasta dominar cadena principal, numeración, insaturaciones y grupos funcionales.`
      : "La base está en construcción. Refuerza clasificación de hidrocarburos, reglas IUPAC y reconocimiento de grupos funcionales antes de aumentar la dificultad.";
  }

  return weakSubtopics.length > 0
    ? `Necesitas volver a fundamentos. Empieza por reconocer tipos de enlace, cadena principal y grupos funcionales esenciales. Subtemas urgentes: ${weakSubtopics.join(", ")}.`
    : "Necesitas volver a fundamentos: diferencia entre alcanos, alquenos, alquinos y compuestos oxigenados; cadena principal; numeración; y reglas básicas IUPAC.";
};

export default function QuizSimuladorOrganica() {
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
            <p className="mt-1 max-w-2xl text-xs leading-6 text-slate-300 md:text-base">
              Práctica con feedback inmediato y diagnóstico automático.
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
              <h2 className="text-2xl font-bold md:text-4xl">
                Cuestionario interactivo de química 
              </h2>
              <p className="mt-4 text-slate-300 leading-7">
                Responde cada pregunta y revisa la explicación inmediatamente.
                Al finalizar obtendrás un informe por tema, subtema y dificultad
                para saber qué reforzar primero.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <div className="text-3xl font-black text-cyan-200">40</div>
                <div className="mt-1 text-sm text-slate-300">preguntas</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <div className="text-3xl font-black text-fuchsia-200">30</div>
                <div className="mt-1 text-sm text-slate-300">minutos</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <div className="text-3xl font-black text-violet-200">3</div>
                <div className="mt-1 text-sm text-slate-300">
                  bloques temáticos
                </div>
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="mt-4 rounded-2xl border border-cyan-300 bg-cyan-300/15 px-7 py-4 font-bold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.22)] transition hover:bg-cyan-300/25"
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
                <h2 className="mt-1 text-1xl font-black md:text-2xl">
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

            <div className="mt-3 grid gap-4 md:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-sm text-slate-400">Puntaje</div>
                <div className="text-3xl font-black text-emerald-300">
                  {score}/{questions.length}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-xs text-slate-400">Respondidas</div>
                <div className="text-1xl font-black text-cyan-300">
                  {answeredCount}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-sm text-slate-400">Nivel general</div>
                <div className="text-1xl font-black text-fuchsia-300">
                  {levelLabel}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-sm text-slate-400">Porcentaje</div>
                <div className="text-1xl font-black text-violet-300">
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

            <div className="mt-1 space-y-4">
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

              <p className="mt-2 text-lg leading-8 text-slate-100 md:text-xl">
                {currentQuestion.prompt}
              </p>

              <div className="mt-3 space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={getOptionStyle(index)}
                  >
                    <span className="mr-3 inline-flex h-4 w-8 items-center justify-center rounded-full border border-white/15 bg-slate-950/50 font-black text-cyan-200">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="align-middle text-slate-100">
                      {option}
                    </span>
                  </button>
                ))}
              </div>

              {locked[currentQuestion.id] && (
                <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
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
                  <p className="mt-2 leading-2 text-slate-300">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={goPrev}
                  disabled={current === 0}
                  className="rounded-2xl border border-white/10 bg-white/4 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-40"
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

            <aside className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl lg:sticky lg:top-6 lg:h-fit">
              <h3 className="text-xl font-black">Progreso</h3>
              <p className="mt-2 text-sm text-slate-300">
                Verde: correcta · Rojo: incorrecta · Cyan: actual
              </p>

              <div className="mt-1 grid grid-cols-5 gap-2">
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
                      className={`rounded-xl border p-3 text-xs transition ${cls}`}
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
