import renderers from './renderers'
import dom from './dom'

const whatInputType = {
// 'json-schema': 'input[type=]'
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number'
}

const createFormElement = (key, value) => {
  const type = whatInputType[value.type]
  const rendered = renderers(type)({...value, key, type})

  return dom.div({class: 'form-group'}, rendered)
}

export const render = (el, { schema: { properties }, submitHandler }) => {
  // init validations
  // eslint-disable-next-line
  if (!(el instanceof Element)) {
    throw new Error('el should be a valid HTML Element')
  }
  const fieldSet = dom.fieldset()
  // createElements
  Object.keys(properties).forEach(key => {
    const inputEl = createFormElement(key, properties[key])
    fieldSet.insertAdjacentElement('beforeend', inputEl)
  })

  const submitButton = dom.input({type: 'submit', class: 'button -primary'})
  fieldSet.appendChild(submitButton)

  const form = dom.form({class: 'form'}, fieldSet)

  el.appendChild(form)

  // createEventHandlers
  form.onsubmit = (event) => {
    event.preventDefault()
    submitHandler('gago')
  }
}
