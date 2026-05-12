"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

const questions: Question[] = [
  { id: 1, topic: "Sales ácidas", subtopic: "Hidrogenosales", difficulty: "baja", prompt: "¿Cuál es el nombre IUPAC 1957 de NaHSO₄?", options: ["Hidrogenosulfato de sodio", "Sulfato básico de sodio", "Dihidrogenosulfato de sodio", "Hidrogenosulfito de sodio"], correctIndex: 0, explanation: "NaHSO₄ conserva un hidrógeno del ácido sulfúrico. Por eso se nombra hidrogenosulfato de sodio." },
  { id: 2, topic: "Sales ácidas", subtopic: "Hidrogenosales", difficulty: "baja", prompt: "¿Cuál es el nombre IUPAC 1957 de NaHSO₃?", options: ["Hidrogenosulfato de sodio", "Hidrogenosulfito de sodio", "Sulfuro ácido de sodio", "Hidrogenocarbonato de sodio"], correctIndex: 1, explanation: "NaHSO₃ deriva del ácido sulfuroso; el anión correspondiente es sulfito, por eso se nombra hidrogenosulfito de sodio." },
  { id: 3, topic: "Sales ácidas", subtopic: "Hidrogenosales", difficulty: "baja", prompt: "¿Cuál es el nombre IUPAC 1957 de NaHS?", options: [ "Hidrogenosulfato de sodio", "Sulfato de sodio", "Hidrogenosulfuro de sodio","Sulfito de sodio"], correctIndex: 2, explanation: "NaHS es una sal ácida derivada de un hidrácido. Se usa la terminación -uro: hidrogenosulfuro de sodio." },
  { id: 4, topic: "Sales ácidas", subtopic: "Carbonatos ácidos", difficulty: "baja", prompt: "¿Cómo se nombra Mg(HCO₃)₂ en nomenclatura IUPAC 1957?", options: [ "Dihidrogenocarbonato de magnesio", "Carbonato básico de magnesio", "Carbonato doble de magnesio","Hidrogenocarbonato de magnesio"], correctIndex: 3, explanation: "El grupo HCO₃⁻ es hidrogenocarbonato. Como el magnesio tiene valencia fija +2, no se indica número romano." },
  { id: 5, topic: "Sales ácidas", subtopic: "Fosfatos ácidos", difficulty: "baja", prompt: "¿Cuál es el nombre de CaHPO₄?", options: ["Hidrogenofosfato de calcio", "Dihidrogenofosfato de calcio", "Fosfato básico de calcio", "Hidrogenofosfito de calcio"], correctIndex: 0, explanation: "CaHPO₄ contiene el anión HPO₄²⁻, llamado hidrogenofosfato." },
  { id: 6, topic: "Sales ácidas", subtopic: "Fosfatos ácidos", difficulty: "baja", prompt: "¿Cuál es el nombre de Ca(H₂PO₄)₂?", options: ["Hidrogenofosfato de calcio", "Dihidrogenofosfato de calcio", "Fosfato ácido férrico", "Fosfato doble de calcio"], correctIndex: 1, explanation: "El anión H₂PO₄⁻ conserva dos hidrógenos, por eso se llama dihidrogenofosfato." },
  { id: 7, topic: "Sales ácidas", subtopic: "Fosfatos ácidos", difficulty: "media", prompt: "¿Cómo se nombra FeHPO₄ en IUPAC 1957?", options: ["Hidrogenofosfato de hierro(II)", "Hidrogenofosfato de hierro(III)", "Dihidrogenofosfato de hierro(II)", "Fosfato básico de hierro(II)"], correctIndex: 0, explanation: "HPO₄²⁻ tiene carga -2, por tanto Fe debe actuar con +2. Se nombra hidrogenofosfato de hierro(II)." },
  { id: 8, topic: "Sales ácidas", subtopic: "Fosfatos ácidos", difficulty: "media", prompt: "¿Cómo se nombra Fe(H₂PO₄)₂ en IUPAC 1957?", options: ["Dihidrogenofosfato de hierro(II)", "Hidrogenofosfato de hierro(II)", "Dihidrogenofosfato de hierro(III)", "Fosfato diácido férrico"], correctIndex: 0, explanation: "Cada H₂PO₄⁻ tiene carga -1; hay dos grupos, carga total -2. El hierro actúa como +2." },
  { id: 9, topic: "Sales ácidas", subtopic: "Fosfatos ácidos", difficulty: "media", prompt: "¿Cómo se nombra Fe₂(HPO₄)₃ en IUPAC 1957?", options: [ "Hidrogenofosfato de hierro(II)", "Dihidrogenofosfato de hierro(III)", "Fosfato básico de hierro(III)","Hidrogenofosfato de hierro(III)",], correctIndex: 3, explanation: "Tres grupos HPO₄²⁻ suman -6. Dos Fe deben sumar +6, por lo que cada Fe es +3." },
  { id: 10, topic: "Sales ácidas", subtopic: "Fosfatos ácidos", difficulty: "media", prompt: "¿Cómo se nombra Fe(H₂PO₄)₃ en IUPAC 1957?", options: ["Dihidrogenofosfato de hierro(III)", "Hidrogenofosfato de hierro(III)", "Dihidrogenofosfato de hierro(II)", "Fosfato ácido ferroso"], correctIndex: 0, explanation: "Tres aniones H₂PO₄⁻ suman -3; el hierro está en +3." },
  { id: 11, topic: "Sales ácidas", subtopic: "Nomenclatura clásica", difficulty: "media", prompt: "En nomenclatura clásica con prefijo bi-, NaHSO₄ se nombra como:", options: ["Bisulfato sódico", "Bicarbonato sódico", "Sulfato básico sódico", "Sulfito ácido sódico"], correctIndex: 0, explanation: "La nomenclatura clásica añade bi- al nombre de la sal correspondiente: bisulfato sódico." },
  { id: 12, topic: "Sales ácidas", subtopic: "Nomenclatura clásica", difficulty: "media", prompt: "En nomenclatura clásica, Mg(HCO₃)₂ se nombra como:", options: [ "Bisulfato magnésico", "Carbonato básico magnésico","Bicarbonato magnésico", "Hidrogenocarbonato magnésico"], correctIndex: 2, explanation: "El anión HCO₃⁻ se nombra tradicionalmente bicarbonato." },
  { id: 13, topic: "Sales ácidas", subtopic: "Nomenclatura clásica", difficulty: "media", prompt: "¿Qué nombre clásico corresponde a Ca(H₂PO₄)₂?", options: ["Dibifosfato cálcico", "Bifosfato cálcico", "Fosfato básico cálcico", "Hidrogenofosfato cálcico"], correctIndex: 0, explanation: "Con dos hidrógenos conservados se usa dibi- en la forma clásica: dibifosfato cálcico." },
  { id: 14, topic: "Sales ácidas", subtopic: "Nomenclatura clásica", difficulty: "media", prompt: "¿Qué nombre clásico corresponde a CaHPO₄?", options: ["Bifosfato cálcico", "Dibifosfato cálcico", "Carbonato ácido cálcico", "Fosfito ácido cálcico"], correctIndex: 0, explanation: "CaHPO₄ conserva un hidrógeno; en esta nomenclatura se usa bifosfato cálcico." },
  { id: 15, topic: "Sales ácidas", subtopic: "Stock-IUPAC", difficulty: "alta", prompt: "¿Cuál es el nombre Stock-IUPAC de NaHSO₄?", options: [ "Hidrogenotrioxosulfato(IV) de sodio", "Dihidrogenotetraoxosulfato(VI) de sodio", "Hidrogenotetraoxosulfato(VI) de sodio","Tetraoxosulfato básico de sodio"], correctIndex: 2, explanation: "SO₄ contiene cuatro oxígenos y azufre en +6; por eso es hidrogenotetraoxosulfato(VI) de sodio." },
  { id: 16, topic: "Sales ácidas", subtopic: "Stock-IUPAC", difficulty: "alta", prompt: "¿Cuál es el nombre Stock-IUPAC de NaHSO₃?", options: ["Hidrogenotrioxosulfato(IV) de sodio", "Hidrogenotetraoxosulfato(VI) de sodio", "Trioxosulfato básico de sodio", "Hidrogenosulfuro de sodio"], correctIndex: 0, explanation: "SO₃ tiene tres oxígenos y azufre en +4. Por eso se nombra hidrogenotrioxosulfato(IV) de sodio." },
  { id: 17, topic: "Sales ácidas", subtopic: "IUPAC de composición", difficulty: "alta", prompt: "¿Cuál es el nombre de composición de Mg(HCO₃)₂?", options: [ "Hidrogenotrioxidocarbonato de dimagnesio", "Dihidrogenotetraoxidofosfato de magnesio", "Trioxidocarbonatodihidróxido de magnesio","Bis(hidrogenotrioxidocarbonato) de magnesio"], correctIndex: 3, explanation: "Hay dos grupos HCO₃⁻, por eso se usa bis(...): bis(hidrogenotrioxidocarbonato) de magnesio." },
  { id: 18, topic: "Sales ácidas", subtopic: "IUPAC de composición", difficulty: "alta", prompt: "¿Cuál es el nombre de composición de Ca(H₂PO₄)₂?", options: ["Bis(dihidrogenotetraoxidofosfato) de calcio", "Hidrogenotetraoxidofosfato de calcio", "Bis(hidrogenotrioxidocarbonato) de calcio", "Dihidroxitetraoxosulfato de calcio"], correctIndex: 0, explanation: "El compuesto contiene dos aniones H₂PO₄⁻; se usa bis(dihidrogenotetraoxidofosfato)." },
  { id: 19, topic: "Sales ácidas", subtopic: "Identificación", difficulty: "baja", prompt: "¿Cuál de las siguientes fórmulas corresponde a una sal ácida?", options: [ "Na₂SO₄", "MgCl(OH)", "AgK(NO₃)₂","NaHSO₄",], correctIndex: 3, explanation: "Una sal ácida conserva hidrógenos del ácido original. NaHSO₄ conserva H en el anión." },
  { id: 20, topic: "Sales ácidas", subtopic: "Identificación", difficulty: "media", prompt: "¿Qué característica distingue a una sal ácida?", options: [ "Contiene obligatoriamente dos metales", "Siempre contiene el grupo OH⁻", "No posee oxígeno","Conserva uno o más hidrógenos del oxoácido original",], correctIndex: 3, explanation: "Las sales ácidas se forman cuando el metal sustituye algunos hidrógenos del ácido, pero no todos." },

  { id: 21, topic: "Sales dobles", subtopic: "Dos cationes y un anión", difficulty: "baja", prompt: "¿Cómo se nombra AgK(NO₃)₂ en nomenclatura clásica?", options: [ "Nitrato básico de plata y potasio", "Nitrito doble de plata y potasio", "Hidrogenonitrato de plata y potasio","Nitrato doble de plata y potasio",], correctIndex: 3, explanation: "Contiene dos cationes, Ag⁺ y K⁺, con el anión nitrato. Por eso es nitrato doble de plata y potasio." },
  { id: 22, topic: "Sales dobles", subtopic: "Dos cationes y un anión", difficulty: "media", prompt: "¿Cómo se nombra CaNa₂(SO₄)₂ en nomenclatura clásica?", options: ["Sulfato doble de calcio y disodio", "Sulfito doble de calcio y sodio", "Sulfato básico de calcio y sodio", "Hidrogenosulfato de calcio y sodio"], correctIndex: 0, explanation: "Hay un calcio y dos sodios; el prefijo disodio indica el subíndice 2 del sodio." },
  { id: 23, topic: "Sales dobles", subtopic: "Dos cationes y un anión", difficulty: "media", prompt: "¿Cómo se nombra FeNaS₂ en nomenclatura clásica?", options: ["Sulfuro doble de hierro y sodio", "Sulfato doble de hierro y sodio", "Sulfito ácido de hierro y sodio", "Sulfuro básico férrico"], correctIndex: 0, explanation: "El anión es sulfuro. Al tener dos cationes, se nombra como sulfuro doble de hierro y sodio." },
  { id: 24, topic: "Sales dobles", subtopic: "Stock-IUPAC", difficulty: "alta", prompt: "¿Cuál es el nombre Stock-IUPAC de AgK(NO₃)₂?", options: [ "Dioxonitrato(III) de plata y potasio", "Trioxonitrato(V) de plata y potasio","Nitrato ácido de plata y potasio", "Hidroxitrioxonitrato(V) de plata"], correctIndex: 1, explanation: "El anión NO₃⁻ se expresa como trioxonitrato(V). Los metales se nombran en orden alfabético." },
  { id: 25, topic: "Sales dobles", subtopic: "Stock-IUPAC", difficulty: "alta", prompt: "¿Cuál es el nombre Stock-IUPAC de CaNa₂(SO₄)₂?", options: ["Trioxosulfato(IV) de calcio y sodio","Tetraoxosulfato(VI) de calcio y sodio",  "Hidrogenotetraoxosulfato(VI) de calcio y sodio", "Sulfato dibásico cálcico"], correctIndex: 1, explanation: "SO₄ corresponde a tetraoxosulfato(VI). En Stock-IUPAC no es obligatorio indicar valencia para calcio y sodio." },
  { id: 26, topic: "Sales dobles", subtopic: "Stock-IUPAC", difficulty: "media", prompt: "¿Cuál es el nombre Stock-IUPAC de FeNaS₂?", options: ["Sulfuro de hierro(III) y sodio", "Sulfuro de hierro(II) y sodio", "Sulfato de hierro(III) y sodio", "Hidrogenosulfuro de hierro y sodio"], correctIndex: 0, explanation: "Dos sulfuros aportan -4; Na aporta +1, por lo que Fe debe aportar +3." },
  { id: 27, topic: "Sales dobles", subtopic: "Un catión y dos aniones", difficulty: "baja", prompt: "¿Cómo se nombra BaBrCl en nomenclatura clásica?", options: ["Bromuro cloruro bárico", "Cloruro bromuro sódico", "Bromato clorato bárico", "Hidroxicloruro de bario"], correctIndex: 0, explanation: "Tiene dos aniones monoatómicos, bromuro y cloruro, con bario. Se nombra bromuro cloruro bárico." },
  { id: 28, topic: "Sales dobles", subtopic: "Un catión y dos aniones", difficulty: "media", prompt: "¿Cómo se nombra Al(NO₃)(SO₄) en nomenclatura clásica?", options: ["Nitrato sulfato alumínico", "Nitrito sulfito alumínico", "Nitrato básico alumínico", "Hidrogenonitrato sulfato de aluminio"], correctIndex: 0, explanation: "Contiene dos aniones compuestos: nitrato y sulfato, unidos al aluminio." },
  { id: 29, topic: "Sales dobles", subtopic: "Stock-IUPAC", difficulty: "alta", prompt: "¿Cuál es el nombre Stock-IUPAC de Al(NO₃)(SO₄)?", options: [ "Trioxonitrito(V) tetraoxosulfato(IV) de aluminio", "Hidroxitrioxonitrato(V) de aluminio", "Trioxonitrato(V) tetraoxosulfato(VI) de aluminio", "Nitrato básico sulfato de aluminio"], correctIndex: 2, explanation: "NO₃⁻ es trioxonitrato(V) y SO₄²⁻ es tetraoxosulfato(VI)." },
  { id: 30, topic: "Sales dobles", subtopic: "IUPAC de composición", difficulty: "alta", prompt: "¿Cuál es el nombre de composición de AgK(NO₃)₂?", options: [ "Trioxidonitrato de diplata y potasio", "Hidrogenotrioxidonitrato de plata", "Bis(tetraoxidosulfato) de plata y potasio","Bis(trioxidonitrato) de plata y potasio",], correctIndex: 3, explanation: "Hay dos grupos nitrato, por eso se usa bis(trioxidonitrato)." },
  { id: 31, topic: "Sales dobles", subtopic: "IUPAC de composición", difficulty: "alta", prompt: "¿Cuál es el nombre de composición de CaNa₂(SO₄)₂?", options: ["Bis(tetraoxidosulfato) de calcio y disodio", "Tetraoxidosulfato de calcio y sodio", "Bis(trioxidonitrato) de calcio y disodio", "Hidrogenotetraoxidosulfato de calcio"], correctIndex: 0, explanation: "Dos grupos SO₄ se expresan con bis(tetraoxidosulfato); Na₂ se nombra disodio." },
  { id: 32, topic: "Sales dobles", subtopic: "IUPAC de composición", difficulty: "media", prompt: "¿Cuál es el nombre de composición de BaBrCl?", options: ["Bromuro cloruro de bario", "Cloruro hidróxido de bario", "Bromato clorato de bario", "Hidrogenobromuro cloruro de bario"], correctIndex: 0, explanation: "Los aniones monoatómicos se nombran como bromuro y cloruro, seguidos del catión bario." },
  { id: 33, topic: "Sales dobles", subtopic: "IUPAC de composición", difficulty: "alta", prompt: "¿Cuál es el nombre de composición de Al(NO₃)(SO₄)?", options: ["Trioxidonitrato tetraoxidosulfato de aluminio", "Trioxonitrato(V) tetraoxosulfato(VI) de aluminio", "Nitrato sulfato alumínico", "Hidroxitrioxidonitrato de aluminio"], correctIndex: 0, explanation: "En composición se usan formas como trioxidonitrato y tetraoxidosulfato, sin números de oxidación." },
  { id: 34, topic: "Sales dobles", subtopic: "Óxidos dobles", difficulty: "media", prompt: "¿Cómo se nombra FeTiO₃ en nomenclatura clásica?", options: ["Óxido doble ferroso titánico", "Óxido básico ferroso", "Titanato ácido ferroso", "Hidróxido doble ferroso titánico"], correctIndex: 0, explanation: "El material incluye este ejemplo como extensión de la nomenclatura de sales dobles a óxidos dobles." },
  { id: 35, topic: "Sales dobles", subtopic: "Hidróxidos triples", difficulty: "media", prompt: "¿Cómo se nombra KNaAl(OH)₃ en nomenclatura clásica?", options: ["Hidróxido triple potásico sódico alumínico", "Hidróxido básico de potasio", "Hidrogenoaluminato de sodio y potasio", "Hidróxido ácido alumínico"], correctIndex: 0, explanation: "Contiene tres cationes con el anión hidróxido; por eso se nombra como hidróxido triple." },
  { id: 36, topic: "Sales dobles", subtopic: "Identificación", difficulty: "baja", prompt: "¿Cuál de estas fórmulas corresponde a una sal doble?", options: ["NaHSO₄","AgK(NO₃)₂",  "MgCl(OH)", "Ca(H₂PO₄)₂"], correctIndex: 1, explanation: "AgK(NO₃)₂ combina dos cationes diferentes con un anión nitrato." },
  { id: 37, topic: "Sales dobles", subtopic: "Identificación", difficulty: "media", prompt: "¿Cuál es la característica típica de una sal doble?", options: ["Puede unir varios cationes con un anión o varios aniones con un catión", "Siempre conserva hidrógeno ácido", "Siempre contiene OH⁻", "Siempre deriva de un hidrácido"], correctIndex: 0, explanation: "Las sales dobles se forman por combinaciones de más de un catión o más de un anión." },
  { id: 38, topic: "Sales dobles", subtopic: "Orden de escritura", difficulty: "media", prompt: "Según la formulación de sales dobles, los cationes y aniones se escriben preferentemente:", options: [ "Según su masa atómica descendente", "Según el número de neutrones", "Siempre primero el anión más pesado","En orden alfabético",], correctIndex: 3, explanation: "La regla indicada es escribir primero los cationes en orden alfabético y después los aniones también en orden alfabético." },
  { id: 39, topic: "Sales dobles", subtopic: "Carga eléctrica", difficulty: "media", prompt: "Al formular una sal doble, los subíndices deben elegirse para que:", options: ["La suma total de cargas sea cero", "El metal siempre tenga subíndice 1", "El oxígeno siempre tenga subíndice 4", "La fórmula no tenga paréntesis"], correctIndex: 0, explanation: "La neutralidad eléctrica es obligatoria: la suma de cargas positivas y negativas debe ser cero." },
  { id: 40, topic: "Sales dobles", subtopic: "Error frecuente", difficulty: "media", prompt: "¿Cuál nombre corresponde mejor a BaBrCl?", options: [ "Hidrogenobromuro de bario", "Clorato bromato de bario", "Bromuro básico de bario","Bromuro cloruro de bario",], correctIndex: 3, explanation: "BaBrCl tiene dos aniones simples, bromuro y cloruro. No contiene hidrógeno ni hidróxido." },

  { id: 41, topic: "Sales básicas", subtopic: "Hidroxisales", difficulty: "baja", prompt: "¿Cuál es el nombre clásico de MgCl(OH)?", options: [ "Hidrogenocloruro de magnesio", "Cloruro básico magnésico","Cloruro doble de magnesio", "Clorato básico magnésico"], correctIndex: 1, explanation: "Contiene cloruro y un grupo hidróxido, por eso se nombra como cloruro básico magnésico." },
  { id: 42, topic: "Sales básicas", subtopic: "Hidroxisales", difficulty: "media", prompt: "¿Cuál es el nombre clásico de Cu₂(OH)₂(SO₄)?", options: ["Sulfato dibásico cúprico", "Sulfato ácido cúprico", "Sulfuro básico cúprico", "Hidrogenosulfato de cobre(II)"], correctIndex: 0, explanation: "Tiene dos grupos OH⁻, por eso se usa dibásico. El cobre actúa como +2: cúprico." },
  { id: 43, topic: "Sales básicas", subtopic: "Hidroxisales", difficulty: "media", prompt: "¿Cuál es el nombre clásico de Pb(NO₃)₃(OH)?", options: [ "Nitrato básico plumboso", "Nitrito ácido plúmbico", "Hidrogenonitrato de plomo","Nitrato básico plúmbico",], correctIndex: 3, explanation: "Tres nitratos (-3) y un hidróxido (-1) suman -4; Pb está en +4, por eso es plúmbico." },
  { id: 44, topic: "Sales básicas", subtopic: "Hidroxisales", difficulty: "media", prompt: "¿Cuál es el nombre clásico de Mg₂(CO₃)(OH)₂?", options: ["Carbonato ácido magnésico","Carbonato dibásico magnésico", "Bicarbonato magnésico", "Hidrogenocarbonato de magnesio"], correctIndex: 1, explanation: "Tiene carbonato y dos grupos hidróxido; por eso es carbonato dibásico magnésico." },
  { id: 45, topic: "Sales básicas", subtopic: "Stock-IUPAC", difficulty: "baja", prompt: "¿Cómo se nombra MgCl(OH) en Stock-IUPAC?", options: ["Hidroxicloruro de magnesio", "Hidrogenocloruro de magnesio", "Cloruro ácido de magnesio", "Hidroxiclorato de magnesio"], correctIndex: 0, explanation: "En Stock-IUPAC se usa la palabra hidroxi para indicar el grupo OH⁻ presente en la sal básica." },
  { id: 46, topic: "Sales básicas", subtopic: "Stock-IUPAC", difficulty: "alta", prompt: "¿Cómo se nombra Cu₂(OH)₂(SO₄) en Stock-IUPAC?", options: ["Dihidroxitetraoxosulfato(VI) de cobre(II)", "Hidroxitetraoxosulfato(VI) de cobre(I)", "Dihidrogenotetraoxosulfato(VI) de cobre(II)", "Tetraoxosulfato(VI) ácido de cobre"], correctIndex: 0, explanation: "Hay dos grupos hidroxi y un sulfato SO₄²⁻; el cobre está en +2." },
  { id: 47, topic: "Sales básicas", subtopic: "Stock-IUPAC", difficulty: "alta", prompt: "¿Cómo se nombra Pb(NO₃)₃(OH) en Stock-IUPAC?", options: ["Hidroxitrioxonitrato(V) de plomo(IV)", "Hidroxitrioxonitrato(V) de plomo(II)", "Dihidroxitrioxonitrato(V) de plomo(IV)", "Hidrogenotrioxonitrato(V) de plomo(IV)"], correctIndex: 0, explanation: "Contiene OH⁻ y NO₃⁻. La carga total negativa es -4, por lo que Pb es +4." },
  { id: 48, topic: "Sales básicas", subtopic: "Stock-IUPAC", difficulty: "alta", prompt: "¿Cómo se nombra Mg₂(CO₃)(OH)₂ en Stock-IUPAC?", options: ["Dihidroxitrioxocarbonato(IV) de magnesio", "Hidroxitrioxocarbonato(IV) de magnesio", "Dihidrogenotrioxocarbonato(IV) de magnesio", "Carbonato ácido de magnesio"], correctIndex: 0, explanation: "Hay dos grupos OH⁻ y un grupo CO₃²⁻; por eso se nombra dihidroxitrioxocarbonato(IV) de magnesio." },
  { id: 49, topic: "Sales básicas", subtopic: "IUPAC de composición", difficulty: "media", prompt: "¿Cuál es el nombre de composición de MgCl(OH)?", options: [ "Hidrogenocloruro de magnesio", "Cloruro básico magnésico","Clorurohidróxido de magnesio", "Hidroxiclorato de magnesio"], correctIndex: 2, explanation: "En composición se nombra el anión hidróxido como uno más: clorurohidróxido de magnesio." },
  { id: 50, topic: "Sales básicas", subtopic: "IUPAC de composición", difficulty: "alta", prompt: "¿Cuál es el nombre de composición de Cu₂(OH)₂(SO₄)?", options: [ "Dihidrogenotetraoxidosulfato de cobre", "Sulfato dibásico cúprico", "Dihidroxidotetraoxidosulfato de dicobre","Hidroxitetraoxosulfato(VI) de cobre(II)"], correctIndex: 2, explanation: "La nomenclatura de composición usa hidróxido como anión y prefijos: dihidroxido... de dicobre." },
  { id: 51, topic: "Sales básicas", subtopic: "IUPAC de composición", difficulty: "alta", prompt: "¿Cuál es el nombre de composición de Pb(NO₃)₃(OH)?", options: ["Hidroxidotris(trioxidonitrato) de plomo", "Hidrogenotris(trioxidonitrato) de plomo", "Nitrato ácido de plomo", "Trihidroxidonitrato de plomo"], correctIndex: 0, explanation: "Tiene un OH⁻ y tres nitratos; de ahí hidroxidotris(trioxidonitrato) de plomo." },
  { id: 52, topic: "Sales básicas", subtopic: "IUPAC de composición", difficulty: "alta", prompt: "¿Cuál es el nombre de composición de Mg₂(CO₃)(OH)₂?", options: ["Trioxidocarbonatodihidróxido de dimagnesio", "Dihidrogenotrioxidocarbonato de magnesio", "Carbonato ácido de magnesio", "Hidroxitrioxocarbonato(IV) de magnesio"], correctIndex: 0, explanation: "Se nombran carbonato e hidróxido como aniones, y dimagnesio por los dos cationes Mg." },
  { id: 53, topic: "Sales básicas", subtopic: "Identificación", difficulty: "baja", prompt: "¿Cuál de las siguientes fórmulas corresponde a una sal básica?", options: ["MgCl(OH)", "NaHSO₄", "AgK(NO₃)₂", "CaHPO₄"], correctIndex: 0, explanation: "Las sales básicas contienen el anión hidróxido OH⁻ junto con otro anión." },
  { id: 54, topic: "Sales básicas", subtopic: "Identificación", difficulty: "media", prompt: "¿Qué otro nombre reciben las sales básicas?", options: ["Hidroxisales", "Hidrogenosales", "Oxisales ácidas", "Sales neutras"], correctIndex: 0, explanation: "También se denominan hidroxisales porque contienen el grupo hidróxido." },
  { id: 55, topic: "Sales básicas", subtopic: "Regla de nombre", difficulty: "media", prompt: "En nomenclatura clásica, la palabra 'dibásico' indica que:", options: ["Existen dos grupos hidróxido", "Existen dos metales", "Hay dos hidrógenos ácidos", "Hay dos aniones sulfato"], correctIndex: 0, explanation: "El prefijo di- delante de básico señala la cantidad de grupos OH⁻ presentes." },
  { id: 56, topic: "Sales básicas", subtopic: "Regla de nombre", difficulty: "media", prompt: "En Stock-IUPAC, ¿qué término identifica a una sal básica?", options: [ "Hidrogeno", "Doble","Hidroxi", "Bi"], correctIndex: 2, explanation: "La palabra hidroxi indica la presencia del grupo OH⁻." },
  { id: 57, topic: "Sales básicas", subtopic: "Diferenciación", difficulty: "media", prompt: "¿Cuál opción NO corresponde a una sal básica?", options: [ "MgCl(OH)","Ca(H₂PO₄)₂", "Cu₂(OH)₂(SO₄)", "Mg₂(CO₃)(OH)₂"], correctIndex: 1, explanation: "Ca(H₂PO₄)₂ es una sal ácida porque conserva hidrógenos del ácido, pero no contiene OH⁻." },
  { id: 58, topic: "Sales básicas", subtopic: "Diferenciación", difficulty: "media", prompt: "¿Cuál opción contiene simultáneamente un anión hidróxido y un anión nitrato?", options: ["Pb(NO₃)₃(OH)", "NaHSO₃", "AgK(NO₃)₂", "FeHPO₄"], correctIndex: 0, explanation: "Pb(NO₃)₃(OH) contiene NO₃⁻ y OH⁻, por eso es una sal básica." },
  { id: 59, topic: "Sales básicas", subtopic: "Error frecuente", difficulty: "media", prompt: "¿Cuál es el error al nombrar MgCl(OH) como 'hidrogenocloruro de magnesio'?", options: ["Confunde hidrógeno ácido con grupo hidróxido", "Olvida el metal", "Confunde cloro con azufre", "Usa una valencia imposible"], correctIndex: 0, explanation: "MgCl(OH) no contiene H ácido; contiene OH⁻, por lo que debe nombrarse como hidroxi o básico." },
  { id: 60, topic: "Sales básicas", subtopic: "Carga eléctrica", difficulty: "alta", prompt: "En Cu₂(OH)₂(SO₄), ¿cuál es el número de oxidación del cobre?", options: [ "+1","+2", "+3", "+4"], correctIndex: 1, explanation: "Dos OH⁻ aportan -2 y SO₄²⁻ aporta -2, carga total -4. Dos Cu suman +4, cada Cu es +2." },

  { id: 61, topic: "Sales ácidas", subtopic: "Práctica mixta", difficulty: "baja", prompt: "El nombre 'hidrogenosulfito de sodio' corresponde a:", options: [ "NaHSO₄", "Na₂SO₃","NaHSO₃", "NaHS"], correctIndex: 2, explanation: "Sulfito corresponde a SO₃²⁻. Al conservar un H, queda HSO₃⁻; con Na⁺ forma NaHSO₃." },
  { id: 62, topic: "Sales ácidas", subtopic: "Práctica mixta", difficulty: "baja", prompt: "El nombre 'hidrogenosulfato de sodio' corresponde a:", options: [ "NaHSO₃", "Na₂SO₄", "NaHS","NaHSO₄",], correctIndex:3, explanation: "Sulfato es SO₄²⁻. La forma ácida con un hidrógeno es HSO₄⁻." },
  { id: 63, topic: "Sales ácidas", subtopic: "Práctica mixta", difficulty: "baja", prompt: "El nombre 'dihidrogenofosfato de calcio' corresponde a:", options: ["Ca(H₂PO₄)₂", "CaHPO₄", "Ca₃(PO₄)₂", "Ca(HPO₄)₂"], correctIndex: 0, explanation: "El anión dihidrogenofosfato es H₂PO₄⁻; con Ca²⁺ se necesitan dos aniones." },
  { id: 64, topic: "Sales ácidas", subtopic: "Práctica mixta", difficulty: "media", prompt: "El nombre 'hidrogenofosfato de calcio' corresponde a:", options: ["CaHPO₄", "Ca(H₂PO₄)₂", "Ca₃(PO₄)₂", "CaPO₄"], correctIndex: 0, explanation: "El anión hidrogenofosfato es HPO₄²⁻; con Ca²⁺ forma CaHPO₄." },
  { id: 65, topic: "Sales ácidas", subtopic: "Práctica mixta", difficulty: "media", prompt: "El nombre 'dihidrogenofosfato de hierro(III)' corresponde a:", options: [ "FeHPO₄", "Fe₂(HPO₄)₃", "Fe(H₂PO₄)₂","Fe(H₂PO₄)₃",], correctIndex: 3, explanation: "Fe³⁺ necesita tres aniones H₂PO₄⁻ para neutralizar la carga." },
  { id: 66, topic: "Sales ácidas", subtopic: "Práctica mixta", difficulty: "media", prompt: "El nombre 'hidrogenofosfato de hierro(III)' corresponde a:", options: [ "FeHPO₄", "Fe₂(HPO₄)₃","Fe(H₂PO₄)₃", "Fe(HPO₄)₂"], correctIndex: 1, explanation: "HPO₄²⁻ tiene carga -2. Para Fe³⁺, el mínimo común es 6: Fe₂(HPO₄)₃." },
  { id: 67, topic: "Sales dobles", subtopic: "Práctica mixta", difficulty: "baja", prompt: "El nombre 'nitrato doble de plata y potasio' corresponde a:", options: [ "KAgNO₃","AgK(NO₃)₂", "KNO₃", "AgKSO₄"], correctIndex: 1, explanation: "Es una sal doble con dos cationes: Ag⁺ y K⁺, y el anión nitrato." },
  { id: 68, topic: "Sales dobles", subtopic: "Práctica mixta", difficulty: "media", prompt: "El nombre 'sulfato doble de calcio y disodio' corresponde a:", options: ["CaNa₂(SO₄)₂", "CaNaSO₄", "Ca₂Na(SO₄)₂", "Na₂SO₄"], correctIndex: 0, explanation: "El prefijo disodio indica Na₂. El ejemplo del material muestra CaNa₂(SO₄)₂." },
  { id: 69, topic: "Sales dobles", subtopic: "Práctica mixta", difficulty: "media", prompt: "El nombre 'bromuro cloruro de bario' corresponde a:", options: [ "BaBr₂", "BaCl₂", "Ba(BrO₃)Cl","BaBrCl",], correctIndex: 3, explanation: "La fórmula contiene un bromuro y un cloruro unidos al bario." },
  { id: 70, topic: "Sales dobles", subtopic: "Práctica mixta", difficulty: "media", prompt: "El nombre 'trioxidonitrato tetraoxidosulfato de aluminio' corresponde a:", options: ["Al(NO₃)(SO₄)", "Al(NO₂)(SO₃)", "Al(OH)(NO₃)", "Al₂(SO₄)₃"], correctIndex: 0, explanation: "Trioxidonitrato representa NO₃ y tetraoxidosulfato representa SO₄." },
  { id: 71, topic: "Sales básicas", subtopic: "Práctica mixta", difficulty: "baja", prompt: "El nombre 'hidroxicloruro de magnesio' corresponde a:", options: [ "MgCl₂","MgCl(OH)", "Mg(OH)₂", "MgHCl"], correctIndex: 1, explanation: "Hidroxi indica OH⁻ y cloruro indica Cl⁻; con Mg²⁺ queda MgCl(OH)." },
  { id: 72, topic: "Sales básicas", subtopic: "Práctica mixta", difficulty: "media", prompt: "El nombre 'dihidroxitetraoxosulfato(VI) de cobre(II)' corresponde a:", options: [ "CuOH(SO₄)", "Cu₂(OH)₂(SO₄)","Cu₂(HSO₄)₂", "CuSO₄"], correctIndex: 1, explanation: "Dihidroxi indica dos OH⁻; tetraoxosulfato(VI) indica SO₄²⁻; cobre(II) lleva a Cu₂(OH)₂(SO₄)." },
  { id: 73, topic: "Sales básicas", subtopic: "Práctica mixta", difficulty: "media", prompt: "El nombre 'hidroxitrioxonitrato(V) de plomo(IV)' corresponde a:", options: ["Pb(NO₃)₃(OH)", "Pb(NO₃)(OH)", "Pb(NO₂)₃(OH)", "Pb(HNO₃)₄"], correctIndex: 0, explanation: "Plomo(IV) requiere carga -4; tres nitratos y un hidróxido aportan -4." },
  { id: 74, topic: "Sales básicas", subtopic: "Práctica mixta", difficulty: "media", prompt: "El nombre 'carbonato dibásico magnésico' corresponde a:", options: ["Mg₂(CO₃)(OH)₂", "Mg(HCO₃)₂", "MgCO₃", "MgCl(OH)"], correctIndex: 0, explanation: "Dibásico indica dos grupos OH⁻ acompañando al carbonato." },
  { id: 75, topic: "Sales básicas", subtopic: "Práctica mixta", difficulty: "alta", prompt: "El nombre 'dihidroxitrioxocarbonato(IV) de magnesio' corresponde a:", options: ["Mg₂(CO₃)(OH)₂", "Mg(HCO₃)₂", "MgCO₃", "Mg₂(SO₄)(OH)₂"], correctIndex: 0, explanation: "Dihidroxi indica dos OH⁻; trioxocarbonato(IV) representa CO₃²⁻." },

  { id: 76, topic: "Comparación", subtopic: "Ácida vs básica", difficulty: "media", prompt: "¿Cuál par está correctamente clasificado?", options: ["NaHSO₄: sal ácida; MgCl(OH): sal básica", "NaHSO₄: sal básica; MgCl(OH): sal ácida", "AgK(NO₃)₂: sal básica; MgCl(OH): sal doble", "CaHPO₄: sal doble; BaBrCl: sal ácida"], correctIndex: 0, explanation: "NaHSO₄ conserva H ácido; MgCl(OH) contiene OH⁻." },
  { id: 77, topic: "Comparación", subtopic: "Doble vs básica", difficulty: "media", prompt: "¿Cuál par está correctamente clasificado?", options: ["AgK(NO₃)₂: sal doble; Cu₂(OH)₂(SO₄): sal básica", "AgK(NO₃)₂: sal ácida; Cu₂(OH)₂(SO₄): sal doble neutra", "BaBrCl: sal ácida; FeHPO₄: sal básica", "NaHS: sal básica; MgCl(OH): sal ácida"], correctIndex: 0, explanation: "AgK(NO₃)₂ tiene dos cationes; Cu₂(OH)₂(SO₄) contiene grupos hidróxido." },
  { id: 78, topic: "Comparación", subtopic: "Identificación rápida", difficulty: "baja", prompt: "Si una fórmula contiene H dentro del anión, como HSO₄⁻, probablemente es:", options: [ "Sal básica","Sal ácida", "Óxido doble", "Hidróxido simple"], correctIndex: 1, explanation: "El hidrógeno conservado en el anión es señal típica de una sal ácida." },
  { id: 79, topic: "Comparación", subtopic: "Identificación rápida", difficulty: "baja", prompt: "Si una fórmula contiene simultáneamente OH⁻ y otro anión, probablemente es:", options: ["Sal básica", "Sal ácida", "Hidrácido", "Peróxido"], correctIndex: 0, explanation: "Las sales básicas o hidroxisales contienen OH⁻ y otro anión." },
  { id: 80, topic: "Comparación", subtopic: "Identificación rápida", difficulty: "baja", prompt: "Si una fórmula contiene dos metales diferentes y un anión común, probablemente es:", options: [ "Sal ácida", "Sal básica","Sal doble", "Ácido oxácido"], correctIndex: 2, explanation: "La presencia de más de un catión es una señal típica de sal doble." },
  { id: 81, topic: "Comparación", subtopic: "Nomenclatura", difficulty: "media", prompt: "¿Qué término se asocia mejor con sales ácidas en IUPAC 1957?", options: ["Hidroxi", "Doble", "Básico","Hidrogeno", ], correctIndex: 3, explanation: "Las sales ácidas se nombran como hidrogeno... cuando conservan hidrógenos del ácido." },
  { id: 82, topic: "Comparación", subtopic: "Nomenclatura", difficulty: "media", prompt: "¿Qué término se asocia mejor con sales básicas en Stock-IUPAC?", options: ["Hidroxi", "Hidrogeno", "Dihidrogeno", "Bi"], correctIndex: 0, explanation: "Hidroxi señala el grupo OH⁻ característico de las sales básicas." },
  { id: 83, topic: "Comparación", subtopic: "Nomenclatura", difficulty: "media", prompt: "¿Qué palabra suele aparecer en el nombre clásico de una sal con dos cationes?", options: ["Doble", "Ácido", "Básico", "Hidrogeno"], correctIndex: 0, explanation: "En la nomenclatura clásica se usa 'doble' para indicar la presencia de dos cationes o dos aniones." },
  { id: 84, topic: "Comparación", subtopic: "Selección de nombre", difficulty: "media", prompt: "¿Cuál nombre corresponde a una sal ácida y no a una sal básica?", options: ["Hidrogenocarbonato de magnesio", "Hidroxicloruro de magnesio", "Sulfato dibásico cúprico", "Clorurohidróxido de magnesio"], correctIndex: 0, explanation: "Hidrogenocarbonato indica HCO₃⁻, propio de una sal ácida." },
  { id: 85, topic: "Comparación", subtopic: "Selección de nombre", difficulty: "media", prompt: "¿Cuál nombre corresponde a una sal básica y no a una sal ácida?", options: ["Hidroxicloruro de magnesio", "Hidrogenosulfato de sodio", "Dihidrogenofosfato de calcio", "Hidrogenosulfuro de sodio"], correctIndex: 0, explanation: "Hidroxicloruro contiene la raíz hidroxi, señal de OH⁻." },
  { id: 86, topic: "Comparación", subtopic: "Selección de nombre", difficulty: "media", prompt: "¿Cuál nombre corresponde a una sal doble?", options: [ "Hidrogenosulfato de sodio", "Nitrato doble de plata y potasio","Cloruro básico magnésico", "Dihidrogenofosfato de calcio"], correctIndex: 1, explanation: "El término doble indica combinación de más de un catión o anión." },
  { id: 87, topic: "Comparación", subtopic: "Errores frecuentes", difficulty: "alta", prompt: "¿Cuál opción está MAL emparejada?", options: [ "NaHSO₄: hidrogenosulfato de sodio", "MgCl(OH): hidrogenocloruro de magnesio","AgK(NO₃)₂: nitrato doble de plata y potasio", "CaHPO₄: hidrogenofosfato de calcio"], correctIndex: 1, explanation: "MgCl(OH) contiene OH⁻, no H ácido. Debe nombrarse como hidroxicloruro o cloruro básico." },
  { id: 88, topic: "Comparación", subtopic: "Errores frecuentes", difficulty: "alta", prompt: "¿Cuál opción está MAL emparejada?", options: ["NaHSO₃: hidrogenosulfato de sodio", "NaHSO₄: hidrogenosulfato de sodio", "NaHS: hidrogenosulfuro de sodio", "Mg(HCO₃)₂: hidrogenocarbonato de magnesio"], correctIndex: 0, explanation: "NaHSO₃ es hidrogenosulfito, no hidrogenosulfato. Sulfato es SO₄²⁻." },
  { id: 89, topic: "Comparación", subtopic: "Errores frecuentes", difficulty: "alta", prompt: "¿Cuál opción está MAL emparejada?", options: [ "CaHPO₄: hidrogenofosfato de calcio","Ca(H₂PO₄)₂: hidrogenofosfato de calcio", "FeHPO₄: hidrogenofosfato de hierro(II)", "Fe(H₂PO₄)₃: dihidrogenofosfato de hierro(III)"], correctIndex: 1, explanation: "Ca(H₂PO₄)₂ contiene H₂PO₄⁻, por eso es dihidrogenofosfato de calcio." },
  { id: 90, topic: "Comparación", subtopic: "Cierre integrador", difficulty: "alta", prompt: "¿Cuál opción clasifica correctamente los tres compuestos: NaHSO₄, AgK(NO₃)₂ y MgCl(OH)?", options: ["Sal ácida, sal doble y sal básica", "Sal básica, sal ácida y sal doble", "Sal doble, sal básica y sal ácida", "Tres sales básicas"], correctIndex: 0, explanation: "NaHSO₄ conserva hidrógeno ácido; AgK(NO₃)₂ tiene dos cationes; MgCl(OH) contiene OH⁻." },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function groupByMetric(selected: (number | null)[], metric: "topic" | "subtopic" | "difficulty") {
  const map = new Map<string, { total: number; correct: number }>();

  questions.forEach((q, index) => {
    const key = q[metric];
    const current = map.get(key) ?? { total: 0, correct: 0 };
    current.total += 1;
    if (selected[index] === q.correctIndex) current.correct += 1;
    map.set(key, current);
  });

  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    total: value.total,
    correct: value.correct,
    percent: Math.round((value.correct / value.total) * 100),
  }));
}

