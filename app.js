const API_KEY = "4dbe597807ff4b4583d2df792c693874";
const url = "https://newsapi.org/v2/everything?q=";

 
// fetching Api

window.addEventListener('load',()=>fetchnews('india'));
async function fetchnews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        document.querySelector('.main_loader').style.display = "none";
        console.log(data);
        if (data.articles) {
            document.querySelector('.card-container').innerHTML = ''; // Clear previous results
            data.articles.forEach(article => {
                if(article.author == null)  {
                    hideCard()
                } 
                else {
                    showCard(article);
                }
                
            });

        } else {
            console.log('No articles found');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// function to display card on the screen

function showCard (article) {
    const cardContainer = document.querySelector('.card-container');

    const newsCard = document.createElement('a');
    cardContainer.classList.add('card-container');

    newsCard.classList.add('news-card');
    newsCard.setAttribute('href',article.url);
    newsCard.target = "_blank";

    const cardHTML= ` <img src="${article.urlToImage}"
    alt="news-img">
    <div class="card-details">
    <h2 class="title">${article.title}</h2>
    <p class="date">${article.publishedAt}</p>
    <p class="content"> ${article.content}</p>
    </div>`;
    newsCard.innerHTML= cardHTML;
    cardContainer.append(newsCard);

    
}

// function to hide card


function hideCard() {
    const cardContainer = document.querySelector('.card-container');

    const newsCard = document.createElement('a');
    newsCard.style.display = "none";
}

// function to reload the window


    function reload()
    {
        fetchnews('india');
    }
    // function to make active class
    let curClass = null;
    function activating_class (id)
    {
        fetchnews(id)
        const item = document.getElementById(id);
        curClass?.classList.remove('active_class');
        curClass= item;
        item.classList.add('active_class');
    }


    //search  box //


const search_btn = document.querySelector('#search-btn');
const input= document.querySelector('#search');

search_btn.addEventListener('click', ()=>{
    const queryEnter = input.value;
        fetchnews(queryEnter);
        curClass?.classList.remove('active_class');
        curClass= null;
 
    });
    



    

   




