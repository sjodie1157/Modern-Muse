let listItems = JSON.parse(localStorage.getItem('items')) || []
let ascendingOrder = true

function showItem() {
    try {
        let html;

        if (listItems.length === 0) {
            html = `<div class="spinner-border text-primary" id="spinner" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>`;
        } else {
            html = listItems
                .map((item, index) => {
                    return `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.category}</td>
                            <td>${item.colour}</td>
                            <td>R ${item.price}</td>
                            <td>${item.designer}</td>
                            <td><img src="${item.imgLink}" alt="check-Item"></td>
                            <td>
                                <div class="col d-flex justify-content-center">
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editItemModal"
                                data-bs-whatever="@mdo">Edit Itm</button>
                            
                                </div>
                                <div class="col d-flex justify-content-center">
                                    <button type="button" data-item-id="${item.id}" onclick="removeItem(this)">Remove</button>
                                </div>
                            </td>
                        </tr>`
                })
                .join('')
        }
        addItemDisplayOnAdmin.innerHTML = html
    } catch (e) {
        console.error('Error on display function', e.message);
    }
}

// C.R.U.D system

// Create C in Crud
function addItem() {
    try {
        let name = document.querySelector('#name').value
        let category = document.querySelector('#category').value
        let colour = document.querySelector('#colour').value
        let price = +document.querySelector('#price').value
        let designer = document.querySelector('#designer').value
        let imgLink = document.querySelector('#imgLink').value

        let oldItems = listItems || []
        let lastId = oldItems.reduce((max, item) => (item.id > max ? item.id : max), 0)

        let newItem = {
            id: lastId + 1,
            name: name,
            category: category,
            colour: colour,
            price: price,
            designer: designer,
            imgLink: imgLink
        }

        let updatedItems = [...oldItems, newItem]
        localStorage.setItem('items', JSON.stringify(updatedItems))
        listItems = updatedItems
        showItem();
    } catch (e) {
        console.error('Error on trying to create new items', e.message);
    }
}

function removeItem(button) {
    try {
        let itemId = button.dataset.itemId
        listItems = listItems.filter(item => item.id != itemId)
        localStorage.setItem('items', JSON.stringify(listItems))
        showItem()
    } catch (e) {
        console.error('Error on removing item', e.message);
    }
}

let addItemButton = document.querySelector('[data-add-Item]')
addItemButton.addEventListener('click', addItem);

let addItemDisplayOnAdmin = document.querySelector('[data-rowTable]')

// Read R in Crud (location reload requires a double-click on startup)

function toggleSort() {
    try {
        if (ascendingOrder) {
            listItems.sort((a, b) => a.price - b.price)
        } else {
            listItems.sort((a, b) => b.price - a.price)
        }

        ascendingOrder = !ascendingOrder;
        localStorage.setItem('items', JSON.stringify(listItems))
        
        showItem();
    } catch (e) {
        console.error('Error on sort function', e.message)
    }
}

let srtbtn = document.querySelector('[data-sortBtnAdmin]')
srtbtn.addEventListener('click', toggleSort)

showItem()

// Update U in Crud
// Constructor function for items
// Update U in Crud
function UpdateItems(itemId) {
    try {
        let itemToEdit = listItems.find(item => item.id == itemId)
        document.querySelector('#name-edit').value = itemToEdit.name
        document.querySelector('#category-edit').value = itemToEdit.category
        document.querySelector('#colour-edit').value = itemToEdit.colour
        document.querySelector('#price-edit').value = itemToEdit.price
        document.querySelector('#designer-edit').value = itemToEdit.designer
        document.querySelector('#imgLink-edit').value = itemToEdit.imgLink

        let editItemModal = new bootstrap.Modal(document.getElementById('editItemModal'))
        editItemModal.show();
    } catch (e) {
        console.error('Error on edit function', e.message);
    }
}

// Attached the UpdateItems function to edit buttons
let editButons = document.querySelectorAll('[data-edit-Item]')
editButons.forEach(button => {
    button.addEventListener('click', function () {
        let itemId = button.dataset.itemId
        UpdateItems(itemId)
    })
})


let editButtons = document.querySelectorAll('[data-edit-Item]')
editButtons.forEach(button => {
    button.addEventListener('click', UpdateItems)
})

