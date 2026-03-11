import { useNavigate } from "react-router-dom";
import { Shield, FileCheck, UserCheck, Scale, ArrowRight, CheckCircle2, BookOpen, MessageSquare } from "lucide-react";
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
  "Pravica do dostopa do podatkov",
  "Pravica do izbrisa (pravica do pozabe)",
  "Pravica do popravka podatkov",
  "Pravica do prenosljivosti podatkov",
  "Pravica do ugovora obdelavi",
  "Pravica do omejitve obdelave",
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl">GDPR Pomočnik</span>
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
            Brezplačen vprašalnik
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            Uveljavljajte svoje pravice po <span className="text-primary">GDPR uredbi</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Interaktivni vodič, ki vam pomaga razumeti in uveljaviti vaše pravice glede varstva osebnih podatkov. Enostavno, hitro in brezplačno.
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
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
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
                GDPR uredba vam zagotavlja širok nabor pravic glede varstva vaših osebnih podatkov. Naš vprašalnik pokriva vse ključne pravice.
              </p>
              <Button onClick={() => navigate("/vprasalnik")} className="gap-2">
                Preveri svoje pravice <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {rights.map((r) => (
                <div key={r} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm font-medium text-foreground">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Pripravljeni na začetek?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Vprašalnik traja približno 5 minut. Na koncu prejmete povzetek vaših pravic in priporočene naslednje korake.
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
            <Shield className="w-4 h-4" />
            <span>GDPR Pomočnik</span>
          </div>
          <p>© {new Date().getFullYear()} Vse pravice pridržane.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
