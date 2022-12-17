
const clientData = [
]

// const saveNewsItem = (newsItem) => {

// }

// const getNewsButton = document.querySelector('#callData')

// getNewsButton.addEventListener('click', () => {
//     fetchNews()
// })
const getClients = async () => {
  let res = await fetch('.netlify/functions/get_clients')
  let data = await res.json();

  return data
};

const saveBtn = document.querySelector('#saveBtn')

saveBtn.addEventListener('click', () => {
  document.querySelector("#searchList").innerHTML = "";
  saveClient(clientData)
  // printSearchResult(clientData)
  console.log(console.log(clientData))
})
const saveClient = (arr) => {
  const firstName = document.querySelector('#firstNameInput').value
  const lastName = document.querySelector('#lastNameInput').value
  const phoneNumber = document.querySelector('#phoneInput').value
  const emailAddress = document.querySelector('#emailInput').value
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
    emailAddress: emailAddress,
    address: address,
    city: city,
    state: state,
    zipCode: zipCode,
    contractor: contractor,
    invoicePaid: false,
    notes: notes

  }

  fetch(".netlify/functions/save_client", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newClient),

  })
  
      getClients().then(clientList => {
        printSearchResult(clientList);
        ;
      })
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

    // ─── Phone Icon ──────────────────────────────────────────────

    
    const phoneIconText = document.createElement('div')
    phoneIconText.classList.add('icon-text')
    cardContentItem.appendChild(phoneIconText)

    const phoneIcon = document.createElement('span')
    phoneIcon.classList.add('icon')
    phoneIconText.appendChild(phoneIcon)

    const fontAwesomeIcon = document.createElement('i')
    fontAwesomeIcon.classList.add('fas', 'fa-phone')
    phoneIcon.appendChild(fontAwesomeIcon)

    const phoneNumberText = document.createElement('span')
    phoneNumberText.appendChild(document.createTextNode(element.phoneNumber))
    phoneIconText.appendChild(phoneNumberText)



  // ─── Email Icon ──────────────────────────────────────────────

    
  const emailIconText = document.createElement('div')
  emailIconText.classList.add('icon-text')
  cardContentItem.appendChild(emailIconText)

  const emailIcon = document.createElement('span')
  emailIcon.classList.add('icon')
  emailIconText.appendChild(emailIcon)

  const emailFontAwesomeIcon = document.createElement('i')
  emailFontAwesomeIcon.classList.add('fas', 'fa-envelope')
  emailIcon.appendChild(emailFontAwesomeIcon)

  const emailText = document.createElement('span')
  emailText.appendChild(document.createTextNode(element.emailAddress))
    emailIconText.appendChild(emailText)
    
    // ─── Location Icon ───────────────────────────────────────────



    const locationIconText = document.createElement('div')
  locationIconText.classList.add('icon-text')
  cardContentItem.appendChild(locationIconText)

  const locationIcon = document.createElement('span')
  locationIcon.classList.add('icon')
  locationIconText.appendChild(locationIcon)

  const locationFontAwesomeIcon = document.createElement('i')
  locationFontAwesomeIcon.classList.add('fas', 'fa-map-marker-alt')
    locationIcon.appendChild(locationFontAwesomeIcon)
    
    const addressContainer = document.createElement('div')
    locationIconText.appendChild(addressContainer)



  const streetAdressText = document.createElement('div')
 streetAdressText.appendChild(document.createTextNode(element.address))
    addressContainer.appendChild(streetAdressText)
    
    const stateAdressText = document.createElement('div')
    stateAdressText.appendChild(document.createTextNode(element.city + ', ' + element.state +' ' + element.zipCode))
       addressContainer.appendChild(stateAdressText)








    const cardInfoContent = document.createElement('div')
    cardInfoContent.classList.add('content')
    cardContentItem.appendChild(cardInfoContent)
  })
}
getClients().then(clientList => {
  printSearchResult(clientList);
  ;
})


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
