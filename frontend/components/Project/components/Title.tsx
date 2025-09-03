import EditProjectButton from './EditProjectButton';

type Props = {
   title: string;
   isEditable: boolean;
};

const Title = ({ title, isEditable }: Props) => {
   return (
      <div className="border-primary-500 flex items-end justify-between border-b-1 py-2">
         <h2 className="pt-4 text-2xl">{title}</h2>
         {isEditable && <EditProjectButton label={`edit ${title} title`} />}
      </div>
   );
};

export default Title;
