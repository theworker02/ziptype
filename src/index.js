
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

function transform(input, mode = "squash") {
  const s = String(input ?? "");
  switch (mode) {
    case "squash": return s.replace(/\s+/g, " ").trim();
    case "lines": return s.split(/\r?\n/).map(l => l.trimEnd()).join("\n");
    case "reverse": return s.split("").reverse().join("");
    case "words": return s.trim().split(/\s+/).filter(Boolean);
    default: return s;
  }
}
function run(argv) {
  const mode = argv[0] && !argv[0].startsWith("-") ? argv[0] : "squash";
  const rest = argv[0] === mode ? argv.slice(1) : argv;
  const input = rest.join(" ") || "sample text";
  const out = transform(input, mode);
  return typeof out === "string" ? out : JSON.stringify(out, null, 2);
}

module.exports = { readInput, transform, run };
