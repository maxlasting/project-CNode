export default (date) => {
  return date.split('T').join(' ').split('.')[0]
}