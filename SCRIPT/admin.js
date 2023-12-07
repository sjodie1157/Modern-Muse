let listItems = JSON.parse(localStorage.getItem('items')) || []
let ascendingOrder = true

let edtModel = document.querySelector('#editModal')
edtModel.innerHTML = `
<div class="modal fade" id="editItemModal" tabindex="-1" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-title fs-5" id="exampleModalLabel">Edit Item</h2>
        </div>
        <div class="modal-body">
            <form>
                <div class="mb-3">
                    <label for="name" class="col-form-label">Product Name:</label>
                    <input type="text" class="form-control" id="name-edit">
                </div>
                <div class="mb-3">
                    <label for="category" class="col-form-label">Category:</label>
                    <input type="text" class="form-control" id="category-edit">
                </div>
                <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Colour</label>
                    <input type="text" class="form-control" id="colour-edit">
                </div>
                <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Price</label>
                    <input type="text" class="form-control" id="price-edit">
                </div>
                <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Designer</label>
                    <input type="text" class="form-control" id="designer-edit">
                </div>
                <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Image Link</label>
                    <input type="text" class="form-control" id="imgLink-edit">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary m-1" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"  data-edit-Item >Edit Item</button>
        </div>
    </div>
</div>
</div>
`
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
                                data-bs-whatever="@mdo" onclick='new EditItems(${JSON.stringify(item)})' >Edit Itm</button>
                            
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

function Item(id, name, category, colour, price, designer, imgLink) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.colour = colour;
    this.price = price;
    this.designer = designer;
    this.imgLink = imgLink;
}

function EditItems(item) {
    this.id = item.id;
    this.name = document.querySelector(`#name-edit${item.id}`).value;
    this.category = document.querySelector(`#admin-spec${item.id}`).value;
    this.colour = document.querySelector(`#admin-amount${item.id}`).value;
    this.price = document.querySelector(`#admin-amount${item.id}`).value;
    this.designer = document.querySelector(`#admin-image${item.id}`).value;
    this.imgLink = document.querySelector(`#admin-image${item.id}`).value;
            
    let itemIndex = listItems.findIndex((data)=>{
    return data.id === item.id;
    })
            
    listItems[itemIndex] = Object.assign({}, this)
    localStorage.setItem('items', JSON.stringify(listItems))
    display();
    location.reload();
}

// Add an event listener to each "Edit Item" button to trigger the updateItem function
function editItems() {
    updateItem(this);
}


// Attached the UpdateItems function to edit buttons


