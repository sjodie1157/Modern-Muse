let localPurchased = JSON.parse(localStorage.getItem('purchased')) || []
let purchased = localPurchased || []
let purchasedItem = document.querySelector('[data-rowTable]')

function purchasedItems() {
    try {
        let uniqueItemIds = new Set()
        let html = ''

        purchased.forEach((item, index) => {
            if (!uniqueItemIds.has(item.id)) {
                uniqueItemIds.add(item.id)
                html += `
                    <tr>
                        <td><img src="${item.imgLink}" alt="check-Item"></td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td><button type="button" class="removeBtn" data-index="${index}">Remove</button></td>
                    </tr>`
            }
        })

        purchasedItem.innerHTML = html
 // Add event listeners to all remove buttons
        let removeBtns = document.querySelectorAll('.removeBtn')
        removeBtns.forEach(btn => {
            btn.addEventListener('click', removeItem)
        })

    } catch (e) {
        console.error('error adding items and removing duplicates', e.message)
    }
}

purchasedItems()

let purchasedBtn = document.querySelector('[data-purchase]')
purchasedBtn.addEventListener('click', function () {
    try {
        if (purchased.length === 0) {
            alert('No Items Added')
        } else {
            localStorage.clear('purchased')
            alert('Thanks For Your Purchase')
            location.reload()
        }
    } catch (e) {
        console.error('error clearing local storage or displaying alert', e.message)
    }
})

function totalPrice() {
    try {
        let total = document.querySelector('[data-total]')
        let totalPrice = 0

        purchased.forEach(item => {
            totalPrice += item.price * item.quantity
        })

        total.innerHTML = `Total Price: R ${(totalPrice / 100).toFixed(2)}`
    } catch (e) {
        console.error('Error on total price calculation', e.message)
    }
}

totalPrice()

function removeItem(event) {
    try {
        let index = event.target.getAttribute('data-index')
        let itemToRemove = purchased[index]

        if (itemToRemove.quantity > 1) {
            itemToRemove.quantity -= 1
            location.reload()
        } else {
            purchased.splice(index, 1)
            location.reload()
        }

        localStorage.setItem('purchased', JSON.stringify(purchased))
        purchasedItems()
    } catch (e) {
        console.error('error removing item', e.message)
    }
}
