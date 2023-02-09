var pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: [
        'grass',
        'poison'
      ]
    },
    {
      name: 'Jigglypuff',
      height: 0.5,
      types: [
        'fairy',
        'normal'
      ]
    },
    {
      name: 'Tentacruel',
      height: 1.6,
      types: [
        'water',
        'poison'
      ]
    }
  ];

  // return all items
  function getAll(pokemonRepository) {
    return pokemonList;
  }

  // add single item to pokemonList array
  function add(item) {
    pokemonList.push(item);
  }

  return {
    getAll,
    add
  }


})();

pokemonList.forEach(function(item) {
  if (item.height > 1.0) {
    document.write('<div class="list-item">Name: ' + item.name + ' (height: ' + item.height + ' m) - Wow, that\'s big!</div>');
  } else {
    document.write('<div class="list-item">Name: ' + item.name + ' (height: ' + item.height + ' m)</div>');
  }
});
