export class DataViewCustom {
  buffer: DataView
  position: number

  constructor(buffer: ArrayBufferLike & { BYTES_PER_ELEMENT?: undefined }) {
    this.buffer = new DataView(buffer)
    this.position = 0
  }

  getBool() {
    const v = this.buffer.getUint8(this.position) != 0
    this.position += 1
    return v
  }

  getUint8() {
    const v = this.buffer.getUint8(this.position)
    this.position += 1
    return v
  }

  getInt8() {
    const v = this.buffer.getInt8(this.position)
    this.position += 1
    return v
  }

  getUint16() {
    const v = this.buffer.getUint16(this.position, true)
    this.position += 2
    return v
  }

  getInt16() {
    const v = this.buffer.getInt16(this.position, true)
    this.position += 2
    return v
  }

  getUint32() {
    const v = this.buffer.getUint32(this.position, true)
    this.position += 4
    return v
  }

  getInt32() {
    const v = this.buffer.getInt32(this.position, true)
    this.position += 4
    return v
  }

  getFloat() {
    const v = this.buffer.getFloat32(this.position, true)
    this.position += 4
    return v
  }

  getString(len?: number) {
    if (len === undefined) len = this.getUint16()
    let str = ''
    for (let i = 0; i < len; ++i) {
      str += String.fromCharCode(this.getUint8())
    }
    return str
  }

  setBool(v: number) {
    this.buffer.setUint8(this.position, v ? 1 : 0)
    this.position += 1
  }

  setUint8(v: number) {
    this.buffer.setUint8(this.position, v)
    this.position += 1
  }

  setInt8(v: number) {
    this.buffer.setInt8(this.position, v)
    this.position += 1
  }

  setUint16(v: number) {
    this.buffer.setUint16(this.position, v, true)
    this.position += 2
  }

  setInt16(v: number) {
    this.buffer.setInt16(this.position, v, true)
    this.position += 2
  }

  setUint32(v: number) {
    this.buffer.setUint32(this.position, v, true)
    this.position += 4
  }

  setInt32(v: number) {
    this.buffer.setInt32(this.position, v, true)
    this.position += 4
  }

  setFloat(v: number) {
    this.buffer.setFloat32(this.position, v, true)
    this.position += 4
  }
}