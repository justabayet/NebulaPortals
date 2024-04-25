import { Material, Mesh, OrthographicCamera, PlaneGeometry, Renderer } from 'three'

class FullScreenQuad<TMaterial extends Material = Material> {
  public camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  public geometry = new PlaneGeometry(2, 2)
  private mesh: Mesh<PlaneGeometry, TMaterial>

  constructor(material: TMaterial) {
    this.mesh = new Mesh(this.geometry, material)
  }

  public get material(): TMaterial {
    return this.mesh.material
  }

  public set material(value: TMaterial) {
    this.mesh.material = value
  }

  public dispose(): void {
    this.mesh.geometry.dispose()
  }

  public render(renderer: Renderer): void {
    renderer.render(this.mesh, this.camera)
  }
}

export default FullScreenQuad