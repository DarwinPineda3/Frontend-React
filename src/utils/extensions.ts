import { parseISO } from "date-fns";

Object.defineProperty(
  String.prototype,
  'capitalize',
  {
    value: function () {
      return this.charAt(0).toUpperCase() + this.slice(1)
    },
    writable: true,
    configurable: true,
  }
);

Object.defineProperty(
  String.prototype,
  'toDateString',
  {
    value: function () {
      return parseISO(this).toLocaleString()
    },
    writable: true,
    configurable: true,
  }
);
