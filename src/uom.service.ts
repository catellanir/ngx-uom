import { Injectable } from '@angular/core';

let UNIT = {
  Speed: { MILES_PER_HOUR: 'mph', KILOMETRE_PER_HOUR: 'km/h', METRE_PER_SECOND: 'm/s', KNOT: 'kn' },
  Distance: { MILLIMETRE: 'mm', INCH: 'in', KILOMETRE: 'km', MILE: 'M', METRE: 'm', YARDS: 'y' },
  Pressure: { HECTOPASCAL: 'hPa', PASCAL: 'Pa', BAR: 'bar' },
  Temperature: { CELSIUS: 'c', FAHRENHEIT: 'f', KELVIN: 'k' },
  Duration: { HOUR: 'h', MINUTE: 'm', SECOND: 's' },
  Mass: { KILOGRAM: 'kg', GRAM: 'g', MILLIGRAM: 'mg', OUNCE: 'oz', POUND: 'lb' }
};

let DEFINITIONS = {
  'mph': {
    key: UNIT.Speed.MILES_PER_HOUR,
    base: UNIT.Speed.KILOMETRE_PER_HOUR,
    factor: 1.609344
  },
  'km/h': {
    factor: 1,
    key: UNIT.Speed.KILOMETRE_PER_HOUR,
    base: null
  },
  'm/s': {
    key: UNIT.Speed.METRE_PER_SECOND,
    base: UNIT.Speed.KILOMETRE_PER_HOUR,
    factor: 3.6
  },
  'kn': {
    key: UNIT.Speed.KNOT,
    base: UNIT.Speed.KILOMETRE_PER_HOUR,
    factor: 1.852
  },

  'km': {
    key: UNIT.Distance.KILOMETRE,
    base: 'm',
    factor: 1000,
    name: {
      de: 'Kilometer',
      en: 'Kilometer',
      en_GB: 'Kilometre'
    },
    plural: {
      en: 'Kilometers',
      en_GB: 'Kilometres'
    }
  },
  'm': {
    factor: 1,
    key: UNIT.Distance.METRE,
    base: null, // equals factor of 1
    name: {
      de: 'Meter',
      en: 'Meter',
      en_GB: 'Metre'
    },
    plural: {
      en: 'Meters',
      en_GB: 'Metres'
    }
  },
  'mm': {
    key: UNIT.Distance.MILLIMETRE,
    base: 'm',
    factor: 0.001
  },
  'in': {
    key: UNIT.Distance.INCH,
    base: 'm',
    factor: 0.0254
  },
  'hPa': {
    key: UNIT.Pressure.HECTOPASCAL,
    base: 'Pa',
    factor: 100,
    name: {
      de: 'Hektopascal',
      en: 'Hectopascal',
      en_GB: 'Hectopascal'
    },
    plural: {
      en: 'Hectopascals'
    }
  },
  'Pa': {
    key: UNIT.Pressure.PASCAL,
    factor: 1,
    base: null,
    name: {
      de: 'Pascal',
      en: 'Pascal',
      en_GB: 'Pascal'
    },
    plural: {
      en: 'Pascals'
    }
  },
  'bar': {
    key: UNIT.Pressure.BAR,
    base: 'Pa',
    factor: 1000000,
    name: {
      de: 'Bar',
      en: 'Bar',
      en_GB: 'Bar'
    },
    plural: {
      en: 'Bars'
    }
  },
  'c': {
    factor: 1,
    key: UNIT.Temperature.CELSIUS,
    base: null
  },
  'f': {
    key: UNIT.Temperature.FAHRENHEIT,
    base: UNIT.Temperature.CELSIUS,
    factor: function (value, reverse) {
      if (reverse) {
        return value * 1.8 + 32;
      }

      return (value - 32) * 5 / 9;
    }
  },
  'k': {
    key: UNIT.Temperature.KELVIN,
    base: UNIT.Temperature.CELSIUS,
    factor: function (value, reverse) {
      /**
       * Really strange rounding error:
       * (100 - 273.15) gives -173.14999999999998 (tested in Chrome 26.0.1410.63)
       *
       * Following workarounds:
       */
      if (reverse) {
        return parseFloat((value + 273 + 0.15).toFixed(10));
      }

      return (value - 273) - 0.15;
    }
  },
  'h': {
    key: UNIT.Duration.HOUR,
    base: 's',
    factor: 3600
  },
  'min': {
    key: UNIT.Duration.MINUTE,
    base: 's',
    factor: 60
  },
  's': {
    key: UNIT.Duration.SECOND,
    base: null,
    factor: 1
  },
  'kg': {
    key: UNIT.Mass.KILOGRAM,
    base: UNIT.Mass.GRAM,
    factor: 1000,
    name: {
      en: 'Kilogram',
    },
    plural: {
      en: 'Kilograms'
    }
  },
  'g': {
    key: UNIT.Mass.GRAM,
    base: null,
    factor: 1,
    name: {
      en: 'Gram',
    },
    plural: {
      en: 'Grams'
    }
  },
  'mg': {
    key: UNIT.Mass.MILLIGRAM,
    base: UNIT.Mass.GRAM,
    factor: 0.001,
    name: {
      en: 'Gram',
    },
    plural: {
      en: 'Grams'
    }
  },
  'oz': {
    key: UNIT.Mass.OUNCE,
    base: UNIT.Mass.GRAM,
    factor: 28.350,
    name: {
      en: 'Ounce',
    },
    plural: {
      en: 'Ounces'
    }
  },
  'lb': {
    key: UNIT.Mass.POUND,
    base: UNIT.Mass.GRAM,
    factor: 453.6,
    name: {
      en: 'Pound',
    },
    plural: {
      en: 'Pounds'
    }
  }
};

@Injectable()
export class UomService {
  convert(value: number, fromUom: string, toUom: string): number {
    let s = DEFINITIONS[fromUom];
    if (!s) {throw 'Invalid uom ' + fromUom; }
    let d = DEFINITIONS[toUom];
    if (!d) {throw 'Invalid uom ' + toUom; }
    const f1 =  (typeof s.factor === 'function') ? s.factor(value, false) : value * s.factor;
    return ((typeof d.factor === 'function') ? d.factor(f1, true) : f1 / d.factor);
  }
}
