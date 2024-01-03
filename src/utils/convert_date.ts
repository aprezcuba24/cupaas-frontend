export const convert_dates = (items: any[], fields = ['created_at', 'updated_at']) => {
  return items.map(item => {
    fields.forEach(field => item[field] = new Date(item[field]))
    return {...item}
  })
}
