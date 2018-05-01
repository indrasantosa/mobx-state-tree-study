import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree'
import { WishListItem, WishList } from './WishList'
import { reaction } from 'mobx';

it ('can create an instance of a model', () => {
  const item = WishListItem.create({
    'name': 'Mainan Garurumon',
    'price': 45.44,
    'image': ''
  })

  expect(item.price).toBe(45.44)
  expect(item.image).toBe('')

  item.changeName('Narnia')
  expect(item.name).toBe('Narnia')

})

it('can create wishlist', () => {
  const list = WishList.create({
    items: [
      {
        name: 'Indra',
        price: 28.49
      }
    ]
  })

  expect(list.items.length).toBe(1)
  expect(list.items[0].price).toBe(28.49)
})

it('can add new items', () => {
  const list = WishList.create()
  const states = []

  onSnapshot(list, snapshot => {
    states.push(snapshot)
  })

  list.add(
    WishListItem.create({
      name: 'Chesterton',
      price: 10
    })
  )

  expect(list.items.length).toBe(1)
  expect(list.items[0].name).toBe('Chesterton')

  expect(getSnapshot(list)).toMatchSnapshot()

  expect(states).toMatchSnapshot()
})

it('can add new items - 2', () => {
  const list = WishList.create()
  const patches = []

  onPatch(list, patch => {
    patches.push(patch)
  })

  list.add(
    WishListItem.create({
      name: 'Chesterton',
      price: 10
    })
  )

  expect(list.items.length).toBe(1)
  expect(list.items[0].name).toBe('Chesterton')

  expect(getSnapshot(list)).toMatchSnapshot()

  expect(patches).toMatchSnapshot()
})

it ('can calculate the total price of a wishlist', () => {
  const list = WishList.create({
    items: [
      {
        name: 'Preacher Machine Gun',
        price: 7.35,
        image: ''
      },
      {
        name: 'Lego Mainstream',
        price: 500,
        image: ''
      }
    ]
  })

  expect(list.totalPrice).toBe(507.35)

  let changed = 0
  reaction(() => list.totalPrice, () => changed++)

  expect(changed).toBe(0)
  console.log(list.totalPrice)
  list.items[0].changeName('Test')
  expect(changed).toBe(0)

  list.items[0].changePrice(200)
  expect(changed).toBe(1)
})