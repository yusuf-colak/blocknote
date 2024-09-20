import { cn } from "@/lib/utils";


export type GoogleIconsProps = {
  icon: string;
  className?: string;
};

const GoogleIcons = ({ icon, className }: GoogleIconsProps) => {
  return (
    <span
      className={cn(
        'material-symbols-outlined  text-primary flex justify-center items-center no-underline',
        className
      )}
    >
      {icon}
    </span>
  );
};

export default GoogleIcons;
