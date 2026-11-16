import { useEffect, useRef } from 'react'
import {
  AdditiveBlending, AmbientLight, CanvasTexture, CircleGeometry, Color, CylinderGeometry, DirectionalLight, DoubleSide, Group,
  LatheGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, Scene, SphereGeometry, Vector2, WebGLRenderer,
} from 'three'

/** Текстура цифры: рисуем на canvas и вешаем на плоскость (никаких внешних шрифтов/файлов — CSP-friendly). */
function digitTexture(char: string): CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  if (ctx) {
    ctx.font = '700 220px "PT Serif", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(13,23,38,.45)'
    ctx.shadowBlur = 18
    ctx.fillStyle = '#ffffff'
    ctx.fillText(char, 128, 140)
  }
  const t = new CanvasTexture(c)
  t.anisotropy = 4
  return t
}

export default function UfoScene() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'

    const scene = new Scene()
    const camera = new PerspectiveCamera(40, 1, 0.1, 100)
    scene.add(new AmbientLight(0xffffff, 1.1))
    const sun = new DirectionalLight(0xffffff, 2.2)
    sun.position.set(3, 6, 5)
    scene.add(sun)

    // --- НЛО ---
    const ufo = new Group()
    const profile = [[0, -0.32], [0.9, -0.26], [2.0, -0.12], [2.7, 0.04], [2.75, 0.14], [2.3, 0.26], [1.2, 0.36], [0, 0.4]].map(([x, y]) => new Vector2(x, y))
    const bodyMat = new MeshStandardMaterial({ color: 0x1a6dff, metalness: 0.35, roughness: 0.35 })
    const body = new Mesh(new LatheGeometry(profile, 64), bodyMat)
    const dome = new Mesh(new SphereGeometry(0.95, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), new MeshStandardMaterial({ color: 0x27508f, metalness: 0.2, roughness: 0.5 }))
    dome.position.y = 0.36
    dome.scale.set(1, 1.05, 1)
    const lights = new Group()
    const lightMat = new MeshBasicMaterial({ color: 0xdff6ff })
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2
      const bulb = new Mesh(new SphereGeometry(0.12, 12, 12), lightMat)
      bulb.position.set(Math.cos(a) * 2.1, -0.02, Math.sin(a) * 2.1)
      lights.add(bulb)
    }
    const hole = new Mesh(new CircleGeometry(0.8, 40), new MeshBasicMaterial({ color: 0xdff6ff, side: DoubleSide }))
    hole.rotation.x = Math.PI / 2
    hole.position.y = -0.33
    ufo.add(body, dome, lights, hole)
    ufo.position.y = 2.3
    ufo.scale.setScalar(0.85)

    // --- луч ---
    const beamMat = new MeshBasicMaterial({ color: new Color(0xcdf2f0), transparent: true, opacity: 0.38, side: DoubleSide, depthWrite: false, blending: AdditiveBlending })
    const beam = new Mesh(new CylinderGeometry(0.7, 1.9, 4, 48, 1, true), beamMat)
    beam.position.y = 0.2
    const pad = new Mesh(new CircleGeometry(1.9, 48), new MeshBasicMaterial({ color: 0x1a6dff, transparent: true, opacity: 0.55 }))
    pad.rotation.x = -Math.PI / 2
    pad.position.y = -1.78
    pad.scale.set(1, 0.9, 1)

    // --- 3D-цифры 404 внутри луча ---
    const digits = new Group()
    const textures: CanvasTexture[] = []
    ;['4', '0', '4'].forEach((ch, i) => {
      const tex = digitTexture(ch)
      textures.push(tex)
      const m = new Mesh(new PlaneGeometry(1.5, 1.5), new MeshBasicMaterial({ map: tex, transparent: true, side: DoubleSide, depthWrite: false }))
      m.position.set((i - 1) * 1.15, 0, i === 1 ? 0.3 : 0)
      m.userData.phase = i * 1.3
      digits.add(m)
    })
    digits.position.y = -0.6

    const world = new Group()
    world.add(ufo, beam, pad, digits)
    scene.add(world)

    const target = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    const resize = () => {
      const w = el.clientWidth || 1
      const h = el.clientHeight || 1
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.position.set(0, 0.2, 9.5 * Math.max(1, 1.25 / camera.aspect))
      camera.lookAt(0, 0.2, 0)
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    let raf = 0
    const clock = performance.now()
    const frame = () => {
      const t = (performance.now() - clock) / 1000
      if (!reduce) {
        ufo.position.y = 2.3 + Math.sin(t * 1.4) * 0.12
        ufo.rotation.y = t * 0.6
        ufo.rotation.z = Math.sin(t * 0.9) * 0.05
        beamMat.opacity = 0.32 + Math.sin(t * 2.2) * 0.06
        digits.children.forEach((d, i) => {
          const ph = Number(d.userData.phase ?? 0)
          d.rotation.y = Math.sin(t * 0.9 + ph) * 0.9 + t * 0.15 * (i === 1 ? 2 : 0)
          d.position.y = Math.sin(t * 1.3 + ph) * 0.12
        })
      }
      world.rotation.y += (target.x * 0.35 - world.rotation.y) * 0.06
      world.rotation.x += (target.y * 0.12 - world.rotation.x) * 0.06
      renderer.render(scene, camera)
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      textures.forEach((t) => t.dispose())
      scene.traverse((o) => {
        if (o instanceof Mesh) {
          o.geometry.dispose()
          const m = o.material
          if (Array.isArray(m)) m.forEach((x) => x.dispose()); else m.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} className="absolute inset-0" role="img" aria-label="Летающая тарелка с цифрами 404 в луче света" />
}
