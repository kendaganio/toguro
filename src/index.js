import Mustache from 'mustache'

const whatInputType = {
// 'json-schema': 'input[type=]'
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number'
}

const templates = {
  label: `<label class='{{ klass }}-label' for='{{ for }}'> {{ title }} </label>`,
  input: `<input id='{{ id }}' type='{{ type }}' name='{{ key }}' class='{{ klass }}'/>`,
  submit: `<input type="submit" class='{{ klass }}' value='{{ value }}'/>`
}

function textToElement (text) {
  return document.createRange().createContextualFragment(text)
}

function getRenderer (type) {
  const renderers = {
    label (key, value) {
      const rendered = Mustache.render(templates['label'], {
        ...value,
        key,
        klass: key,
        for: `${key}-field`
      })

      return textToElement(rendered)
    },

    text (key, value) {
      const rendered = Mustache.render(templates['input'], {
        key,
        type: whatInputType[value.type],
        id: `${key}-field`
      })

      return textToElement(rendered)
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
  const submitButton = textToElement(Mustache.render(templates['submit'], { klass: 'button -primary', value: 'Submit!' }))

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
