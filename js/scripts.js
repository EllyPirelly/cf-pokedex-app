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

  // get and return all items of pokemonList array
  function getAll() {
    return pokemonList;
  };

  // check type and push single item to pokemonList array
  function add(item) {
    if (
      typeof item === 'object' &&
      'name' in item &&
      'height' in item &&
      'types' in item
    ) {
      pokemonList.push(item);
    } else {
      console.log('Nope, not a valid Poke.');
    }
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

    // call "outer" event handler function
    addEl(itemButton, pokemon);

    // append both, li to ul and button to li
    list.appendChild(listItem);
    listItem.appendChild(itemButton);
  };

  // console.log pokemon details at button click
  function showDetails(pokemon) {
    console.log(pokemon);
  };

  // add event handler on button with "outer" function
  function addEl (itemButton, pokemon) {
    if (itemButton) {
      itemButton.addEventListener('click', function() {
        showDetails(pokemon);
      });
      console.log('yes, i work');
    } else {
      console.log('nope, something\s off');
    }
  };

  return {
    add,
    getAll,
    addListItem
  };

})();

// TODO: delete when "real" data comes in
pokemonRepository.add({
  name: 'testpoke',
  height: 0.5,
  types: [
    'evil',
    'sunny'
  ]
});

// call getAll on pokemonRepository
// run forEach on pokemonRepository
// run addListItem in each iteration
pokemonRepository.getAll().forEach(pokemonRepository.addListItem);

// or this:
// pokemonRepository.getAll().forEach(function(item) {
//   pokemonRepository.addListItem(item);
// });
