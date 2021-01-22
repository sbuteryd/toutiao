export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value.data)
  }
  window.localStorage.setItem(key, value)
}

export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
