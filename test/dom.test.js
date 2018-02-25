let dom = require('../src/dom.js')

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const generateElementArray = (count, elements = []) => {
  for (let i = 0; i < count; i ++) {
    elements.push(dom.div({}, 'lel'))
  }
  return elements
}

describe('.fragment', () => {
  it('is instance of DocumentFragment', () => {
    const f = dom.fragment([])
    expect(f instanceof DocumentFragment).toBeTruthy()
  })

  it('returns correct number of children', () => {
    const count = getRandomInt(10)
    const f = dom.fragment(generateElementArray(count))

    expect(f.children.length).toBe(count)
  })
})
