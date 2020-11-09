import { createRef } from "react"
import { Vector3 } from "three"

const state = {
  sections: 9,
  pages: 8,
  zoom: 75,
  paragraphs: [
    {
      offset: 1,
      factor: 1.75,
      header: "Educación",
      image: "/unt.jpg",
      aspect: 1.51,
      text: "5 años de preparación academica en cursos de programación, gestión de bases de datos, inteligencia artificial, sistemas inteligentes, visión computacional, redes entre otros."
    },
    {
      offset: 2,
      factor: 2.0,
      header: "Certificaciones",
      image: "/certificaciones.jpg",
      aspect: 1.5,
      text:
        "TECSUP, Google y NEXTECH"
    },
    {
      offset: 3,
      factor: 2.25,
      header: "Skills",
      image: "/skills.jpg",
      aspect: 1.5037,
      text:
        "Dominio de Python, Java, C++, React, React Native, PHP, Javascript, SQL entre otros"
    },
    {
      offset: 4,
      factor: 1.75,
      header: "Consultoría",
      image: "/asesoria.jpg",
      aspect: 1.55,
      text:
        "Consultoría de sistemas ERP, empotrados e Internet de las cosas."
    },
    {
      offset: 5,
      factor: 2.0,
      header: "Proyectos",
      image: "/apps.jpg",
      aspect: 0.665,
      text:
        "Tienes la idea para una app, sistema, programa? Contactame para presupuestar."
    },
    { 
      offset: 7, 
      factor: 1.05, 
      header: "Contáctame", 
      image: "/telefono.jpg", 
      aspect: 1.77, 
      text: "Contacta conmigo para consultorías o proyectos." 
    }
  ],
  stripes: [
    { offset: 0, color: "#000", height: 13 },
    { offset: 6.3, color: "#000", height: 20 }
  ],
  diamonds: [
    { x: 0, offset: 0.15, pos: new Vector3(), scale: 0.6, factor: 1.8 },
    { x: 2, offset: 1.1, pos: new Vector3(), scale: 0.8, factor: 2.1 },
    { x: -5, offset: 2, pos: new Vector3(), scale: 0.8, factor: 2.5 },
    { x: 0, offset: 3.2, pos: new Vector3(), scale: 0.8, factor: 1.75 },
    { x: 0, offset: 4, pos: new Vector3(), scale: 0.8, factor: 2.5 },
    { x: 2, offset: 5.5, pos: new Vector3(), scale: 1.25, factor: 0.85 },
    { x: -5, offset: 7, pos: new Vector3(), scale: 0.8, factor: 2 },
    { x: 0, offset: 8, pos: new Vector3(), scale: 1.5, factor: 6 }
  ],
  top: createRef()
}

export default state