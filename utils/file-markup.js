function h2(s) {
  return `<h1 class="text-bitwise text-4xl text-white">${s}</h1>`;
}

function parragraph(s) {
  return `<p class="text-inconsolata text-white">${s}</p>`;
}

function link(s) {
  return `<a href="${s}" target="_blank" class="text-inconsolata text-white">${s}</a>`;
}

function clickable(s, children) {
  return `<a href="${s}" target="_blank">${children}</a>`;
}

function verticalList(s) {
  return `<ul class="flex flex-col gap-4">${s}</ul>`;
}

function horizontalList(s) {
  return `<ul class="flex flex-row justify-center flex-wrap gap-4">${s}</ul>`;
}

function listItem(s) {
  return `<li>${s}</li>`;
}

function image(s, alt) {
  return `<img src="${s}" alt="${alt}" title="${alt}" class="border-2 border-white border-solid h-full" style="object-fit: cover;" width="360" height="203">`;
}

export {
  h2,
  parragraph,
  verticalList,
  horizontalList,
  listItem,
  link,
  clickable,
  image,
};
