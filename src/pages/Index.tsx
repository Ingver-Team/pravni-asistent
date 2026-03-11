import { useNavigate, Link } from "react-router-dom";
import { Shield, FileCheck, UserCheck, Scale, ArrowRight, CheckCircle2, BookOpen, MessageSquare } from "lucide-react";
import ingverLogo from "@/assets/ingver_square.png";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    icon: FileCheck,
    title: "Vodeni vprašalnik",
    description: "Odgovorite na nekaj vprašanj, na podlagi katerih se samodejno pripravi obrazec za prijavo kršitve pri IP.",
  },
  {
    icon: UserCheck,
    title: "Prilagojeno glede na pravico",
    description: "Obrazec se prilagodi glede na to, ali uveljavljate vpogled, izbris, popravek ali prenos podatkov.",
  },
  {
    icon: Scale,
    title: "Skladno z GDPR in ZVOP-2",
    description: "Vprašanja temeljijo na Splošni uredbi o varstvu podatkov (GDPR) in slovenskem ZVOP-2.",
  },
  {
    icon: MessageSquare,
    title: "AI Pomočnik",
    description: "Če se kje zatakne, vam je na voljo virtualni asistent, ki pojasni pravne pojme in postopke.",
  },
];

const rights = [
  {
    title: "Pravica do dostopa do podatkov",
    description: "Upravljavec vam mora v enem mesecu zagotoviti informacijo o tem, ali obdeluje vaše osebne podatke, in vam posredovati njihovo kopijo. Zahtevo lahko oddate pisno ali elektronsko.",
  },
  {
    title: "Pravica do izbrisa (pravica do pozabe)",
    description: "Upravljavec mora brez nepotrebnega odlašanja izbrisati vaše podatke, kadar ti niso več potrebni, prekličete privolitev ali je obdelava nezakonita. Če zahtevo zavrne, se lahko pritožite pri IP.",
  },
  {
    title: "Pravica do popravka podatkov",
    description: "Če upravljavec vodi netočne ali nepopolne podatke o vas, mu lahko naložite, da jih popravi ali dopolni. Upravljavec mora odgovoriti v enem mesecu.",
  },
  {
    title: "Pravica do prenosljivosti podatkov",
    description: "Kadar obdelava temelji na privolitvi ali pogodbi, lahko zahtevate, da vam upravljavec posreduje vaše podatke v strukturirani, strojno berljivi obliki ali jih prenese neposredno drugemu upravljavcu.",
  },
  {
    title: "Pravica do ugovora obdelavi",
    description: "Obdelavi lahko ugovarjate kadar koli, zlasti pri neposrednem trženju. Upravljavec mora prenehati z obdelavo, razen če dokaže nujne zakonite razloge.",
  },
  {
    title: "Pravica do omejitve obdelave",
    description: "Zahtevate lahko, da upravljavec začasno preneha z obdelavo vaših podatkov – na primer, dokler se ne razreši spor o točnosti podatkov ali zakonitosti obdelave.",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2">
            <img src={ingverLogo} alt="Prijava IP" className="h-8 w-auto" />
            <span className="font-serif text-xl">Prijava IP</span>
          </div>
          <Button onClick={() => navigate("/vprasalnik")} size="sm" className="gap-2">
            Začni vprašalnik <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <BookOpen className="w-4 h-4" />
            Prijava pri Informacijskem pooblaščencu RS
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            Uveljavljajte svoje pravice pri <span className="text-primary">Informacijskem pooblaščencu</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Če upravljavec vaših osebnih podatkov ni odgovoril na vašo zahtevo ali jo je zavrnil, lahko vložite prijavo pri Informacijskem pooblaščencu RS. Naš vprašalnik vam pomaga pripraviti ustrezen obrazec — hitro, enostavno in brezplačno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/vprasalnik")} size="lg" className="gap-2 text-base px-8">
              Pripravi obrazec <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 text-base px-8" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              Kako deluje?
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Kako vam pomagamo?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Naš sistem vas vodi skozi celoten postopek uveljavljanja vaših pravic po GDPR.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-background rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rights list */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Vaše pravice po GDPR</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Z vprašalnikom pripravite obrazec, ki ga nato pošljete Informacijskemu pooblaščencu RS. Pokrivamo vse ključne pravice po GDPR uredbi.
              </p>
              <Button onClick={() => navigate("/vprasalnik")} className="gap-2">
                Preveri svoje pravice <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {rights.map((r, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-lg px-4 py-0.5">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline gap-3 font-sans">
                    <span className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      {r.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pl-8">
                    {r.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Pripravljeni na začetek?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Vprašalnik traja približno 5 minut. Na podlagi vaših odgovorov pripravimo obrazec, ki ga pošljete Informacijskemu pooblaščencu RS za uveljavljanje vaših pravic.
          </p>
          <Button
            onClick={() => navigate("/vprasalnik")}
            size="lg"
            variant="secondary"
            className="gap-2 text-base px-8"
          >
            Začni vprašalnik <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={ingverLogo} alt="Prijava IP" className="h-5 w-auto" />
            <span>Prijava IP</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/o-nas" className="hover:text-foreground transition-colors">O nas</Link>
            <Link to="/zasebnost" className="hover:text-foreground transition-colors">Zasebnost & piškotki</Link>
          </div>
          <p>© {new Date().getFullYear()} Vse pravice pridržane.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
