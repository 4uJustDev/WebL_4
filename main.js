const animeCards = document.querySelector('.animeCards');
const newCard = document.createElement('div');
const animeTittle = document.createElement('p');
const animeImg = document.createElement('img');
const animeText = document.createElement('p');

const PrevBtn = document.getElementsByClassName("PrevButton");
const NextBtn = document.getElementsByClassName("NextButton");

const urlAnime = 'https://anime-facts-rest-api.herokuapp.com/api/v1';

const delay = (ms) =>{
  return new Promise ((response)=>{
    setTimeout(()=> response(),ms)
  })
}
let item = 0;

async function fetchAsyncTodos(){
  try {
    const response = await fetch(urlAnime);
    const animeData = await response.json();
    for (item in animeData.data){
      const urlFacts = `https://anime-facts-rest-api.herokuapp.com/api/v1/${animeData.data[item].anime_name}`;
      const response2 = await fetch(urlFacts);
      const factsData = await response2.json();
      
      animeTittle.innerHTML = `Fact from anime:${animeData.data[item].anime_name} `;
      animeImg.src = animeData.data[item].anime_img;
      for(element in factsData.data){
        animeText.innerHTML = factsData.data[element].fact;
        await delay(500);
      }
      
      await delay(500);
      
    }
  } catch (e) {
    console.error(e);
  } finally{
    console.log("the end of work async");
  }
}

fetchAsyncTodos();
//Style
newCard.style.display = 'flex'
newCard.style.flexDirection = 'column'
newCard.style.alignItems = 'center'
newCard.style.justifyContent = 'center'
newCard.style.margin = '0px 40px'
animeImg.style.height = '400px'

animeText.style.maxWidth = '300px'
animeText.style.minHeight = '100px'
animeText.style.textAlign = 'center'
animeText.style.fontWeight = '20px'

newCard.append(animeTittle)
newCard.append(animeImg)
newCard.append(animeText)

console.log(animeCards.replaceWith(newCard))