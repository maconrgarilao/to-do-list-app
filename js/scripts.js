let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
  
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement('li');
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  };

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);

    });
  };

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
      });
    }).catch(function (e) {
      console.error (e)
    })
  };

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  };

  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';


    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height + 'm';
    
    let imgElement = document.createElement('img');
    imgElement.classList.add('img-element');

    
    imgElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();


//  adding an image  //

var img = document.createElement("img");

img.src = "img/map.svg";
var src = document.getElementById("pokemon-map");

src.appendChild(img);

//  end code for adding an image  //

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


//    FOR REFERENCE ONLY - 'for' loop 
//    for (let i = 0; i < pokemonList.length; i++) {
//    if (pokemonList[i].height > 1) {
//        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big!' + '</p>')
//    } else if (pokemonList[i].height <= 1 && pokemonList[i].height >= 0.5) {
//        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - That\'s a decent size.' + '</p>')
//    } else if (pokemonList[i].height < 0.5) {
//      document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - That\'s a cute size!' + '</p>')
//    }}

//    FOR REFERENCE - 'forEach' loop

//    pokemonList.forEach(function(pokemon) {
//    if (pokemon.height > 1) {
//    document.write('<p>' + pokemon.name + ' is ' + pokemon.height + 'm high and is a ' + pokemon.type + ' pokemon!' + ' - Wow, that\'s big!' + '</p>')
//    } else if (pokemon.height <= 1 && pokemon.height >= 0.5) {
//    document.write('<p>' + pokemon.name + ' is ' + pokemon.height + 'm high and is a ' + pokemon.type + ' pokemon!' + ' - That\'s a decent size!' + '</p>')
//    } else if (pokemon.height < 0.5) {
//    document.write('<p>' + pokemon.name + ' is ' + pokemon.height + 'm high and is a ' + pokemon.type + ' pokemon!' + ' - That\'s a cute size!' + '</p>')
//    }
//    })