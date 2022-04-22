const animeCards = document.querySelector('.animeCards');
const newCard = document.createElement('div');
const animeTittle = document.createElement('p');
const animeImg = document.createElement('img');
const animeText = document.createElement('p');

const urlAnime = 'https://anime-facts-rest-api.herokuapp.com/api/v1';

const delay = (ms) =>{
  return new Promise ((response)=>{
    setTimeout(()=> response(),ms)
  })
}
animeTittle.innerHTML = "Fact from anime: ";

async function fetchAsyncTodos(){
  try {
    const response = await fetch(urlAnime);
    const animeData = await response.json();
    for (item in animeData.data){
      const urlFacts = `https://anime-facts-rest-api.herokuapp.com/api/v1/${animeData.data[item].anime_name}`;
      const response2 = await fetch(urlFacts);
      const factsData = await response2.json();

      animeTittle.innerHTML += animeData.data[item].anime_name;
      animeImg.src = animeData.data[item].anime_img;
      for(element in factsData.data){
        animeText.innerHTML = factsData.data[element].fact;
        await delay(2000);
      }
      await delay(3000);
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
animeImg.style.height = '400px'

animeText.style.maxWidth = '350px'
animeText.style.textAlign = 'center'
animeText.style.fontWeight = '20px'

newCard.append(animeTittle)
newCard.append(animeImg)
newCard.append(animeText)

console.log(animeCards.append(newCard))