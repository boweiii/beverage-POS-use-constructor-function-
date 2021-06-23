// 使用constructor function產生飲料物件 ↓↓↓
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}
// 將方法加入原型中 ↓↓↓
Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}
// 新增訂單 ↓↓↓
// 想要把 AlphaPos 點餐機的功能都放進 AlphaPos 建構式函式的原型，以方便管理。
// AlphaPos Constructor Function
function AlphaPos() {
  // 將取得所選取之品項之名稱/甜度/冰塊之方法寫入原型
  AlphaPos.prototype.getCheckedValue = function (inputName) {
    let selectedOption = ''
    document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
      if (item.checked) {
        selectedOption = item.value
      }
    })
    return selectedOption
  }
  // 將新增飲料卡片至左側清單區之方法寫進原型
  AlphaPos.prototype.addDrink = function (drink) {
    let orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <!-- delete drink icon -->
      <div class="text-right">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <!-- /delete drink icon -->
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
    </div>
  </div>
  `

    orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
  }

}

const alphaPos = new AlphaPos()
console.log(alphaPos)
// 選取addButton
const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
// 選取左側的訂單區
const orderLists = document.querySelector('[data-order-lists]')
//監聽add button
addDrinkButton.addEventListener('click', function () {
  // 1. 取得店員選擇的飲料品項、甜度和冰塊
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  console.log(`${drinkName}, ${ice}, ${sugar}`)

  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }
  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice)
  console.log(drink)
  console.log(drink.price())
  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink)
})

// 刪除訂單 ↓↓↓
orderLists.addEventListener('click', event => {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})
// 添加一個 deleteDrink 方法
AlphaPos.prototype.deleteDrink = target => { target.remove() }