// Server-side access to every dictionary, for pre-rendering each language page.
import type { Locale } from "./config";
import type { Dict } from "./en";
import en from "./en";
import es from "./es";
import ptBR from "./pt-BR";
import pt from "./pt";
import fr from "./fr";
import it from "./it";
import de from "./de";
import ja from "./ja";
import zh from "./zh";

export const DICTS: Record<Locale, Dict> = { en, es, "pt-BR": ptBR, pt, fr, it, de, ja, zh };
