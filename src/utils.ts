export function generateCode(number: number): string {
  let letter = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]
  let code = ''
  let num = number
  code += letter[num % 26]
  num = Math.floor(num / 26)
  while (num > 0) {
    code += letter[num % 26 - 1]
    num = Math.floor(num / 26)
  }
  return code.split('').reverse().join('')
}
