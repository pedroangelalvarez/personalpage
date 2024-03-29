import React, { Suspense, useEffect, useRef, useMemo } from "react"
import { Canvas, Dom, useLoader, useFrame } from "react-three-fiber"
import { TextureLoader, LinearFilter } from "three"
import lerp from "lerp"
import { Text, MultilineText } from "./components/Text"
import Cpps from "./obj/Cpps"
import Plane from "./components/Plane"
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Block, useBlock } from "./blocks"
import { Helmet } from 'react-helmet'
import state from "./store"
import "./App.css"

const TITLE = 'Pedro Alvarez'

function Startup() {
  const ref = useRef()
  useFrame(() => (ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 0.025)))
  return <Plane ref={ref} color="#303030" position={[0, 0, 200]} scale={[100, 100, 1]} />
}

function Paragraph({ image, index, offset, factor, header, aspect, text }) {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
  const size = aspect < 1 && !mobile ? 0.45 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * state.zoom * size
  const left = !(index % 2)
  const color = index % 2 ? "#e30000" : "#19c6ff"
  return (
    <Block factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane map={image} args={[1, 1, 25, 25]} shift={75} size={size} aspect={aspect} scale={[w * size, (w * size) / aspect, 1]} frustumCulled={false} />
        <Dom
          style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "right" }}
          position={[left || mobile ? (-w * size) / 2 : 0, (-w * size) / 2 / aspect - 0.4, 1]}>
          <div tabIndex={index}>{text}</div>
        </Dom>
        <Text left={left} right={!left} size={w * 0.04} color={color} top position={[((left ? -w : w) * size) / 2, (w * size) / aspect / 2 + 0.5, -1]}>
          {header}
        </Text>
        <Block factor={0.2}>
          <Text opacity={0.5} size={w * 0.1} color="#1A1E2A" position={[((left ? w : -w) / 2) * size, (w * size) / aspect / 1.5, -10]}>
            {"" + (index + 1)}
          </Text>
        </Block>
      </group>
    </Block>
  )
}

function Content() {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  )
  useMemo(() => images.forEach(texture => (texture.minFilter = LinearFilter)), [images])
  const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock()
  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <Text center size={w * 0.08} position={[0, 0.15, -1]} color="#dddddd">
            Bienvenido
          </Text>
        </Block>
      </Block>
      <Block factor={1.3} offset={0.4}>
        <Block factor={1.3}>
          <Text center size={w * 0.08} position={[0, 0.5, -1]} color="#1dbc60">
            Pedro Alvarez
          </Text>
        </Block>
        <Block factor={1.0}>
          <Dom position={[-w / 3.2, -w * 0.08 + 0.25, -1]}>Full Stack Developer.{mobile ? <br /> : " "}Bachelor of Computer Science.</Dom>
        </Block>
      </Block>
      <Block factor={1.2} offset={5.7}>
        <MultilineText top left size={w * 0.15} lineHeight={w / 5} position={[-w / 3.5, 0, -1]} color="#2fe8c3" text={"tres\ndos\nuno"} />
      </Block>
      {state.paragraphs.map((props, index) => (
        <Paragraph key={index} index={index} {...props} image={images[index]} />
      ))}
      {state.stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane args={[50, height, 32, 32]} shift={-4} color={color} rotation={[0, 0, Math.PI / 8]} position={[0, 0, -10]} />
        </Block>
      ))}
      <Block factor={1.25} offset={0.4}>
        <Dom className="bottom-center" position={[-canvasWidth / 2, -canvasHeight / 2, 100]}>
          Hope.
        </Dom>
      </Block>
    </>
  )
}

function App() {
  const scrollArea = useRef()
  const onScroll = e => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <Canvas className="canvas" concurrent pixelRatio={1} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
          <Content />
          <Cpps />
          <Startup />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
        ))}
      </div>
      <div className="frame">
        <div className="frame__nav">
          <a className="frame__link" href="#0" children="Inicio" />
          <a className="frame__link" href="#1" children="Educación" />
          <a className="frame__link" href="#2" children="Certificaciones" />
          <a className="frame__link" href="#3" children="Skills" />
          <a className="frame__link" href="#4" children="Consultoría" />
          <a className="frame__link" href="#5" children="Proyectos" />
          <a className="frame__link" href="#6" children="Contáctame" />
        </div>
        <div className="frame__links">
          <a className="frame__link" href="https://github.com/pedroangelalvarez">
            <GitHubIcon/>
          </a>
          <a className="frame__link" href="https://www.instagram.com/the.thinkerr/">
            <InstagramIcon/>
          </a>
          <a className="frame__link" href="https://wa.link/j8zb9a">
            <WhatsAppIcon/>
          </a>
        </div>
      </div>
    </>
  )
}


export default App;
