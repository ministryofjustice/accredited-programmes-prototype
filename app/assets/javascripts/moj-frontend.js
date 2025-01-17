;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.MOJFrontend = factory();
  }
}(this, function() {
var MOJFrontend = {};
MOJFrontend.removeAttributeValue = function(el, attr, value) {
  var re, m;
  if (el.getAttribute(attr)) {
    if (el.getAttribute(attr) == value) {
      el.removeAttribute(attr);
    } else {
      re = new RegExp('(^|\\s)' + value + '(\\s|$)');
      m = el.getAttribute(attr).match(re);
      if (m && m.length == 3) {
        el.setAttribute(attr, el.getAttribute(attr).replace(re, (m[1] && m[2])?' ':''))
      }
    }
  }
}

MOJFrontend.addAttributeValue = function(el, attr, value) {
  var re;
  if (!el.getAttribute(attr)) {
    el.setAttribute(attr, value);
  }
  else {
    re = new RegExp('(^|\\s)' + value + '(\\s|$)');
    if (!re.test(el.getAttribute(attr))) {
      el.setAttribute(attr, el.getAttribute(attr) + ' ' + value);
    }
  }
};

MOJFrontend.dragAndDropSupported = function() {
  var div = document.createElement('div');
  return typeof div.ondrop != 'undefined';
};

MOJFrontend.formDataSupported = function() {
  return typeof FormData == 'function';
};

MOJFrontend.fileApiSupported = function() {
  var input = document.createElement('input');
  input.type = 'file';
  return typeof input.files != 'undefined';
};

MOJFrontend.nodeListForEach = function(nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (var i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes)
  }
};

MOJFrontend.initAll = function (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {};

  // Allow the user to initialise MOJ Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document;

  var $addAnothers = scope.querySelectorAll('[data-module="moj-add-another"]');
  MOJFrontend.nodeListForEach($addAnothers, function ($addAnother) {
    new MOJFrontend.AddAnother($addAnother);
  });

  var $multiSelects = scope.querySelectorAll('[data-module="moj-multi-select"]');
  MOJFrontend.nodeListForEach($multiSelects, function ($multiSelect) {
    new MOJFrontend.MultiSelect({
      container: $multiSelect.querySelector($multiSelect.getAttribute('data-multi-select-checkbox')),
      checkboxes: $multiSelect.querySelectorAll('tbody .govuk-checkboxes__input')
    });
  });

  var $passwordReveals = scope.querySelectorAll('[data-module="moj-password-reveal"]');
  MOJFrontend.nodeListForEach($passwordReveals, function ($passwordReveal) {
    new MOJFrontend.PasswordReveal($passwordReveal);
  });

  var $richTextEditors = scope.querySelectorAll('[data-module="moj-rich-text-editor"]');
  MOJFrontend.nodeListForEach($richTextEditors, function ($richTextEditor) {
    var options = {
      textarea: $($richTextEditor)
    };

    var toolbarAttr = $richTextEditor.getAttribute('data-moj-rich-text-editor-toolbar');
    if (toolbarAttr) {
      var toolbar = toolbarAttr.split(',');
      options.toolbar = {};
      for (var item in toolbar) options.toolbar[toolbar[item]] = true;
    }

    new MOJFrontend.RichTextEditor(options);
  });

  var $searchToggles = scope.querySelectorAll('[data-module="moj-search-toggle"]');
  MOJFrontend.nodeListForEach($searchToggles, function ($searchToggle) {
    new MOJFrontend.SearchToggle({
      toggleButton: {
        container: $($searchToggle.querySelector('.moj-search-toggle__toggle')),
        text: $searchToggle.getAttribute('data-moj-search-toggle-text')
      },
      search: {
        container: $($searchToggle.querySelector('.moj-search'))
      }
    });
  });

  var $sortableTables = scope.querySelectorAll('[data-module="moj-sortable-table"]');
  MOJFrontend.nodeListForEach($sortableTables, function ($table) {
    new MOJFrontend.SortableTable({
      table: $table
    });
  });

  var $sortableTables = scope.querySelectorAll('[data-module="moj-sortable-table"]');
  MOJFrontend.nodeListForEach($sortableTables, function ($table) {
    new MOJFrontend.SortableTable({
      table: $table
    });
  });

  const $datepickers = document.querySelectorAll('[data-module="moj-date-picker"]')
  MOJFrontend.nodeListForEach($datepickers, function ($datepicker) {
    new MOJFrontend.DatePicker($datepicker, {}).init();
  })
}

MOJFrontend.AddAnother = function(container) {
	this.container = $(container);

	if (this.container.data('moj-add-another-initialised')) {
		return
	}

	this.container.data('moj-add-another-initialised', true);

	this.container.on('click', '.moj-add-another__remove-button', $.proxy(this, 'onRemoveButtonClick'));
	this.container.on('click', '.moj-add-another__add-button', $.proxy(this, 'onAddButtonClick'));
	this.container.find('.moj-add-another__add-button, moj-add-another__remove-button').prop('type', 'button');
};

MOJFrontend.AddAnother.prototype.onAddButtonClick = function(e) {
	var item = this.getNewItem();
	this.updateAttributes(this.getItems().length, item);
	this.resetItem(item);
	var firstItem = this.getItems().first();
	if(!this.hasRemoveButton(firstItem)) {
		this.createRemoveButton(firstItem);
	}
	this.getItems().last().after(item);
	item.find('input, textarea, select').first().focus();
};

MOJFrontend.AddAnother.prototype.hasRemoveButton = function(item) {
	return item.find('.moj-add-another__remove-button').length;
};

MOJFrontend.AddAnother.prototype.getItems = function() {
	return this.container.find('.moj-add-another__item');
};

MOJFrontend.AddAnother.prototype.getNewItem = function() {
	var item = this.getItems().first().clone();
	if(!this.hasRemoveButton(item)) {
		this.createRemoveButton(item);
	}
	return item;
};

MOJFrontend.AddAnother.prototype.updateAttributes = function(index, item) {
	item.find('[data-name]').each(function(i, el) {
    var originalId = el.id

		el.name = $(el).attr('data-name').replace(/%index%/, index);
		el.id = $(el).attr('data-id').replace(/%index%/, index);

    var label = $(el).siblings('label')[0] || $(el).parents('label')[0] || item.find('[for="' + originalId + '"]')[0];
		label.htmlFor = el.id;
	});
};

MOJFrontend.AddAnother.prototype.createRemoveButton = function(item) {
	item.append('<button type="button" class="govuk-button govuk-button--secondary moj-add-another__remove-button">Remove</button>');
};

MOJFrontend.AddAnother.prototype.resetItem = function(item) {
	item.find('[data-name], [data-id]').each(function(index, el) {
		if(el.type == 'checkbox' || el.type == 'radio') {
			el.checked = false;
		} else {
			el.value = '';
		}
	});
};

MOJFrontend.AddAnother.prototype.onRemoveButtonClick = function(e) {
	$(e.currentTarget).parents('.moj-add-another__item').remove();
	var items = this.getItems();
	if(items.length === 1) {
		items.find('.moj-add-another__remove-button').remove();
	}
	items.each($.proxy(function(index, el) {
		this.updateAttributes(index, $(el));
	}, this));
	this.focusHeading();
};

MOJFrontend.AddAnother.prototype.focusHeading = function() {
	this.container.find('.moj-add-another__heading').focus();
};

MOJFrontend.ButtonMenu = function(params) {
	this.container = $(params.container);
	this.menu = this.container.find('.moj-button-menu__wrapper');
	if(params.menuClasses) {
		this.menu.addClass(params.menuClasses);
	}
	this.menu.attr('role', 'menu');
	this.mq = params.mq;
	this.buttonText = params.buttonText;
	this.buttonClasses = params.buttonClasses || '';
	this.keys = { esc: 27, up: 38, down: 40, tab: 9 };
	this.menu.on('keydown', '[role=menuitem]', $.proxy(this, 'onButtonKeydown'));
	this.createToggleButton();
	this.setupResponsiveChecks();
	$(document).on('click', $.proxy(this, 'onDocumentClick'));
};

MOJFrontend.ButtonMenu.prototype.onDocumentClick = function(e) {
	if(!$.contains(this.container[0], e.target)) {
	  this.hideMenu();
  }
};

MOJFrontend.ButtonMenu.prototype.createToggleButton = function() {
	this.menuButton = $('<button class="govuk-button moj-button-menu__toggle-button ' + this.buttonClasses + '" type="button" aria-haspopup="true" aria-expanded="false">'+this.buttonText+'</button>');
	this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
	this.menuButton.on('keydown', $.proxy(this, 'onMenuKeyDown'));
};

MOJFrontend.ButtonMenu.prototype.setupResponsiveChecks = function() {
	this.mql = window.matchMedia(this.mq);
	this.mql.addListener($.proxy(this, 'checkMode'));
	this.checkMode(this.mql);
};

MOJFrontend.ButtonMenu.prototype.checkMode = function(mql) {
	if(mql.matches) {
		this.enableBigMode();
	} else {
		this.enableSmallMode();
	}
};

MOJFrontend.ButtonMenu.prototype.enableSmallMode = function() {
	this.container.prepend(this.menuButton);
	this.hideMenu();
	this.removeButtonClasses();
	this.menu.attr('role', 'menu');
	this.container.find('.moj-button-menu__item').attr('role', 'menuitem');
};

MOJFrontend.ButtonMenu.prototype.enableBigMode = function() {
	this.menuButton.detach();
	this.showMenu();
	this.addButtonClasses();
	this.menu.removeAttr('role');
	this.container.find('.moj-button-menu__item').removeAttr('role');
};

MOJFrontend.ButtonMenu.prototype.removeButtonClasses = function() {
	this.menu.find('.moj-button-menu__item').each(function(index, el) {
		if($(el).hasClass('govuk-button--secondary')) {
			$(el).attr('data-secondary', 'true');
			$(el).removeClass('govuk-button--secondary');
		}
		if($(el).hasClass('govuk-button--warning')) {
			$(el).attr('data-warning', 'true');
			$(el).removeClass('govuk-button--warning');
		}
		$(el).removeClass('govuk-button');
	});
};

MOJFrontend.ButtonMenu.prototype.addButtonClasses = function() {
	this.menu.find('.moj-button-menu__item').each(function(index, el) {
		if($(el).attr('data-secondary') == 'true') {
			$(el).addClass('govuk-button--secondary');
		}
		if($(el).attr('data-warning') == 'true') {
			$(el).addClass('govuk-button--warning');
		}
		$(el).addClass('govuk-button');
	});
};

MOJFrontend.ButtonMenu.prototype.hideMenu = function() {
	this.menuButton.attr('aria-expanded', 'false');
};

MOJFrontend.ButtonMenu.prototype.showMenu = function() {
	this.menuButton.attr('aria-expanded', 'true');
};

MOJFrontend.ButtonMenu.prototype.onMenuButtonClick = function() {
	this.toggle();
};

MOJFrontend.ButtonMenu.prototype.toggle = function() {
	if(this.menuButton.attr('aria-expanded') == 'false') {
		this.showMenu();
		this.menu.find('[role=menuitem]').first().focus();
	} else {
		this.hideMenu();
		this.menuButton.focus();
	}
};

MOJFrontend.ButtonMenu.prototype.onMenuKeyDown = function(e) {
	switch (e.keyCode) {
		case this.keys.down:
			this.toggle();
			break;
	}
};

MOJFrontend.ButtonMenu.prototype.onButtonKeydown = function(e) {
	switch (e.keyCode) {
		case this.keys.up:
			e.preventDefault();
			this.focusPrevious(e.currentTarget);
			break;
		case this.keys.down:
			e.preventDefault();
			this.focusNext(e.currentTarget);
			break;
		case this.keys.esc:
			if(!this.mql.matches) {
				this.menuButton.focus();
				this.hideMenu();
			}
			break;
		case this.keys.tab:
			if(!this.mql.matches) {
				this.hideMenu();
			}
	}
};

MOJFrontend.ButtonMenu.prototype.focusNext = function(currentButton) {
	var next = $(currentButton).next();
	if(next[0]) {
		next.focus();
	} else {
		this.container.find('[role=menuitem]').first().focus();
	}
};

MOJFrontend.ButtonMenu.prototype.focusPrevious = function(currentButton) {
	var prev = $(currentButton).prev();
	if(prev[0]) {
		prev.focus();
	} else {
		this.container.find('[role=menuitem]').last().focus();
	}
};

/**
 * Datepicker config
 *
 * @typedef {object} DatepickerConfig
 * @property {string}  [excludedDates] - Dates that cannot be selected
 * @property {string}  [excludedDays]  - Days that cannot be selected
 * @property {boolean} [leadingZeroes] - Whether to add leading zeroes when populating the field
 * @property {string}  [minDate]       - The earliest available date
 * @property {string}  [maxDate]       - The latest available date
 * @property {string}  [weekStartDay]  - First day of the week in calendar view
 */

/**
 * @param {HTMLElement} $module - HTML element
 * @param {DatepickerConfig} config - config object
 * @constructor
 */
function Datepicker($module, config) {
  if (!$module) {
    return this;
  }

  const schema = Object.freeze({
    properties: {
      excludedDates: { type: "string" },
      excludedDays: { type: "string" },
      leadingZeros: { type: "string" },
      maxDate: { type: "string" },
      minDate: { type: "string" },
      weekStartDay: { type: "string" },
    },
  });

  const defaults = {
    leadingZeros: false,
    weekStartDay: "monday",
  };

  // data attributes override JS config, which overrides defaults
  this.config = this.mergeConfigs(
    defaults,
    config,
    this.parseDataset(schema, $module.dataset),
  );

  this.dayLabels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  this.monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  this.currentDate = new Date();
  this.currentDate.setHours(0, 0, 0, 0);
  this.calendarDays = [];
  this.excludedDates = [];
  this.excludedDays = [];

  this.buttonClass = "moj-datepicker__button";
  this.selectedDayButtonClass = "moj-datepicker__button--selected";
  this.currentDayButtonClass = "moj-datepicker__button--current";
  this.todayButtonClass = "moj-datepicker__button--today";

  this.$module = $module;
  this.$input = $module.querySelector(".moj-js-datepicker-input");
}

Datepicker.prototype.init = function () {
  // Check that required elements are present
  if (!this.$input) {
    return;
  }

  this.setOptions();
  this.initControls();
};

Datepicker.prototype.initControls = function () {
  this.id = `datepicker-${this.$input.id}`;

  this.$dialog = this.createDialog();
  this.createCalendarHeaders();

  const $componentWrapper = document.createElement("div");
  const $inputWrapper = document.createElement("div");
  $componentWrapper.classList.add("moj-datepicker__wrapper");
  $inputWrapper.classList.add("govuk-input__wrapper");

  this.$input.parentNode.insertBefore($componentWrapper, this.$input);
  $componentWrapper.appendChild($inputWrapper);
  $inputWrapper.appendChild(this.$input);

  $inputWrapper.insertAdjacentHTML("beforeend", this.toggleTemplate());
  $componentWrapper.insertAdjacentElement("beforeend", this.$dialog);

  this.$calendarButton = this.$module.querySelector(
    ".moj-js-datepicker-toggle",
  );
  this.$dialogTitle = this.$dialog.querySelector(
    ".moj-js-datepicker-month-year",
  );

  this.createCalendar();

  this.$prevMonthButton = this.$dialog.querySelector(
    ".moj-js-datepicker-prev-month",
  );
  this.$prevYearButton = this.$dialog.querySelector(
    ".moj-js-datepicker-prev-year",
  );
  this.$nextMonthButton = this.$dialog.querySelector(
    ".moj-js-datepicker-next-month",
  );
  this.$nextYearButton = this.$dialog.querySelector(
    ".moj-js-datepicker-next-year",
  );
  this.$cancelButton = this.$dialog.querySelector(".moj-js-datepicker-cancel");
  this.$okButton = this.$dialog.querySelector(".moj-js-datepicker-ok");

  // add event listeners
  this.$prevMonthButton.addEventListener("click", (event) =>
    this.focusPreviousMonth(event, false),
  );
  this.$prevYearButton.addEventListener("click", (event) =>
    this.focusPreviousYear(event, false),
  );
  this.$nextMonthButton.addEventListener("click", (event) =>
    this.focusNextMonth(event, false),
  );
  this.$nextYearButton.addEventListener("click", (event) =>
    this.focusNextYear(event, false),
  );
  this.$cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    this.closeDialog(event);
  });
  this.$okButton.addEventListener("click", () => {
    this.selectDate(this.currentDate);
  });

  const dialogButtons = this.$dialog.querySelectorAll(
    'button:not([disabled="true"])',
  );
  // eslint-disable-next-line prefer-destructuring
  this.$firstButtonInDialog = dialogButtons[0];
  this.$lastButtonInDialog = dialogButtons[dialogButtons.length - 1];
  this.$firstButtonInDialog.addEventListener("keydown", (event) =>
    this.firstButtonKeydown(event),
  );
  this.$lastButtonInDialog.addEventListener("keydown", (event) =>
    this.lastButtonKeydown(event),
  );

  this.$calendarButton.addEventListener("click", (event) =>
    this.toggleDialog(event),
  );

  this.$dialog.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
      this.closeDialog();
      event.preventDefault();
      event.stopPropagation();
    }
  });

  document.body.addEventListener("mouseup", (event) =>
    this.backgroundClick(event),
  );

  // populates calendar with initial dates, avoids Wave errors about null buttons
  this.updateCalendar();
};

