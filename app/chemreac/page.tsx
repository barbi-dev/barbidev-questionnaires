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

type GroupPerformance = { name: string; total: number; correct: number; percentage: number };

const questions: Question[] = [
  { id: 1, topic: "Reacciones químicas", subtopic: "Concepto", difficulty: "baja", prompt: "¿Qué es una reacción química?", options: ["Un cambio físico sin sustancias nuevas", "Un proceso donde reactivos se transforman en productos", "Una mezcla sin cambio de composición", "Una técnica de separación"], correctIndex: 1, explanation: "En una reacción química la materia se transforma: los reactivos forman productos con composición y propiedades diferentes." },
  { id: 2, topic: "Ecuaciones químicas", subtopic: "Reactivos", difficulty: "baja", prompt: "En una ecuación química, los reactivos se escriben generalmente:", options: ["A la derecha de la flecha", "A la izquierda de la flecha", "Sobre la flecha", "Debajo de la ecuación"], correctIndex: 1, explanation: "Los reactivos son las sustancias iniciales y se colocan a la izquierda de la flecha." },
  { id: 3, topic: "Ecuaciones químicas", subtopic: "Productos", difficulty: "baja", prompt: "Las sustancias obtenidas al final de una reacción se llaman:", options: ["Reactivos", "Coeficientes", "Productos", "Subíndices"], correctIndex: 2, explanation: "Los productos son las nuevas sustancias formadas y se escriben a la derecha de la flecha." },
  { id: 4, topic: "Ecuaciones químicas", subtopic: "Símbolos", difficulty: "baja", prompt: "El símbolo → en una ecuación química significa:", options: ["Se separan sustancias por filtración", "Produce o da lugar a", "Es igual matemáticamente", "Se evapora"], correctIndex: 1, explanation: "La flecha indica que los reactivos producen o dan lugar a los productos." },
  { id: 5, topic: "Ecuaciones químicas", subtopic: "Conservación de la masa", difficulty: "baja", prompt: "La ley de conservación de la masa indica que:", options: ["La masa de productos es siempre mayor", "La masa total de reactivos es igual a la masa total de productos", "Los átomos desaparecen", "Los productos no tienen masa"], correctIndex: 1, explanation: "En una reacción química los átomos se reorganizan; no se crean ni destruyen." },
  { id: 6, topic: "Ecuaciones químicas", subtopic: "Estados físicos", difficulty: "baja", prompt: "En una ecuación, el símbolo (g) representa estado:", options: ["Sólido", "Líquido", "Gaseoso", "Acuoso"], correctIndex: 2, explanation: "(g) indica gas. También se usan (s), (l) y (ac) o (aq)." },
  { id: 7, topic: "Ecuaciones químicas", subtopic: "Estados físicos", difficulty: "baja", prompt: "El símbolo (ac) o (aq) significa:", options: ["Acuoso", "Sólido", "Gas", "Precipitado obligatorio"], correctIndex: 0, explanation: "(ac) o (aq) indica que la sustancia está disuelta en agua." },
  { id: 8, topic: "Balanceo por tanteo", subtopic: "Coeficientes", difficulty: "media", prompt: "En 2H₂ + O₂ → 2H₂O, el 2 antes de H₂ es:", options: ["Subíndice", "Coeficiente", "Carga iónica", "Estado de oxidación"], correctIndex: 1, explanation: "El coeficiente indica cuántas moléculas o moles participan en la reacción." },
  { id: 9, topic: "Balanceo por tanteo", subtopic: "Subíndices", difficulty: "media", prompt: "¿Por qué no se cambian los subíndices al balancear?", options: ["Porque solo indican color", "Porque no importan", "Porque siempre valen cero", "Porque cambiarían la identidad de la sustancia"], correctIndex: 3, explanation: "Cambiar un subíndice modifica la fórmula y, por tanto, la sustancia química." },
  { id: 10, topic: "Balanceo por tanteo", subtopic: "Objetivo", difficulty: "baja", prompt: "Balancear una ecuación significa:", options: ["Cambiar productos", "Igualar el número de átomos de cada elemento en ambos lados", "Eliminar reactivos", "Escribir solo símbolos"], correctIndex: 1, explanation: "El balanceo cumple la conservación de masa: mismos átomos antes y después." },
  { id: 11, topic: "Balanceo por tanteo", subtopic: "Orden", difficulty: "media", prompt: "Una estrategia común para balancear por tanteo es dejar para el final:", options: ["Hidrógeno y oxígeno", "Metales únicamente", "Todos los productos", "La flecha"], correctIndex: 0, explanation: "Suele iniciarse con metales y no metales, dejando H y O para el final." },
  { id: 12, topic: "Balanceo por tanteo", subtopic: "Balanceo básico", difficulty: "media", prompt: "Balancea: H₂ + O₂ → H₂O", options: ["H₂ + O₂ → H₂O",  "2H₂ + 2O₂ → H₂O", "H₂ + 2O₂ → H₂O","2H₂ + O₂ → 2H₂O"], correctIndex: 3, explanation: "2H₂ + O₂ → 2H₂O tiene 4 H y 2 O en ambos lados." },
  { id: 13, topic: "Balanceo por tanteo", subtopic: "Balanceo básico", difficulty: "media", prompt: "Balancea: Na + Cl₂ → NaCl", options: ["Na + Cl₂ → NaCl","2Na + 2Cl₂ → NaCl" , "Na + 2Cl₂ → NaCl", "2Na + Cl₂ → 2NaCl"], correctIndex: 3, explanation: "Cl₂ tiene dos átomos de cloro, por eso se forman 2NaCl y se usan 2Na." },
  { id: 14, topic: "Balanceo por tanteo", subtopic: "Balanceo básico", difficulty: "media", prompt: "Balancea: Zn + HCl → ZnCl₂ + H₂", options: ["Zn + HCl → ZnCl₂ + H₂", "Zn + 2HCl → ZnCl₂ + H₂", "2Zn + HCl → ZnCl₂ + H₂", "Zn + HCl → 2ZnCl₂ + H₂"], correctIndex: 1, explanation: "Se requieren 2Cl para ZnCl₂, por eso se coloca 2HCl." },
  { id: 15, topic: "Balanceo por tanteo", subtopic: "Balanceo básico", difficulty: "media", prompt: "La ecuación CaCO₃ → CaO + CO₂ está:", options: ["Sin balancear","Incorrecta porque falta H₂" ,"Balanceada" , "Incorrecta porque falta O₂"], correctIndex: 2, explanation: "Tiene 1 Ca, 1 C y 3 O en ambos lados." },
  { id: 16, topic: "Balanceo por tanteo", subtopic: "Balanceo intermedio", difficulty: "alta", prompt: "Balancea: Al + O₂ → Al₂O₃", options: ["2Al + O₂ → Al₂O₃", "4Al + 3O₂ → 2Al₂O₃", "Al + 3O₂ → Al₂O₃", "4Al + O₂ → 2Al₂O₃"], correctIndex: 1, explanation: "4Al + 3O₂ → 2Al₂O₃ tiene 4 Al y 6 O en ambos lados." },
  { id: 17, topic: "Balanceo por tanteo", subtopic: "Balanceo intermedio", difficulty: "alta", prompt: "Balancea: Fe + O₂ → Fe₂O₃", options: ["2Fe + O₂ → Fe₂O₃","2Fe + 3O₂ → 2Fe₂O₃" , "Fe + 3O₂ → Fe₂O₃", "4Fe + 3O₂ → 2Fe₂O₃"], correctIndex: 3, explanation: "4Fe + 3O₂ → 2Fe₂O₃ conserva 4 Fe y 6 O." },
  { id: 18, topic: "Tipos de reacciones", subtopic: "Combinación", difficulty: "baja", prompt: "Una reacción de combinación tiene forma general:", options: ["AB → A + B","AX + BY → AY + BX" ,"A + B → AB" , "HA + BOH → BA + H₂O"], correctIndex: 2, explanation: "En combinación, dos o más sustancias forman una más compleja." },
  { id: 19, topic: "Tipos de reacciones", subtopic: "Descomposición", difficulty: "baja", prompt: "CaCO₃ → CaO + CO₂ es una reacción de:", options: ["Combinación", "Descomposición", "Neutralización", "Combustión"], correctIndex: 1, explanation: "Un compuesto se separa en sustancias más simples." },
  { id: 20, topic: "Tipos de reacciones", subtopic: "Desplazamiento simple", difficulty: "media", prompt: "Fe + CuSO₄ → Cu + FeSO₄ corresponde a:", options: ["Desplazamiento simple", "Doble desplazamiento", "Neutralización", "Combustión"], correctIndex: 0, explanation: "El hierro desplaza al cobre del compuesto CuSO₄." },
  { id: 21, topic: "Tipos de reacciones", subtopic: "Doble desplazamiento", difficulty: "media", prompt: "Una reacción de doble desplazamiento corresponde a:", options: ["A + B → AB", "AB → A + B", "A + BC → AC + B", "AX + BY → AY + BX"], correctIndex: 3, explanation: "En doble desplazamiento dos compuestos intercambian iones o radicales." },
  { id: 22, topic: "Tipos de reacciones", subtopic: "Neutralización", difficulty: "baja", prompt: "Una neutralización ocurre entre:", options: ["Ácido y base", "Metal y oxígeno", "Dos sales", "Dos gases nobles"], correctIndex: 0, explanation: "Una reacción ácido-base forma generalmente una sal y agua." },
  { id: 23, topic: "Tipos de reacciones", subtopic: "Neutralización", difficulty: "media", prompt: "Los productos típicos de una neutralización son:", options: ["Sal y agua", "Óxido y luz", "Metal e hidrógeno", "Carbono y oxígeno"], correctIndex: 0, explanation: "Ácido + base → sal + agua." },
  { id: 24, topic: "Tipos de reacciones", subtopic: "Combustión", difficulty: "baja", prompt: "El comburente más común en una combustión es:", options: ["CO₂", "N₂", "H₂", "O₂"], correctIndex: 3, explanation: "La mayoría de combustiones ocurren con oxígeno molecular." },
  { id: 25, topic: "Tipos de reacciones", subtopic: "Combustión", difficulty: "media", prompt: "La combustión completa de un hidrocarburo produce principalmente:", options: ["CO₂ y H₂O", "NaCl y H₂O", "H₂ y O₂", "CaO y CO₂"], correctIndex: 0, explanation: "Con oxígeno suficiente, C y H se transforman en CO₂ y H₂O." },
  { id: 26, topic: "Tipos de reacciones", subtopic: "Combustión", difficulty: "media", prompt: "La combustión es exotérmica porque:", options: ["Absorbe energía", "Libera calor y luz", "No cambia energía", "Siempre forma precipitado"], correctIndex: 1, explanation: "Las combustiones liberan energía, especialmente calor y luz." },
  { id: 27, topic: "Redox", subtopic: "Concepto", difficulty: "baja", prompt: "Una reacción redox implica transferencia de:", options: ["Electrones", "Neutrones", "Moléculas de agua", "Rayos gamma"], correctIndex: 0, explanation: "Las reacciones redox se basan en transferencia de electrones." },
  { id: 28, topic: "Redox", subtopic: "Oxidación", difficulty: "baja", prompt: "Una sustancia se oxida cuando:", options: ["Gana electrones","Se disuelve" , "No cambia", "Pierde electrones"], correctIndex: 3, explanation: "Oxidarse significa perder electrones y aumentar estado de oxidación." },
  { id: 29, topic: "Redox", subtopic: "Reducción", difficulty: "baja", prompt: "Una sustancia se reduce cuando:", options: ["Gana electrones", "Pierde electrones", "Se evapora", "Se quema siempre"], correctIndex: 0, explanation: "Reducirse significa ganar electrones y disminuir estado de oxidación." },
  { id: 30, topic: "Redox", subtopic: "Estado de oxidación", difficulty: "media", prompt: "Si un elemento pasa de 0 a +2, entonces:", options: ["Se reduce", "No participa","Se oxida" , "Gana dos electrones"], correctIndex: 2, explanation: "Aumenta su estado de oxidación, por lo tanto se oxida." },
  { id: 31, topic: "Redox", subtopic: "Estado de oxidación", difficulty: "media", prompt: "Si un elemento pasa de +3 a 0, entonces:", options: ["Se oxida","Aumenta su carga" , "Pierde electrones", "Se reduce"], correctIndex: 3, explanation: "Disminuye el estado de oxidación, por lo tanto gana electrones y se reduce." },
  { id: 32, topic: "Redox", subtopic: "Agente oxidante", difficulty: "media", prompt: "El agente oxidante es la sustancia que:", options: ["Se reduce y provoca oxidación", "Se oxida y provoca reducción", "No gana electrones", "Siempre es oxígeno puro"], correctIndex: 0, explanation: "El agente oxidante acepta electrones; por eso se reduce y oxida a otra especie." },
  { id: 33, topic: "Redox", subtopic: "Agente reductor", difficulty: "media", prompt: "El agente reductor es la sustancia que:", options: ["Se reduce", "Se oxida y provoca reducción", "No cambia", "Siempre es agua"], correctIndex: 1, explanation: "El agente reductor dona electrones, por eso se oxida." },
  { id: 34, topic: "Redox", subtopic: "Identificación", difficulty: "alta", prompt: "En Zn + FeS → ZnS + Fe, ¿qué elemento se oxida?", options: ["Zn", "Fe", "S", "Ninguno"], correctIndex: 0, explanation: "Zn pasa de 0 a +2, por eso se oxida." },
  { id: 35, topic: "Redox", subtopic: "Identificación", difficulty: "alta", prompt: "En Zn + FeS → ZnS + Fe, ¿qué elemento se reduce?", options: ["Zn", "Fe", "S", "Cl"], correctIndex: 1, explanation: "Fe pasa de +2 a 0, por eso se reduce." },
  { id: 36, topic: "Redox", subtopic: "Agente reductor", difficulty: "alta", prompt: "En Zn + FeS → ZnS + Fe, el agente reductor es:", options: ["Fe", "FeS", "ZnS", "Zn"], correctIndex: 3, explanation: "El agente reductor es quien se oxida. Aquí se oxida el Zn." },
  { id: 37, topic: "Redox", subtopic: "Balanceo redox", difficulty: "alta", prompt: "En el método redox se deben igualar:", options: ["Electrones perdidos y ganados", "Colores de reactivos y productos", "Estados físicos", "Nombres comunes"], correctIndex: 0, explanation: "El balanceo redox exige que los electrones perdidos sean iguales a los ganados." },
  { id: 38, topic: "Redox", subtopic: "Semirreacciones", difficulty: "alta", prompt: "Cu²⁺ → Cu⁰ representa:", options: ["Oxidación", "Reducción", "Neutralización", "Combustión"], correctIndex: 1, explanation: "Cu²⁺ gana 2 electrones para formar Cu⁰; eso es reducción." },
  { id: 39, topic: "Redox", subtopic: "Semirreacciones", difficulty: "alta", prompt: "N³⁻ → N⁰ representa:", options: ["Reducción", "Oxidación", "Doble desplazamiento", "Precipitación"], correctIndex: 1, explanation: "El nitrógeno aumenta su estado de oxidación de -3 a 0; eso es oxidación." },
  { id: 40, topic: "Balanceo por tanteo", subtopic: "Verificación", difficulty: "media", prompt: "Después de balancear una ecuación, se debe verificar que:", options: ["Cada elemento tenga igual cantidad de átomos en ambos lados", "Los productos sean más pesados", "No existan coeficientes", "Todas las sustancias sean gaseosas"], correctIndex: 0, explanation: "La verificación confirma que se cumple la ley de conservación de la masa." },
];

