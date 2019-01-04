# jb-slider

[Installation](#installation) | [Usage](#usage) | [Options](#options) | [Methods](#public-methods)

A lightweight (2KB minified), vanilla javascript modal/popup plugin. This simply adds/removes element classes as needed, letting you specify the design, animation, etc of the modal as desired with CSS.

## Installation

With NPM:

```Shell

npm i @jeffbarrera/jbmodal

```

Or download manually and include jbModal.min.js in your HTML file.

### Dependencies

JBSlider has no dependencies, unless you need to support older browsers that don't natively implement [classList](https://caniuse.com/#feat=classlist). If you do, install the [classList.js](https://github.com/eligrey/classList.js/) polyfill that extends support back to IE 7.

## Usage

### Initialize a new modal

```javascript

modal = new JBModal({
	modalSelector: '.modal',
	openButtonSelector: '.modal--open',
	closeButtonSelector: '.modal__close-btn',
	hidingClass: 'modal--hiding',
	hiddenClass: 'modal--hidden'
});

```

See below for the full list of options that can be passed in, and the defaults.

### Opening the modal

The modal will open when an element matching the `openButtonSelector` is clicked. If you want to open the modal programmatically:

```javascript

modal.open();

```

### Closing the modal

The modal will close when an element matching the `closeButtonSelector` is clicked. If `closeWithEsc` is set to `true`, the modal will also close when the `esc` key is pressed.

If you want to close the modal programmatically:

```javascript

modal.close();

```

## Options

These options can be passed into the `new JBSlider()` constructor:

```javascript

modal = new JBModal({
	modalSelector: '.modal',
	openButtonSelector: '.modal--open',
	closeButtonSelector: '.modal__close-btn',
	hidingClass: 'modal--hiding',
	hiddenClass: 'modal--hidden',
	openButtonOpenClass: null,
	closeWithEsc: true,
	transitionLength: 300
});

```

### modalSelector

Type: `String`

Default: `.modal`

A CSS selector for the modal's wrapper element. Must be a string that can be passed into `document.querySelector();`. This should be a unique selector, otherwise only the first matching element will be used. To create multiple modals on the same page, use two different selectors.

### openButtonSelector

Type: `String`

Default: `.modal--open`

A CSS selector for buttons/links that should open the modal when clicked. Must be a string that can be passed into `sliderWrapper.querySelectorAll(); `.

### closeButtonSelector

Type: `String`

Default: `.modal__close-btn`

A CSS selector for buttons/links that should close the modal when clicked. Must be a string that can be passed into `sliderWrapper.querySelectorAll(); `.

### hidingClass

Type: `String`

Default: `modal--hiding`

JBSlider assumes that by default, the modal is styled to be visible. The hidingClass is applied while the modal is closing, and should be styled to that CSS transitions smoothly animate from the open to closed state. If the modal should begin closed, add both the `hidingClass` and `hiddenClass` to your HTML element.

### hiddenClass

Type: `String`

Default: `modal--hidden`

The class that should be applied once the transition animation is completed. It is added after the `transitionLength` time has expired. Use this to prevent an invisible modal from overlapping other content, such as by setting:

```css

z-index: -1;
height: 0;
padding: 0;

```

### hidingClass

Type: `String`

Default: `modal--hiding`

JBSlider assumes that by default, the modal is styled to be visible. The hidingClass is applied while the modal is closing, and should be styled to that CSS transitions smoothly animate from the open to closed state. If the modal should begin closed, add both the `hidingClass` and `hiddenClass` to your HTML element.

### openButtonOpenClass

Type: `String`

Default: `null`

If set, this class will be added to the open button while the modal is open. Use if you want the open button to visually indicate that the modal is open in some way.

### closeWithEsc

Type: `Boolean`

Default: `true`

If set to true, the modal will close when the `esc` key is pressed.

### transitionLength

Type: `Integer`

Default: `300`

The delay before the `hiddenClass` is applied. This shuuld be at least as long as the CSS transition length, but not much longer.


### Element references

You can access slider elements as follows:

```javascript

modal.modal; // the modal element
modal.openButtons; // an array of open buttons
modal.closeButtons; // an array of close buttons
modal.isOpen; // boolean indicating if the modal is currently open

```