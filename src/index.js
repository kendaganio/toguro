import renderers from './renderers'

const whatInputType = {
// 'json-schema': 'input[type=]'
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number'
}

function textToElement (text) {
  return document.createRange().createContextualFragment(text)
}

const createFormElement = (key, value) => {
  const div = document.createElement('div')
  div.className = 'form-group'

  const type = whatInputType[value.type]
  const rendered = renderers(type)({...value, key, type})

  div.appendChild(textToElement(rendered))

  return div
}

export const render = (el, { schema: { properties }, submitHandler }) => {
  // init validations
  // eslint-disable-next-line
  if (!(el instanceof Element)) {
    throw new Error('el should be a valid HTML Element')
  }

  const form = document.createElement('form')
  form.setAttribute('class', 'form')

  const fieldSet = document.createElement('fieldset')

  // createElements
  Object.keys(properties).forEach(key => {
    const inputEl = createFormElement(key, properties[key])
    fieldSet.insertAdjacentElement('beforeend', inputEl)
  })

  // add submit button
  const submitButton = textToElement(renderers('submit')({
    klass: 'button -primary', value: 'Submit!'
  }))

  fieldSet.appendChild(submitButton)
  form.insertAdjacentElement('beforeend', fieldSet)
  //
  el.insertAdjacentElement('beforeend', form)

  // createEventHandlers
  form.onsubmit = (event) => {
    event.preventDefault()
    submitHandler('walang data')
  }
}
