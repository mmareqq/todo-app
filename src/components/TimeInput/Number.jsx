function Number({ num, active }) {
   const className = active ? 'num-active number' : 'number';
   const numFormatted = num.toString().padStart(2, '0');
   return (
      <button type="button" className={className}>
         <div className="num-inner">{numFormatted}</div>
      </button>
   );
}
export default Number;
