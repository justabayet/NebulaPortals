import { inflate } from 'pako'

self.onmessage = (event: MessageEvent<Uint8Array>) => {
  self.postMessage(inflate(event.data))
}

export {}