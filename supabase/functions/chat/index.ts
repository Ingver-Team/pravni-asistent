import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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
          {
            role: "system",
            content: `Si GDPR pomočnik za slovenščino. Pomagaš uporabnikom pri uveljavljanju pravic po GDPR (Splošna uredba o varstvu podatkov) v Sloveniji.

Tvoje naloge:
- Pojasnjuješ pravice posameznikov po GDPR (dostop do podatkov, popravek, izbris, prenos, ugovor, omejitev obdelave)
- Pomagaš pri pripravi obrazcev za Informacijskega pooblaščenca RS
- Razlagaš postopke prijave kršitev GDPR
- Svetuješ glede varstva osebnih podatkov
- Pomagaš razumeti, kdaj in kako vložiti pritožbo

Odgovarjaj v slovenščini, jasno in razumljivo. Bodi prijazen in strokoven. Če nisi prepričan o odgovoru, to povej in napoti uporabnika na uradne vire (npr. ip-rs.si).`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Preveč zahtevkov. Prosim, počakajte trenutek." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Potrebno je dopolniti sredstva za AI uporabo." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Napaka pri AI storitvi" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Neznana napaka" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
