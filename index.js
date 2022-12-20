
const citiesDropDownArray =[]

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

// ─── Sort paid button ──────────────────────────────────────────────────────────────


const sortButton = document.querySelector('#sortButton')
sortButton.addEventListener('click', () => {

 let selectElement = document.querySelector('#paidStatusDropdown')
 let output = selectElement.options[selectElement.selectedIndex].value;
  console.log(output);

  fetch(".netlify/functions/sort_items?invoicePaid=" + output, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    //  body: JSON.stringify(output),

  }).then((response) => response.json())
  .then((data) => printSearchResult(data));

})

// ─── Sort cities button ──────────────────────────────────────────────────────────────


const sortCitiesButton = document.querySelector('#sortCitiesButton')
sortCitiesButton.addEventListener('click', () => {

 let selectElement = document.querySelector('#cityDropdown')
 let output = selectElement.options[selectElement.selectedIndex].value;
  console.log(output);

  fetch(".netlify/functions/sort_cities?city=" + output, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    //  body: JSON.stringify(output),

  }).then((response) => response.json())
  .then((data) => printSearchResult(data));

})



// ─── Save Client Button And Function ─────────────────────────────────────────


const saveBtn = document.querySelector('#saveBtn') 

saveBtn.addEventListener('click', () => {
 
  saveClient()
  
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
  const notes = document.querySelector('#notesInput').value
  const invoicePaid = document.querySelector('input[name="paid"]:checked').value
 
 
  // ─── Random Picture Generator ────────────────────────────────────────
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let randomPictureNumer = getRandomInt(77)
  let clientImage = 'https://xsgames.co/randomusers/assets/avatars/male/' + randomPictureNumer + '.jpg'


  
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
  
}

// ─── Print Cities Dropdown ───────────────────────────────────────────────────

const printCitiesDropdown = (arr) => {

  document.querySelector("#cityDropdown").innerHTML = "";
  arr.forEach(element => {
    
  
  const citiesList = document.querySelector('#cityDropdown')
  const cityOption = document.createElement('option')
    cityOption.appendChild(document.createTextNode(element))
    cityOption.value = element
  citiesList.appendChild(cityOption)
    console.log(element)
  });
}



const printSearchResult = (arr) => {
  document.querySelector("#searchList").innerHTML = "";
  
  //trying to avoid going to the database again and excluding repeats.
  arr.forEach(element => {

    if (citiesDropDownArray.some(el => el === element.city) === false) {

      citiesDropDownArray.push(element.city)
    }
    
    // 
    // const citiesList = document.querySelector('#cityDropdown')
    // const cityOption = document.createElement('option')
    // cityOption.appendChild(document.createTextNode(element.city))
    // citiesList.appendChild(cityOption)
  

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

// Client Name
    const mediaTitle = document.createElement('p')
    mediaTitle.classList.add('title', 'is-4', 'mb-1')
    mediaTitle.appendChild(document.createTextNode(element.firstName + ' ' + element.lastName))
    mediaContentDiv.appendChild(mediaTitle)


    // Client Edit Icon
    // const clientNameEditIcon = document.createElement('span')
    // clientNameEditIcon.classList.add('icon', 'is-small', 'ml-2')
    // mediaTitle.appendChild(clientNameEditIcon)

    // const clientNameEditLink = document.createElement('a')
    // clientNameEditIcon.appendChild(clientNameEditLink)

    // const clientNameEditFontawesome = document.createElement('i')
    // clientNameEditFontawesome.classList.add('fa', 'fa-edit')
    // clientNameEditLink.appendChild(clientNameEditFontawesome)


    // // Client Save Edit Icon
    // const clientNameSaveIcon = document.createElement('span')
    // clientNameSaveIcon.classList.add('icon', 'is-small', 'ml-2')
    

    // const clientNameSaveLink = document.createElement('a')
    // clientNameSaveIcon.appendChild(clientNameSaveLink)

    // const clientNameSaveFontawesome = document.createElement('i')
    // clientNameSaveFontawesome.classList.add('far', 'fa-Save')
    // clientNameSaveLink.appendChild(clientNameSaveFontawesome)



    
    
    
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
    
      }).then(() => {fetch('.netlify/functions/get_clients').then((response) => response.json())
      .then((data) => printSearchResult(data))
        // do something when the promise is fulfilled
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

    // phone edit field
    const phoneNumberFieldSpan = document.createElement('span')
    const phoneNumberEditField = document.createElement('input')
    phoneNumberEditField.classList.add('input', 'is-small', 'is-rounded')
    phoneNumberFieldSpan.appendChild(phoneNumberEditField)


    // phone edit icon
    const phoneEditIcon = document.createElement('span')
    phoneEditIcon.classList.add('icon')
    phoneIconText.appendChild(phoneEditIcon)

    const phoneEditIconLink = document.createElement('a')
    phoneEditIcon.appendChild(phoneEditIconLink)

    const phoneEditFontAwesome = document.createElement('i')
    phoneEditFontAwesome.classList.add('fa', 'fa-edit')
    phoneEditIconLink.appendChild(phoneEditFontAwesome)

//phone save icon
const phoneSaveIcon = document.createElement('span')
phoneSaveIcon.classList.add('icon')


const phoneSaveIconLink = document.createElement('a')
phoneSaveIcon.appendChild(phoneSaveIconLink)

const phoneSaveFontAwesome = document.createElement('i')
phoneSaveFontAwesome.classList.add('far', 'fa-save')
phoneSaveIconLink.appendChild(phoneSaveFontAwesome)
    
    
    phoneEditIcon.addEventListener('click', () => {
      console.log('test')
      
      phoneEditIcon.replaceWith(phoneSaveIcon)
      phoneNumberText.replaceWith(phoneNumberFieldSpan)
    }
    )
    
    // save phone listener
     phoneSaveIcon.addEventListener('click', () => {
     
      console.log(phoneNumberEditField.value)
      fetch(".netlify/functions/update_phone?_id=" + element._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(phoneNumberEditField.value),
    
      }).then(() => {fetch('.netlify/functions/get_clients').then((response) => response.json())
      .then((data) => printSearchResult(data))
        // do something when the promise is fulfilled
    })
       
      //  getClients().then(clientList => {
      //   printSearchResult(clientList);
      //   ;
      // })
      
      
      
      


      phoneSaveIcon.replaceWith(phoneEditIcon)
      phoneNumberFieldSpan.replaceWith(phoneNumberText)


      
    }
    )
    
    
    // saveNotesIcon.addEventListener('click', () => {
      
    //   cardNoteTextArea.replaceWith(cardInfoContent)
    //   saveNotesIcon.replaceWith(editNotesIcon)
    //   console.log(cardNoteTextArea.value)

      

    // }
    // )


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

    // email edit field
    const emailFieldSpan = document.createElement('span')
    const emailEditField = document.createElement('input')
    emailEditField.classList.add('input', 'is-small', 'is-rounded')
    emailFieldSpan.appendChild(emailEditField)


    // email edit icon
    const emailEditIcon = document.createElement('span')
    emailEditIcon.classList.add('icon')
    emailIconText.appendChild(emailEditIcon)

    const emailEditIconLink = document.createElement('a')
    emailEditIcon.appendChild(emailEditIconLink)

    const emailEditFontAwesome = document.createElement('i')
    emailEditFontAwesome.classList.add('fa', 'fa-edit')
    emailEditIconLink.appendChild(emailEditFontAwesome)

    // email save edit icon
    const emailSaveIcon = document.createElement('span')
    emailSaveIcon.classList.add('icon')
    

    const emailSaveIconLink = document.createElement('a')
    emailSaveIcon.appendChild(emailSaveIconLink)

    const emailSaveFontAwesome = document.createElement('i')
    emailSaveFontAwesome.classList.add('far', 'fa-save')
    emailSaveIconLink.appendChild(emailSaveFontAwesome)

    emailEditIcon.addEventListener('click', () => {
      console.log('test')
      
      emailEditIcon.replaceWith(emailSaveIcon)
      emailText.replaceWith(emailFieldSpan)
    }
    ) 

    emailSaveIcon.addEventListener('click', () => {
     
      console.log(emailEditField.value)
      fetch(".netlify/functions/update_email?_id=" + element._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailEditField.value),
    
      }).then(() => {fetch('.netlify/functions/get_clients').then((response) => response.json())
      .then((data) => printSearchResult(data))
        // do something when the promise is fulfilled
    })
         
    
      
    phoneEditIcon.replaceWith(phoneSaveIcon)
    phoneNumberText.replaceWith(phoneNumberFieldSpan)


      
    }
    )

   // ─── Contractor ──────────────────────────────────────────────────────
    
   const contractorIconText = document.createElement('div')
   contractorIconText.classList.add('icon-text')
   cardContentItem.appendChild(contractorIconText)
 
   const contractorIcon = document.createElement('span')
   contractorIcon.classList.add('icon')
   contractorIconText.appendChild(contractorIcon)
 
   const contractorFontAwesomeIcon = document.createElement('i')
   contractorFontAwesomeIcon.classList.add('fas', 'fa-hard-hat')
   contractorIcon.appendChild(contractorFontAwesomeIcon)
 
   const contractorText = document.createElement('span')
   contractorText.appendChild(document.createTextNode(element.contractor))
     contractorIconText.appendChild(contractorText)
 
     // contractor edit field
     const contractorFieldSpan = document.createElement('span')
     const contractorEditField = document.createElement('input')
     contractorEditField.classList.add('input', 'is-small', 'is-rounded')
     contractorFieldSpan.appendChild(contractorEditField)
 
 
     // contractor edit icon
     const contractorEditIcon = document.createElement('span')
     contractorEditIcon.classList.add('icon')
     contractorIconText.appendChild(contractorEditIcon)
 
     const contractorEditIconLink = document.createElement('a')
     contractorEditIcon.appendChild(contractorEditIconLink)
 
     const contractorEditFontAwesome = document.createElement('i')
     contractorEditFontAwesome.classList.add('fa', 'fa-edit')
     contractorEditIconLink.appendChild(contractorEditFontAwesome)
 
     // contractor save edit icon
     const contractorSaveIcon = document.createElement('span')
     contractorSaveIcon.classList.add('icon')
     
 
     const contractorSaveIconLink = document.createElement('a')
     contractorSaveIcon.appendChild(contractorSaveIconLink)
 
     const contractorSaveFontAwesome = document.createElement('i')
     contractorSaveFontAwesome.classList.add('far', 'fa-save')
     contractorSaveIconLink.appendChild(contractorSaveFontAwesome)
 
     contractorEditIcon.addEventListener('click', () => {
       console.log('test')
       
       contractorEditIcon.replaceWith(contractorSaveIcon)
       contractorText.replaceWith(contractorFieldSpan)
     }
     ) 
 
     contractorSaveIcon.addEventListener('click', () => {
      
       console.log(contractorEditField.value)
       fetch(".netlify/functions/update_contractor?_id=" + element._id, {
         method: 'PATCH',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(contractorEditField.value),
     
       }).then(() => {fetch('.netlify/functions/get_clients').then((response) => response.json())
       .then((data) => printSearchResult(data))
         // do something when the promise is fulfilled
     })
          
     
       
     phoneEditIcon.replaceWith(phoneSaveIcon)
     phoneNumberText.replaceWith(phoneNumberFieldSpan)
 
 
       
     }
     ) 
    

   

    
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
// Icon button stuff
    const editNotesIcon = document.createElement('span')
    editNotesIcon.classList.add('icon', 'is-small','ml-1')
    notesHeading.appendChild(editNotesIcon)

    const iconLink = document.createElement('a')
    editNotesIcon.appendChild(iconLink)

    const editNotesFontAwesome = document.createElement('i')
    editNotesFontAwesome.classList.add('fa', 'fa-edit')
    iconLink.appendChild(editNotesFontAwesome)

 // Save Icon
 const saveNotesIcon = document.createElement('span')
    saveNotesIcon.classList.add('icon', 'is-small','ml-1')
    

    const saveIconLink = document.createElement('a')
    saveNotesIcon.appendChild(saveIconLink)

    const saveNotesFontAwesome = document.createElement('i')
    saveNotesFontAwesome.classList.add('far', 'fa-save')
    saveIconLink.appendChild(saveNotesFontAwesome)
   


// notes text area that gets swapped
    const cardNoteTextArea = document.createElement('textarea')
    cardNoteTextArea.classList.add('textarea', 'is-primary')


    const cardInfoContent = document.createElement('div')
    cardInfoContent.classList.add('content')
    cardInfoContent.appendChild(document.createTextNode(element.notes))
    cardContentItem.appendChild(cardInfoContent)

    editNotesIcon.addEventListener('click', () => {
      console.log('test')
      cardInfoContent.replaceWith(cardNoteTextArea)
      editNotesIcon.replaceWith(saveNotesIcon)
    }
    )
    
    //save note edit
    saveNotesIcon.addEventListener('click', () => {
      
      cardNoteTextArea.replaceWith(cardInfoContent)
      saveNotesIcon.replaceWith(editNotesIcon)
      console.log(cardNoteTextArea.value)

      fetch(".netlify/functions/update_notes?_id=" + element._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardNoteTextArea.value),
    
      }).then(() => {fetch('.netlify/functions/get_clients').then((response) => response.json())
      .then((data) => printSearchResult(data))
        // do something when the promise is fulfilled
    })

      
      
     

    }
)

// ─── Map ─────────────────────────────────────────────────────────────────────


    const mapDiv = document.createElement('div')
    mapDiv.classList.add('is-flex')
    cardItem.appendChild(mapDiv)

    const staticMap = document.createElement('img')
    staticMap.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + element.city + ',' + element.state + '&zoom=14&size=560x400&key=AIzaSyCloTfnFWI2UH5Q5uuCtW1HbiwdJM22-nQ'
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
  printCitiesDropdown(citiesDropDownArray)
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