const TOTAL_SECONDS = 1800;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function groupByMetric(selected: Record<number, number>, key: "topic" | "subtopic" | "difficulty") {
  const map = new Map<string, { total: number; correct: number }>();
  questions.forEach((q) => {
    const name = q[key];
    const current = map.get(name) ?? { total: 0, correct: 0 };
    current.total += 1;
    if (selected[q.id] === q.correctIndex) current.correct += 1;
    map.set(name, current);
  });
  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    total: value.total,
    correct: value.correct,
    percentage: Math.round((value.correct / value.total) * 100),
  }));
}

function getLevel(percentage: number) {
  if (percentage >= 85) return "Dominio sólido";
  if (percentage >= 70) return "Buen avance";
  if (percentage >= 50) return "Base en construcción";
  return "Nivel inicial";
}

function getRecommendation(topicPerformance: GroupPerformance[], difficultyPerformance: GroupPerformance[]) {
  const weakestTopic = [...topicPerformance].sort((a, b) => a.percentage - b.percentage)[0];
  const weakDifficulty = [...difficultyPerformance].sort((a, b) => a.percentage - b.percentage)[0];
  if (!weakestTopic) return "Sigue practicando con ejercicios variados.";
  if (weakestTopic.name.includes("Redox")) return "Refuerza oxidación, reducción, agentes oxidante/reductor y cambios de estado de oxidación.";
  if (weakestTopic.name.includes("Balanceo")) return "Practica balanceo por tanteo paso a paso: cuenta átomos, ajusta coeficientes y verifica al final.";
  if (weakestTopic.name.includes("Tipos")) return "Repasa las formas generales de combinación, descomposición, desplazamiento, neutralización y combustión.";
  return `Prioriza ${weakestTopic.name}, especialmente preguntas de dificultad ${weakDifficulty?.name ?? "media"}.`;
}

