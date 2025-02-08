export default function Hr({ height = '1px', className, ...props }) {
   return (
      <div
         className={className + ' w-full bg-black'}
         style={{ height: height }}
         {...props}
      ></div>
   );
}
