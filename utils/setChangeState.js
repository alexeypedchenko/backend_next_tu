
const setInnerField = (state, arr, n, value) => {
  const prop = arr[arr.length - n]
  return n === 1 ?
    { ...state, [prop]: value } :
    { ...state, [prop]: setInnerField(state[prop], arr, n - 1, value) }
}

export const setChangeState = (event, state, setState) => {
  const name = event.target.name
  const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

  if (!name.includes('.')) {
    setState({ ...state, [name]: value })
    return
  }

  const arr = name.split('.')
  const obg = setInnerField(state, arr, arr.length, value)
  setState({ ...obg })
}
