import renderers from './renderers'
import dom from './dom'

const whatInputType = props => {
  if (props.type === 'string' && props.enum) {
    return 'select'
  } else {
    const lel = {
      'string': 'text',
      'boolean': 'checkbox',
      'integer': 'number'
    }
    return lel[props.type]
  }
}

const createFormGroup = (key, value) => {
  const type = whatInputType(value)
  const props = {
    ...value,
    type,
    key
  }
  const renderer = renderers(type)
  return dom.div({class: 'form-group'}, renderer(props))
}

export class Toguro {
  constructor (options) {
    this.schema = options.schema
    this.submit = options.submit
  }

  setSchema (schema) {
    this.schema = schema
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
    el.innerHTML = ''
    el.appendChild(this.render())
  }
}
