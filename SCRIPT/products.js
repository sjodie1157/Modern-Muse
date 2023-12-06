let localItems = JSON.parse(localStorage.getItem('items')) || []
let ascendingOrder = true
let listItems = localItems || []
let purchased = JSON.parse(localStorage.getItem('purchased')) || []

if (localItems.length === 0) {
    localItems = [
        {
            id: 1,
            name: "Black Mist",
            category: "Suit",
            colour: "Black",
            price: 25000,
            designer: "Gucci",
            imgLink: "https://i.postimg.cc/GhtDcywF/Black-Suit.jpg",
            quantity: 1
        },
        {
            id: 2,
            name: "Grey Matter",
            category: "Tuxedo",
            colour: "Grey",
            price: 36070,
            designer: "Prada",
            imgLink: "https://i.postimg.cc/0yHcksBQ/Grey-suit.jpg",
            quantity: 1
        },
        {
            id: 3,
            name: "Red Crimson",
            category: "Suit",
            colour: "Red",
            price: 72000,
            designer: "Gucci",
            imgLink: "https://i.postimg.cc/Pq934jWc/red-suit.jpg",
            quantity: 1
        },
        {
            id: 4,
            name: "Envious",
            category: "Suit",
            colour: "Green",
            price: 93000,
            designer: "Givenchy",
            imgLink: "https://i.postimg.cc/0y5B5Z5t/Green-suit.jpg",
            quantity: 1
        }
    ]

    localStorage.setItem('items', JSON.stringify(localItems))
}

let itemShow = document.querySelector('[data-card-create]')

function showItem() {
    try {
        // Spinner from Bootstrap if no objects are found in Local Storage
        if (listItems.length == 0) {
            html = `<div class="spinner-border text-primary" id="spinner" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`
        } else {
            html = listItems
                .map((item, index) => {
                    return `
                        <div class="card">
                            <img src="${item.imgLink}" class="card-img-top" alt="card">
                            <div class="card-body">
                                <p class="card-text">Suit name: ${item.name}</p>
                                <p class="card-text">Designed by: ${item.designer}</p>
                                <p class="card-text">Suit colour: ${item.colour}</p>
                                <p class="card-text">R ${item.price}</p>
                                <button type="button" data-addToCart="${index}">Add To Cart</button>
                            </div>
                        </div>
                    `
                })
                .join('')
        }

        itemShow.innerHTML = html
    } catch (e) {
        console.error('error on display function', e.message);
    }
}

itemShow.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-addToCart')) {
        let selectedItemIndex = event.target.getAttribute('data-addToCart')
        let selectedItem = listItems[selectedItemIndex]

        // Check if the item is already in the cart
        let existingCartItemIndex = purchased.findIndex((item) => item.id === selectedItem.id)

        if (existingCartItemIndex !== -1) {
            // Increment the quantity if the item is already in the cart
            purchased[existingCartItemIndex].quantity += 1
        } else {
            // Add the item to the cart with quantity 1 if not in the cart
            purchased.push({ ...selectedItem, quantity: 1 })
        }

        localStorage.setItem('purchased', JSON.stringify(purchased))
    }
})
function toggleSort() {
    try {
        if (ascendingOrder) {
            listItems.sort((a, b) => a.price - b.price)
        } else {
            listItems.sort((a, b) => b.price - a.price)
        }

        ascendingOrder = !ascendingOrder
        localStorage.setItem('items', JSON.stringify(listItems))

        showItem()
    } catch (e) {
        console.error('Error on sort function', e.message)
    }
}
showItem()
let srtbtn = document.querySelector('[data-sortBtn]').addEventListener('click', toggleSort)

function filterItems() {
    try {
        let searchInput = document.querySelector('[data-prod-search]')
        let searchTerm = searchInput.value.toLowerCase()
        if (searchTerm === '') {
            listItems = localItems
            // Reset to all items when search items are empty
        } else {
            listItems = localItems.filter((item) => item.name.toLowerCase().includes(searchTerm))
        }
        if (listItems.length == 0) {
            document.querySelector('[data-card-create]').innerHTML = '<p id="no-items">No items found</p>'
        } else {
            showItem()
        }
    } catch (e) {
        console.error('error on filter function', e.message)
    }
}

let filtbtn = document.querySelector('[data-prod-search]').addEventListener('keyup', filterItems)
