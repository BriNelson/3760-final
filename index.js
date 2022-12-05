

const saveNewsItem = (newsItem) => {
    
}


async function fetchNews() {
    const newsResponse = await fetch("https://randomuser.me/api/?gender=male");
    // console.log(catResponse);
    const newsRes = await newsResponse.json();
    console.log(newsRes.results[0].picture.large);
    return newsRes;
  }

const getNewsButton = document.querySelector('#callData')

// getNewsButton.addEventListener('click', () => {
//     fetchNews()
// })

const createItem = (itemName, elementTag, classOne, classTwo, classThree, appendItem) => {

    itemName = document.createElement(elementTag);
    itemName.classlist.add(classOne, classTwo, classThree);
    appendItem.appendChild(itemName);
}


const printSearchResult = () => {
    let searchList = document.querySelector("#searchList")

    
} 



// modal logic from bulma website
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });