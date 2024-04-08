type ErrorResponse = {
  errors?: {
    message: string
    rule: string
    field: string
  }[]
}

export { ErrorResponse }
