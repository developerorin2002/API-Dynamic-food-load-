const loadData = (text,limit) =>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`)
    .then(res => res.json())
    .then(data => displayDrinks(data.drinks , limit))

};

const displayDrinks = (datas , limit) =>{
    const getParent = document.getElementById('parent-div');
    getParent.innerHTML = ``;
    const notFound = document.getElementById('not-found')
    if (datas === null) {
        notFound.classList.remove('d-none');
        return;
    }else{
        notFound.classList.add('d-none');
    }

    // showing result 
    const showMore = document.getElementById('show-more')
    if (limit && datas.length > 3) {
        showMore.classList.remove('d-none')
        datas = datas.slice(0,3);
    }else{
        showMore.classList.add('d-none')
    }

    datas.forEach(data => {
        console.log(data);
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${data.strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${data.strDrink}</h5>
                      <p class="card-text">${data.strInstructions.slice(0,200)}</p>
                    </div>
                </div>
        `
        getParent.appendChild(createDiv);
    });
    loadSpinner(false);

}

const searchProcess = (limit) =>{
    loadSpinner(true)
    const getInput = document.getElementById('input');
    const inputValue = getInput.value;
    loadData(inputValue ,limit);
}
// load spinner

const loadSpinner = (spin) =>{
    const getId = document.getElementById('spinner');
    if (spin) {
        getId.classList.remove('d-none')
    }else{
        getId.classList.add('d-none')
    }
}

document.getElementById('search').addEventListener('click',()=>{
   searchProcess(3);
})

document.getElementById('show-more').addEventListener('click',()=>{
    searchProcess(false);
})

















