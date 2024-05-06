import { inflate as inflatePako } from 'pako'

type CallbackFn = (data: Uint8Array) => void

let worker: Worker
if(window.Worker)
  worker = new Worker(new URL('./inflate.worker.ts', import.meta.url), { type: 'module' })

function inflateWorker(data: Uint8Array, callback: CallbackFn): void {
  worker.postMessage(data)

  worker.onmessage = (e: MessageEvent<Uint8Array>) => {
    callback(e.data)
  }
}

function inflateSync(data: Uint8Array, callback: CallbackFn): void {
  try {
    const dataInflated = inflatePako(data)
    callback(dataInflated)
  } catch (err) {
    console.log('Decompression error: ' + err)
    return
  }
}

export default async function inflate(data: Uint8Array, callback: CallbackFn): Promise<void> {
  if(window.Worker) {
    inflateWorker(data, callback)
  } else {
    inflateSync(data, callback)
  }
}