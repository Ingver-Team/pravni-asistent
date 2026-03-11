export interface QuestionOption {
  id: string;
  label: string;
}

export interface GdprQuestion {
  id: number;
  title: string;
  description: string;
  options: QuestionOption[];
}

export const gdprQuestions: GdprQuestion[] = [
  {
    id: 1,
    title: "Kakšno vlogo ima vaša organizacija?",
    description: "Izberite vlogo, ki najbolj ustreza vaši organizaciji glede na obdelavo osebnih podatkov.",
    options: [
      { id: "upravljavec", label: "Upravljavec osebnih podatkov" },
      { id: "obdelovalec", label: "Obdelovalec osebnih podatkov" },
      { id: "skupni", label: "Skupni upravljavec" },
      { id: "ne_vem", label: "Ne vem / Nisem prepričan(a)" },
    ],
  },
  {
    id: 2,
    title: "Katero pravico želi posameznik uveljavljati?",
    description: "GDPR posameznikom zagotavlja različne pravice v zvezi z njihovimi osebnimi podatki.",
    options: [
      { id: "dostop", label: "Pravica do dostopa (člen 15)" },
      { id: "popravek", label: "Pravica do popravka (člen 16)" },
      { id: "izbris", label: "Pravica do izbrisa (člen 17)" },
      { id: "omejitev", label: "Pravica do omejitve obdelave (člen 18)" },
      { id: "prenosljivost", label: "Pravica do prenosljivosti podatkov (člen 20)" },
      { id: "ugovor", label: "Pravica do ugovora (člen 21)" },
    ],
  },
  {
    id: 3,
    title: "Ali ste prejeli zahtevo posameznika?",
    description: "Posameznik lahko zahtevo poda ustno ali pisno. Pomembno je, da zahtevo pravilno identificirate.",
    options: [
      { id: "pisno", label: "Da, pisno (e-pošta, pismo, obrazec)" },
      { id: "ustno", label: "Da, ustno (telefon, osebno)" },
      { id: "ne", label: "Ne, še nisem prejel(a) zahteve" },
    ],
  },
  {
    id: 4,
    title: "Ali lahko preverite identiteto prosilca?",
    description: "Pred obdelavo zahteve morate preveriti identiteto posameznika, ki je zahtevo podal.",
    options: [
      { id: "da_potrjeno", label: "Da, identiteta je potrjena" },
      { id: "da_dodatno", label: "Da, a potrebujem dodatne informacije" },
      { id: "ne", label: "Ne, identitete ne morem preveriti" },
    ],
  },
  {
    id: 5,
    title: "Ali obstajajo izjeme za zavrnitev zahteve?",
    description: "V določenih primerih lahko zahtevo zavrnete ali omejite, če obstajajo zakonske podlage.",
    options: [
      { id: "ni_izjem", label: "Ne, zahtevo moram izpolniti" },
      { id: "javni_interes", label: "Da, javni interes ali zakonska obveznost" },
      { id: "ponavljajoca", label: "Da, zahteva je očitno neutemeljena ali ponavljajoča" },
      { id: "pravice_drugih", label: "Da, izpolnitev bi kršila pravice drugih" },
    ],
  },
  {
    id: 6,
    title: "V kolikšnem času morate odgovoriti?",
    description: "GDPR določa roke za odgovor na zahteve posameznikov.",
    options: [
      { id: "en_mesec", label: "V enem mesecu od prejema zahteve" },
      { id: "podaljsanje", label: "Podaljšanje za dva meseca (kompleksna zahteva)" },
      { id: "takoj", label: "Takoj (elektronska zahteva)" },
    ],
  },
  {
    id: 7,
    title: "Ali morate obvestiti tretje osebe?",
    description: "Če ste osebne podatke posredovali tretjim osebam, jih morate o zahtevi obvestiti.",
    options: [
      { id: "da", label: "Da, podatke sem posredoval(a) tretjim osebam" },
      { id: "ne", label: "Ne, podatkov nisem posredoval(a)" },
      { id: "ne_vem", label: "Ne vem, moram preveriti" },
    ],
  },
  {
    id: 8,
    title: "Ali imate vzpostavljen postopek za obravnavo zahtev?",
    description: "Organizacije morajo imeti jasne postopke za obravnavo zahtev posameznikov.",
    options: [
      { id: "da_formalen", label: "Da, imamo formalen postopek" },
      { id: "da_neformalen", label: "Da, a postopek ni formaliziran" },
      { id: "ne", label: "Ne, nimamo postopka" },
    ],
  },
];
