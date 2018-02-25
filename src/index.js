import renderers from './renderers'
import dom from './dom'

const whatInputType = {
  'string': 'text',
  'boolean': 'checkbox',
  'integer': 'number'
}

const createFormGroup = (key, value) => {
  const type = whatInputType[value.type]
  const rendered = renderers(type)({...value, key, type})

  return dom.div({class: 'form-group'}, rendered)
}

export const render = (el, { schema: { properties }, submitHandler }) => {
  // eslint-disable-next-line
  if (!(el instanceof Element)) {
    throw new Error('el should be a valid HTML Element')
  }

  const elements = Object.keys(properties).map(key => createFormGroup(key, properties[key]))
  const form = dom.form({class: 'form'},
    dom.fieldset({},
      ...elements,
      dom.input({type: 'submit', class: 'button -primary'})
    )
  )

  form.onsubmit = (event) => {
    event.preventDefault()
    submitHandler('gago')
  }

  el.appendChild(form)
}
