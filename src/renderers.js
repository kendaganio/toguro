import dom from './dom'

function labelProps (props) {
  return {
    ...props,
    id: `${props.key}-label`,
    name: `${props.key}-label`,
    for: `${props.key}-field`
  }
}

function inputProps (props) {
  return {
    ...props,
    id: `${props.key}-field`,
    name: `${props.key}-field`
  }
}

function generic (props) {
  return dom.fragment([
    dom.label(labelProps(props), props.title),
    dom.input(inputProps(props))
  ])
}

function checkbox (props) {
  return dom.label(inputProps(props),
    dom.input(labelProps(props)),
    props.title
  )
}

export default (type) => {
  switch (type) {
    case 'checkbox':
      return checkbox
    default:
      return generic
  }
}
