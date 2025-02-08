export default function GrainEffect({
   color = '#000',
   noiseValue = 10,
   opacity = 0.05,
}) {
   console.log(opacity);
   return (
      <div className="grain-texture" style={{ opacity: opacity }}>
         <div
            className="grain-effect"
            style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               pointerEvents: 'none',
               zIndex: 9999,
               backgroundColor: color, // Paper base color
               mixBlendMode: 'multiply',
            }}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 100 100"
               preserveAspectRatio="none"
               style={{
                  width: '100%',
                  height: '100%',
               }}
            >
               <filter id="noiseFilter">
                  <feTurbulence
                     type="fractalNoise"
                     baseFrequency={noiseValue}
                     numOctaves="1"
                     stitchTiles="stitch"
                  />
                  <feColorMatrix type="saturate" values="0" />
                  <feComponentTransfer>
                     <feFuncA type="discrete" tableValues="0 1" />
                  </feComponentTransfer>
               </filter>
               <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
         </div>
      </div>
   );
}
