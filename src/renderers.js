import Mustache from 'mustache'

const templates = {
  label: `<label class='{{ klass }}-label' for='{{ key }}-field'> {{ title }}</label>`,
  input: `<input id='{{ key }}-field' type='{{ type }}' name='{{ key }}' class='{{ klass }}'/>`,
  submit: `<input type="submit" class='{{ klass }}' value='{{ value }}'/>`,
  checkbox: `<label class='{{ key }}-label' for='{{ key }}-field'>{{> input }} {{ title }}</label>`,
  generic: `{{> label }} {{> input }}`
}

function generic (props) {
  return Mustache.render(templates['generic'], props, {
    label: templates['label'],
    input: templates['input']
  })
}

function checkbox (props) {
  return Mustache.render(templates['checkbox'], props, {
    input: templates['input']
  })
}

function submit (props) {
  return Mustache.render(templates['submit'], props)
}

export default (type) => {
  switch (type) {
    case 'checkbox':
      return checkbox
    case 'submit':
      return submit
    default:
      return generic
  }
}
