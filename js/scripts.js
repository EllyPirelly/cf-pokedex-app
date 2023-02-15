let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // check type and push single item to pokemonList array
  function add(item) {
    if (
      typeof item === 'object' //&&
      // 'name' in item &&
      // 'height' in item &&
      // 'types' in item
    ) {
      pokemonList.push(item);
    } else {
      console.log('Nope, not a valid Poke.');
    }
  };

  // get and return all items of pokemonList array
  function getAll() {
    return pokemonList;
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

  // fetch data from the API
  // add fetched items to pokemonList
  // use detailsUrl to load detailed data
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (event) {
      console.error(event);
    });
  };

  // fetch details
  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (event) {
      console.error(event);
    });
  };

  // console.log pokemon details at button click
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  };

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails
  };

})();

// TODO: delete when "real" data comes in
// pokemonRepository.add({
//   name: 'testpoke',
//   height: 0.5,
//   types: [
//     'evil',
//     'sunny'
//   ]
// });

// call getAll on pokemonRepository
// run forEach on pokemonRepository
// run addListItem in each iteration
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});