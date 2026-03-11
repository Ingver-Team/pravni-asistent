import { Shield, ArrowLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl">GDPR Pomočnik</span>
          </Link>
          <Button asChild size="sm" variant="outline" className="gap-2">
            <Link to="/"><ArrowLeft className="w-4 h-4" /> Nazaj</Link>
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6">O nas</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            GDPR Pomočnik je brezplačno orodje, ki posameznikom pomaga pri uveljavljanju njihovih pravic
            po Splošni uredbi o varstvu podatkov (GDPR). Naš cilj je poenostaviti postopek priprave
            obrazca za Informacijskega pooblaščenca Republike Slovenije.
          </p>
          <p>
            Verjamemo, da bi moral biti dostop do varstva osebnih podatkov enostaven in razumljiv za
            vsakogar. Zato smo ustvarili vodeni vprašalnik, ki vas korak za korakom popelje skozi
            pripravo ustreznega obrazca.
          </p>
          <p>
            Naše orodje ne nadomešča pravnega svetovanja. Za kompleksnejše primere vam priporočamo,
            da se obrnete na odvetnika ali neposredno na Informacijskega pooblaščenca RS.
          </p>

          {/* Hackathon & Team */}
          <div className="border-t border-border pt-8 mt-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">Hackathon AI x Pravo</h2>
            <p>
              Ta projekt je nastal v sklopu hekatona <strong className="text-foreground">AI x Pravo</strong> kot
              rešitev za izziv <em>»Aplikacija za avtomatizirano pripravo pravnega dokumenta po vaši izbiri«</em>,
              ki ga je zastavilo podjetje <strong className="text-foreground">Integra Legal / DocuWise</strong>.
            </p>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-xl text-foreground">Ekipa Ingver</h3>
            </div>

            {/* Team photo placeholder */}
            <div className="w-full aspect-video bg-muted rounded-lg border border-border flex items-center justify-center mb-4">
              <span className="text-muted-foreground text-sm">Slika ekipe (kmalu)</span>
            </div>

            <p className="text-sm">
              Smo ekipa navdušencev, ki verjamemo v moč tehnologije za dostopnejše pravne storitve.
            </p>
          </div>

          <h2 className="font-serif text-2xl text-foreground pt-4">Kontakt</h2>
          <p>
            Za vprašanja ali predloge nas lahko kontaktirate na e-poštni naslov:{" "}
            <a href="mailto:info@gdpr-pomocnik.si" className="text-primary underline underline-offset-4 hover:text-primary/80">
              info@gdpr-pomocnik.si
            </a>
          </p>
        </div>
      </main>

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

export default About;
