export const convert_dates = (items: any[] | any, fields = ['created_at', 'updated_at']) => {
  if (!Array.isArray(items)) {
    fields.forEach(field => items[field] = new Date(items[field]))
    return items
  }
  return items.map(item => {
    fields.forEach(field => item[field] = new Date(item[field]))
    return {...item}
  })
}