function PerformanceBlock({ title, data }: { title: string; data: GroupPerformance[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
      <h3 className="font-bold text-violet-200">{title}</h3>
      <div className="mt-4 space-y-3">
        {data.length ? data.map((x) => (
          <div key={x.name}>
            <div className="mb-1 flex justify-between text-sm"><span>{x.name}</span><span>{x.correct}/{x.total} · {x.percentage}%</span></div>
            <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-linear-to-r from-cyan-300 to-fuchsia-300" style={{ width: `${x.percentage}%` }} /></div>
          </div>
        )) : <p className="text-sm text-slate-400">Sin datos todavía.</p>}
      </div>
    </div>
  );
}

export default function QuizSimuladorReacciones() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [locked, setLocked] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [showFinish, setShowFinish] = useState(false);

  const currentQuestion = questions[current];
  const answeredCount = Object.keys(selected).length;
  const score = questions.filter((q) => selected[q.id] === q.correctIndex).length;
  const isTimeUp = timeLeft <= 0;

  useEffect(() => {
    if (!started || showFinish || isTimeUp) return;
    const timer = window.setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [started, showFinish, isTimeUp]);

  useEffect(() => {
  if (timeLeft !== 0 || !started) return;

  const id = window.setTimeout(() => {
    setShowFinish(true);
  }, 0);

  return () => window.clearTimeout(id);
}, [timeLeft, started]);
  const topicPerformance = useMemo(() => groupByMetric(selected, "topic"), [selected]);
  const subtopicPerformance = useMemo(() => groupByMetric(selected, "subtopic"), [selected]);
  const difficultyPerformance = useMemo(() => groupByMetric(selected, "difficulty"), [selected]);
  const percentage = Math.round((score / questions.length) * 100);
  const strengths = topicPerformance.filter((x) => x.percentage >= 70);
  const weaknesses = topicPerformance.filter((x) => x.percentage < 60);
  const subtopicsToReview = subtopicPerformance.filter((x) => x.percentage < 60).sort((a, b) => a.percentage - b.percentage).slice(0, 5);

  const handleSelect = (optionIndex: number) => {
    if (locked[currentQuestion.id]) return;
    setSelected((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    setLocked((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrent(0);
    setSelected({});
    setLocked({});
    setShowFinish(false);
    setTimeLeft(TOTAL_SECONDS);
  };

  const getOptionStyle = (index: number) => {
    const isLocked = locked[currentQuestion.id];
    const chosen = selected[currentQuestion.id] === index;
    const correct = currentQuestion.correctIndex === index;
    let base = "border-white/10 bg-white/[0.06] hover:border-cyan-300/50 hover:bg-cyan-300/10";
    if (!isLocked && chosen) base = "border-cyan-300 bg-cyan-300/10";
    if (isLocked && correct) base = "border-emerald-300 bg-emerald-400/15 shadow-[0_0_22px_rgba(52,211,153,0.14)]";
    if (isLocked && chosen && !correct) base = "border-rose-400 bg-rose-500/15 shadow-[0_0_22px_rgba(244,63,94,0.14)]";
    return `w-full rounded-2xl border px-4 py-3 text-left transition ${base}`;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050516] px-4 py-6 text-white md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(217,70,239,0.18),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(124,58,237,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-size-[44px_44px]" />
      <section className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 rounded-4xl border border-white/10 bg-white/5.5 p-5 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:p-7">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">BarbiDev</div>
            <h1 className="text-1xl font-black tracking-tight md:text-2xl">Simulador de Reacciones Químicas</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">Reacciones, ecuaciones, balanceo por tanteo, tipos de reacción y redox. Práctica con feedback inmediato y diagnóstico automático.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
            <div className="rounded-3xl border border-cyan-300/20 bg-slate-950/60 p-4"><div className="text-xs uppercase tracking-widest text-slate-400">Tiempo</div><div className={`mt-1 text-3xl font-black ${timeLeft <= 120 ? "text-rose-300" : "text-cyan-200"}`}>{formatTime(timeLeft)}</div></div>
            <div className="rounded-3xl border border-fuchsia-300/20 bg-slate-950/60 p-4"><div className="text-xs uppercase tracking-widest text-slate-400">Puntaje</div><div className="mt-1 text-3xl font-black text-fuchsia-200">{score}/{questions.length}</div></div>
          </div>
        </header>
        {!started ? (
          <section className="rounded-4xl border border-white/10 bg-white/6 p-7 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:p-10">
            <div className="max-w-3xl"><div className="mb-4 inline-flex rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-200">Práctica y refuerzo</div><h2 className="text-2xl font-bold md:text-4xl">Cuestionario interactivo de reacciones químicas</h2><p className="mt-4 leading-7 text-slate-300">Responde cada pregunta y revisa la explicación inmediatamente. Al finalizar obtendrás un diagnóstico por tema, subtema y dificultad.</p></div>
            <div className="mt-7 grid gap-4 md:grid-cols-4"><div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"><div className="text-3xl font-black text-cyan-200">40</div><div className="mt-1 text-sm text-slate-300">preguntas</div></div><div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"><div className="text-3xl font-black text-fuchsia-200">30</div><div className="mt-1 text-sm text-slate-300">minutos</div></div><div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"><div className="text-3xl font-black text-violet-200">5</div><div className="mt-1 text-sm text-slate-300">bloques temáticos</div></div></div>
            <button onClick={() => setStarted(true)} className="mt-8 rounded-1xl border border-cyan-300 bg-cyan-300/15 px-7 py-4 font-bold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.22)] transition hover:bg-cyan-300/25">Iniciar simulador</button>
          </section>
        ) : showFinish || isTimeUp ? (
          <section className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl md:p-8"><div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><div className="text-sm uppercase tracking-[0.26em] text-cyan-200">Diagnóstico final</div><h2 className="mt-2 text-3xl font-black md:text-5xl">{percentage}% · {getLevel(percentage)}</h2><p className="mt-3 text-slate-300">Puntaje: {score}/{questions.length}</p></div><button onClick={resetQuiz} className="rounded-2xl border border-fuchsia-300 bg-fuchsia-300/15 px-5 py-3 font-bold text-fuchsia-100 transition hover:bg-fuchsia-300/25">Reiniciar</button></div><div className="mt-8 grid gap-5 lg:grid-cols-3"><div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"><h3 className="font-bold text-emerald-200">Fortalezas</h3><div className="mt-3 space-y-2 text-sm text-slate-300">{strengths.length ? strengths.map((x) => <p key={x.name}>✓ {x.name}: {x.percentage}%</p>) : <p>Aún no hay temas sobre 70%.</p>}</div></div><div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"><h3 className="font-bold text-rose-200">Debilidades prioritarias</h3><div className="mt-3 space-y-2 text-sm text-slate-300">{weaknesses.length ? weaknesses.map((x) => <p key={x.name}>• {x.name}: {x.percentage}%</p>) : <p>No hay debilidades críticas por tema.</p>}</div></div><div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"><h3 className="font-bold text-cyan-200">Recomendación</h3><p className="mt-3 text-sm leading-6 text-slate-300">{getRecommendation(topicPerformance, difficultyPerformance)}</p></div></div><div className="mt-6 grid gap-5 lg:grid-cols-2"><PerformanceBlock title="Desempeño por dificultad" data={difficultyPerformance} /><PerformanceBlock title="Subtemas a reforzar" data={subtopicsToReview} /></div></section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[1fr_340px]"><div className="rounded-4xl border border-white/10 bg-white/6 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:p-5"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><div className="text-xs uppercase tracking-[0.22em] text-cyan-200">Pregunta {current + 1} de {questions.length}</div><div className="mt-2 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100">{currentQuestion.topic}</span><span className="rounded-full bg-fuchsia-300/10 px-3 py-1 text-fuchsia-100">{currentQuestion.subtopic}</span><span className="rounded-full bg-violet-300/10 px-3 py-1 text-violet-100">{currentQuestion.difficulty}</span></div></div><div className="text-sm text-slate-300">{answeredCount}/{questions.length} respondidas</div></div><h2 className="text-lg font-black leading-tight md:text-1xl">{currentQuestion.prompt}</h2><div className="mt-6 space-y-3">{currentQuestion.options.map((option, index) => <button key={option} onClick={() => handleSelect(index)} className={getOptionStyle(index)}><span className="mr-3 inline-flex h-4 w-6 items-center justify-center rounded-full border border-cyan-300/20 bg-slate-950/60 font-black text-cyan-200">{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>{locked[currentQuestion.id] && <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5"><div className="font-bold text-cyan-100">Explicación</div><p className="mt-2 leading-7 text-slate-200">{currentQuestion.explanation}</p></div>}<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-between"><button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-200 disabled:opacity-40">Anterior</button><button onClick={() => current < questions.length - 1 ? setCurrent((c) => c + 1) : setShowFinish(true)} className="rounded-2xl border border-cyan-300 bg-cyan-300/15 px-5 py-3 font-bold text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,0.18)]">{current < questions.length - 1 ? "Siguiente" : "Finalizar"}</button></div></div><aside className="rounded-4xl border border-white/10 bg-white/5.5 p-5 backdrop-blur-xl"><h3 className="font-black text-cyan-100">Progreso</h3><div className="mt-4 grid grid-cols-5 gap-2">{questions.map((q, i) => <button key={q.id} onClick={() => setCurrent(i)} className={`h-10 rounded-xl border text-xs transition ${i === current ? "border-cyan-300 bg-cyan-300/20 text-cyan-100" : selected[q.id] === undefined ? "border-white/10 bg-white/5 text-slate-400" : selected[q.id] === q.correctIndex ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-100" : "border-rose-300/30 bg-rose-400/15 text-rose-100"}`}>{i + 1}</button>)}</div><div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-4"><div className="text-sm text-slate-400">Puntaje actual</div><div className="mt-1 text-4xl font-black text-fuchsia-200">{score}</div><div className="mt-2 text-sm text-slate-300">Responde con calma: cada explicación te ayuda a reforzar.</div></div></aside></section>
        )}
      </section>
    </main>
  );
}
