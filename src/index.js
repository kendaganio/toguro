import Mustache from 'mustache'

const whatInputType = {
// 'json-schema': 'input[type=]'
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number',
}

const templates = {
  label: `<label class='{{ key }}-label' for='{{ key }}-field'> {{ title }}</label>`,
  input: `<input id='{{ key }}-field' type='{{ type }}' name='{{ key }}' class='{{ klass }}'/>`,
  submit: `<input type="submit" class='{{ klass }}' value='{{ value }}'/>`,
  checkbox: `<label class='{{ key }}-label' for='{{ key }}-field'>{{> input }} {{ title }}</label>`
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
      })

      return textToElement(rendered)
    },

    text (key, value) {
      const rendered = Mustache.render(templates['input'], {
        key,
        type: whatInputType[value.type],
      })

      return textToElement(rendered)
    },

    checkbox (key, value) {
      const rendered = Mustache.render(templates['checkbox'], {
        ...value,
        key,
        type: whatInputType[value.type],
      }, {
        input: templates['input']
      })

      return textToElement(rendered)
    },

    number (key, value) {
      const rendered = Mustache.render(templates['input'], {
        key,
        type: whatInputType[value.type],
      })

      return textToElement(rendered)
    }
  }

  return renderers[type]
}

const createFormElement = (key, value) => {
  const div = document.createElement('div')
  div.className = 'form-group'
  div.appendChild(getRenderer('label')(key, value))
  div.appendChild(getRenderer(whatInputType[value.type])(key, value))

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
