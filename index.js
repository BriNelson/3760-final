
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
function logState(params) {

  // ─── Map Heading And Container ───────────────────────────────────────

  
  document.querySelector("#mainContainer").innerHTML = "";
  const mainContainer = document.querySelector('#mainContainer')
  mainContainer.classList.add("mt-6")
  const mapHeading = document.createElement('span')
  mapHeading.appendChild(document.createTextNode(params.firstName + ' ' + params.lastName + "'s location"))
  mapHeading.classList.add('is-size-3')
  mainContainer.appendChild(mapHeading)


  // ─── Directions Map ──────────────────────────────────────────────────

  
  const mapIframe = document.createElement('iframe')
  mapIframe.src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCloTfnFWI2UH5Q5uuCtW1HbiwdJM22-nQ&q=" + params.address + "," + params.city + "+" + params.state
  mapIframe.width = "960"
  mapIframe.height = '400'
  mapIframe.loading = 'lazy'
  mainContainer.appendChild(mapIframe)

        console.log(params)
}

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
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let randomPictureNumer = getRandomInt(77)
  let clientImage = 'https://xsgames.co/randomusers/assets/avatars/male/' + randomPictureNumer + '.jpg'


  const notes = document.querySelector('#notesInput').value
const invoicePaid = document.querySelector('input[name="paid"]:checked').value
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
    invoicePaid: invoicePaid,
    clientImage: clientImage,
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
  document.querySelector("#searchList").innerHTML = "";
  arr.forEach(element => {
    const searchList = document.querySelector('#searchList')
    const clientListItem = document.createElement('li')
    searchList.appendChild(clientListItem)

    const cardItem = document.createElement('div')
    cardItem.classList.add('card', 'is-flex', 'card', 'is-flex', 'is-justify-content-space-between', 'mt-4'  )
    clientListItem.appendChild(cardItem)

    const cardContentFlexwrap = document.createElement('div')
    cardContentFlexwrap.classList.add('is-flex')
    cardItem.appendChild(cardContentFlexwrap)


    const cardContentItem = document.createElement('div')
    cardContentItem.classList.add('card-content')
    cardContentFlexwrap.appendChild(cardContentItem)

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
    clientImageTag.src = element.clientImage
    clientPortrait.appendChild(clientImageTag)
    // needs src
    //

    const mediaContentDiv = document.createElement('div')
    mediaContentDiv.classList.add('media-content')
    cardMediaItem.appendChild(mediaContentDiv)

    const mediaTitle = document.createElement('p')
    mediaTitle.classList.add('title', 'is-4', 'mb-1')
    mediaTitle.appendChild(document.createTextNode(element.firstName + ' ' + element.lastName))
    mediaContentDiv.appendChild(mediaTitle)
// Paid check marker
    
    
    
// ─── Paid Button ─────────────────────────────────────────────────────────────
    let paidStatus = ''
    let tagColor = ''
    let tagIcon = ''
    if (element.invoicePaid === false) {
      paidStatus = "UNPAID"
      tagColor = 'is-danger'
      tagIcon = 'fa-exclamation-triangle'
    }
    if (element.invoicePaid === true) {
      paidStatus = "PAID"
      tagColor = 'is-success'
      tagIcon = 'fa-check'
    }
    const paidButton = document.createElement('span')
    paidButton.classList.add('tag', 'button', tagColor , 'mt-0')
    mediaContentDiv.appendChild(paidButton)

    const paidButtonIconText = document.createElement('div')
    paidButtonIconText.classList.add('icon-text')
    paidButton.appendChild(paidButtonIconText)

    const paidButtonIcon = document.createElement('span')
    paidButtonIcon.classList.add('icon', 'mt-1')
    paidButtonIconText.appendChild(paidButtonIcon)

    const paidButtonFontAwesome = document.createElement('i')
    paidButtonFontAwesome.classList.add('fas', tagIcon)
    paidButtonIcon.appendChild(paidButtonFontAwesome)

    const paidButtonText = document.createElement('span')
    paidButtonText.appendChild(document.createTextNode(paidStatus))
    paidButtonIconText.appendChild(paidButtonText)

    paidButton.addEventListener('click', (event) => {

      // toggles between true and false
      if (element.invoicePaid === false) { 
        
        element.invoicePaid = true
        paidStatus = "PAID"
      tagColor = 'is-success'
      tagIcon = 'fa-check'
      }else if (element.invoicePaid === true) { 
        element.invoicePaid = false
        
        paidStatus = "PAID"
      tagColor = 'is-success'
      tagIcon = 'fa-check'
      }
      


      fetch(".netlify/functions/paid_invoice?_id=" + element._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(element.invoicePaid),
    
      })

      
      
      getClients().then(clientList => {
        printSearchResult(clientList);
        ;
      })
        
    
      
      
      // const unPaidButtonText = document.createElement('span')
      // unPaidButtonText.appendChild(document.createTextNode('paid'))
      
      // paidButtonText.replaceWith(unPaidButtonText)


      // paidButtonFontAwesome.classList.replace('fa-exclamation-triangle', 'fa-check' )
      // paidButton.classList.replace('is-danger', 'is-success')
      // // paidButtonText.appendChild(document.createTextNode(test))
      // console.log("test")
    })

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
    stateAdressText.classList.add('mt-0')
    stateAdressText.appendChild(document.createTextNode(element.city + ', ' + element.state +' ' + element.zipCode))
       addressContainer.appendChild(stateAdressText)

// ─── Map Directions Button ───────────────────────────────────────────────────
    const mapDirectionsButton = document.createElement('button')
    mapDirectionsButton.classList.add('button', 'is-info', 'is-small')
    mapDirectionsButton.appendChild(document.createTextNode('See Map Directions'))
    cardContentItem.appendChild(mapDirectionsButton)

    mapDirectionsButton.addEventListener('click', event => {

      logState(element)
     console.log(element.city)
    })

  



 


// ─── Client Notes ────────────────────────────────────────────────────────────

    const notesHeading = document.createElement('div')
    notesHeading.classList.add('has-text-weight-medium','mt-3')
    notesHeading.appendChild(document.createTextNode('Notes'))
    cardContentItem.appendChild(notesHeading)




    const cardInfoContent = document.createElement('div')
    cardInfoContent.classList.add('content')
    cardInfoContent.appendChild(document.createTextNode(element.notes))
    cardContentItem.appendChild(cardInfoContent)

// ─── Map ─────────────────────────────────────────────────────────────────────


    const mapDiv = document.createElement('div')
    mapDiv.classList.add('is-flex')
    cardItem.appendChild(mapDiv)

    const staticMap = document.createElement('img')
    staticMap.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + element.city + ',' + element.state + '&zoom=14&size=750x300&key=AIzaSyCloTfnFWI2UH5Q5uuCtW1HbiwdJM22-nQ'
    mapDiv.appendChild(staticMap)
// ─── Delete Button ───────────────────────────────────────────────────────────


    const buttonFlexWrapper = document.createElement('div')
    buttonFlexWrapper.classList.add('is-flex')
    cardItem.appendChild(buttonFlexWrapper)

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete', 'is-large', 'mt-2', 'mr-2')
    buttonFlexWrapper.appendChild(deleteButton)

    deleteButton.addEventListener('click', (event) => {
      // console.log(element._id)

      fetch(".netlify/functions/delete_clients?_id=" + element._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(element._id),
    
      })
      getClients().then(clientList => {
        printSearchResult(clientList);
        ;
      })
          
    })

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
