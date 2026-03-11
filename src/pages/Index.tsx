import { useNavigate, Link } from "react-router-dom";
import { Shield, FileCheck, UserCheck, Scale, ArrowRight, CheckCircle2, BookOpen, MessageSquare } from "lucide-react";
import ingverLogo from "@/assets/ingver_logo-2.png";
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
    description: "Korak za korakom skozi postopek uveljavljanja vaših pravic po GDPR uredbi.",
  },
  {
    icon: UserCheck,
    title: "Preverjanje identitete",
    description: "Jasna navodila za postopek identifikacije in uveljavljanja zahtevkov.",
  },
  {
    icon: Scale,
    title: "Pravna podlaga",
    description: "Vsa vprašanja temeljijo na aktualni zakonodaji in GDPR uredbi EU.",
  },
  {
    icon: MessageSquare,
    title: "AI Pomočnik",
    description: "Integriran virtualni asistent za pomoč pri razumevanju vaših pravic.",
  },
];

const rights = [
  {
    title: "Pravica do dostopa do podatkov",
    description: "Imate pravico vedeti, ali se vaši osebni podatki obdelujejo, in dostopati do teh podatkov. Upravljavec vam mora zagotoviti kopijo vaših osebnih podatkov.",
  },
  {
    title: "Pravica do izbrisa (pravica do pozabe)",
    description: "Zahtevate lahko izbris vaših osebnih podatkov, kadar ti niso več potrebni za namen, za katerega so bili zbrani, ali če prekličete privolitev.",
  },
  {
    title: "Pravica do popravka podatkov",
    description: "Če so vaši osebni podatki netočni ali nepopolni, imate pravico zahtevati njihov popravek ali dopolnitev brez nepotrebnega odlašanja.",
  },
  {
    title: "Pravica do prenosljivosti podatkov",
    description: "Svoje osebne podatke lahko prejmete v strukturirani obliki in jih prenesete k drugemu upravljavcu, kadar obdelava temelji na privolitvi ali pogodbi.",
  },
  {
    title: "Pravica do ugovora obdelavi",
    description: "Kadar koli lahko ugovarjate obdelavi svojih osebnih podatkov, zlasti za namene neposrednega trženja ali obdelave na podlagi zakonitega interesa.",
  },
  {
    title: "Pravica do omejitve obdelave",
    description: "Zahtevate lahko omejitev obdelave vaših podatkov, na primer ko izpodbijate njihovo točnost ali ko je obdelava nezakonita, vi pa nasprotujete izbrisu.",
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
            <img src={ingverLogo} alt="Prijava IP" className="w-8 h-8" />
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
            Obrazec za Informacijskega pooblaščenca
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            Pripravite obrazec za <span className="text-primary">Informacijskega pooblaščenca</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Vprašalnik vas vodi skozi pripravo obrazca za uveljavljanje pravic po GDPR, ki se pošlje Informacijskemu pooblaščencu Republike Slovenije. Enostavno, hitro in brezplačno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/vprasalnik")} size="lg" className="gap-2 text-base px-8">
              Začni z vprašalnikom <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 text-base px-8" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              Izvedi več
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
            <img src={ingverLogo} alt="Prijava IP" className="w-5 h-5" />
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
