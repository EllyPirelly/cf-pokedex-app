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

  // get and return all items of pokemonList
  function getAll() {
    return pokemonList;
  };

  // push single item to pokemonList array
  function add(item) {
    pokemonList.push(item);
  };

  // create and append
  function addListItem(pokemon) {
    // grab outer ul element
    let list = document.querySelector('.pokemon-list');

    // create li and button elements
    let listItem = document.createElement('li');
    let itemButton = document.createElement('button');

    // add button class and button inner text
    itemButton.classList.add('list-item__button');
    itemButton.innerText = pokemon.name;

    // append both, li to ul and button to li
    list.appendChild(listItem);
    listItem.appendChild(itemButton);
  };

  return {
    add,
    getAll,
    addListItem
  };

})();

// call getAll on pokemonRepository
// run forEach on pokemonRepository and run addListItem in each iteration
pokemonRepository.getAll().forEach(pokemonRepository.addListItem);

// or this:
// pokemonRepository.getAll().forEach(function(item) {
//   pokemonRepository.addListItem(item);
// });