Datepicker.prototype.createDialog = function () {
  const titleId = `datepicker-title-${this.$input.id}`;
  const $dialog = document.createElement("div");

  $dialog.id = this.id;
  $dialog.setAttribute("class", "moj-datepicker__dialog");
  $dialog.setAttribute("role", "dialog");
  $dialog.setAttribute("aria-modal", "true");
  $dialog.setAttribute("aria-labelledby", titleId);
  $dialog.innerHTML = this.dialogTemplate(titleId);

  return $dialog;
};

Datepicker.prototype.createCalendar = function () {
  const $tbody = this.$dialog.querySelector("tbody");
  let dayCount = 0;
  for (let i = 0; i < 6; i++) {
    // create row
    const $row = $tbody.insertRow(i);

    for (let j = 0; j < 7; j++) {
      // create cell (day)
      const $cell = document.createElement("td");
      const $dateButton = document.createElement("button");

      $cell.appendChild($dateButton);
      $row.appendChild($cell);

      const calendarDay = new DSCalendarDay($dateButton, dayCount, i, j, this);
      calendarDay.init();
      this.calendarDays.push(calendarDay);
      dayCount++;
    }
  }
};

Datepicker.prototype.toggleTemplate = function () {
  return `<button class="moj-datepicker__toggle moj-js-datepicker-toggle" type="button" aria-haspopup="dialog" aria-controls="${this.id}" aria-expanded="false">
            <span class="govuk-visually-hidden">Choose date</span>
            <svg width="32" height="24" focusable="false" class="moj-datepicker-icon" aria-hidden="true" role="img" viewBox="0 0 22 22">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.1333 2.93333H5.86668V4.4C5.86668 5.21002 5.21003 5.86667 4.40002 5.86667C3.59 5.86667 2.93335 5.21002 2.93335 4.4V2.93333H2C0.895431 2.93333 0 3.82877 0 4.93334V19.2667C0 20.3712 0.89543 21.2667 2 21.2667H20C21.1046 21.2667 22 20.3712 22 19.2667V4.93333C22 3.82876 21.1046 2.93333 20 2.93333H19.0667V4.4C19.0667 5.21002 18.41 5.86667 17.6 5.86667C16.79 5.86667 16.1333 5.21002 16.1333 4.4V2.93333ZM20.5333 8.06667H1.46665V18.8C1.46665 19.3523 1.91436 19.8 2.46665 19.8H19.5333C20.0856 19.8 20.5333 19.3523 20.5333 18.8V8.06667Z"
              ></path>
              <rect x="3.66669" width="1.46667" height="5.13333" rx="0.733333" fill="currentColor"></rect>
              <rect x="16.8667" width="1.46667" height="5.13333" rx="0.733333" fill="currentColor"></rect>
            </svg>
          </button>`;
};

