export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'id', title: 'ID', type: 'number' },
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'imageSrc', title: 'Image Source', type: 'image' },
    { name: 'imageAlt', title: 'Image Alt', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'vendu', title: 'Vendu', type: 'boolean'}
    ],
}
