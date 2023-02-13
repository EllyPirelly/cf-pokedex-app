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

  // return all items of pokemonList
  function getAll() {
    return pokemonList;
  };

  // add single item to pokemonList array
  function add(item) {
    pokemonList.push(item);
  };

  return {
    add,
    getAll
  };

})();

// call getAll on pokemonRepository, run forEach, generate HTML
pokemonRepository.getAll().forEach(function(item) {
  let pokeList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let itemButton = document.createElement('button');

  itemButton.classList.add('list-item-button');
  itemButton.innerText = item.name;

  listItem.appendChild(itemButton);
  pokeList.appendChild(listItem);
});
