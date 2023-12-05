let localItems = JSON.parse(localStorage.getItem('items')) || []
let ascendingOrder = true
let listItems = localItems || []

function showItem() {
    try{
    let html = ''
    let itemShow = document.querySelector('[data-card-create]')

        // Spinner from Bootstrap if no objects are found in Local Storage
    if(listItems.length == 0){
            html = `<div class="spinner-border text-primary" id="spinner" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`
    }else{
            listItems.forEach((item)=>{
                html += `
                    <div class="card">
                    <img src="${item.imgLink}" class="card-img-top" alt="card" loading="lazy">
                     <div class="card-body">
                    <p class="card-text">Designed by ${item.designer}</p>
                    <p class="card-text">Suit colour ${item.colour}</p>
                    <p class="card-text">R ${item.price}</p>
                    <button type="button">Add To Cart</button>
                    </div>
                    </div>
                `
        })
    }

    itemShow.innerHTML = html
}catch(e){
    console.error('error on display function', e.message)
}
}

// Sort function in Local Storage
function toggleSort(){
    try{
        if(ascendingOrder){
        localItems.sort((a, b) => a.price - b.price)
            } else {
        localItems.sort((a, b) => b.price - a.price)
        }

        ascendingOrder = !ascendingOrder;
        localStorage.setItem('items', JSON.stringify(localItems))

        showItem();
    } catch (e) {
        console.error('Error on sort function', e.message);
    }
}

showItem()

let srtbtn = document.querySelector('[data-sortBtn]').addEventListener('click',toggleSort)

// search and return items function
function filterItems() {
    try {
        let searchInput = document.querySelector('[data-prod-search]')
    let searchTerm = searchInput.value.toLowerCase()
    if (searchTerm ===''){
        listItems = localItems; 
        // Reset to all items when search items is empty
    }else{
        listItems = localItems.filter(item=>
            item.designer.toLowerCase().includes(searchTerm)
        
        )}
    if(listItems.length == 0){
        document.querySelector('[data-card-create]').innerHTML = '<p id="no-items">No items found</p>'
    }else{
    showItem()
    }
}catch(e) {
    console.error('error on filter function', e.message);
}
}

let filtbtn = document.querySelector('[data-prod-search]').addEventListener('keyup', filterItems)
