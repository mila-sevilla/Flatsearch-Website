## Installation

To install the project, run the following command in the terminal.

```
npm install
```
To start the development server:
```
gulp
```

Gulp command will copy the files from the src folder to the docs folder. It will start a development server on the following url
```
localhost:3000
```
The process will continue running in the background until you shut it down by pressing **ctrl+C**.

When running, it watches for changes on css and html files. If you change any of those files, it will do the processing (for example prefixing css) and output the file to the docs folder. Changes on the files also trigger auto reload of the browser.

If you have added assets like images or scripts, which you then want to reference in your css or html, be sure to restart the gulp task, as those need to be also copied to docs folder (which happens on the start of the task).

## Referencing images and scripts in Html

If you need to reference a file from your html, fo example and image or a script, use the path relative to the domain root folder instead of the path relative to the html file from which you are trying to reference the file.

For example, say you have a component named Header component in the following location:
```
components/Header/Header.html
```
Let's say you have an image named logo.jpg in the same folder as Header.html. You want to add an image tag with the logo inside Header.html. Then, instead of writing:
```html
<img src="./logo.jpg" alt="logo">
```
use
```html
<img src="/components/header/logo.jpg" alt="logo">
```

## Nunjucks templating cheatsheet

to insert html snippets (including svg) inside another html, use
```
{% include "./relative/path/to/a/file" %}
```
to set variables (which are global, meaning they are shared across includes and templates), use
```
{% set variableName = 'variable value' %}
```
you can then print the variable into html by using double curly braces.
So for example
```html
<div>

    {% set userName = 'Mila' %}

    <p>Hello {{userName}}</p>

</div>

compiles to:

<div>
    <p>Hello Mila</p>
</div>
```
you can add logic by using if else statements
```html
<div>
    {% if user == true %}
        <p>Hello user</p>
    {% else %}
        <p>Please log in</p>
    {% endif %}
</div>
```
Then, provided you have set the user to true, it would compile to:
```html
{% set user = true %}

<div>
    <p>Hello user</div>
</div>
```
Or alternatively:
```html
{% set user = false %}

<div>
    <p>Please log in</p>
</div>
```

## SASS cheatsheet

At any point, you can simply change the extension of your css file from .css to .scss and starting using scss (aka sass) features. Regular css works the same inside sass files, so it's opt-in (you can use, but don't have to).

Sass needs compiling! browser doesn't recognize it, so you need to be running the gulp task when working with .scss files. On the other hand, if you have a syntax error (missing semicolon for example), gulp will throw an error.

Some sass feature include:
### Nesting:
```scss
.navigation {
    display: flex;

    div {
        height: 20px;
    }
}
```
will compile to:
```css
.navigation {
    display: flex;
}
.navigation div {
    height: 20px;
}
```
### Nesting and extending (using the & symbol):
```scss
.navigation {
    display: flex;

    &--signedin {
        height: 20px;
    }
}
```
will compile to:
```css
.navigation {
    display: flex;
}
.navigation--signedin {
    height: 20px;
}
```
### Variables:
```scss
$navHeight: 20px;

.navigation {
    height: $navHeight;

    > button {
        margin: $navHeight - 10;
    }
}
```
will compile to:
```css
.navigation {
    display: 20px;
}
.navigation > button {
    margin: 10px;
}
```