type Props = { size?: number } & React.SVGAttributes<SVGElement>;

export function TrashIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         {...props}
      >
         <path
            fill="currentColor"
            d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
         ></path>
         <path fill="currentColor" d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
      </svg>
   );
}

export function EditIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 1024 1024"
         {...props}
      >
         <path
            fill="currentColor"
            d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
            strokeWidth={30}
            stroke="currentColor"
         ></path>
         <path
            fill="currentColor"
            d="m469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
            strokeWidth={0}
            stroke="currentColor"
         ></path>
      </svg>
   );
}

export function PriorityIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 256 256"
         {...props}
      >
         <path
            fill="currentColor"
            d="M122 136V80a6 6 0 0 1 12 0v56a6 6 0 0 1-12 0m6 26a10 10 0 1 0 10 10a10 10 0 0 0-10-10m110-34a13.82 13.82 0 0 1-4.09 9.86l-96 96.06a14 14 0 0 1-19.72 0l-96-96.06a13.93 13.93 0 0 1 0-19.72l96.05-96.06a14 14 0 0 1 19.72 0l96 96.06A13.82 13.82 0 0 1 238 128m-12 0a1.94 1.94 0 0 0-.57-1.38l-96.05-96.06a2 2 0 0 0-2.76 0l-96.05 96.06a2 2 0 0 0 0 2.76l96.05 96.06a2 2 0 0 0 2.76 0l96.05-96.06A1.94 1.94 0 0 0 226 128"
            strokeWidth={6.5}
            stroke="currentColor"
         ></path>
      </svg>
   );
}

export function StopWatchIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         {...props}
      >
         <path
            fill="currentColor"
            d="M12 20a7 7 0 0 1-7-7a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7m7.03-12.61l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0-9 9a9 9 0 0 0 9 9c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M11 14h2V8h-2m4-7H9v2h6z"
         ></path>
      </svg>
   );
}

export function CalendarIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         {...props}
      >
         <path
            fill="currentColor"
            d="M12 12h5v5h-5zm7-9h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 2v2H5V5zM5 19V9h14v10z"
         ></path>
      </svg>
   );
}

export function EmptyIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 256 256"
         {...props}
      >
         <path
            fill="currentColor"
            d="m198.24 62.63l15.68-17.25a8 8 0 0 0-11.84-10.76L186.4 51.86A95.95 95.95 0 0 0 57.76 193.37l-15.68 17.25a8 8 0 1 0 11.84 10.76l15.68-17.24A95.95 95.95 0 0 0 198.24 62.63M48 128a80 80 0 0 1 127.6-64.25l-107 117.73A79.63 79.63 0 0 1 48 128m80 80a79.55 79.55 0 0 1-47.6-15.75l107-117.73A79.95 79.95 0 0 1 128 208"
         ></path>
      </svg>
   );
}

export function HourGlassIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 384 512"
         {...props}
      >
         <path
            fill="currentColor"
            d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24h8v19c0 40.3 16 79 44.5 107.5l81.6 81.5l-81.6 81.5C48 366 32 404.7 32 445v19h-8c-13.3 0-24 10.7-24 24s10.7 24 24 24h336c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8v-19c0-40.3-16-79-44.5-107.5L225.9 256l81.5-81.5C336 146 352 107.3 352 67V48h8c13.3 0 24-10.7 24-24S373.3 0 360 0zm168 289.9l81.5 81.5C293 391 304 417.4 304 445v19H80v-19c0-27.6 11-54 30.5-73.5zm0-67.9l-81.5-81.5C91 121 80 94.6 80 67V48h224v19c0 27.6-11 54-30.5 73.5L192 222.1z"
         ></path>
      </svg>
   );
}

export function ChevronIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         {...props}
      >
         <path
            fill="none"
            stroke="currentColor"
            strokeDasharray={12}
            strokeDashoffset={12}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8l-7 7M12 8l7 7"
         >
            <animate
               fill="freeze"
               attributeName="stroke-dashoffset"
               dur="0.3s"
               values="12;0"
            ></animate>
         </path>
      </svg>
   );
}

export function Dot({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 48 48"
         {...props}
      >
         <path
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={4}
            d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"
         ></path>
      </svg>
   );
}

export function CheckMarkIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 12 12"
         {...props}
      >
         <path
            fill="currentColor"
            d="M9.765 3.205a.75.75 0 0 1 .03 1.06l-4.25 4.5a.75.75 0 0 1-1.075.015L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.705 1.704l3.72-3.939a.75.75 0 0 1 1.06-.03"
         ></path>
      </svg>
   );
}

export function WarningIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 512 512"
         {...props}
      >
         <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M85.57 446.25h340.86a32 32 0 0 0 28.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0 0 28.17 47.17"
         ></path>
         <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="m250.26 195.39l5.74 122l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 5.95"
         ></path>
         <path
            fill="currentColor"
            d="M256 397.25a20 20 0 1 1 20-20a20 20 0 0 1-20 20"
         ></path>
      </svg>
   );
}

export function PlusIcon({ size = 20, ...props }: Props) {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         {...props}
      >
         <g fill="none">
            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
            <path
               fill="currentColor"
               d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
            ></path>
         </g>
      </svg>
   );
}
