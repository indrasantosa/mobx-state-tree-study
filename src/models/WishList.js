import { types } from 'mobx-state-tree'

const data  = {
  'name': 'movie 1',
  'price': 23.24,
  'image': 'Someimages'
}

export const WishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: ''
  })
  .actions(self => ({
    changeName(newName) {
      self.name = newName
    },
    changePrice(newPrice) {
      self.price = newPrice
    },
    changeImage(newImage) {
      self.image = newImage
    }
  }))
  

export const WishList = types
  .model({
    items: types.optional(types.array(WishListItem), [])
  })
  .actions(self => ({
    add(item) {
      self.items.push(item)
    }
  }))
  .views(self => ({
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0)
    }
  }))