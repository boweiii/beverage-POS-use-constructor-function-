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

let blackTea = new Drink('Black Tea', 'Half Sugar', 'No Ice')
console.log(blackTea)
console.log(blackTea.price())

let lemonGreenTea = new Drink('Lemon Green Tea', 'No Sugar', 'Less Ice')
console.log(lemonGreenTea)
console.log(lemonGreenTea.price())

let matchaLatte = new Drink('Matcha Latte', 'Less Sugar', 'Regular Ice')
console.log(matchaLatte)
console.log(matchaLatte.price())
// 使用constructor function產生飲料物件 ↑↑↑