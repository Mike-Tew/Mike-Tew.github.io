export default class Card {
  constructor(digit1, digit2, operation) {
    this.digit1 = digit1
    this.digit2 = digit2
    this.operation = operation
    this.solution = digit1 + digit2
    this.isActive = false
  }

  getProblem = () => {
    switch (this.operation) {
      case 'addition':
        return `${this.digit1} + ${this.digit2}`
      case 'subtraction':
        return `${this.digit1} - ${this.digit2}`
      case 'multiplication':
        return `${this.digit1} x ${this.digit2}`
      case 'division':
        return `${this.digit1} / ${this.digit2}`
      default:
        return 'Error'
    }
  }

  getSolution = () => {
    switch (this.operation) {
      case 'addition':
        return this.digit1 + this.digit2
      case 'subtraction':
        return this.digit1 - this.digit2
      case 'multiplication':
        return this.digit1 * this.digit2
      case 'division':
        return this.digit1 / this.digit2
      default:
        return 'Error'
    }
  }
}
