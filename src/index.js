import Mustache from 'mustache'

const whatInputType = {
// 'json-schema': 'input[type=]'
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number'
}

function getRenderer (type) {
  const renderers = {
    label (key, value) {
      const template = `<label class='{{key}}-label' for='{{ for }}'> {{ title }} </label>`

      const div = document.createElement('div')
      const rendered = Mustache.render(template, {
        ...value,
        key,
        for: `${key}-field`
      })

      div.innerHTML = rendered
      return div.firstElementChild
    },

    text (key, value) {
      const input = document.createElement('input')
      input.setAttribute('type', whatInputType[value.type])
      input.setAttribute('id', `${key}-field`)
      return input
    },

    checkbox (key, value) {
      this['text'](key, value)
    },

    number (key, value) {
      this['text'](key, value)
    }
  }

  return renderers[type]
}

const createFormElement = (key, value) => {
  const div = document.createElement('div')
  div.className = 'form-group'
  div.appendChild(getRenderer('label')(key, value))
  div.appendChild(getRenderer('text')(key, value))

  return div
}

export const render = (el, { schema: { properties }, submitHandler }) => {
  // init validations
  if (!(el instanceof Element)) {
    throw new Error('el should be a valid HTML Element')
  }

  const form = document.createElement('form')
  form.setAttribute('class', 'form')

  const fieldSet = document.createElement('fieldset')

  // createElements
  Object.keys(properties).forEach(key => {
    console.log(key, properties[key])
    const inputEl = createFormElement(key, properties[key])
    fieldSet.insertAdjacentElement('beforeend', inputEl)
  })

  // add submit button
  const submitButton = document.createElement('input')
  submitButton.setAttribute('type', 'submit')
  submitButton.className = 'button -primary'
  submitButton.value = 'Submit!'

  fieldSet.insertAdjacentElement('beforeend', submitButton)
  form.insertAdjacentElement('beforeend', fieldSet)
  //
  el.insertAdjacentElement('beforeend', form)

  // createEventHandlers
  form.onsubmit = (event) => {
    event.preventDefault()
    submitHandler('walang data')
  }
}
