export class Inc {
  private _x: number
  
  public get x(): number { return this._x }

  constructor(x: number = 0) {
    this._x = x
  }

  public inc() {
    this._x++
  }
}

export { add } from './add'
