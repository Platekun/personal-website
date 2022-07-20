function filaName(s) {
  return `${s.toLowerCase()}.md`;
}

function h1(s) {
  return `<h1 class="text-bitwise text-4xl text-white"># ${s}</h1>`;
}

function list(s) {
  return `<ul class="flex flex-col gap-4">${s}</ul>`;
}

function listItem(s) {
  return `<li>${s}</li>`;
}

function text(s) {
  return `<p class="text-inconsolata text-xl  text-white">* ${s}</p>`;
}

const NEW_LINE = '\n';

export { filaName, h1, list, listItem, text, NEW_LINE };
