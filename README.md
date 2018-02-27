# Toguro &middot; [![Build Status](https://travis-ci.org/kendaganio/toguro.svg?branch=master)](https://travis-ci.org/kendaganio/toguro)
> Turn your JSON to 100% working forms.

<p align='center'>
  <a href='https://github.com/kendaganio/toguro'><img style="width: 250px" src='misc/toguro.png'></a>
  <br/>
  <em>Toguro in his 100% form.</em>
</p>

## Install
via package managers
```
yarn add toguro
npm i toguro
```

via a CDN
```html
<link rel="stylesheet" href="https://unpkg.com/toguro/dist/toguro.js"/>
```

## Usage

You need to provide a [JSON Schema](http://json-schema.org/)
```javascript
var schema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "Name",
    },
    "age": {
      "type": "integer",
      "title": "Age",
    },
    "description": {
      "type": "string",
      "title": "Description",
    }
  },
  "required": [
    "name"
  ]
}
```

Instantiate and render

```javascript
var toguro = new Toguro({
  schema: schema,
  submit: (formData) => { console.log(formData) }
})

toguro.renderTo(document.getElementById("some-id"))
```

