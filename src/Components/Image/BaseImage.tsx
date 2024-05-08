import { extend, useLoader, BufferGeometryNode } from '@react-three/fiber'
import { geometry } from 'maath'
import { ComponentType, ReactElement, Suspense, useEffect } from 'react'
import { TextureLoader, DoubleSide, Side } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js'
import { useRoomReady } from '../../provider/RoomReadyProvider'

interface BaseImageProps {
  src: string
  size?: number
  radius?: number
  side?: Side
  isBasicMaterial?: boolean
  waitForLoading?: boolean
}

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

declare module '@react-three/fiber' {
  interface ThreeElements {
    roundedPlaneGeometry: BufferGeometryNode<RoundedBoxGeometry, typeof RoundedBoxGeometry>
  }
}

function BaseImage({ src, size = 1, radius = 0.1, side = DoubleSide, isBasicMaterial = false }: BaseImageProps): JSX.Element {
  const texture = useLoader(TextureLoader, src, undefined, (event: ProgressEvent<EventTarget>) => { console.log(event) })
  const ratio = texture.source.data.height / texture.source.data.width

  return (
    <>
      <roundedPlaneGeometry args={[size, size * ratio, size * radius]} onUpdate={self => self.computeVertexNormals()} />

      {isBasicMaterial
        ? <meshBasicMaterial map={texture} side={side} transparent />
        : <meshStandardMaterial map={texture} side={side} transparent />
      }
    </>
  )
}

interface IsImageReadyProps {
  waitForLoading?: boolean
}


export function IsImageReady({ waitForLoading = false }: IsImageReadyProps): JSX.Element {
  const { addImageReady } = useRoomReady()
  useEffect(() => {
    if (waitForLoading) addImageReady()
  }, [addImageReady, waitForLoading])

  return <></>
}

function WrappedBaseImage(props: BaseImageProps): JSX.Element {
  return (
    <Suspense>
      <BaseImage {...props} />

      <IsImageReady waitForLoading={props.waitForLoading} />
    </Suspense>
  )
}

export default WrappedBaseImage

export interface WithBaseImage {
  baseImage: ReactElement<BaseImageProps>
}

export function withBaseImage<T extends WithBaseImage, ImplImageType = Omit<T, keyof BaseImageProps>>(
  ImageImpl: ComponentType<ImplImageType>
) {
  type PropsType = Omit<BaseImageProps & ImplImageType, keyof WithBaseImage>

  return ({ src, size, radius, side, isBasicMaterial, waitForLoading, ...props }: PropsType) => {
    const baseImageProps = { src, size, radius, side, isBasicMaterial, waitForLoading }

    return (
      <ImageImpl
        {...(props as ImplImageType)}
        baseImage={<WrappedBaseImage {...baseImageProps} />} />
    )
  }
}