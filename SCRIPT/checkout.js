let localPurchased = JSON.parse(localStorage.getItem('purchased')) || []
let purchased = localPurchased || []

let purchasedItem = document.querySelector('[data-rowTable]')

    if (localPurchased) {
    function purchasedItems(){
            purchased.map((item,index) => {
                purchasedItem.innerHTML += `
                <tr>
                    <td><img src="${item.imgLink}" alt="check-Item"></td>
                    <td>${item.name}</td>
                    <td>${(1*index)+1}</td>
                    <td>${item.price}</td>
                    <td><button type="button">Remove</button></td>
                </tr>
                `
            }).join('')
        }
    }
    
purchasedItems()
