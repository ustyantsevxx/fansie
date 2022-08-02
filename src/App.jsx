import { range } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useMouse } from 'react-use'
import { random } from 'tinycolor2'

export const App = () => {
  const [lineCount] = useState(3)
  const [spaceBetween] = useState(12)
  const [lineHeight] = useState(48)

  const [colors, setColors] = useState([])
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')

  const generateColors = () => {
    setColors(range(lineCount).map(() => random().toString()))
    setBackgroundColor(random().toString())
  }

  useEffect(() => {
    generateColors()
  }, [])

  const containerRef = useRef(null)
  const mousePosition = useMouse(containerRef)

  const [hoveredLineIndex, setHoveredLineIndex] = useState(-1)
  const [titleHovered, setTitleHovered] = useState(false)
  const [setupHovered, setSetupHovered] = useState(false)
  const [setupOpened, setSetupOpened] = useState(false)
  const [mouseDown, setMouseDown] = useState(false)

  return (
    <main
      className="relative h-full w-full !cursor-none transition duration-500"
      style={{ backgroundColor }}
      ref={containerRef}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
    >
      <div className="absolute inset-x-0 top-[10%] z-10 flex flex-col items-center justify-center">
        <motion.button
          className="cursor-none select-none pb-6 text-9xl font-extrabold leading-[0.8] text-[#00000010] outline-none"
          transition={{ duration: 0.25 }}
          animate={{
            scale: titleHovered ? 1.01 : 1,
            color: titleHovered ? '#00000040' : undefined
          }}
          onMouseEnter={() => setTitleHovered(true)}
          onMouseLeave={() => setTitleHovered(false)}
          onClick={() => generateColors()}
        >
          generate
        </motion.button>

        <motion.button
          className="mt-6 cursor-none select-none pb-6 text-4xl font-extrabold leading-[0.8] text-[#00000010] outline-none"
          transition={{ duration: 0.25 }}
          animate={{
            scale: setupHovered ? 1.01 : 1,
            color: setupHovered ? '#00000040' : undefined
          }}
          onMouseEnter={() => setSetupHovered(true)}
          onMouseLeave={() => setSetupHovered(false)}
          onClick={() => setSetupOpened(!setupOpened)}
        >
          setup
        </motion.button>
      </div>

      <motion.div
        className="h-4 w-4 rounded-full bg-white"
        transition={{ type: 'spring', mass: 0.9, damping: 50, stiffness: 1000 }}
        animate={{
          opacity:
            hoveredLineIndex !== -1 || titleHovered || setupHovered
              ? 0
              : mouseDown
              ? 0.75
              : 1,
          scale:
            hoveredLineIndex !== -1 || titleHovered || setupHovered
              ? 2
              : mouseDown
              ? 0.75
              : 1,
          x: mousePosition.elX - 8,
          y: mousePosition.elY - 8
        }}
      />

      <div
        className="absolute inset-0 z-0"
        onMouseEnter={() => setHoveredLineIndex(-1)}
      />

      <div
        className="absolute inset-x-0 bottom-1/3 translate-y-1/2 transition duration-500"
        style={{ backgroundColor }}
      >
        <ul className="flex flex-col" style={{ gap: spaceBetween }}>
          {range(lineCount).map(i => (
            <motion.li
              onMouseEnter={() => setHoveredLineIndex(i)}
              className="w-full"
              transition={{ duration: 0.5 }}
              animate={{
                backgroundColor: colors[i],
                filter:
                  hoveredLineIndex !== -1 && hoveredLineIndex !== i
                    ? 'brightness(0.9)'
                    : 'brightness(1)'
              }}
              style={{
                height: lineHeight
              }}
              key={i}
            ></motion.li>
          ))}
        </ul>
      </div>

      {setupOpened && (
        <div className="absolute top-1/2 left-1/2 mt-12 -translate-y-1/2 -translate-x-1/2">
          <div className="rounded-xl bg-black/10 p-12 shadow-xl backdrop-blur-xl"></div>
        </div>
      )}
    </main>
  )
}
