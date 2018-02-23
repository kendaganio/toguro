const htmlTags = [
  'input',
  'label',
  'div',
  'form',
  'fieldset'
]

const dom = (tag, attrs = {}, ...children) => {
  const el = document.createElement(tag)
  Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]))

  const fragment = document.createDocumentFragment()
  children.forEach(child => {
    if (typeof child === 'string') {
      child = document.createTextNode(child)
    }
    fragment.appendChild(child)
  })

  el.appendChild(fragment)
  return el
}

const tagFactory = (tag, attrs, ...children) => {
  return (attrs, ...children) => dom(tag, attrs, ...children)
}

const functions = {}
htmlTags.forEach(tag => { functions[tag] = tagFactory(tag) })

module.exports = functions
