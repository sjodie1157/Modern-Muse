let localItems = JSON.parse(localStorage.getItem('items')) || []
let ascendingOrder = true
let listItems = localItems || []
let purchased =[]
if (localItems.length === 0) {
    localItems = [
        {
            id: 1,
            name: "Black Mist",
            category: "Suit",
            colour: "Black",
            price: 25000,
            designer: "Gucci",
            imgLink: "https://i.postimg.cc/GhtDcywF/Black-Suit.jpg"
        },
        {
            id: 2,
            name: "Grey Matter",
            category: "Tuxido",
            colour: "Grey",
            price: 36070,
            designer: "Prada",
            imgLink: "https://i.postimg.cc/0yHcksBQ/Grey-suit.jpg"
        },
        {
            id: 3,
            name: "Red Crimson",
            category: "Suit",
            colour: "Red",
            price: 72000,
            designer: "Gucci",
            imgLink: "https://i.postimg.cc/Pq934jWc/red-suit.jpg"
        },
        {
            id: 4,
            name: "Envious",
            category: "Suit",
            colour: "Green",
            price: 93000,
            designer: "Givenchy",
            imgLink: "https://i.postimg.cc/0y5B5Z5t/Green-suit.jpg"
        }
    ]
    localStorage.setItem('items', JSON.stringify(localItems))
}

let itemShow = document.querySelector('[data-card-create]')
function showItem() {
    try {
        let html = ''

        // Spinner from Bootstrap if no objects are found in Local Storage
        if (listItems.length == 0) {
            html = `<div class="spinner-border text-primary" id="spinner" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`
        } else {
            listItems.map((item,index) => {
                html += `
                    <div class="card">
                    <img src="${item.imgLink}" class="card-img-top" alt="card" loading="lazy">
                     <div class="card-body">
                    <p class="card-text">Suit name: ${item.name}</p>
                    <p class="card-text">Designed by: ${item.designer}</p>
                    <p class="card-text">Suit colour: ${item.colour}</p>
                    <p class="card-text">R ${item.price}</p>
                    <button type="button" value='${index}' data-addToCart>Add To Cart</button>
                    </div>
                    </div>
                `
            }).join('')
        }

        itemShow.innerHTML = html
    } catch (e) {
        console.error('error on display function', e.message)
    }
}

// add to cart buttons targeting indivudal buttons
itemShow.addEventListener('click',()=>{
    if(event.target.hasAttribute('data-addToCart')){
        purchased.push(listItems[event.target.value])
        if(localStorage.getItem('purchased')){
            
        }else {
            localStorage.setItem('purchased', JSON.stringify(purchased))
        }
    }
})


// Sort function in Local Storage
function toggleSort() {
    try {
        if (ascendingOrder) {
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

let srtbtn = document.querySelector('[data-sortBtn]').addEventListener('click', toggleSort)

// search and return items function
function filterItems() {
    try {
        let searchInput = document.querySelector('[data-prod-search]')
        let searchTerm = searchInput.value.toLowerCase()
        if (searchTerm === '') {
            listItems = localItems;
            // Reset to all items when search items is empty
        } else {
            listItems = localItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm)

            )
        }
        if (listItems.length == 0) {
            document.querySelector('[data-card-create]').innerHTML = '<p id="no-items">No items found</p>'
        } else {
            showItem()
        }
    } catch (e) {
        console.error('error on filter function', e.message);
    }
}

let filtbtn = document.querySelector('[data-prod-search]').addEventListener('keyup', filterItems)
