'use strict';

/**
 * Minimal YAML parser for instructions.yaml files.
 * Handles: quoted strings, block arrays (- item), inline arrays ([a, b]),
 * nested objects up to 4 levels deep, and line comments (#).
 * Does NOT handle anchors, multi-line strings, or flow mappings.
 */
function parseYaml(text) {
  const raw = text.split(/\r?\n/);
  const tokens = [];

  function stripQuotes(s) {
    s = s.trim();
    if (s.length >= 2) {
      if ((s[0] === '"' && s[s.length - 1] === '"') ||
          (s[0] === "'" && s[s.length - 1] === "'")) {
        return s.slice(1, -1);
      }
    }
    return s;
  }

  for (const line of raw) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.search(/\S/);

    if (trimmed.startsWith('- ')) {
      tokens.push({ type: 'item', indent, value: stripQuotes(trimmed.slice(2).trim()) });
    } else {
      const ci = trimmed.indexOf(':');
      if (ci < 0) continue;
      const key = trimmed.slice(0, ci).trim();
      // Strip trailing inline comment (only when value is not a quoted string)
      let rest = trimmed.slice(ci + 1).trim();
      if (!rest.startsWith('"') && !rest.startsWith("'") && !rest.startsWith('[')) {
        rest = rest.replace(/\s+#.*$/, '').trim();
      }
      tokens.push({ type: 'kv', indent, key, rest });
    }
  }

  let pos = 0;

  function parseObj(minIndent) {
    const obj = {};
    while (pos < tokens.length) {
      const t = tokens[pos];
      if (t.indent < minIndent || t.type !== 'kv') break;

      const { key, rest, indent } = t;
      pos++;

      if (rest === '') {
        if (pos < tokens.length && tokens[pos].indent > indent) {
          if (tokens[pos].type === 'item') {
            obj[key] = parseArr(tokens[pos].indent);
          } else {
            obj[key] = parseObj(tokens[pos].indent);
          }
        } else {
          obj[key] = null;
        }
      } else if (rest.startsWith('[')) {
        const inner = rest.slice(rest.indexOf('[') + 1, rest.lastIndexOf(']'));
        obj[key] = inner.split(',').map(s => stripQuotes(s.trim())).filter(Boolean);
      } else {
        obj[key] = stripQuotes(rest);
      }
    }
    return obj;
  }

  function parseArr(minIndent) {
    const arr = [];
    while (pos < tokens.length &&
           tokens[pos].type === 'item' &&
           tokens[pos].indent >= minIndent) {
      arr.push(tokens[pos].value);
      pos++;
    }
    return arr;
  }

  return parseObj(0);
}

module.exports = { parseYaml };