/**
 * HTML template for calendar dialog
 *
 * @param {string} [titleId] - Id attribute for dialog title
 * @return {string}
 */
Datepicker.prototype.dialogTemplate = function (titleId) {
  return `<div class="moj-datepicker__dialog-header">
            <div class="moj-datepicker__dialog-navbuttons">
              <button class="moj-datepicker__button moj-js-datepicker-prev-year">
                <span class="govuk-visually-hidden">Previous year</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none" fill="none" focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1643 20L28.9572 14.2071L27.5429 12.7929L20.3358 20L27.5429 27.2071L28.9572 25.7929L23.1643 20Z" fill="currentColor"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1643 20L22.9572 14.2071L21.5429 12.7929L14.3358 20L21.5429 27.2071L22.9572 25.7929L17.1643 20Z" fill="currentColor"/>
                </svg>
              </button>

              <button class="moj-datepicker__button moj-js-datepicker-prev-month">
                <span class="govuk-visually-hidden">Previous month</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none" focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5729 20L25.7865 14.2071L24.5137 12.7929L18.0273 20L24.5137 27.2071L25.7865 25.7929L20.5729 20Z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <h2 id="${titleId}" class="moj-datepicker__dialog-title moj-js-datepicker-month-year" aria-live="polite">June 2020</h2>

            <div class="moj-datepicker__dialog-navbuttons">
              <button class="moj-datepicker__button moj-js-datepicker-next-month">
                <span class="govuk-visually-hidden">Next month</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none"  focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4271 20L18.2135 14.2071L19.4863 12.7929L25.9727 20L19.4863 27.2071L18.2135 25.7929L23.4271 20Z" fill="currentColor"/>
                </svg>
              </button>

              <button class="moj-datepicker__button moj-js-datepicker-next-year">
                <span class="govuk-visually-hidden">Next year</span>
                <svg width="44" height="40" viewBox="0 0 44 40" fill="none" fill="none" focusable="false" aria-hidden="true" role="img">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8357 20L15.0428 14.2071L16.4571 12.7929L23.6642 20L16.4571 27.2071L15.0428 25.7929L20.8357 20Z" fill="currentColor"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8357 20L21.0428 14.2071L22.4571 12.7929L29.6642 20L22.4571 27.2071L21.0428 25.7929L26.8357 20Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          <table class="moj-datepicker__calendar moj-js-datepicker-grid" role="grid" aria-labelledby="${titleId}">
            <thead>
              <tr></tr>
            </thead>

            <tbody></tbody>
          </table>

          <div class="govuk-button-group">
            <button type="button" class="govuk-button moj-js-datepicker-ok">Select</button>
            <button type="button" class="govuk-button govuk-button--secondary moj-js-datepicker-cancel">Close</button>
          </div>`;
};

Datepicker.prototype.createCalendarHeaders = function () {
  this.dayLabels.forEach((day) => {
    const html = `<th scope="col"><span aria-hidden="true">${day.substring(0, 3)}</span><span class="govuk-visually-hidden">${day}</span></th>`;
    const $headerRow = this.$dialog.querySelector("thead > tr");
    $headerRow.insertAdjacentHTML("beforeend", html);
  });
};

/**
 * Pads given number with leading zeros
 *
 * @param {number} value - The value to be padded
 * @param {number} length - The length in characters of the output
 * @return {string}
 */
Datepicker.prototype.leadingZeros = function (value, length = 2) {
  let ret = value.toString();

  while (ret.length < length) {
    ret = `0${ret}`;
  }

  return ret;
};

Datepicker.prototype.setOptions = function () {
  this.setMinAndMaxDatesOnCalendar();
  this.setExcludedDates();
  this.setExcludedDays();
  this.setLeadingZeros();
  this.setWeekStartDay();
};

Datepicker.prototype.setMinAndMaxDatesOnCalendar = function () {
  if (this.config.minDate) {
    this.minDate = this.formattedDateFromString(
      this.config.minDate,
      null,
    );
    if (this.minDate && this.currentDate < this.minDate) {
      this.currentDate = this.minDate;
    }
  }

  if (this.config.maxDate) {
    this.maxDate = this.formattedDateFromString(
      this.config.maxDate,
      null,
    );
    if (this.maxDate && this.currentDate > this.maxDate) {
      this.currentDate = this.maxDate;
    }
  }
};

Datepicker.prototype.setExcludedDates = function () {
  if (this.config.excludedDates) {
    this.excludedDates = this.config.excludedDates
      .replace(/\s+/, " ")
      .split(" ")
      .map((item) => {
        if (item.includes("-")) {
          // parse the date range from the format "dd/mm/yyyy-dd/mm/yyyy"
          const [startDate, endDate] = item
            .split("-")
            .map((d) => this.formattedDateFromString(d, null));
          if (startDate && endDate) {
            const date = new Date(startDate.getTime());
            const dates = [];
            while (date <= endDate) {
              dates.push(new Date(date));
              date.setDate(date.getDate() + 1);
            }
            return dates;
          }
        } else {
          return this.formattedDateFromString(item, null);
        }
      })
      .flat()
      .filter((item) => item);
  }
};

Datepicker.prototype.setExcludedDays = function () {
  if (this.config.excludedDays) {
    // lowercase and arrange dayLabels to put indexOf sunday == 0 for comparison
    // with getDay() function
    let weekDays = this.dayLabels.map((item) => item.toLowerCase());
    if (this.config.weekStartDay === "monday") {
      weekDays.unshift(weekDays.pop());
    }

    this.excludedDays = this.config.excludedDays
      .replace(/\s+/, " ")
      .toLowerCase()
      .split(" ")
      .map((item) => weekDays.indexOf(item))
      .filter((item) => item !== -1);
  }
};

Datepicker.prototype.setLeadingZeros = function () {
  if (typeof this.config.leadingZeros !== "boolean") {
    if (this.config.leadingZeros.toLowerCase() === "true") {
      this.config.leadingZeros = true;
    }
    if (this.config.leadingZeros.toLowerCase() === "false") {
      this.config.leadingZeros = false;
    }
  }
};

Datepicker.prototype.setWeekStartDay = function () {
  const weekStartDayParam = this.config.weekStartDay;
  if (weekStartDayParam?.toLowerCase() === "sunday") {
    this.config.weekStartDay = "sunday";
    // Rotate dayLabels array to put Sunday as the first item
    this.dayLabels.unshift(this.dayLabels.pop());
  }
  if (weekStartDayParam?.toLowerCase() === "monday") {
    this.config.weekStartDay = "monday";
  }
};

/**
 * Determine if a date is selecteable
 *
 * @param {Date} date - the date to check
 * @return {boolean}
 *
 */
Datepicker.prototype.isExcludedDate = function (date) {
  if (this.minDate && this.minDate > date) {
    return true;
  }

  if (this.maxDate && this.maxDate < date) {
    return true;
  }

  for (const excludedDate of this.excludedDates) {
    if (date.toDateString() === excludedDate.toDateString()) {
      return true;
    }
  }

  if (this.excludedDays.includes(date.getDay())) {
    return true;
  }

  return false;
};

