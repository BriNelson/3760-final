
const clientData = [
]

// const saveNewsItem = (newsItem) => {

// }

// const getNewsButton = document.querySelector('#callData')

// getNewsButton.addEventListener('click', () => {
//     fetchNews()
// })

// const createItem = (itemName, elementTag, classOne, classTwo, classThree, appendItem) => {
//   itemName = document.createElement(elementTag)
//   itemName.classlist.add(classOne, classTwo, classThree)
//   appendItem.appendChild(itemName)
// }
const saveBtn = document.querySelector('#saveBtn')

saveBtn.addEventListener('click', () => {
  saveClient(clientData)
  printSearchResult(clientData)
  console.log(console.log(clientData))
})
const saveClient = (arr) => {
  const firstName = document.querySelector('#firstNameInput').value
  const lastName = document.querySelector('#lastNameInput').value
  const phoneNumber = document.querySelector('#phoneInput').value
  const email = document.querySelector('#emailInput').value
  const address = document.querySelector('#streetInput').value
  const city = document.querySelector('#cityInput').value
  const state = document.querySelector('#stateInput').value
  const zipCode = document.querySelector('#zipInput').value
  const contractor = document.querySelector('#contractorInput').value
  // const invoicePaid = document.querySelector('').value
  const notes = document.querySelector('#notesInput').value

  const newClient = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
    address: address,
    city: city,
    state: state,
    zip: zipCode,
    contractor: contractor,
    invoicePaid: false,
    notes: notes

  }
  arr.push(newClient)
}

const printSearchResult = (arr) => {
  arr.forEach(element => {
    const searchList = document.querySelector('#searchList')
    const clientListItem = document.createElement('li')
    searchList.appendChild(clientListItem)

    const cardItem = document.createElement('div')
    cardItem.classList.add('card')
    clientListItem.appendChild(cardItem)

    const cardContentItem = document.createElement('div')
    cardContentItem.classList.add('card-content')
    cardItem.appendChild(cardContentItem)

    const cardMediaItem = document.createElement('div')
    cardMediaItem.classList.add('media')
    cardContentItem.appendChild(cardMediaItem)

    const mediaLeftSection = document.createElement('div')
    mediaLeftSection.classList.add('media-left')
    cardMediaItem.appendChild(mediaLeftSection)

    const clientPortrait = document.createElement('figure')
    clientPortrait.classList.add('image', 'is-64x64')
    mediaLeftSection.appendChild(clientPortrait)

    const clientImageTag = document.createElement('img')
    // needs src
    //

    const mediaContentDiv = document.createElement('div')
    mediaContentDiv.classList.add('media-content')
    cardMediaItem.appendChild(mediaContentDiv)

    const mediaTitle = document.createElement('p')
    mediaTitle.classList.add('title', 'is-4')
    mediaTitle.appendChild(document.createTextNode(element.firstName + ' ' + element.lastName))
    mediaContentDiv.appendChild(mediaTitle)

    const mediaSubtitle = document.createElement('p')
    mediaSubtitle.classList.add('subtitle', 'is-6')
    mediaSubtitle.appendChild(document.createTextNode(element.phoneNumber))
    mediaContentDiv.appendChild(mediaSubtitle)

    const mediaSecondSubtitle = document.createElement('p')
    mediaSecondSubtitle.classList.add('subtitle', 'is-6')
    mediaSecondSubtitle.appendChild(document.createTextNode(element.email))
    mediaContentDiv.appendChild(mediaSecondSubtitle)

    const cardInfoContent = document.createElement('div')
    cardInfoContent.classList.add('content')
    cardContentItem.appendChild(cardInfoContent)
  })
}

printSearchResult(clientData)

// modal logic from bulma website
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal ($el) {
    $el.classList.add('is-active')
  }

  function closeModal ($el) {
    $el.classList.remove('is-active')
  }

  function closeAllModals () {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal)
    })
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target
    const $target = document.getElementById(modal)

    $trigger.addEventListener('click', () => {
      openModal($target)
    })
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal')

    $close.addEventListener('click', () => {
      closeModal($target)
    })
  })

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event

    if (e.keyCode === 27) { // Escape key
      closeAllModals()
    }
  })
})
