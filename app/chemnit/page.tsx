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

const TOTAL_SECONDS = 1800;
const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
const questions: Question[] = [
  {
    "id": 1,
    "topic": "Compuestos nitrogenados",
    "subtopic": "Definición",
    "difficulty": "baja",
    "prompt": "¿Qué caracteriza principalmente a los compuestos orgánicos nitrogenados?",
    "options": [
      "No pueden formar enlaces covalentes.",
      "Contienen únicamente carbono e hidrógeno.",
      "Siempre presentan un anillo bencénico.",
      "Contienen nitrógeno en sus grupos funcionales.",
      
    ],
    "correctIndex": 3,
    "explanation": "Los compuestos nitrogenados se identifican porque incorporan nitrógeno en grupos funcionales como aminas, amidas e iminas."
  },
  {
    "id": 2,
    "topic": "Aminas",
    "subtopic": "Origen estructural",
    "difficulty": "baja",
    "prompt": "Las aminas pueden considerarse derivadas de la sustitución de hidrógenos de:",
    "options": [
      "Agua, H₂O",
      "Ácido acético, CH₃COOH",
      "Metano, CH₄",
      "Amoníaco, NH₃"
    ],
    "correctIndex": 3,
    "explanation": "Las aminas se forman al sustituir uno o más hidrógenos del amoníaco por radicales orgánicos."
  },
  {
    "id": 3,
    "topic": "Aminas",
    "subtopic": "Grupo funcional",
    "difficulty": "baja",
    "prompt": "¿Cuál grupo funcional corresponde a una amina primaria?",
    "options": [
      "R-NH₂",
      "R-CO-NH₂",
      "R-C=N-H",
      "R-O-R'"
    ],
    "correctIndex": 0,
    "explanation": "Una amina primaria tiene un radical orgánico unido al nitrógeno y conserva dos hidrógenos: R-NH₂."
  },
  {
    "id": 4,
    "topic": "Aminas",
    "subtopic": "Clasificación",
    "difficulty": "baja",
    "prompt": "Una amina secundaria se reconoce porque el nitrógeno está unido a:",
    "options": [
      "Un radical y dos hidrógenos",
      "Dos radicales y un hidrógeno",
      "Tres radicales y ningún hidrógeno",
      "Un carbonilo y un oxígeno"
    ],
    "correctIndex": 1,
    "explanation": "En una amina secundaria, dos hidrógenos del NH₃ fueron reemplazados por radicales orgánicos."
  },
  {
    "id": 5,
    "topic": "Aminas",
    "subtopic": "Clasificación",
    "difficulty": "baja",
    "prompt": "La trimetilamina es una amina:",
    "options": [
      "Primaria",
      "Secundaria",
      "Terciaria",
      "Amida"
    ],
    "correctIndex": 2,
    "explanation": "En la trimetilamina, el nitrógeno está unido a tres grupos metilo; por eso es una amina terciaria."
  },
  {
    "id": 6,
    "topic": "Aminas",
    "subtopic": "Nomenclatura",
    "difficulty": "baja",
    "prompt": "El compuesto CH₃-NH₂ puede nombrarse como:",
    "options": [
      "Metilamina",
      "Metanamida",
      "Metanimina",
      "Metanol"
    ],
    "correctIndex": 0,
    "explanation": "CH₃-NH₂ es una amina primaria con un grupo metilo unido al nitrógeno; se nombra metilamina."
  },
  {
    "id": 7,
    "topic": "Aminas",
    "subtopic": "Nomenclatura",
    "difficulty": "media",
    "prompt": "¿Cuál es el nombre correcto de CH₃-CH₂-NH₂?",
    "options": [
      "Etanamida",
      "Etilamina",
      "Dimetilamina",
      "Etanona"
    ],
    "correctIndex": 1,
    "explanation": "La cadena tiene dos carbonos y el grupo amino; puede nombrarse como etilamina o etanamina."
  },
  {
    "id": 8,
    "topic": "Aminas",
    "subtopic": "Prefijos multiplicadores",
    "difficulty": "media",
    "prompt": "Si una amina tiene tres radicales metilo unidos al nitrógeno, el nombre esperado es:",
    "options": [
      "Trietanamida",
      "Dimetilamina",
      "Metiletilamina",
      "Trimetilamina"
    ],
    "correctIndex": 3,
    "explanation": "Cuando un radical se repite, se usan prefijos como di-, tri-, tetra-. Tres metilos dan trimetilamina."
  },
  {
    "id": 9,
    "topic": "Aminas",
    "subtopic": "Orden alfabético",
    "difficulty": "media",
    "prompt": "Cuando una amina tiene radicales diferentes, estos deben nombrarse generalmente:",
    "options": [
      "Por masa molecular decreciente",
      "En orden alfabético",
      "Siempre del más largo al más corto",
      "Sin considerar el radical"
    ],
    "correctIndex": 1,
    "explanation": "En la nomenclatura de aminas con radicales diferentes, los sustituyentes se ordenan alfabéticamente."
  },
  {
    "id": 10,
    "topic": "Aminas",
    "subtopic": "Amino como sustituyente",
    "difficulty": "media",
    "prompt": "Cuando la amina no es el grupo funcional principal, suele nombrarse como:",
    "options": [
      "Amino-",
      "Oxo-",
      "Carboxi-",
      "Alcoxi-"
    ],
    "correctIndex": 0,
    "explanation": "Si otro grupo funcional tiene mayor prioridad, el grupo -NH₂ se nombra como sustituyente amino-."
  },
  {
    "id": 11,
    "topic": "Aminas",
    "subtopic": "Prioridad funcional",
    "difficulty": "alta",
    "prompt": "En el nombre 6-aminoheptan-2-ona, ¿por qué aparece “amino” como prefijo?",
    "options": [
      "Porque la cetona tiene prioridad sobre la amina.",
      "Porque no hay nitrógeno en la molécula.",
      "Porque el grupo amino siempre es el principal.",
      "Porque la cadena tiene menos de tres carbonos."
    ],
    "correctIndex": 0,
    "explanation": "El grupo carbonilo de una cetona tiene prioridad; por eso -NH₂ se nombra como sustituyente amino-."
  },
  {
    "id": 12,
    "topic": "Amidas",
    "subtopic": "Origen estructural",
    "difficulty": "baja",
    "prompt": "Las amidas se relacionan estructuralmente con los ácidos carboxílicos porque contienen:",
    "options": [
      "Un grupo carbonilo unido a nitrógeno",
      "Un enlace C=C",
      "Un anillo aromático obligatorio",
      "Solo enlaces C-H"
    ],
    "correctIndex": 0,
    "explanation": "La función amida presenta un carbonilo unido a nitrógeno: -CONH₂, -CONHR o -CONR₂."
  },
  {
    "id": 13,
    "topic": "Amidas",
    "subtopic": "Grupo funcional",
    "difficulty": "baja",
    "prompt": "¿Cuál fórmula representa una amida primaria?",
    "options": [
      "R-COOH",
      "R-NH₂",
      "R-C=N-H",
      "R-CONH₂"
    ],
    "correctIndex": 3,
    "explanation": "Una amida primaria tiene el grupo carbonilo unido a -NH₂: R-CONH₂."
  },
  {
    "id": 14,
    "topic": "Amidas",
    "subtopic": "Clasificación",
    "difficulty": "media",
    "prompt": "Una amida terciaria se reconoce porque el nitrógeno del grupo amida está unido a:",
    "options": [
      "Dos hidrógenos",
      "Un hidrógeno y un radical",
      "Dos radicales orgánicos",
      "Tres grupos carbonilo"
    ],
    "correctIndex": 2,
    "explanation": "En una amida terciaria, los dos hidrógenos del nitrógeno han sido sustituidos por radicales orgánicos."
  },
  {
    "id": 15,
    "topic": "Amidas",
    "subtopic": "Nomenclatura",
    "difficulty": "baja",
    "prompt": "Las amidas se nombran, en general, cambiando la terminación -oico del ácido carboxílico por:",
    "options": [
      "-amina",
      "-amida",
      "-imina",
      "-eno"
    ],
    "correctIndex": 1,
    "explanation": "Por ejemplo, ácido etanoico → etanamida. La terminación característica es -amida."
  },
  {
    "id": 16,
    "topic": "Amidas",
    "subtopic": "Nomenclatura",
    "difficulty": "media",
    "prompt": "¿Cuál es el nombre correcto de HCONH₂?",
    "options": [
      "Metanimina",
      "Metilamina",
      "Metanamida",
      "Metanona"
    ],
    "correctIndex": 2,
    "explanation": "HCONH₂ deriva del ácido metanoico; al cambiar -oico por -amida se obtiene metanamida."
  },
  {
    "id": 17,
    "topic": "Amidas",
    "subtopic": "Nomenclatura",
    "difficulty": "media",
    "prompt": "¿Cuál es el nombre correcto de CH₃CONH₂?",
    "options": [
      "Metanamida",
      "Etanamida",
      "Etilamina",
      "Etanal"
    ],
    "correctIndex": 1,
    "explanation": "CH₃CONH₂ tiene dos carbonos incluyendo el carbonilo; corresponde a etanamida."
  },
  {
    "id": 18,
    "topic": "Amidas",
    "subtopic": "Sustitución en nitrógeno",
    "difficulty": "media",
    "prompt": "En una amida con un radical metilo unido al nitrógeno, se usa el prefijo:",
    "options": [
      "O-metil-",
      "N-metil-",
      "C-metil-",
      "P-metil-"
    ],
    "correctIndex": 1,
    "explanation": "Los radicales sustituidos directamente sobre el nitrógeno de una amida se indican con N-."
  },
  {
    "id": 19,
    "topic": "Amidas",
    "subtopic": "Sustitución en nitrógeno",
    "difficulty": "alta",
    "prompt": "¿Qué indica la letra N en un nombre como N-metilpropanamida?",
    "options": [
      "Que el metilo está unido al nitrógeno.",
      "Que la cadena principal tiene nitrógeno como primer carbono.",
      "Que hay un triple enlace.",
      "Que es un derivado del benceno."
    ],
    "correctIndex": 0,
    "explanation": "La letra N señala que el sustituyente no está sobre un carbono de la cadena, sino sobre el nitrógeno de la amida."
  },
  {
    "id": 20,
    "topic": "Amidas",
    "subtopic": "Nomenclatura avanzada",
    "difficulty": "alta",
    "prompt": "Si una molécula contiene el grupo -CONH₂, ¿qué grupo debe incluirse obligatoriamente en la cadena principal para nombrarla como amida?",
    "options": [
      "El carbonilo de la amida",
      "El radical más pequeño",
      "Un anillo de benceno",
      "Solo el nitrógeno"
    ],
    "correctIndex": 0,
    "explanation": "La cadena principal de una amida debe contener el carbono del grupo carbonilo unido al nitrógeno."
  },
  {
    "id": 21,
    "topic": "Iminas",
    "subtopic": "Definición",
    "difficulty": "baja",
    "prompt": "Las iminas se caracterizan principalmente por presentar el enlace:",
    "options": [
      "O-H",
      "C≡C",
      "C-O-C",
      "C=N"],
    "correctIndex": 3,
    "explanation": "El grupo funcional imina contiene un doble enlace carbono-nitrógeno: C=N."
  },
  {
    "id": 22,
    "topic": "Iminas",
    "subtopic": "Grupo funcional",
    "difficulty": "baja",
    "prompt": "¿Cuál estructura general corresponde mejor a una imina no sustituida en el nitrógeno?",
    "options": [
      "R₂C=NH",
      "R-COOH",
      "R-OH",
      "R-CONH₂"
    ],
    "correctIndex": 0,
    "explanation": "Una imina puede representarse como R₂C=NH cuando el nitrógeno conserva un hidrógeno."
  },
  {
    "id": 23,
    "topic": "Iminas",
    "subtopic": "Propiedades generales",
    "difficulty": "media",
    "prompt": "Según el material, las iminas son generalmente menos básicas que:",
    "options": [
      "Las aminas",
      "Los alcanos",
      "Los éteres",
      "Los cicloalcanos"
    ],
    "correctIndex": 0,
    "explanation": "El material indica que las iminas son menos básicas que las aminas, aunque ambas contienen nitrógeno."
  },
  {
    "id": 24,
    "topic": "Iminas",
    "subtopic": "Nomenclatura",
    "difficulty": "media",
    "prompt": "El compuesto propan-2-imina indica que el enlace C=N se encuentra en el carbono:",
    "options": [
      "1",
      "2",
      "3",
      "No se puede saber"
    ],
    "correctIndex": 1,
    "explanation": "El localizador 2 señala la posición del enlace o grupo imina dentro de la cadena principal."
  },
  {
    "id": 25,
    "topic": "Iminas",
    "subtopic": "Nomenclatura",
    "difficulty": "media",
    "prompt": "¿Cuál terminación se usa para nombrar una imina como grupo funcional principal?",
    "options": [
      "-amina",
      "-amida",
      "-imina",
      "-ol"
    ],
    "correctIndex": 2,
    "explanation": "Las iminas se nombran finalizando con la palabra o sufijo imina, indicando la posición del C=N si corresponde."
  },
  {
    "id": 26,
    "topic": "Iminas",
    "subtopic": "Sustitución en nitrógeno",
    "difficulty": "alta",
    "prompt": "En N-metilpropan-2-imina, ¿qué significa N-metil?",
    "options": [
      "Que el grupo metilo está unido al nitrógeno.",
      "Que el metilo está en el carbono 1.",
      "Que hay tres metilos en la cadena.",
      "Que es una amida secundaria."
    ],
    "correctIndex": 0,
    "explanation": "La notación N- se usa cuando el sustituyente está unido directamente al nitrógeno de la imina."
  },
  {
    "id": 27,
    "topic": "Iminas",
    "subtopic": "Diferenciación funcional",
    "difficulty": "alta",
    "prompt": "¿Cuál opción diferencia mejor una amida de una imina?",
    "options": [
      "La amida tiene C=O unido a N; la imina tiene C=N.",
      "La amida solo tiene C=C; la imina solo tiene C-C.",
      "La amida siempre es cíclica; la imina nunca lo es.",
      "No hay diferencia funcional."
    ],
    "correctIndex": 0,
    "explanation": "La amida contiene carbonilo unido a nitrógeno (-CON-), mientras que la imina contiene doble enlace carbono-nitrógeno (C=N)."
  },
  {
    "id": 28,
    "topic": "Compuestos cíclicos",
    "subtopic": "Definición",
    "difficulty": "baja",
    "prompt": "¿Qué caracteriza a un compuesto cíclico?",
    "options": [
      "Sus átomos forman un anillo o ciclo.",
      "No contiene carbono.",
      "Solo contiene oxígeno.",
      "Debe tener un grupo amida."
    ],
    "correctIndex": 0,
    "explanation": "Los compuestos cíclicos presentan una cadena cerrada en forma de anillo."
  },
  {
    "id": 29,
    "topic": "Compuestos cíclicos",
    "subtopic": "Nomenclatura básica",
    "difficulty": "baja",
    "prompt": "Para nombrar un hidrocarburo cíclico, se antepone al nombre del hidrocarburo la palabra:",
    "options": [
      "iso",
      "ciclo",
      "amino",
      "oxo"
    ],
    "correctIndex": 1,
    "explanation": "La nomenclatura de cicloalcanos y cicloalquenos utiliza el prefijo ciclo-, como ciclobutano o ciclohexano."
  },
  {
    "id": 30,
    "topic": "Compuestos cíclicos",
    "subtopic": "Cicloalcanos",
    "difficulty": "baja",
    "prompt": "Un anillo saturado de seis carbonos se llama:",
    "options": [
      "Ciclopropano",
      "Ciclobutano",
      "Ciclopentano",
      "Ciclohexano"
    ],
    "correctIndex": 3,
    "explanation": "El prefijo hex- indica seis carbonos; al ser cíclico y saturado se llama ciclohexano."
  },
  {
    "id": 31,
    "topic": "Compuestos cíclicos",
    "subtopic": "Cicloalquenos",
    "difficulty": "media",
    "prompt": "Cuando un compuesto cíclico tiene un doble enlace, la terminación -ano cambia a:",
    "options": [
      "-eno",
      "-ino",
      "-amina",
      "-amida"
    ],
    "correctIndex": 0,
    "explanation": "Un doble enlace convierte al cicloalcano en cicloalqueno; por eso se usa la terminación -eno."
  },
  {
    "id": 32,
    "topic": "Compuestos cíclicos",
    "subtopic": "Numeración",
    "difficulty": "media",
    "prompt": "En un cicloalqueno con un solo doble enlace, los carbonos del doble enlace se consideran generalmente:",
    "options": [
      "1 y 2",
      "2 y 3",
      "3 y 4",
      "No se numeran jamás"
    ],
    "correctIndex": 0,
    "explanation": "En cicloalquenos simples, los carbonos del doble enlace se toman como 1 y 2, sin necesidad de indicar la posición del doble enlace."
  },
  {
    "id": 33,
    "topic": "Compuestos cíclicos",
    "subtopic": "Dienos cíclicos",
    "difficulty": "alta",
    "prompt": "Si un ciclohexadieno puede numerarse como 1,3 o como 1,5, ¿cuál numeración se elige?",
    "options": [
      "Ninguna; no se nombran dienos cíclicos",
      "1,5 porque suma más alto",
      "La que empiece por el carbono más pesado",
      "1,3 porque da localizadores más bajos"
    ],
    "correctIndex": 3,
    "explanation": "La regla es escoger el sentido de numeración que otorgue los localizadores más bajos a las insaturaciones."
  },
  {
    "id": 34,
    "topic": "Compuestos cíclicos",
    "subtopic": "Sustitución",
    "difficulty": "media",
    "prompt": "Cuando un cicloalcano tiene una sola sustitución, normalmente:",
    "options": [
      "No es necesario indicar la posición del sustituyente.",
      "Siempre se escribe el localizador 6.",
      "Se elimina la palabra ciclo.",
      "Se cambia a amida."
    ],
    "correctIndex": 0,
    "explanation": "Si hay un solo sustituyente en el ciclo, su posición es evidente y no suele indicarse el número 1."
  },
  {
    "id": 35,
    "topic": "Compuestos cíclicos",
    "subtopic": "Sustitución",
    "difficulty": "media",
    "prompt": "¿Cuál nombre es adecuado para un ciclohexano con un átomo de cloro como único sustituyente?",
    "options": [
      "Hexanocloruro",
      "Ciclohexeno clorado 1,2",
      "Clorociclohexano",
      "Clorohexanamida"
    ],
    "correctIndex": 2,
    "explanation": "Con una sola sustitución, se nombra el sustituyente seguido del cicloalcano: clorociclohexano."
  },
  {
    "id": 36,
    "topic": "Benceno",
    "subtopic": "Estructura",
    "difficulty": "baja",
    "prompt": "¿Cuál es la fórmula molecular del benceno?",
    "options": [
      "C₆H₆",
      "C₆H₁₂",
      "C₅H₅N",
      "CH₄"
    ],
    "correctIndex": 0,
    "explanation": "El benceno tiene fórmula molecular C₆H₆ y una estructura plana aromática."
  },
  {
    "id": 37,
    "topic": "Benceno",
    "subtopic": "Monosustituidos",
    "difficulty": "media",
    "prompt": "En derivados monosustituidos del benceno, primero se nombra:",
    "options": [
      "El número 1 obligatoriamente",
      "La palabra benceno y nunca el sustituyente",
      "Siempre el prefijo orto",
      "El grupo sustituyente y luego la palabra benceno"
    ],
    "correctIndex": 3,
    "explanation": "Para monosustituidos se nombra el sustituyente seguido de benceno: clorobenceno, bromobenceno, nitrobenceno."
  },
  {
    "id": 38,
    "topic": "Benceno",
    "subtopic": "Nombres comunes",
    "difficulty": "media",
    "prompt": "El metilbenceno también se conoce comúnmente como:",
    "options": [
      "Tolueno",
      "Fenol",
      "Anilina",
      "Benzaldehído"
    ],
    "correctIndex": 0,
    "explanation": "El metilbenceno recibe el nombre común de tolueno."
  },
  {
    "id": 39,
    "topic": "Benceno",
    "subtopic": "Nombres comunes",
    "difficulty": "media",
    "prompt": "El hidroxibenceno también se conoce como:",
    "options": [
      "Fenol",
      "Tolueno",
      "Anilina",
      "Nitrobenceno"
    ],
    "correctIndex": 0,
    "explanation": "El hidroxibenceno se conoce como fenol, debido al grupo -OH unido al anillo bencénico."
  },
  {
    "id": 40,
    "topic": "Benceno",
    "subtopic": "Disustituidos",
    "difficulty": "alta",
    "prompt": "En derivados disustituidos del benceno, los prefijos orto, meta y para indican:",
    "options": [
      "La presencia obligatoria de nitrógeno",
      "La cantidad total de hidrógenos de la molécula",
      "La posición relativa de dos sustituyentes en el anillo",
      "El tipo de enlace C=N"
    ],
    "correctIndex": 2,
    "explanation": "Orto, meta y para describen posiciones relativas de dos sustituyentes en el anillo bencénico: 1,2; 1,3; y 1,4, respectivamente."
  }
];

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
    return "Muy buen resultado. Ahora conviene practicar ejercicios mixtos de nomenclatura con aminas, amidas, iminas, ciclos y derivados del benceno para ganar velocidad.";
  }

  if (percentage >= 70) {
    return weakSubtopics.length > 0
      ? `Tienes una base funcional. Refuerza de forma puntual: ${weakSubtopics.join(", ")}. Después pasa a ejercicios donde debas formular y nombrar sin opciones.`
      : "Tienes una base funcional. Para subir de nivel, practica identificación directa de grupos nitrogenados y nomenclatura inversa de ciclos y derivados bencénicos.";
  }

  if (percentage >= 50) {
    return weakTopics.length > 0
      ? `La base está en construcción. Prioriza estos bloques: ${weakTopics.join(", ")}. No avances a ejercicios largos hasta dominar grupos funcionales nitrogenados, sustitución en N, numeración de ciclos y posiciones orto/meta/para.`
      : "La base está en construcción. Refuerza clasificación de aminas, amidas e iminas, nomenclatura de ciclos y reconocimiento de derivados del benceno antes de aumentar la dificultad.";
  }

  return weakSubtopics.length > 0
    ? `Necesitas volver a fundamentos. Empieza por reconocer grupos funcionales nitrogenados, ciclos y derivados básicos del benceno. Subtemas urgentes: ${weakSubtopics.join(", ")}.`
    : "Necesitas volver a fundamentos: diferencia entre aminas, amidas e iminas; reglas de ciclos; benceno monosustituido y disustituido; y notación N-.";
};

export default function QuizSimuladorNitrogenadosCiclicos() {
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
              Simulador de Nitrogenados y Cíclicos
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
                Cuestionario interactivo de nitrogenados y cíclicos
              </h2>
              <p className="mt-2 text-slate-300 leading-4">
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
              className="mt-2 rounded-2xl border border-cyan-300 bg-cyan-300/15 px-7 py-4 font-bold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.22)] transition hover:bg-cyan-300/25"
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
                  <h2 className="mt-2 text-sm font-black md:text-lg">
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

              <p className="mt-4 text-sm leading-4 text-slate-100 md:text-xl">
                {currentQuestion.prompt}
              </p>

              <div className="mt-7 space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={getOptionStyle(index)}
                  >
                    <span className="mr-3 inline-flex h-3 w-4 items-center justify-center rounded-full border border-white/15 bg-slate-950/50 font-black text-cyan-200">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="align-middle text-slate-100">
                      {option}
                    </span>
                  </button>
                ))}
              </div>

              {locked[currentQuestion.id] && (
                <div className="mt-3 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <div
                    className={`text-lg font-black ${
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
                  <p className="mt-2 leading-4 text-slate-300">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
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

              <div className="mt-3 grid grid-cols-5 gap-2">
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
