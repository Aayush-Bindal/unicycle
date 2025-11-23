const adjectives = [
  "cyber", "quantum", "glitch", "sleepless", "debug", 
  "sudo", "lazy", "hyper", "compiled", "beta", 
  "pixel", "git", "null", "async", "binary", 
  "rapid", "cosmic", "logic", "terminal", "wired",
  "bunk", "lastmin", "caffeinated", "zen", "toxic",
  "based", "chill", "retro", "hacked", "final",
  "meta", "digital", "focal", "prime", "stable",
  "static", "dynamic", "scoped", "global", "local"
];

const nouns = [
  "ninja", "wizard", "dev", "coder", "stack", 
  "heap", "node", "proxy", "bot", "script", 
  "bug", "patch", "host", "server", "root", 
  "user", "main", "void", "loop", "array",
  "fresher", "senior", "backlog", "topper", "legend",
  "npc", "char", "phantom", "echo", "spark",
  "pulse", "wave", "flux", "grid", "core",
  "thread", "token", "block", "chain", "hash"
];

export const generateUniqueUsername = (): string => {
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
  // Use a 4 to 5 digit number (1000 - 99999) to massively increase entropy
  const randomNum = Math.floor(Math.random() * 90000) + 10000;
  
  // Random separator for extra variety
  const separator = Math.random() > 0.5 ? "_" : ".";
  
  return `${randomAdj}${separator}${randomNoun}${randomNum}`;
};