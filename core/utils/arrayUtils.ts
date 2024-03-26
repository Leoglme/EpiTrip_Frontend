import { isNumeric } from '~/core/utils/typeCheckerUtils'

/* Function to loop through the field object and retrieve a value with path */
export function getValueWithPath<T>(item: T, path: string) {
  let value: any = item
  const keys = path.split('.')
  for (const key of keys) {
    if (!value) {
      value = {}
    }
    value = value[key]
  }
  return value?.toString()
}

/* Function for sort array with number or string object key */
export function sortArray<T>(arr: Array<T>, orderBy: string, orderAsc: boolean): Array<T> {
  // Sort the array based on the orderBy property
  return arr.sort((a: T, b: T) => {
    // Get the values for the orderBy property for each object
    const valueA = getValueWithPath(a, orderBy)?.trim()
    const valueB = getValueWithPath(b, orderBy)?.trim()

    /* If valueA or ValueB does not exist put it at the end of the array */
    if (!valueA && !valueB) {
      return 0
    } else if (!valueA) {
      return 1
    } else if (!valueB) {
      return -1
    }

    // Check the type of the values
    if (isNumeric(valueA) && isNumeric(valueB)) {
      // Compare the values as numbers if they are both numbers
      return orderAsc ? parseInt(valueA) - parseInt(valueB) : parseInt(valueB) - parseInt(valueA)
    } else {
      // Compare the values as strings if they are not both numbers
      const compareResult = valueA.toString().localeCompare(valueB.toString())
      return orderAsc ? compareResult : compareResult * -1
    }
  })
}
