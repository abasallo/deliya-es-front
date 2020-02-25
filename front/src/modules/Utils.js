export const cloneAndDeleteFromAt = (todoList, index) => {
  const clonedArray = [...todoList]
  clonedArray.splice(index, 1)
  return clonedArray
}
