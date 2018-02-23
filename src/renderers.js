import dom from './dom'

function labelProps (props) {
  return {
    id: `${props.key}-label`,
    name: `${props.key}-label`,
    for: `${props.key}-field`
  }
}

function inputProps (props) {
  return {
    id: `${props.key}-field`,
    name: `${props.key}-field`
  }
}

function generic (props) {
  const fragment = document.createDocumentFragment()

  fragment.appendChild(dom.label({
    ...props, ...labelProps(props)
  }, props.title))

  fragment.appendChild(dom.input({
    ...props, ...inputProps(props)
  }))

  return fragment
}

function checkbox (props) {
  const fragment = document.createDocumentFragment()

  const checkbox = dom.input({
    ...props, ...labelProps(props)
  })

  fragment.appendChild(dom.label({
    ...props, ...inputProps(props)
  }, checkbox, props.title))

  return fragment
}

export default (type) => {
  switch (type) {
    case 'checkbox':
      return checkbox
    default:
      return generic
  }
}