function getLevel(percent: number) {
  if (percent >= 85) return "Dominio sólido";
  if (percent >= 70) return "Buen avance";
  if (percent >= 50) return "Base en construcción";
  return "Necesita refuerzo urgente";
}

function getRecommendation(topicPerformance: ReturnType<typeof groupByMetric>, percent: number) {
  const weak = topicPerformance.filter((item) => item.percent < 60).map((item) => item.name);
  if (percent >= 85) return "Excelente dominio. Ahora conviene practicar preguntas de formulación inversa y ejercicios mezclados con nomenclatura Stock-IUPAC.";
  if (weak.includes("Sales ácidas")) return "Prioridad: reforzar hidrogenosales. Diferencia HSO₄⁻, HSO₃⁻, HCO₃⁻, HPO₄²⁻ y H₂PO₄⁻ antes de memorizar nombres completos.";
  if (weak.includes("Sales dobles")) return "Prioridad: reconocer cuándo hay dos cationes o dos aniones. Practica el orden alfabético y la neutralidad de cargas.";
  if (weak.includes("Sales básicas")) return "Prioridad: distinguir hidrogeno de hidroxi. Las sales básicas contienen OH⁻; las ácidas conservan H en el anión.";
  return "Vas bien. Repite el simulador enfocándote en los errores de subtema y escribe a mano la fórmula junto al nombre correcto.";
}

