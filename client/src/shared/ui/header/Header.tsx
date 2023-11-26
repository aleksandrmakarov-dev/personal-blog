interface HeaderProps {
  value: string;
  action?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  return (
    <div className="flex items-start gap-2 w-full justify-between">
      <h1 className="text-4xl font-bold text-foreground-primary mb-8">
        {props.value}
      </h1>
      {props.action}
    </div>
  );
};

export default Header;
