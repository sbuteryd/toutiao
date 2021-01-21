export const setItem = (key, value) => {
  return window.localStorage.setItem(key, value)
}

export const getItem = (key) => {
  return window.localStorage.getItem(key)
}