export default function QuizSalesCuaternarias() {
  const totalSeconds = 40 * 60;
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [showFinish, setShowFinish] = useState(false);

  const currentQuestion = questions[current];
  const answeredCount = selected.filter((item) => item !== null).length;
  const score: number = selected.reduce((acc: number, answer, index) =>acc + (answer === questions[index].correctIndex ? 1 : 0),0);
  const percent = Math.round((score / questions.length) * 100);

  const topicPerformance = useMemo(() => groupByMetric(selected, "topic"), [selected]);
  const subtopicPerformance = useMemo(() => groupByMetric(selected, "subtopic"), [selected]);
  const difficultyPerformance = useMemo(() => groupByMetric(selected, "difficulty"), [selected]);

  const strengths = topicPerformance.filter((item) => item.percent >= 70);
  const weaknesses = topicPerformance.filter((item) => item.percent < 60);
  const prioritySubtopics = subtopicPerformance.filter((item) => item.percent < 60).slice(0, 8);
  const recommendation = getRecommendation(topicPerformance, percent);

  useEffect(() => {
    if (!started || showFinish) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [started, showFinish]);

  useEffect(() => {
    if (timeLeft !== 0 || !started) return;
    const id = window.setTimeout(() => setShowFinish(true), 0);
    return () => window.clearTimeout(id);
  }, [timeLeft, started]);

  function answerQuestion(index: number) {
    if (selected[current] !== null) return;
    const copy = [...selected];
    copy[current] = index;
    setSelected(copy);
  }

  function restart() {
    setStarted(false);
    setCurrent(0);
    setSelected(Array(questions.length).fill(null));
    setTimeLeft(totalSeconds);
    setShowFinish(false);
  }

  if (!started) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#030712] px-6 py-10 text-white">
        <div className="pointer-events-none fixed -left-28 top-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none fixed -right-28 top-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <section className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Link href="/" className="mb-6 inline-flex text-sm font-semibold text-cyan-200 hover:text-fuchsia-200">← Volver a simuladores</Link>
            <span className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
              Química - Sales cuaternarias
            </span>
            <h1 className="text-1xl font-black tracking-tight md:text-2xl">
              Nomenclatura de sales ácidas, dobles y básicas
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Simulador intensivo de 90 preguntas para practicar reconocimiento, clasificación y nombre correcto de sales cuaternarias.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-2">90 preguntas</span>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2">40 minutos</span>
              
            </div>
            <button
              onClick={() => setStarted(true)}
              className="mt-9 rounded-2xl bg-linear-to-r from-cyan-300 via-fuchsia-300 to-violet-400 px-8 py-4 text-base font-black text-slate-950 shadow-[0_0_35px_rgba(217,70,239,0.28)] transition hover:scale-[1.02]"
            >
              Iniciar práctica
            </button>
          </div>

          <div className="rounded-3xl border border-cyan-300/20 bg-white/6 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <h2 className="text-2xl font-black">Qué vas a reforzar</h2>
            <div className="mt-5 space-y-4 text-slate-300">
              <p><strong className="text-cyan-200">Sales ácidas:</strong> hidrogenosulfatos, hidrogenosulfitos, hidrogenocarbonatos y fosfatos ácidos.</p>
              <p><strong className="text-fuchsia-200">Sales dobles:</strong> compuestos con varios cationes o varios aniones.</p>
              <p><strong className="text-violet-200">Sales básicas:</strong> hidroxisales con OH⁻ y otro anión.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (showFinish) {
    return (
      <main className="min-h-screen bg-[#030712] px-6 py-10 text-white">
        <section className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-cyan-300/20 bg-white/6 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <h1 className="text-4xl font-black">Diagnóstico final</h1>
            <p className="mt-3 text-slate-300">Resultado: {score}/{questions.length} respuestas correctas</p>
            <div className="mt-6 rounded-3xl border border-fuchsia-300/30 bg-fuchsia-300/10 p-6">
              <div className="text-6xl font-black text-fuchsia-100">{percent}%</div>
              <div className="mt-2 text-xl font-bold text-white">{getLevel(percent)}</div>
              <p className="mt-3 text-slate-200">{recommendation}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <Panel title="Desempeño por tema" items={topicPerformance} />
            <Panel title="Desempeño por dificultad" items={difficultyPerformance} />
            <Panel title="Subtemas prioritarios" items={prioritySubtopics.length ? prioritySubtopics : subtopicPerformance.slice(0, 8)} />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-cyan-300/20 bg-white/6 p-6 backdrop-blur-xl">
              <h2 className="text-xl font-black text-cyan-100">Fortalezas</h2>
              <ul className="mt-4 space-y-2 text-slate-300">
                {strengths.length ? strengths.map((item) => <li key={item.name}>✓ {item.name}: {item.percent}%</li>) : <li>Aún no hay temas sobre 70%. Repite la práctica por bloques.</li>}
              </ul>
            </div>
            <div className="rounded-3xl border border-fuchsia-300/20 bg-white/6 p-6 backdrop-blur-xl">
              <h2 className="text-xl font-black text-fuchsia-100">Debilidades prioritarias</h2>
              <ul className="mt-4 space-y-2 text-slate-300">
                {weaknesses.length ? weaknesses.map((item) => <li key={item.name}>• {item.name}: {item.percent}%</li>) : <li>No hay debilidades críticas por tema. Ahora sube la dificultad.</li>}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={restart} className="rounded-2xl bg-linear-to-r from-cyan-300 to-fuchsia-300 px-6 py-3 font-black text-slate-950">Reiniciar simulador</button>
            <Link href="/" className="rounded-2xl border border-cyan-300/30 px-6 py-3 font-bold text-cyan-100 hover:bg-cyan-300/10">Volver al inicio</Link>
          </div>
        </section>
      </main>
    );
  }

  const selectedAnswer = selected[current];
  const progress = Math.round(((current + 1) / questions.length) * 100);

  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] px-4 py-6 text-white md:px-8">
      <div className="pointer-events-none fixed left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none fixed right-0 top-20 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <section className="relative mx-auto max-w-7xl">
        <header className="mb-5 rounded-3xl border border-cyan-300/20 bg-white/6 p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Sales cuaternarias</p>
              <h1 className="mt-1 text-sm font-black md:text-2xl">Práctica intensiva de nomenclatura</h1>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3"><div className="font-black text-cyan-100">{formatTime(timeLeft)}</div><div className="text-slate-300">tiempo</div></div>
              <div className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 px-4 py-3"><div className="font-black text-fuchsia-100">{score}</div><div className="text-slate-300">puntaje</div></div>
              <div className="rounded-2xl border border-violet-300/20 bg-violet-300/10 px-4 py-3"><div className="font-black text-violet-100">{answeredCount}/{questions.length}</div><div className="text-slate-300">avance</div></div>
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-linear-to-r from-cyan-300 to-fuchsia-400" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
          <section className="rounded-3xl border border-cyan-300/20 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-2">
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide">
              <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100">{currentQuestion.topic}</span>
              <span className="rounded-full bg-fuchsia-300/10 px-3 py-1 text-fuchsia-100">{currentQuestion.subtopic}</span>
              <span className="rounded-full bg-violet-300/10 px-3 py-1 text-violet-100">{currentQuestion.difficulty}</span>
            </div>

            <h2 className="mt-2 text-sm font-black leading-tight md:text-2xl">{currentQuestion.prompt}</h2>

            <div className="mt-2 space-y-2">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = currentQuestion.correctIndex === index;
                const showState = selectedAnswer !== null;
                const stateClass = showState && isCorrect
                  ? "border-emerald-300/80 bg-emerald-400/15 text-emerald-50"
                  : showState && isSelected && !isCorrect
                    ? "border-rose-400/80 bg-rose-500/15 text-rose-50"
                    : "border-slate-600/60 bg-white/[0.05] text-slate-100 hover:border-cyan-300/60 hover:bg-cyan-300/10";
                return (
                  <button
                    key={option}
                    onClick={() => answerQuestion(index)}
                    className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left text-base transition ${stateClass}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-slate-950/70 font-black text-cyan-100">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-slate-950/50 p-4">
                <p className="font-black text-cyan-100">Explicación</p>
                <p className="mt-2 text-slate-300">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <button
                onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
                disabled={current === 0}
                className="rounded-2xl border border-slate-500/50 px-5 py-3 font-bold text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>
              {current < questions.length - 1 ? (
                <button
                  onClick={() => setCurrent((prev) => Math.min(prev + 1, questions.length - 1))}
                  className="rounded-2xl bg-linear-to-r from-cyan-300 to-fuchsia-300 px-5 py-3 font-black text-slate-950"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  onClick={() => setShowFinish(true)}
                  className="rounded-2xl bg-linear-to-r from-fuchsia-300 to-violet-400 px-5 py-3 font-black text-slate-950"
                >
                  Finalizar
                </button>
              )}
            </div>
          </section>

          <aside className="rounded-3xl border border-cyan-300/20 bg-white/6 p-5 backdrop-blur-xl">
            <h3 className="text-xl font-black">Panel de progreso</h3>
            <div className="mt-4 grid grid-cols-10 gap-2 lg:grid-cols-5">
              {questions.map((q, index) => {
                const answered = selected[index] !== null;
                const correct = selected[index] === q.correctIndex;
                const active = index === current;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrent(index)}
                    className={`h-9 rounded-xl text-xs font-black transition ${
                      active
                        ? "bg-cyan-300 text-slate-950"
                        : answered && correct
                          ? "bg-emerald-400/80 text-slate-950"
                          : answered && !correct
                            ? "bg-rose-400/80 text-slate-950"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowFinish(true)}
              className="mt-5 w-full rounded-2xl border border-fuchsia-300/30 bg-fuchsia-300/10 px-5 py-3 font-black text-fuchsia-100 hover:bg-fuchsia-300/20"
            >
              Finalizar intento
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Panel({ title, items }: { title: string; items: { name: string; total: number; correct: number; percent: number }[] }) {
  return (
    <div className="rounded-3xl border border-cyan-300/20 bg-white/6 p-6 backdrop-blur-xl">
      <h2 className="text-xl font-black text-cyan-100">{title}</h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-200">{item.name}</span>
              <span className="text-slate-300">{item.correct}/{item.total} · {item.percent}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-linear-to-r from-cyan-300 to-fuchsia-400" style={{ width: `${item.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
