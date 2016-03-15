# Meteor Meta
Get and set meta tags and title for a web page

## Install
`meteor add lookback:meta`

## Methods
- `Meta.config(options)`: Configures the following settings:
  - `key`: `('property')` Custom name for the 'property' attribute in `<meta>` tags
  - `separator`: `('|')` Custom separator in page titles
  - `suffix` : `('')` Custom suffix in page titles
  - `title`: '' Default page title
- `Meta.defaults(properties, key=settings.key):`: Set the default properties for fallback in Meta.set if content doesn't exist. Also initializes these properties on the DOM.
- `Meta.get(property, key=settings.key)`: Gets the content of the first meta tag with key=property.
- `Meta.set(property, content, key=settings.key)`: Remove any existing meta tag with key=property and replace it with new content.
- `Meta.setMulti(properties, key=settings.key)`: Replaces multiple properties at the same time. properties: {propertyA: contentA, propertyB: contentB}.
- `Meta.unset(property, key=settings.key)`: Remove any meta tag with key=property
- `Meta.getTitle(withSuffix=false)`: Gets the page title (without the suffix by default).
- `Meta.setTitle(newTitle, suffix=settings.suffix)`: Set's the page title, as well as the OG and Twitter title meta tags.
- `Meta.setDescription(description)`: Convenience function for setting the various types of description meta tags.
- `Meta.setImage(imageUrl)`: Convenience function for setting images.
