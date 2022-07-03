

class Unit {
  name: string;
  shortform: string;
  ratio: number;
  constructor(name: string, short: string, ratio: number) {
    this.name = name;
    this.shortform = short;
    this.ratio = ratio
  }
  toBase(value: number) {
    return value / this.ratio
  }
  fromBase(value: number) {
    return value * this.ratio
  }
}
const lengthUnits = [new Unit("Meter", "m", 1), new Unit("Angstrom", "Å", 10000000000)]

const areaUnits = {}



export const UnitCategories = []