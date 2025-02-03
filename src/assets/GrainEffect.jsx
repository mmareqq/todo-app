const PaperTexture = () => {
   return (
      <div
         className="grain-texture"
         style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9999,
            background: 'gray', // Paper base color
            mixBlendMode: 'multiply',
            opacity: 1,
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
                  baseFrequency="10"
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
   );
};

export default PaperTexture;
