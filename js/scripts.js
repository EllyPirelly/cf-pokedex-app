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

function loopMe(item) {
  console.log('Name: ' + item.name + ' | ' + 'Height: ' + item.height + ' | ' + 'Types: ' + item.types);
}

pokemonList.forEach(loopMe);

// old for Loop
// for (i = 0; i < pokemonList.length; i++) {
//   let pokeName = pokemonList[i].name;
//   let pokeHeight = pokemonList[i].height;

//   if (pokeHeight > 1.0) {
//     document.write(`
//       <div class='list-item'>${pokeName} (height: ${pokeHeight} m) - Wow, that's big!</div>
//     `);
//   } else {
//     document.write(`
//       <div class='list-item'>${pokeName} (height: ${pokeHeight} m)</div>
//     `);
//   }
// }
