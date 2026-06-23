import { liveChatContact } from "@/data/live-chat";

const IN_SCOPE_KEYWORDS =
  /\b(mapims|adhiparasakthi|melmaruvathur|hospital|appointment|appointments|opd|emergency|ambulance|department|departments|specialit|specialt|doctor|doctors|patient|patients|helpline|health checkup|health package|international patient|contact@mapims|nabh|booking|book an appointment|cardiology|orthopaedic|nephrology|oncology|neurology|urology|diabetology|paediatric|pediatric|gastroenterology|ophthalmology|ent|transplant|gynaecology|gynecology|casualty|lab report|visit us|location|timings|careers|job application|1066|94990|59966)\b/i;

const OUT_OF_SCOPE_PATTERNS: RegExp[] = [
  /\b\d+\s*[\+\-\*x×\/]\s*\d+\b/i,
  /\bwhat is\s+\d+/i,
  /\bcalculate\b|\bsolve this\b|\bmath\b|\barithmetic\b/i,
  /\bpython\b|\bjavascript\b|\bjava\b|\btypescript\b|\bprogramming\b|\bwrite code\b|\bcoding\b|\bhtml\b|\bcss\b/i,
  /\bweather\b|\bforecast\b|\btemperature today\b|\brain today\b|\bclimate\b/i,
  /\bwho is the cm\b|\bchief minister\b|\bprime minister\b|\bpresident of\b|\belection\b|\bpolitics\b|\bgovernment of(?! tamil nadu hospital)/i,
  /\bfootball\b|\bcricket score\b|\bmovie\b|\bnetflix\b|\brecipe\b|\bjoke\b|\bpoem\b|\bstory about\b/i,
  /\bchatgpt\b|\bgpt\b|\bopenai\b|\bgroq\b|\bai model\b/i,
  /\bhomework\b|\bessay\b|\bassignment\b/i,
  /\bstock price\b|\bbitcoin\b|\bcrypto\b|\bforex\b/i,
  /\btranslate\b.+\bto\b/i,
];

export function buildOutOfScopeReply(): string {
  return `I am MAPIMS Assist, your virtual assistant for Adhiparasakthi Hospitals (MAPIMS).

I can answer only questions related to our hospital website and services — such as appointments, specialities, health checkup packages, international patient support, contact details, and emergency care.

I cannot help with general knowledge, maths, programming, weather, politics, or other topics outside MAPIMS.

📞 ${liveChatContact.phone}
📧 ${liveChatContact.email}

How can I help you with MAPIMS hospital services today?`;
}

export function isInScopeChatMessage(text: string): boolean {
  const normalized = text.trim();
  if (!normalized) return false;
  return IN_SCOPE_KEYWORDS.test(normalized);
}

export function isOutOfScopeChatMessage(text: string): boolean {
  const normalized = text.trim();
  if (!normalized) return false;
  if (isInScopeChatMessage(normalized)) return false;
  return OUT_OF_SCOPE_PATTERNS.some((pattern) => pattern.test(normalized));
}
