const api_key = "&apiKey=ab6e3fedd7414af5bf13142a935bbced";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchnews('India'));
//navbar news 
const navitems = document.querySelectorAll(".navitem");
let currselected = null;
navitems.forEach(navitem => {
    navitem.addEventListener('click', ()=>{
        if(currselected){
            currselected.classList.remove('active');
        }
        currselected = navitem;
        currselected.classList.add('active');
        const navcontent = currselected.textContent;
        fetchnews(navcontent)
    })
})
const searchtext = document.getElementById('searchtext');
const searchbutton = document.getElementById('searchbutton');
searchbutton.addEventListener('click',()=>{
    const query = searchtext.value;
    if(!query){
        return;
    }
    fetchnews(query);
    if(currselected){
        currselected.classList.remove('active');
        currselected= null;
    }
    
})
const newslogo = document.getElementById('newslogo');
newslogo.addEventListener('click',()=>{
    window.location.reload();
})

//functions for fetching news through api
async function fetchnews(query){
    const res = await fetch(`${url}${query}${api_key}`);
    const data = await res.json();
    // console.log(data);
    binddata(data.articles);
}
function filldata(cardclone,article){
    //get the id of the element you want to set
    const newsimg = cardclone.querySelector('#newsimg');
    const newsTitle = cardclone.querySelector('#newstitle');
    const newsSrc = cardclone.querySelector('#newssource');
    const newsdescrptn = cardclone.querySelector('#newsdesc');
    newsimg.src = article.urlToImage//setting the image of the template as the img present in the api
    newsTitle.innerHTML = article.title;
    newsdescrptn.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})//convert time zone from ajeeb sa format toreadable
    newsSrc.innerHTML = `${article.source.name} - ${date}`;
    cardclone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url , "_blank");
    })
}
function binddata(articles){
    const cardcontainer = document.getElementById('cardcontainer');
    const newscardtemplate = document.getElementById('templatenewscard');
    cardcontainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage){
            return;
        } //Cloning a node copies all of its attributes and their values, including intrinsic (inline) listeners. It does not copy event listeners added using addEventListener() or those assigned to element properties (e.g.,node.onclick = someFunction).
        const cardclone = newscardtemplate.content.cloneNode(true);//making deep copy of card
        filldata(cardclone,article);//function to fill data
        cardcontainer.appendChild(cardclone);//adding the copy in cardcontainer
    });
}
