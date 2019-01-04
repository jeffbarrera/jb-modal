/* JB Modal
===========
Lightweight, vanilla-JS plugin to handle modal interactions.
Showing/hiding the modal is done with CSS classes, which can 
be set via the options.
============
Author: Jeff Barrera, jeffbarrera.com
Inspired by https://scotch.io/tutorials/building-your-own-javascript-modal-plugin
*/

; // defensive programming

(function() {

	this.JBModal = function() {

		// Define option defaults
		this.options = {
			modalSelector: '.modal',
			openButtonSelector: '.modal--open',
			closeButtonSelector: '.modal__close-btn',
			hidingClass: 'modal--hiding',
			hiddenClass: 'modal--hidden',
			openButtonOpenClass: null,
			closeWithEsc: true,
			transitionLength: 300 // should be at least as long as the CSS transition
		}

		// Create options by extending defaults with the passed in arugments
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(this.options, arguments[0]);
		}

		// Create global element references
		this.modal = document.querySelector(this.options.modalSelector);
		this.openButtons = document.querySelectorAll(this.options.openButtonSelector);
		this.closeButtons = document.querySelectorAll(this.options.closeButtonSelector);
		this.isOpen = null;

		/*****
		Public Methods
		*****/

		/* open
		=======
		Public method for opening the modal
		by removing the hidden classes.
		*/
		JBModal.prototype.open = function() {
			var _ = this;

			_.modal.classList.remove(_.options.hidingClass, _.options.hiddenClass);

			// add open button class if set
			if (_.options.openButtonOpenClass) {
				_.openButtons.forEach(function(btn){
					btn.classList.add(_.options.openButtonOpenClass);
				});
			}

			// pause to avoid double tap issues
			setTimeout(function() {
				_.isOpen = true;
			}, 300);
		}

		/* close
		========
		Public method to add the hiding class, 
		wait for the transition to finish,
		then add the hidden class.
		*/
		JBModal.prototype.close = function() {

			// store the value of this
			var _ = this;

			// add the hiding class
			_.modal.classList.add(_.options.hidingClass);

			// remove open button class if set
			if (_.options.openButtonOpenClass) {
				_.openButtons.forEach(function(btn){
					btn.classList.remove(_.options.openButtonOpenClass);
				});
			}

			_.isOpen = false;

			// wait for the transition length, then add the hidden class
			setTimeout(function() {
				_.modal.classList.add(_.options.hiddenClass);
			}, _.options.transitionLength);
		}

		// Initialize Modal
		initializeEvents.call(this);

		/*****
		Private Methods
		*****/

		/* initializeEvents
		===================
		Watch for open and close events.
		*/
		function initializeEvents() {

			// open buttons
			for (var i=0; i<this.openButtons.length; i++) {
				var openButton = this.openButtons[i];
				var _ = this;
				openButton.addEventListener('click', function(event) {
					event.preventDefault();
					if (!_.isOpen) {
						_.open();
					}
				});
			}

			// close with close buttons
			for (var i=0; i<this.closeButtons.length; i++) {
				var _ = this;
				var closeButton = _.closeButtons[i];
				closeButton.addEventListener('click', function(event) {
					event.preventDefault();
					if (_.isOpen) {
						_.close();
					}
				});
			}

			// close with esc key
			if (this.options.closeWithEsc) {
				var _ = this;
				document.addEventListener('keyup', function(e) {
					if (e.keyCode == 27 && !_.modal.classList.contains(_.options.hiddenClass)) {
						_.close();
					}
				});
			}
		}

		/* extendDefaults
		=================
		Override default options with user input.
		*/
		function extendDefaults(source, properties) {
			var property;
			for (property in properties) {
				if (properties.hasOwnProperty(property)) {
					source[property] = properties[property];
				}
			}
			return source;
		}
	}

}());