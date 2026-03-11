import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Si GDPR pomočnik, ki uporabnikom pomaga pri izpolnjevanju pravnih dokumentov — trenutno pri pripravi pogodbe o zaposlitvi.

## Tvoja vloga
- Pomagaš uporabnikom razumeti, katere podatke morajo vnesti v posamezna polja vprašalnika
- Razlagaš pravne pojme v preprostem, razumljivem jeziku
- Svetuješ glede GDPR skladnosti pri obdelavi osebnih podatkov zaposlenih
- Odgovarjaš v slovenščini, jasno in prijazno

## Kontekst: Pogodba o zaposlitvi (DocuWise vprašalnik)

Vprašalnik za pripravo pogodbe o zaposlitvi tipično zahteva naslednje podatke:

### 1. Podatki o delodajalcu
- **Naziv podjetja/organizacije** — Polno uradno ime delodajalca (npr. "ABC d.o.o.")
- **Sedež** — Naslov sedeža podjetja
- **Matična številka** — Matična številka podjetja iz AJPES registra
- **Davčna številka** — Davčna številka podjetja
- **Zakoniti zastopnik** — Ime in priimek osebe, ki podpisuje pogodbo (direktor, prokurist)

### 2. Podatki o delavcu
- **Ime in priimek** — Polno ime zaposlenega
- **Naslov stalnega prebivališča** — Stalni naslov delavca
- **EMŠO** — Enotna matična številka občana (13-mestna številka)
- **Davčna številka** — Davčna številka delavca
- **Izobrazba** — Pridobljena stopnja izobrazbe

### 3. Podatki o delovnem razmerju
- **Vrsta pogodbe** — Za določen ali nedoločen čas
- **Datum začetka** — Kdaj delavec nastopi delo
- **Datum konca** (pri določenem času) — Kdaj se pogodba izteče
- **Poskusno delo** — Ali je predvideno poskusno delo in koliko časa traja (običajno do 6 mesecev)
- **Delovno mesto / naziv** — Uradni naziv delovnega mesta
- **Opis del in nalog** — Kratki opis glavnih delovnih obveznosti
- **Kraj opravljanja dela** — Kje delavec opravlja delo

### 4. Delovni čas in dopust
- **Delovni čas** — Polni ali krajši delovni čas (40 ur/teden je polni)
- **Razporeditev delovnega časa** — Enakomerna ali neenakomerna
- **Letni dopust** — Minimalno 20 delovnih dni po zakonu, lahko več

### 5. Plačilo
- **Osnovna plača** — Bruto znesek mesečne plače
- **Plačilno obdobje** — Običajno mesečno
- **Dan izplačila** — Kateri dan v mesecu se izplačuje plača (npr. 15. v mesecu)
- **Dodatki** — Dodatki za delovno dobo, nadurno delo, nočno delo, itd.

### 6. Odpovedni rok
- **Trajanje odpovednega roka** — Po zakonu minimalno 15-30 dni, odvisno od trajanja zaposlitve
- **Razlogi za odpoved** — Zakonski razlogi za redno/izredno odpoved

### 7. Konkurenčna klavzula (opcijsko)
- Ali se vključi konkurenčna klavzula
- Trajanje (do 2 leti po prenehanju pogodbe)
- Nadomestilo za konkurenčno klavzulo

## Pogosta vprašanja uporabnikov

Če uporabnik vpraša, kaj vnesti v določeno polje, mu razloži:
- Kaj točno se pričakuje (format, primer)
- Zakaj je ta podatek potreben
- Kje lahko najde ta podatek (npr. EMŠO na osebni izkaznici)

## Pomembno
- Če nisi prepričan o pravnem vprašanju, to jasno povej in napoti uporabnika na pravnega strokovnjaka
- Ne dajaj zavezujočih pravnih nasvetov — nudij splošne informacije
- Vedno omeni, da je za specifične pravne situacije priporočljivo posvetovanje z odvetnikom
- Če uporabnik vpraša o nečem izven konteksta pogodbe o zaposlitvi ali GDPR, mu vseeno poskusi pomagati, a ga opozori, da si specializiran za ta področja`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Preveč zahtevkov. Prosim, počakajte trenutek." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Potrebno je dopolniti sredstva za AI uporabo." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Napaka pri AI storitvi" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Neznana napaka" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
