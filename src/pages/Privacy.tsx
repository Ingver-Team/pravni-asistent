import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Privacy = () => {
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
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Politika zasebnosti in piškotki</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="font-serif text-2xl text-foreground">Varstvo osebnih podatkov</h2>
          <p>
            Vaša zasebnost nam je pomembna. Na tej strani pojasnjujemo, kako zbiramo, uporabljamo
            in varujemo vaše osebne podatke v skladu s Splošno uredbo o varstvu podatkov (GDPR).
          </p>
          <p>
            Podatke, ki jih vnesete v vprašalnik, uporabljamo izključno za pripravo obrazca za
            Informacijskega pooblaščenca RS. Vaših podatkov ne hranimo na strežnikih, ne delimo s
            tretjimi osebami in jih ne uporabljamo za trženjske namene.
          </p>

          <h2 className="font-serif text-2xl text-foreground pt-4">Piškotki</h2>
          <p>
            Naša spletna stran uporablja le nujno potrebne piškotke za delovanje aplikacije.
            Ne uporabljamo analitičnih ali oglaševalskih piškotkov.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong className="text-foreground">Nujni piškotki</strong> – zagotavljajo osnovno delovanje spletne strani in ne zbirajo osebnih podatkov.</li>
          </ul>

          <h2 className="font-serif text-2xl text-foreground pt-4">Vaše pravice</h2>
          <p>
            Kot uporabnik imate pravico do dostopa, popravka, izbrisa in prenosljivosti svojih
            podatkov. Za uveljavljanje pravic ali vprašanja nas kontaktirajte na{" "}
            <a href="mailto:info@gdpr-pomocnik.si" className="text-primary underline underline-offset-4 hover:text-primary/80">
              info@gdpr-pomocnik.si
            </a>.
          </p>

          <h2 className="font-serif text-2xl text-foreground pt-4">Spremembe politike</h2>
          <p>
            To politiko zasebnosti lahko občasno posodobimo. O morebitnih bistvenih spremembah vas
            bomo obvestili na tej strani.
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

export default Privacy;
