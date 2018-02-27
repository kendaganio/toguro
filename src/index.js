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

export class Toguro {
  constructor (options) {
    this.schema = options.schema
    this.submit = options.submit
  }

  render () {
    let { properties } = this.schema
    const elements = Object.keys(properties).map(key => createFormGroup(key, properties[key]))
    const form = dom.form({class: 'form'},
      dom.fieldset({},
        ...elements,
        dom.input({type: 'submit', class: 'button -primary'})
      )
    )

    form.onsubmit = (event) => {
      event.preventDefault()
      this.submit('gago')
    }

    return form
  }

  renderTo (el) {
    // eslint-disable-next-line
    if (!(el instanceof Element)) { throw new Error('el should be a valid HTML Element') }
    el.appendChild(this.render())
  }
}
