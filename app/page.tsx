import Link from "next/link";

const quizzes = [
  {
    title: "Química Inorgánica",
    subtitle: "Compuestos binarios, ternarios y cuaternarios",
    href: "/chem",
    tag: "Química",
    questions: "30 preguntas",
  },
  {
    title: "Química Orgánica",
    subtitle: "Hidrocarburos y compuestos oxigenados",
    href: "/chemor",
    tag: "Orgánica",
    questions: "40 preguntas",
  },
  {
    title: "Nitrogenados y Cíclicos",
    subtitle: "Aminas, amidas, iminas, ciclos y benceno",
    href: "/chemnit",
    tag: "Orgánica II",
    questions: "40 preguntas",
  },
  {
    title: "Reacciones Químicas",
    subtitle: "Ecuaciones, balanceo, tipos de reacción y redox",
    href: "/chemreac",
    tag: "Reacciones",
    questions: "40 preguntas",
  },
  {
    title: "Matemática - General",
    subtitle: "Razonamiento, funciones y ejercicios mixtos",
    href: "/mate",
    tag: "Matemática",
    questions: "40 preguntas",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] text-white">
      <section className="relative mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <div className="pointer-events-none absolute -top-32 left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

        <header className="relative mb-10">
          <div className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
            BarbiDev
          </div>

          <h1 className="max-w-2xl text-1xl font-black tracking-tight md:text-2xl">
            Elige el tema
          </h1>

        </header>

        <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.href}
              href={quiz.href}
              className="group rounded-3xl border border-cyan-400/20 bg-white/6 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-white/9 hover:shadow-[0_0_35px_rgba(217,70,239,0.18)]"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-200">
                  {quiz.tag}
                </span>

                <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1 text-xs font-semibold text-fuchsia-100">
                  {quiz.questions}
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white">
                {quiz.title}
              </h2>

              <p className="mt-3 min-h-12 text-sm leading-relaxed text-slate-300">
                {quiz.subtitle}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-bold text-cyan-200">
                  Iniciar cuestionario
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-cyan-300 to-fuchsia-400 font-black text-slate-950 transition group-hover:scale-110">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}