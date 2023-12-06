let localItems = JSON.parse(localStorage.getItem('items')) || []
let listItems = localItems || []

function addItem() {
    try {
        let name = document.getElementById('name').value
        let category = document.getElementById('category').value
        let colour = document.getElementById('colour').value
        let price = +document.getElementById('price').value
        let designer = document.getElementById('designer').value
        let imgLink = document.getElementById('imgLink').value
        // used reduce method to increment the value of the last id 
        let oldItems = JSON.parse(localStorage.getItem('items')) || []
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


        // Add the new item to the existing items
        let updatedItems = [...oldItems, newItem]

        localStorage.setItem('items', JSON.stringify(updatedItems))
        location.reload()
    } catch (e) {
        console.error('error on trying to create new items', e.message);
    }
}
let addItemButton = document.querySelector('[data-add-Item]')
addItemButton.addEventListener('click', addItem)

let addItemDisplayOnAdmin = document.querySelector('[data-rowTable]')
function addItemDisplay() {
    try {
        let uniqueItemIds = new Set()


        listItems.forEach((item, index) => {
            if (!uniqueItemIds.has(item.id)) {
                uniqueItemIds.add(item.id)
                addItemDisplayOnAdmin.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.colour}</td>
                    <td>R ${item.price}</td>
                    <td>${item.designer}</td>
                    <td><img src="${item.imgLink}" alt="check-Item"></td>
                    <td>
                        <div class="col d-flex justify-content-center">
                            <button type="button">Edit Itm</button>
                            </div>
                            <div class="col d-flex justify-content-center">
                                <button type="button">Remove</button>
                            </div>
                        </td>
                    </tr>`
            }
        })
        // Added event listeners to all remove buttons
        let removeBtns = document.querySelectorAll('.removeBtn')
        removeBtns.forEach(btn => {
            btn.addEventListener('click', removeItem)
        })

    } catch (e) {
        console.error('error adding items and removing duplicates', e.message);
    }
}
addItemDisplay()