/**
@module Autonumeric
@description ### Additional Dependencies ###

 - **[autoNumeric](http://www.decorplanit.com/plugin/) (1.9.27 or higher)** Used to format money values

---

The Autonumeric directive wraps up the autoNumeric jQuery plugin.  It allows for formatting any kind of number, including currency.  This directive must be used in conjunction with the `ngModel` directive where the property bound to `ngModel` is the raw numeric value on your model.

### Autonumeric Options ###

 - `bb-autonumeric` This  can optionally be assigned the name of a property from the `bbAutonumericConfig` object.  If none is specified, it defaults to `number`.
 - `bb-autonumeric-settings` This can be assigned a value that represents a settings object that can be passed to autoNumeric.  These options will override any default options specified in the `bb-autonumeric` attribute.  A complete list of options is available [here](http://www.decorplanit.com/plugin/).

### Autonumeric Filter ###

In addition to the directive, there is also a filter that can be used to format numbers.  The filter has the added feature of optionally abbreviating a number according to Sky patterns.  For instance,
numbers over 10,000 will be displayed as 10k, over 1,000,000 as 1m, and 1,000,000,000 as 1b.  The filter takes three arguments:

 - `input` The value to format.
 - `configType` The name of the configuration (`number` or `money`) to apply to the value.
 - `abbreviate` A Boolean value indicating whether to abbreviate large numbers.
 */
