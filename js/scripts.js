let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    types: [
      "grass",
      "poison"
    ]
  },
  {
    name: "Jigglypuff",
    height: 0.5,
    types: [
      "fairy",
      "normal"
    ]
  },
  {
    name: "Tentacruel",
    height: 1.6,
    types: [
      "water",
      "poison"
    ]
  }
];

for (i = 0; i < pokemonList.length; i++) {
  // loop over array items, print name and height of single items
  // document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");

  /* step 2
    if condition with variables and template literals
  */
  let pokeName = pokemonList[i].name;
  let pokeHeight = pokemonList[i].height;

  if (pokeHeight > 1.0) {
    document.write(`
      <div class='list-item'>${pokeName} (height: ${pokeHeight} m) - Wow, that's big!</div>
    `);
  } else {
    document.write(`
      <div class='list-item'>${pokeName} (height: ${pokeHeight} m)</div>
    `);
  }

  /* step 1
    simple if condition
  */

  // if (pokemonList[i].height > 1.0) {
  //   document.write("<div class='pokemon'>" + pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - Wow, that's big!</div>");
  // } else {
  //   document.write("<div class='pokemon'>" + pokemonList[i].name + " (height: " + pokemonList[i].height + " m)</div>");
  // }
}
