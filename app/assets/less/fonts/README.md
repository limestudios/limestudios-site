# src/less/fonts

Put your font files here. This folder will be copied to the production folder.

### CSS font properties

When in CSS, use different weights like so:

```
html {
  font-family: "Roboto", sans-serif;
}


/* Roboto Bold */
.foo {
  font-weight: 600;
  /* font-style: bold; would also work */
}

/* Roboto (Normal) */
.bar {
  /* No change needed */
}

/* Roboto Italic */
.baz {
  font-style: italic;
}
```

The incorrect way to do this would be:

```
.shit-css {
  font-family: "Roboto Bold";
}
```

Also remember that one can use shorthand CSS, e.g., the `font` property:

```
.awesome-css {
  font: normal 12px "Roboto", sans-serif;
}
```

Although shorthand is not always needed. Generally the only time one would use `font` is when they need 
to change the font-family as well as several other `font-*` properties. For example, if I am changing from 1rem Roboto to 2rem Helvetica Bold, I might use `font` because I can condense that one change into one property.