/**
 * Get a Date object from a string
 *
 * @param {string} dateString - string in the format d/m/yyyy dd/mm/yyyy
 * @param {Date} fallback - date object to return if formatting fails
 * @return {Date}
 */
Datepicker.prototype.formattedDateFromString = function (
  dateString,
  fallback = new Date(),
) {
  let formattedDate = null;
  // Accepts d/m/yyyy and dd/mm/yyyy
  const dateFormatPattern = /(\d{1,2})([-/,. ])(\d{1,2})\2(\d{4})/;

  if (!dateFormatPattern.test(dateString)) return fallback;

  const match = dateString.match(dateFormatPattern);
  const day = match[1];
  const month = match[3];
  const year = match[4];

  formattedDate = new Date(`${month}-${day}-${year}`);
  if (formattedDate instanceof Date && !isNaN(formattedDate)) {
    return formattedDate;
  }
  return fallback;
};

/**
 * Get a formatted date string from a Date object
 *
 * @param {Date} date - date to format to a string
 * @return {string}
 */
Datepicker.prototype.formattedDateFromDate = function (date) {
  if (this.config.leadingZeros) {
    return `${this.leadingZeros(date.getDate())}/${this.leadingZeros(date.getMonth() + 1)}/${date.getFullYear()}`;
  } else {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
};

/**
 * Get a human readable date in the format Monday 2 March 2024
 *
 * @param {Date} - date to format
 * @return {string}
 */
Datepicker.prototype.formattedDateHuman = function (date) {
  return `${this.dayLabels[(date.getDay() + 6) % 7]} ${date.getDate()} ${this.monthLabels[date.getMonth()]} ${date.getFullYear()}`;
};

Datepicker.prototype.backgroundClick = function (event) {
  if (
    this.isOpen() &&
    !this.$dialog.contains(event.target) &&
    !this.$input.contains(event.target) &&
    !this.$calendarButton.contains(event.target)
  ) {
    event.preventDefault();
    this.closeDialog();
  }
};

Datepicker.prototype.firstButtonKeydown = function (event) {
  if (event.key === "Tab" && event.shiftKey) {
    this.$lastButtonInDialog.focus();
    event.preventDefault();
  }
};

Datepicker.prototype.lastButtonKeydown = function (event) {
  if (event.key === "Tab" && !event.shiftKey) {
    this.$firstButtonInDialog.focus();
    event.preventDefault();
  }
};

// render calendar
Datepicker.prototype.updateCalendar = function () {
  this.$dialogTitle.innerHTML = `${this.monthLabels[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;

  const day = this.currentDate;
  const firstOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
  let dayOfWeek;

  if (this.config.weekStartDay === "monday") {
    dayOfWeek = firstOfMonth.getDay() === 0 ? 6 : firstOfMonth.getDay() - 1; // Change logic to make Monday first day of week, i.e. 0
  } else {
    dayOfWeek = firstOfMonth.getDay();
  }

  firstOfMonth.setDate(firstOfMonth.getDate() - dayOfWeek);

  const thisDay = new Date(firstOfMonth);

  // loop through our days
  for (let i = 0; i < this.calendarDays.length; i++) {
    const hidden = thisDay.getMonth() !== day.getMonth();
    const disabled = this.isExcludedDate(thisDay);

    this.calendarDays[i].update(thisDay, hidden, disabled);

    thisDay.setDate(thisDay.getDate() + 1);
  }
};

Datepicker.prototype.setCurrentDate = function (focus = true) {
  const { currentDate } = this;

  this.calendarDays.forEach((calendarDay) => {
    calendarDay.button.classList.add("moj-datepicker__button");
    calendarDay.button.classList.add("moj-datepicker__calendar-day");
    calendarDay.button.setAttribute("tabindex", -1);
    calendarDay.button.classList.remove(this.selectedDayButtonClass);
    const calendarDayDate = calendarDay.date;
    calendarDayDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      calendarDayDate.getTime() ===
      currentDate.getTime() /* && !calendarDay.button.disabled */
    ) {
      if (focus) {
        calendarDay.button.setAttribute("tabindex", 0);
        calendarDay.button.focus();
        calendarDay.button.classList.add(this.selectedDayButtonClass);
      }
    }

    if (
      this.inputDate &&
      calendarDayDate.getTime() === this.inputDate.getTime()
    ) {
      calendarDay.button.classList.add(this.currentDayButtonClass);
      calendarDay.button.setAttribute("aria-selected", true);
    } else {
      calendarDay.button.classList.remove(this.currentDayButtonClass);
      calendarDay.button.removeAttribute("aria-selected");
    }

    if (calendarDayDate.getTime() === today.getTime()) {
      calendarDay.button.classList.add(this.todayButtonClass);
    } else {
      calendarDay.button.classList.remove(this.todayButtonClass);
    }
  });

  // if no date is tab-able, make the first non-disabled date tab-able
  if (!focus) {
    const enabledDays = this.calendarDays.filter((calendarDay) => {
      return (
        window.getComputedStyle(calendarDay.button).display === "block" &&
        !calendarDay.button.disabled
      );
    });

    enabledDays[0].button.setAttribute("tabindex", 0);

    this.currentDate = enabledDays[0].date;
  }
};

Datepicker.prototype.selectDate = function (date) {
  if (this.isExcludedDate(date)) {
    return;
  }

  this.$calendarButton.querySelector("span").innerText =
    `Choose date. Selected date is ${this.formattedDateHuman(date)}`;
  this.$input.value = this.formattedDateFromDate(date);

  const changeEvent = new Event("change", { bubbles: true, cancelable: true });
  this.$input.dispatchEvent(changeEvent);

  this.closeDialog();
};

Datepicker.prototype.isOpen = function () {
  return this.$dialog.classList.contains("moj-datepicker__dialog--open");
};

Datepicker.prototype.toggleDialog = function (event) {
  event.preventDefault();
  if (this.isOpen()) {
    this.closeDialog();
  } else {
    this.setMinAndMaxDatesOnCalendar();
    this.openDialog();
  }
};

Datepicker.prototype.openDialog = function () {
  this.$dialog.classList.add("moj-datepicker__dialog--open");
  this.$calendarButton.setAttribute("aria-expanded", "true");

  // position the dialog
  // if input is wider than dialog pin it to the right
  if (this.$input.offsetWidth > this.$dialog.offsetWidth) {
    this.$dialog.style.right = `0px`;
  }
  this.$dialog.style.top = `${this.$input.offsetHeight + 3}px`;

  // get the date from the input element
  this.inputDate = this.formattedDateFromString(this.$input.value);
  this.currentDate = this.inputDate;
  this.currentDate.setHours(0, 0, 0, 0);

  this.updateCalendar();
  this.setCurrentDate();
};

Datepicker.prototype.closeDialog = function () {
  this.$dialog.classList.remove("moj-datepicker__dialog--open");
  this.$calendarButton.setAttribute("aria-expanded", "false");
  this.$calendarButton.focus();
};

Datepicker.prototype.goToDate = function (date, focus) {
  const current = this.currentDate;
  this.currentDate = date;

  if (
    current.getMonth() !== this.currentDate.getMonth() ||
    current.getFullYear() !== this.currentDate.getFullYear()
  ) {
    this.updateCalendar();
  }

  this.setCurrentDate(focus);
};

// day navigation
Datepicker.prototype.focusNextDay = function () {
  const date = new Date(this.currentDate);
  date.setDate(date.getDate() + 1);
  this.goToDate(date);
};

Datepicker.prototype.focusPreviousDay = function () {
  const date = new Date(this.currentDate);
  date.setDate(date.getDate() - 1);
  this.goToDate(date);
};

// week navigation
Datepicker.prototype.focusNextWeek = function () {
  const date = new Date(this.currentDate);
  date.setDate(date.getDate() + 7);
  this.goToDate(date);
};

Datepicker.prototype.focusPreviousWeek = function () {
  const date = new Date(this.currentDate);
  date.setDate(date.getDate() - 7);
  this.goToDate(date);
};

Datepicker.prototype.focusFirstDayOfWeek = function () {
  const date = new Date(this.currentDate);
  date.setDate(date.getDate() - date.getDay());
  this.goToDate(date);
};

Datepicker.prototype.focusLastDayOfWeek = function () {
  const date = new Date(this.currentDate);
  date.setDate(date.getDate() - date.getDay() + 6);
  this.goToDate(date);
};

// month navigation
Datepicker.prototype.focusNextMonth = function (event, focus = true) {
  event.preventDefault();
  const date = new Date(this.currentDate);
  date.setMonth(date.getMonth() + 1, 1);
  this.goToDate(date, focus);
};

Datepicker.prototype.focusPreviousMonth = function (event, focus = true) {
  event.preventDefault();
  const date = new Date(this.currentDate);
  date.setMonth(date.getMonth() - 1, 1);
  this.goToDate(date, focus);
};

// year navigation
Datepicker.prototype.focusNextYear = function (event, focus = true) {
  event.preventDefault();
  const date = new Date(this.currentDate);
  date.setFullYear(date.getFullYear() + 1, date.getMonth(), 1);
  this.goToDate(date, focus);
};

Datepicker.prototype.focusPreviousYear = function (event, focus = true) {
  event.preventDefault();
  const date = new Date(this.currentDate);
  date.setFullYear(date.getFullYear() - 1, date.getMonth(), 1);
  this.goToDate(date, focus);
};

/**
 * Parse dataset
 *
 * Loop over an object and normalise each value using {@link normaliseString},
 * optionally expanding nested `i18n.field`
 *
 * @param {{ schema: Schema }} Component - Component class
 * @param {DOMStringMap} dataset - HTML element dataset
 * @returns {Object} Normalised dataset
 */
Datepicker.prototype.parseDataset = function (schema, dataset) {
  const parsed = {};

  for (const [field, attributes] of Object.entries(schema.properties)) {
    if (field in dataset) {
      parsed[field] = dataset[field];
    }
  }

  return parsed;
};

/**
 * Config merging function
 *
 * Takes any number of objects and combines them together, with
 * greatest priority on the LAST item passed in.
 *
 * @param {...{ [key: string]: unknown }} configObjects - Config objects to merge
 * @returns {{ [key: string]: unknown }} A merged config object
 */
Datepicker.prototype.mergeConfigs = function (...configObjects) {
  const formattedConfigObject = {};

  // Loop through each of the passed objects
  for (const configObject of configObjects) {
    for (const key of Object.keys(configObject)) {
      const option = formattedConfigObject[key];
      const override = configObject[key];

      // Push their keys one-by-one into formattedConfigObject. Any duplicate
      // keys with object values will be merged, otherwise the new value will
      // override the existing value.
      if (typeof option === "object" && typeof override === "object") {
        // @ts-expect-error Index signature for type 'string' is missing
        formattedConfigObject[key] = this.mergeConfigs(option, override);
      } else {
        formattedConfigObject[key] = override;
      }
    }
  }

  return formattedConfigObject;
};

/**
 *
 * @param {HTMLElement} button
 * @param {number} index
 * @param {number} row
 * @param {number} column
 * @param {Datepicker} picker
 * @constructor
 */
function DSCalendarDay(button, index, row, column, picker) {
  this.index = index;
  this.row = row;
  this.column = column;
  this.button = button;
  this.picker = picker;

  this.date = new Date();
}

DSCalendarDay.prototype.init = function () {
  this.button.addEventListener("keydown", this.keyPress.bind(this));
  this.button.addEventListener("click", this.click.bind(this));
};

/**
 * @param {Date} day - the Date for the calendar day
 * @param {boolean} hidden - visibility of the day
 * @param {boolean} disabled - is the day selectable or excluded
 */
DSCalendarDay.prototype.update = function (day, hidden, disabled) {
  let label = day.getDate();
  let accessibleLabel = this.picker.formattedDateHuman(day);

  if (disabled) {
    this.button.setAttribute("aria-disabled", true);
    accessibleLabel = "Excluded date, " + accessibleLabel;
  } else {
    this.button.removeAttribute("aria-disabled");
  }

  if (hidden) {
    this.button.style.display = "none";
  } else {
    this.button.style.display = "block";
  }

  this.button.innerHTML = `<span class="govuk-visually-hidden">${accessibleLabel}</span><span aria-hidden="true">${label}</span>`;
  this.date = new Date(day);
};

DSCalendarDay.prototype.click = function (event) {
  this.picker.goToDate(this.date);
  this.picker.selectDate(this.date);

  event.stopPropagation();
  event.preventDefault();
};

DSCalendarDay.prototype.keyPress = function (event) {
  let calendarNavKey = true;

  switch (event.key) {
    case "ArrowLeft":
      this.picker.focusPreviousDay();
      break;
    case "ArrowRight":
      this.picker.focusNextDay();
      break;
    case "ArrowUp":
      this.picker.focusPreviousWeek();
      break;
    case "ArrowDown":
      this.picker.focusNextWeek();
      break;
    case "Home":
      this.picker.focusFirstDayOfWeek();
      break;
    case "End":
      this.picker.focusLastDayOfWeek();
      break;
    case "PageUp":
      // eslint-disable-next-line no-unused-expressions
      event.shiftKey
        ? this.picker.focusPreviousYear(event)
        : this.picker.focusPreviousMonth(event);
      break;
    case "PageDown":
      // eslint-disable-next-line no-unused-expressions
      event.shiftKey
        ? this.picker.focusNextYear(event)
        : this.picker.focusNextMonth(event);
      break;
    default:
      calendarNavKey = false;
      break;
  }

  if (calendarNavKey) {
    event.preventDefault();
    event.stopPropagation();
  }
};

MOJFrontend.DatePicker = Datepicker;

/**
 * Schema for component config
 *
 * @typedef {object} Schema
 * @property {{ [field: string]: SchemaProperty | undefined }} properties - Schema properties
 */

/**
 * Schema property for component config
 *
 * @typedef {object} SchemaProperty
 * @property {'string' | 'boolean' | 'number' | 'object'} type - Property type
 */

MOJFrontend.FilterToggleButton = function(options) {
  this.options = options;
  this.container = $(this.options.toggleButton.container);
  this.filterContainer = $(this.options.filter.container);

  this.createToggleButton();
  this.setupResponsiveChecks();
  this.filterContainer.attr('tabindex', '-1');
  if(this.options.startHidden) {
    this.hideMenu();
  }
};

MOJFrontend.FilterToggleButton.prototype.setupResponsiveChecks = function() {
  this.mq = window.matchMedia(this.options.bigModeMediaQuery);
  this.mq.addListener($.proxy(this, 'checkMode'));
  this.checkMode(this.mq);
};

MOJFrontend.FilterToggleButton.prototype.createToggleButton = function() {
  this.menuButton = $('<button class="govuk-button '+this.options.toggleButton.classes+'" type="button" aria-haspopup="true" aria-expanded="false">'+this.options.toggleButton.showText+'</button>');
  this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
  this.container.append(this.menuButton);
};

MOJFrontend.FilterToggleButton.prototype.checkMode = function(mq) {
  if(mq.matches) {
    this.enableBigMode();
  } else {
    this.enableSmallMode();
  }
};

MOJFrontend.FilterToggleButton.prototype.enableBigMode = function() {
  this.showMenu();
  this.removeCloseButton();
};

MOJFrontend.FilterToggleButton.prototype.enableSmallMode = function() {
  this.hideMenu();
  this.addCloseButton();
};

MOJFrontend.FilterToggleButton.prototype.addCloseButton = function() {
  if(this.options.closeButton) {
    this.closeButton = $('<button class="moj-filter__close" type="button">'+this.options.closeButton.text+'</button>');
    this.closeButton.on('click', $.proxy(this, 'onCloseClick'));
    $(this.options.closeButton.container).append(this.closeButton);
  }
};

MOJFrontend.FilterToggleButton.prototype.onCloseClick = function() {
  this.hideMenu();
  this.menuButton.focus();
};

MOJFrontend.FilterToggleButton.prototype.removeCloseButton = function() {
  if(this.closeButton) {
    this.closeButton.remove();
    this.closeButton = null;
  }
};

MOJFrontend.FilterToggleButton.prototype.hideMenu = function() {
  this.menuButton.attr('aria-expanded', 'false');
  this.filterContainer.addClass('moj-js-hidden');
  this.menuButton.text(this.options.toggleButton.showText);
};

MOJFrontend.FilterToggleButton.prototype.showMenu = function() {
  this.menuButton.attr('aria-expanded', 'true');
  this.filterContainer.removeClass('moj-js-hidden');
  this.menuButton.text(this.options.toggleButton.hideText);
};

MOJFrontend.FilterToggleButton.prototype.onMenuButtonClick = function() {
  this.toggle();
};

MOJFrontend.FilterToggleButton.prototype.toggle = function() {
  if(this.menuButton.attr('aria-expanded') == 'false') {
    this.showMenu();
    this.filterContainer.focus();
  } else {
    this.hideMenu();
  }
};

MOJFrontend.FormValidator = function(form, options) {
  this.form = form;
  this.errors = [];
  this.validators = [];
  $(this.form).on('submit', $.proxy(this, 'onSubmit'));
  this.summary = (options && options.summary) ? $(options.summary) : $('.govuk-error-summary');
  this.originalTitle = document.title;
};

MOJFrontend.FormValidator.entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

MOJFrontend.FormValidator.prototype.escapeHtml = function(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return MOJFrontend.FormValidator.entityMap[s];
  });
};

MOJFrontend.FormValidator.prototype.resetTitle = function() {
  document.title = this.originalTitle;
};

MOJFrontend.FormValidator.prototype.updateTitle = function() {
  document.title = "" + this.errors.length + " errors - " + document.title;
};

MOJFrontend.FormValidator.prototype.showSummary = function () {
  this.summary.html(this.getSummaryHtml());
  this.summary.removeClass('moj-hidden');
  this.summary.attr('aria-labelledby', 'errorSummary-heading');
  this.summary.focus();
};

MOJFrontend.FormValidator.prototype.getSummaryHtml = function() {
  var html = '<h2 id="error-summary-title" class="govuk-error-summary__title">There is a problem</h2>';
  html += '<div class="govuk-error-summary__body">';
  html += '<ul class="govuk-list govuk-error-summary__list">';
  for (var i = 0, j = this.errors.length; i < j; i++) {
    var error = this.errors[i];
    html += '<li>';
    html +=   '<a href="#' + this.escapeHtml(error.fieldName) + '">';
    html +=     this.escapeHtml(error.message);
    html +=   '</a>';
    html += '</li>';
  }
  html += '</ul>';
  html += '</div>';
  return html;
};

MOJFrontend.FormValidator.prototype.hideSummary = function() {
  this.summary.addClass('moj-hidden');
  this.summary.removeAttr('aria-labelledby');
};

MOJFrontend.FormValidator.prototype.onSubmit = function (e) {
  this.removeInlineErrors();
  this.hideSummary();
  this.resetTitle();
  if(!this.validate()) {
    e.preventDefault();
    this.updateTitle();
    this.showSummary();
    this.showInlineErrors();
  }
};

MOJFrontend.FormValidator.prototype.showInlineErrors = function() {
  for (var i = 0, j = this.errors.length; i < j; i++) {
    this.showInlineError(this.errors[i]);
  }
};

MOJFrontend.FormValidator.prototype.showInlineError = function (error) {
  var errorSpanId = error.fieldName + '-error';
  var errorSpan = '<span class="govuk-error-message" id="'+ errorSpanId +'">'+this.escapeHtml(error.message)+'</span>';
  var control = $("#" + error.fieldName);
  var fieldContainer = control.parents(".govuk-form-group");
  var label = fieldContainer.find('label');
  var legend = fieldContainer.find("legend");
  var fieldset = fieldContainer.find("fieldset");
  fieldContainer.addClass('govuk-form-group--error');
  if(legend.length) {
    legend.after(errorSpan);
    fieldContainer.attr('aria-invalid', 'true');
    MOJFrontend.addAttributeValue(fieldset[0], 'aria-describedby', errorSpanId);
  } else {
    label.after(errorSpan);
    control.attr('aria-invalid', 'true');
    MOJFrontend.addAttributeValue(control[0], 'aria-describedby', errorSpanId);
  }
};

MOJFrontend.FormValidator.prototype.removeInlineErrors = function() {
  var error;
  var i;
  for (var i = 0; i < this.errors.length; i++) {
    this.removeInlineError(this.errors[i]);
  }
};

MOJFrontend.FormValidator.prototype.removeInlineError = function(error) {
  var control = $("#" + error.fieldName);
  var fieldContainer = control.parents(".govuk-form-group");
  fieldContainer.find('.govuk-error-message').remove();
  fieldContainer.removeClass('govuk-form-group--error');
  fieldContainer.find("[aria-invalid]").attr('aria-invalid', 'false');
  var errorSpanId = error.fieldName + '-error';
  MOJFrontend.removeAttributeValue(fieldContainer.find('[aria-describedby]')[0], 'aria-describedby', errorSpanId);
};

MOJFrontend.FormValidator.prototype.addValidator = function(fieldName, rules) {
  this.validators.push({
    fieldName: fieldName,
    rules: rules,
    field: this.form.elements[fieldName]
  });
};

MOJFrontend.FormValidator.prototype.validate = function() {
  this.errors = [];
  var validator = null,
    validatorReturnValue = true,
    i,
    j;
  for (i = 0; i < this.validators.length; i++) {
    validator = this.validators[i];
    for (j = 0; j < validator.rules.length; j++) {
      validatorReturnValue = validator.rules[j].method(validator.field,
        validator.rules[j].params);

      if (typeof validatorReturnValue === 'boolean' && !validatorReturnValue) {
        this.errors.push({
          fieldName: validator.fieldName,
          message: validator.rules[j].message
        });
        break;
      } else if(typeof validatorReturnValue === 'string') {
        this.errors.push({
          fieldName: validatorReturnValue,
          message: validator.rules[j].message
        });
        break;
      }
    }
  }
  return this.errors.length === 0;
};
if(MOJFrontend.dragAndDropSupported() && MOJFrontend.formDataSupported() && MOJFrontend.fileApiSupported()) {
  MOJFrontend.MultiFileUpload = function(params) {
    this.defaultParams = {
      uploadFileEntryHook: $.noop,
      uploadFileExitHook: $.noop,
      uploadFileErrorHook: $.noop,
      fileDeleteHook: $.noop,
      uploadStatusText: 'Uploading files, please wait',
      dropzoneHintText: 'Drag and drop files here or',
      dropzoneButtonText: 'Choose files'
    };

    this.params = $.extend({}, this.defaultParams, params);
    this.container = $(this.params.container);

    this.container.addClass('moj-multi-file-upload--enhanced');

    this.feedbackContainer = this.container.find('.moj-multi-file__uploaded-files');
    this.setupFileInput();
    this.setupDropzone();
    this.setupLabel();
    this.setupStatusBox();
    this.container.on('click', '.moj-multi-file-upload__delete', $.proxy(this, 'onFileDeleteClick'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupDropzone = function() {
    this.fileInput.wrap('<div class="moj-multi-file-upload__dropzone" />');
    this.dropzone = this.container.find('.moj-multi-file-upload__dropzone');
    this.dropzone.on('dragover', $.proxy(this, 'onDragOver'));
    this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave'));
    this.dropzone.on('drop', $.proxy(this, 'onDrop'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupLabel = function() {
    this.label = $('<label for="'+this.fileInput[0].id+'" class="govuk-button govuk-button--secondary">'+ this.params.dropzoneButtonText +'</label>');
    this.dropzone.append('<p class="govuk-body">' + this.params.dropzoneHintText + '</p>');
    this.dropzone.append(this.label);
  };

  MOJFrontend.MultiFileUpload.prototype.setupFileInput = function() {
    this.fileInput = this.container.find('.moj-multi-file-upload__input');
    this.fileInput.on('change', $.proxy(this, 'onFileChange'));
    this.fileInput.on('focus', $.proxy(this, 'onFileFocus'));
    this.fileInput.on('blur', $.proxy(this, 'onFileBlur'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupStatusBox = function() {
    this.status = $('<div aria-live="polite" role="status" class="govuk-visually-hidden" />');
    this.dropzone.append(this.status);
  };

  MOJFrontend.MultiFileUpload.prototype.onDragOver = function(e) {
  	e.preventDefault();
  	this.dropzone.addClass('moj-multi-file-upload--dragover');
  };

  MOJFrontend.MultiFileUpload.prototype.onDragLeave = function() {
  	this.dropzone.removeClass('moj-multi-file-upload--dragover');
  };

  MOJFrontend.MultiFileUpload.prototype.onDrop = function(e) {
  	e.preventDefault();
  	this.dropzone.removeClass('moj-multi-file-upload--dragover');
    this.feedbackContainer.removeClass('moj-hidden');
    this.status.html(this.params.uploadStatusText);
  	this.uploadFiles(e.originalEvent.dataTransfer.files);
  };

  MOJFrontend.MultiFileUpload.prototype.uploadFiles = function(files) {
    for(var i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  };

  MOJFrontend.MultiFileUpload.prototype.onFileChange = function(e) {
    this.feedbackContainer.removeClass('moj-hidden');
    this.status.html(this.params.uploadStatusText);
    this.uploadFiles(e.currentTarget.files);
    this.fileInput.replaceWith($(e.currentTarget).val('').clone(true));
    this.setupFileInput();
    this.fileInput.focus();
  };

  MOJFrontend.MultiFileUpload.prototype.onFileFocus = function(e) {
    this.label.addClass('moj-multi-file-upload--focused');
  };

  MOJFrontend.MultiFileUpload.prototype.onFileBlur = function(e) {
    this.label.removeClass('moj-multi-file-upload--focused');
  };

  MOJFrontend.MultiFileUpload.prototype.getSuccessHtml = function(success) {
    return '<span class="moj-multi-file-upload__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg> ' + success.messageHtml + '</span>';
  };

  MOJFrontend.MultiFileUpload.prototype.getErrorHtml = function(error) {
    return '<span class="moj-multi-file-upload__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg> '+ error.message +'</span>';
  };

  MOJFrontend.MultiFileUpload.prototype.getFileRowHtml = function(file) {
    var html = '';
    html += '<div class="govuk-summary-list__row moj-multi-file-upload__row">';
    html += '  <div class="govuk-summary-list__value moj-multi-file-upload__message">';
    html +=       '<span class="moj-multi-file-upload__filename">'+file.name+'</span>';
    html +=       '<span class="moj-multi-file-upload__progress">0%</span>';
    html += '  </div>';
    html += '  <div class="govuk-summary-list__actions moj-multi-file-upload__actions"></div>';
    html += '</div>';
    return html;
  };

  MOJFrontend.MultiFileUpload.prototype.getDeleteButtonHtml = function(file) {
    var html = '<button class="moj-multi-file-upload__delete govuk-button govuk-button--secondary govuk-!-margin-bottom-0" type="button" name="delete" value="' + file.filename + '">';
    html += 'Delete <span class="govuk-visually-hidden">' + file.originalname + '</span>';
    html += '</button>';
    return html;
  };

  MOJFrontend.MultiFileUpload.prototype.uploadFile = function(file) {
    this.params.uploadFileEntryHook(this, file);
    var formData = new FormData();
    formData.append('documents', file);
    var item = $(this.getFileRowHtml(file));
    this.feedbackContainer.find('.moj-multi-file-upload__list').append(item);

    $.ajax({
      url: this.params.uploadUrl,
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success: $.proxy(function(response){
        if(response.error) {
          item.find('.moj-multi-file-upload__message').html(this.getErrorHtml(response.error));
          this.status.html(response.error.message);
        } else {
          item.find('.moj-multi-file-upload__message').html(this.getSuccessHtml(response.success));
          this.status.html(response.success.messageText);
        }
        item.find('.moj-multi-file-upload__actions').append(this.getDeleteButtonHtml(response.file));
        this.params.uploadFileExitHook(this, file, response);
      }, this),
      error: $.proxy(function(jqXHR, textStatus, errorThrown) {
        this.params.uploadFileErrorHook(this, file, jqXHR, textStatus, errorThrown);
      }, this),
      xhr: function() {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(e) {
          if (e.lengthComputable) {
            var percentComplete = e.loaded / e.total;
            percentComplete = parseInt(percentComplete * 100, 10);
            item.find('.moj-multi-file-upload__progress').text(' ' + percentComplete + '%');
          }
        }, false);
        return xhr;
      }
    });
  };

  MOJFrontend.MultiFileUpload.prototype.onFileDeleteClick = function(e) {
    e.preventDefault(); // if user refreshes page and then deletes
    var button = $(e.currentTarget);
    var data = {};
    data[button[0].name] = button[0].value;
    $.ajax({
      url: this.params.deleteUrl,
      type: 'post',
      dataType: 'json',
      data: data,
      success: $.proxy(function(response){
        if(response.error) {
          // handle error
        } else {
          button.parents('.moj-multi-file-upload__row').remove();
          if(this.feedbackContainer.find('.moj-multi-file-upload__row').length === 0) {
            this.feedbackContainer.addClass('moj-hidden');
          }
        }
        this.params.fileDeleteHook(this, response);
      }, this)
    });
  };
}

MOJFrontend.MultiSelect = function(options) {
  this.container = $(options.container);

  if (this.container.data('moj-multi-select-initialised')) {
    return
  }

  this.container.data('moj-multi-select-initialised', true);

  this.toggle = $(this.getToggleHtml());
  this.toggleButton = this.toggle.find('input');
  this.toggleButton.on('click', $.proxy(this, 'onButtonClick'));
  this.container.append(this.toggle);
  this.checkboxes = $(options.checkboxes);
  this.checkboxes.on('click', $.proxy(this, 'onCheckboxClick'));
  this.checked = options.checked || false;
};

MOJFrontend.MultiSelect.prototype.getToggleHtml = function() {
  var html = '';
  html += '<div class="govuk-checkboxes__item govuk-checkboxes--small moj-multi-select__checkbox">';
  html += '  <input type="checkbox" class="govuk-checkboxes__input" id="checkboxes-all">';
  html += '  <label class="govuk-label govuk-checkboxes__label moj-multi-select__toggle-label" for="checkboxes-all">';
  html += '    <span class="govuk-visually-hidden">Select all</span>';
  html += '  </label>';
  html += '</div>';
  return html;
};

MOJFrontend.MultiSelect.prototype.onButtonClick = function(e) {
  if(this.checked) {
    this.uncheckAll();
    this.toggleButton[0].checked = false;
  } else {
    this.checkAll();
    this.toggleButton[0].checked = true;
  }
};

MOJFrontend.MultiSelect.prototype.checkAll = function() {
  this.checkboxes.each($.proxy(function(index, el) {
    el.checked = true;
  }, this));
  this.checked = true;
};

MOJFrontend.MultiSelect.prototype.uncheckAll = function() {
  this.checkboxes.each($.proxy(function(index, el) {
    el.checked = false;
  }, this));
  this.checked = false;
};

MOJFrontend.MultiSelect.prototype.onCheckboxClick = function(e) {
  if(!e.target.checked) {
    this.toggleButton[0].checked = false;
    this.checked = false;
  } else {
    if(this.checkboxes.filter(':checked').length === this.checkboxes.length) {
      this.toggleButton[0].checked = true;
      this.checked = true;
    }
  }
};

MOJFrontend.PasswordReveal = function(element) {
  this.el = element;
  var $el = $(this.el)

  if ($el.data('moj-password-reveal-initialised')) {
    return
  }

  $el.data('moj-password-reveal-initialised', true);
  $el.attr('spellcheck', 'false');

  $el.wrap('<div class="moj-password-reveal"></div>');
  this.container = $(this.el).parent();
  this.createButton();
};

MOJFrontend.PasswordReveal.prototype.createButton = function() {
  this.button = $('<button type="button" class="govuk-button govuk-button--secondary moj-password-reveal__button">Show <span class="govuk-visually-hidden">password</span></button>');
  this.container.append(this.button);
  this.button.on('click', $.proxy(this, 'onButtonClick'));
};

MOJFrontend.PasswordReveal.prototype.onButtonClick = function() {
  if (this.el.type === 'password') {
    this.el.type = 'text';
    this.button.html('Hide <span class="govuk-visually-hidden">password</span>');
  } else {
    this.el.type = 'password';
    this.button.html('Show <span class="govuk-visually-hidden">password</span>');
  }
};

if('contentEditable' in document.documentElement) {
  MOJFrontend.RichTextEditor = function(options) {
    this.options = options;
    this.options.toolbar = this.options.toolbar || {
      bold: false,
      italic: false,
      underline: false,
      bullets: true,
      numbers: true
    };
    this.textarea = this.options.textarea;
    this.container = $(this.textarea).parent();

    if (this.container.data('moj-rich-text-editor-initialised')) {
      return
    }

    this.container.data('moj-rich-text-editor-initialised', true);

    this.createToolbar();
    this.hideDefault();
    this.configureToolbar();
    this.keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40
    };
    this.container.on('click', '.moj-rich-text-editor__toolbar-button', $.proxy(this, 'onButtonClick'));
    this.container.find('.moj-rich-text-editor__content').on('input', $.proxy(this, 'onEditorInput'));
    this.container.find('label').on('click', $.proxy(this, 'onLabelClick'));
    this.toolbar.on('keydown', $.proxy(this, 'onToolbarKeydown'));
  };

  MOJFrontend.RichTextEditor.prototype.onToolbarKeydown = function(e) {
    var focusableButton;
    switch(e.keyCode) {
      case this.keys.right:
      case this.keys.down:
        focusableButton = this.toolbar.find('button[tabindex=0]');
        var nextButton = focusableButton.next('button');
        if(nextButton[0]) {
          nextButton.focus();
          focusableButton.attr('tabindex', '-1');
          nextButton.attr('tabindex', '0');
        }
        break;
      case this.keys.left:
      case this.keys.up:
        focusableButton = this.toolbar.find('button[tabindex=0]');
        var previousButton = focusableButton.prev('button');
        if(previousButton[0]) {
          previousButton.focus();
          focusableButton.attr('tabindex', '-1');
          previousButton.attr('tabindex', '0');
        }
        break;
    }
  };

  MOJFrontend.RichTextEditor.prototype.getToolbarHtml = function() {
    var html = '';

    html += '<div class="moj-rich-text-editor__toolbar" role="toolbar">';

    if(this.options.toolbar.bold) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--bold" type="button" data-command="bold"><span class="govuk-visually-hidden">Bold</span></button>';
    }

    if(this.options.toolbar.italic) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--italic" type="button" data-command="italic"><span class="govuk-visually-hidden">Italic</span></button>';
    }

    if(this.options.toolbar.underline) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--underline" type="button" data-command="underline"><span class="govuk-visually-hidden">Underline</span></button>';
    }

    if(this.options.toolbar.bullets) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--unordered-list" type="button" data-command="insertUnorderedList"><span class="govuk-visually-hidden">Unordered list</span></button>';
    }

    if(this.options.toolbar.numbers) {
      html += '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--ordered-list" type="button" data-command="insertOrderedList"><span class="govuk-visually-hidden">Ordered list</span></button>';
    }

    html += '</div>';
    return html;
  };

  MOJFrontend.RichTextEditor.prototype.getEnhancedHtml = function(val) {
    return this.getToolbarHtml() + '<div class="govuk-textarea moj-rich-text-editor__content" contenteditable="true" spellcheck="false"></div>';
  };

  MOJFrontend.RichTextEditor.prototype.hideDefault = function() {
    this.textarea = this.container.find('textarea');
    this.textarea.addClass('govuk-visually-hidden');
    this.textarea.attr('aria-hidden', true);
    this.textarea.attr('tabindex', '-1');
  };

  MOJFrontend.RichTextEditor.prototype.createToolbar = function() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'moj-rich-text-editor';
    this.toolbar.innerHTML = this.getEnhancedHtml();
    this.container.append(this.toolbar);
    this.toolbar = this.container.find('.moj-rich-text-editor__toolbar');
    this.container.find('.moj-rich-text-editor__content').html(this.textarea.val());
  };

  MOJFrontend.RichTextEditor.prototype.configureToolbar = function() {
    this.buttons = this.container.find('.moj-rich-text-editor__toolbar-button');
    this.buttons.prop('tabindex', '-1');
    var firstTab = this.buttons.first();
    firstTab.prop('tabindex', '0');
  };

  MOJFrontend.RichTextEditor.prototype.onButtonClick = function(e) {
    document.execCommand($(e.currentTarget).data('command'), false, null);
  };

  MOJFrontend.RichTextEditor.prototype.getContent = function() {
    return this.container.find('.moj-rich-text-editor__content').html();
  };

  MOJFrontend.RichTextEditor.prototype.onEditorInput = function(e) {
    this.updateTextarea();
  };

  MOJFrontend.RichTextEditor.prototype.updateTextarea = function() {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    this.textarea.val(this.getContent());
  };

  MOJFrontend.RichTextEditor.prototype.onLabelClick = function(e) {
    e.preventDefault();
    this.container.find('.moj-rich-text-editor__content').focus();
  };

}

MOJFrontend.SearchToggle = function (options) {
  this.options = options;
  this.container = $(this.options.search.container);
  this.toggleButtonContainer = $(this.options.toggleButton.container);

  if (this.container.data("moj-search-toggle-initialised")) {
    return;
  }

  this.container.data("moj-search-toggle-initialised", true);

  const svg =
    '<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="moj-search-toggle__button__icon"><path d="M7.433,12.5790048 C6.06762625,12.5808611 4.75763941,12.0392925 3.79217348,11.0738265 C2.82670755,10.1083606 2.28513891,8.79837375 2.28699522,7.433 C2.28513891,6.06762625 2.82670755,4.75763941 3.79217348,3.79217348 C4.75763941,2.82670755 6.06762625,2.28513891 7.433,2.28699522 C8.79837375,2.28513891 10.1083606,2.82670755 11.0738265,3.79217348 C12.0392925,4.75763941 12.5808611,6.06762625 12.5790048,7.433 C12.5808611,8.79837375 12.0392925,10.1083606 11.0738265,11.0738265 C10.1083606,12.0392925 8.79837375,12.5808611 7.433,12.5790048 L7.433,12.5790048 Z M14.293,12.579 L13.391,12.579 L13.071,12.269 C14.2300759,10.9245158 14.8671539,9.20813198 14.866,7.433 C14.866,3.32786745 11.5381325,-1.65045755e-15 7.433,-1.65045755e-15 C3.32786745,-1.65045755e-15 -1.65045755e-15,3.32786745 -1.65045755e-15,7.433 C-1.65045755e-15,11.5381325 3.32786745,14.866 7.433,14.866 C9.208604,14.8671159 10.9253982,14.2296624 12.27,13.07 L12.579,13.39 L12.579,14.294 L18.296,20 L20,18.296 L14.294,12.579 L14.293,12.579 Z"></path></svg>';

  this.toggleButton = $(
    '<button class="moj-search-toggle__button" type="button" aria-haspopup="true" aria-expanded="false">' +
      this.options.toggleButton.text +
      svg +
      "</button>"
  );
  this.toggleButton.on("click", $.proxy(this, "onToggleButtonClick"));
  this.toggleButtonContainer.append(this.toggleButton);
  $(document).on("click", this.onDocumentClick.bind(this));
  $(document).on("focusin", this.onDocumentClick.bind(this));
};

MOJFrontend.SearchToggle.prototype.showMenu = function () {
  this.toggleButton.attr("aria-expanded", "true");
  this.container.removeClass("moj-js-hidden");
  this.container.find("input").first().focus();
};

MOJFrontend.SearchToggle.prototype.hideMenu = function () {
  this.container.addClass("moj-js-hidden");
  this.toggleButton.attr("aria-expanded", "false");
};

MOJFrontend.SearchToggle.prototype.onToggleButtonClick = function () {
  if (this.toggleButton.attr("aria-expanded") == "false") {
    this.showMenu();
  } else {
    this.hideMenu();
  }
};

MOJFrontend.SearchToggle.prototype.onDocumentClick = function (e) {
  if (
    !$.contains(this.toggleButtonContainer[0], e.target) &&
    !$.contains(this.container[0], e.target)
  ) {
    this.hideMenu();
  }
};

MOJFrontend.SortableTable = function(params) {
	this.table = $(params.table);

	if (this.table.data('moj-search-toggle-initialised')) {
		return
	}

	this.table.data('moj-search-toggle-initialised', true);

	this.setupOptions(params);
	this.body = this.table.find('tbody');
	this.createHeadingButtons();
	this.createStatusBox();
  this.initialiseSortedColumn();
	this.table.on('click', 'th button', $.proxy(this, 'onSortButtonClick'));
};

MOJFrontend.SortableTable.prototype.setupOptions = function(params) {
	params = params || {};
	this.statusMessage = params.statusMessage || 'Sort by %heading% (%direction%)';
	this.ascendingText = params.ascendingText || 'ascending';
	this.descendingText = params.descendingText || 'descending';
};

MOJFrontend.SortableTable.prototype.createHeadingButtons = function() {
	var headings = this.table.find('thead th');
	var heading;
	for(var i = 0; i < headings.length; i++) {
		heading = $(headings[i]);
		if(heading.attr('aria-sort')) {
			this.createHeadingButton(heading, i);
		}
	}
};

MOJFrontend.SortableTable.prototype.createHeadingButton = function(heading, i) {
	var text = heading.text();
	var button = $('<button type="button" data-index="'+i+'">'+text+'</button>');
	heading.text('');
	heading.append(button);
};

MOJFrontend.SortableTable.prototype.createStatusBox = function() {
	this.status = $('<div aria-live="polite" role="status" aria-atomic="true" class="govuk-visually-hidden" />');
	this.table.parent().append(this.status);
};

MOJFrontend.SortableTable.prototype.initialiseSortedColumn = function () {
  var rows = this.getTableRowsArray();

  this.table.find("th")
    .filter('[aria-sort="ascending"], [aria-sort="descending"]')
    .first()
    .each((index, el) => {
      var sortDirection = $(el).attr('aria-sort');
      var columnNumber = $(el).find('button').attr('data-index');
      var sortedRows = this.sort(rows, columnNumber, sortDirection);
      this.addRows(sortedRows);
    })
};

MOJFrontend.SortableTable.prototype.onSortButtonClick = function(e) {
	var columnNumber = e.currentTarget.getAttribute('data-index');
	var sortDirection = $(e.currentTarget).parent().attr('aria-sort');
	var newSortDirection;
	if(sortDirection === 'none' || sortDirection === 'descending') {
		newSortDirection = 'ascending';
	} else {
		newSortDirection = 'descending';
	}
	var rows = this.getTableRowsArray();
	var sortedRows = this.sort(rows, columnNumber, newSortDirection);
	this.addRows(sortedRows);
	this.removeButtonStates();
	this.updateButtonState($(e.currentTarget), newSortDirection);
};

MOJFrontend.SortableTable.prototype.updateButtonState = function(button, direction) {
	button.parent().attr('aria-sort', direction);
	var message = this.statusMessage;
	message = message.replace(/%heading%/, button.text());
	message = message.replace(/%direction%/, this[direction+'Text']);
	this.status.text(message);
};

MOJFrontend.SortableTable.prototype.removeButtonStates = function() {
	this.table.find('thead th').attr('aria-sort', 'none');
};

MOJFrontend.SortableTable.prototype.addRows = function(rows) {
	for(var i = 0; i < rows.length; i++) {
		this.body.append(rows[i]);
	}
};

MOJFrontend.SortableTable.prototype.getTableRowsArray = function() {
	var rows = [];
	var trs = this.body.find('tr');
	for (var i = 0; i < trs.length; i++) {
		rows.push(trs[i]);
	}
    return rows;
};

MOJFrontend.SortableTable.prototype.sort = function(rows, columnNumber, sortDirection) {
	var newRows = rows.sort((function(rowA, rowB) {
		var tdA = $(rowA).find('td,th').eq(columnNumber);
		var tdB = $(rowB).find('td,th').eq(columnNumber);
		
		var valueA = sortDirection === 'ascending' ? this.getCellValue(tdA) : this.getCellValue(tdB);
		var valueB = sortDirection === 'ascending' ? this.getCellValue(tdB) : this.getCellValue(tdA);

		if (typeof valueA === 'string' || typeof valueB === 'string') return valueA.toString().localeCompare(valueB.toString());
		return valueA-valueB;
	}.bind(this)));
	return newRows;
};

MOJFrontend.SortableTable.prototype.getCellValue = function(cell) {
	var val = cell.attr('data-sort-value') || cell.html();

	var floatVal = parseFloat(val)
	return isNaN(floatVal) ? val : floatVal
};

return MOJFrontend;
}));
