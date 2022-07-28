// document.addEventListener('DOMContentLoaded', function(){
// }, false);

function displayBooksList(){  
  document.getElementById("errorDiv").style.visibility = "hidden";
    let booksList = document.getElementById("booksList");
    booksList.innerHTML = "";

    this.containerList = document.createElement('div'); 
    this.containerList.setAttribute('id','containerList');
    this.containerList.classList.add("containerList");

    booksList.append(this.containerList);

    this.searchData = document.getElementById("searchBox").value;

     //handling empty search input field
     if(searchData === "" || searchData === null) {
       displayError("search term can not be empty!");
       return;
     }
    
     getBooksUsingRest();    
}

function displayError(msg) {
  document.getElementById("errorDiv").innerHTML = msg;
  document.getElementById("errorDiv").style.visibility = "visible";
}

function getBooksUsingRest(){
    fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.searchData)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => {
      console.error('Error:', error);
      displayError( "Opps ... somthing went wrong.");      
    });

    searchData.innerHTML = ""; //clear search box
}

function displayResults(booksList){
    let title,description;

    if(booksList.items === undefined){
        displayError("No Books Found");
        return;
    }         

    booksList.items.slice(0,10).forEach(item=>
        {        
            title = item.volumeInfo.title;
            description = item.volumeInfo.description;
            bookImg = item.volumeInfo?.imageLinks?.thumbnail ;        
            
            this.containerList.innerHTML +=`<div class="card"> 
                                    ${formatOutput(bookImg, title, description)}                               
                                    </div>`;        
        }      
      );
}

function formatOutput(bookImg, title, description) {    
    var htmlCard = `      
        <div class="cardContent">
          <div class="cardImg" >
            <img src="${bookImg??""}" >
          </div>          
          <div class="cardData">
              <h3 class="cardTitle">${title}</h3>
              <p class="cardText">${description??""}</p>              
          </div>          
        </div>      
   `
    return htmlCard;
  }