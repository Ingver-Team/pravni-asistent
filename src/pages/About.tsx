import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import amalija from "@/assets/team-amalija.jpg";
import sven from "@/assets/team-sven.jpg";
import lara from "@/assets/team-lara.jpg";
import pika from "@/assets/team-pika.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/logo.png" alt="Prijava IP" className="w-6 h-6" />
            <span className="font-serif text-xl">Prijava IP</span>
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
            Prijava IP je brezplačno orodje, ki posameznikom pomaga pri uveljavljanju njihovih pravic
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
            <h2 className="font-serif text-2xl text-foreground mb-6">Ekipa Ingver</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-2">
                <img src={amalija} alt="Amalija" className="w-full aspect-square object-cover rounded-lg" />
                <span className="text-sm font-medium text-foreground">Amalija</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src={sven} alt="Sven" className="w-full aspect-square object-cover rounded-lg" />
                <span className="text-sm font-medium text-foreground">Sven</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src={lara} alt="Lara" className="w-full aspect-square object-cover rounded-lg" />
                <span className="text-sm font-medium text-foreground">Lara</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src={pika} alt="Pika" className="w-full aspect-square object-cover rounded-lg" />
                <span className="text-sm font-medium text-foreground">Pika</span>
              </div>
            </div>
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
            <img src="/src/assets/logo.png" alt="Prijava IP" className="w-4 h-4" />
            <span>Prijava IP</span>
          </div>
          <p>© {new Date().getFullYear()} Vse pravice pridržane.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;