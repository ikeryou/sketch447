import { Color } from "three";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Func } from "../core/func";

// -----------------------------------------
//
// -----------------------------------------
export class Line extends MyDisplay {

  private _item: HTMLTextAreaElement

  // アルファベット全部、小文字大文字
  private _txtTable: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  private _size: number = 200
  public get size(): number {
    return this._size
  }

  constructor(opt:any) {
    super(opt)

    this._c = opt.id * 10

    this.addClass('js-line-wrapper')

    this._item = document.createElement('textarea') as HTMLTextAreaElement
    this.useGPU(this._item)

    if(Util.hit(4)) {
      const col = new Color(0,0,0).offsetHSL(Util.random(0, 0.25), 1, 0.5)
      // const colR = new Color(1 - col.r, 1 - col.g, 1 - col.b)
      Tween.set(this._item, {
        // color: colR.getStyle(),
        backgroundColor: col.getStyle()
      })
    }

    this.el.appendChild(this._item)

    this._resize()
  }

  public setSize(size:number):void {
    this._size = size
    Tween.set(this._item, {
      width: size - 10,
      height: size,
      x: 0,
      y: 0,
    })
  }


  protected _update():void {
    super._update()

    const rad = Math.sin(this._c * 0.01)
    let t = ''
    const numMax = Util.map(rad, 0, 100, -1, 1)
    for (let i = 0; i < numMax; i++) {
      t += this._txtTable[(this._c + i) % this._txtTable.length]
    }
    this._item.value = t

    Tween.set(this._item, {
      fontSize: Util.map(rad, Func.val(20, 50), 10, -1, 1),
    })
  }

  protected  _resize(): void {
    super._resize()
  }
}







