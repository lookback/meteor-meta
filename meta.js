Meta = setupMeta();

// Generator function (because 'this' makes baby Jesus cry)
function setupMeta() {

  // General settings
  let settings = {
    key: 'property',
    separator: '|',
    suffix : '',
    title: ''
  };

  // Default meta tags for initial values and fallback
  let defaults = {};
  let currentTitle = '';

  // Set any custom settings
  function config(options) {
    _.extend(settings, options);
  }

  // Set the default properties for fallback in Meta.set if content doesn't exist
  // Also initializes these properties on the DOM
  function setDefaults(properties, key=settings.key) {
    _.extend(defaults, properties);

    // Initialize the default properties in the DOM
    setMulti(properties, key);
  }

  // Gets the content of the first meta tag with key=property
  function get(property, key=settings.key) {
    return $(selector(key, property)).attr('content');
  }

  // Remove any existing meta tag with key=property and replace it with new content
  function set(property, content, key=settings.key) {
    if (_.isUndefined(content)) {
      content = defaults[property];
      if (!content)
        return;
    }

    unset(property, key);
    $('head').append(toMetaTag(key, property, content));
  }

  // Replaces multiple properties at the same time
  // properties: {propertyA: contentA, propertyB: contentB}
  function setMulti(properties, key=settings.key) {
    let tags = '';
    let removalSelector = '';

    _.each(properties, function(content, property) {
      let metaTag = toMetaTag(key, property, content);
      tags = tags + `${metaTag}\n`;
      let sel = selector(key, property);
      removalSelector = removalSelector + `${sel}, `;
    });

    // Remove last ', ' from selector string
    removalSelector = removalSelector.slice(0, -2);
    $(removalSelector).remove();
    $('head').append(tags);
  }

  // Remove any meta tag with key=property
  function unset(property, key=settings.key) {
    $(selector(key, property)).remove();
  }

  // Gets the page title (without the suffix by default)
  function getTitle(withSuffix=false) {
    currentTitle = currentTitle || settings.title;
    return withSuffix && currentTitle + separate(settings.suffix) || currentTitle;
  }

  // Set's the page title, as well as the OG and Twitter title meta tags
  function setTitle(newTitle, suffix=settings.suffix) {
    currentTitle = newTitle || settings.title;
    let fullTitle = currentTitle + separate(suffix);
    document.title = fullTitle;

    // Set title meta tags
    set('og:title', fullTitle);
    set('twitter:title', fullTitle);
  }

  // Convenience function for setting the various types of description meta tags
  function setDescription(description) {
    set('description', description, 'name');
    set('og:description', description);
    set('twitter:description', description);
  }

  // Convenience function for setting images.
  function setImage(imageUrl) {
    set('twitter:image', imageUrl);
    set('og:image', imageUrl);
  }


  /********* Helper functions *********/

  // Return separator, surrounded by spaces, followed by suffix (if passed)
  // If no suffix is passed, return ''
  function separate(suffix) {
    return suffix && ` ${settings.separator} ${suffix}` || '';
  }

  // Return a jQuery selector for meta tags
  function selector(key, property) {
    return `meta[${key}="${property}"]`;
  }

  // Return a html <meta> tag
  function toMetaTag(key, property, content) {
    return `<meta ${key}="${property}" content="${content}">`;
  }

  return {
    config,
    defaults: setDefaults,
    get,
    set,
    setMulti,
    unset,
    getTitle,
    setTitle,
    setDescription,
    setImage
  };
}
