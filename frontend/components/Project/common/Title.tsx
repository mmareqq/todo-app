import type { Children } from '@frontend/data/types';
type Props = { title: string } & Children;

const Title = ({ title, children }: Props) => {
   return (
      <div className="border-primary-500 flex items-end justify-between border-b-1 py-2">
         <h2 className="pt-4 text-2xl">{title}</h2>
         {children}
      </div>
   );
};

export default Title;
