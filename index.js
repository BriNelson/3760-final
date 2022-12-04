

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

getNewsButton.addEventListener('click', () => {
    fetchNews()
})

const createItem = (itemName, elementTag, classOne, classTwo, classThree, appendItem) => {

    itemName = document.createElement(elementTag);
    itemName.classlist.add(classOne, classTwo, classThree);
    appendItem.appendChild(itemName);
}


const printSearchResult = () => {
    let searchList = document.querySelector("#searchList")

    
} 