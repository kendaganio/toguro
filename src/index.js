const whatInputType = {
// 'json-schema': 'input[type=]'
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number'
}

const createFormElement = (key, value) => {
  const label = document.createElement('label')
  label.innerText = key
  label.setAttribute('for', `${key}-field`)

  const input = document.createElement('input')
  input.setAttribute('type', whatInputType[value.type])
  input.setAttribute('id', `${key}-field`)

  const div = document.createElement('div')
  div.appendChild(label)
  div.appendChild(input)

  return div
}

export const render = (el, { schema: { properties }, submitHandler}) => {

  // init validations
  if (!(el instanceof Element)) {
    throw new Error('el should be a valid HTML Element')
  }


  const form = document.createElement('form')

  // createElements
  Object.keys(properties).forEach(key => {
    console.log(key, properties[key])
    const inputEl = createFormElement(key, properties[key])
    form.insertAdjacentElement('beforeend', inputEl)
  })

  // add submit button
  const submitButton = document.createElement('input')
  submitButton.setAttribute('type', 'submit')
  submitButton.value = 'submit'

  form.insertAdjacentElement('beforeend', submitButton)
  //
  el.insertAdjacentElement('beforeend', form)


  // createEventHandlers
  form.onsubmit = (event) => {
    event.preventDefault()
    console.log('hijacked');
    submitHandler('walang data');
  }
}
