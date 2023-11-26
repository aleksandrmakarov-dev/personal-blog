interface HeaderProps {
  value: string;
}

const Header = (props: HeaderProps) => {
  return (
    <h1 className="text-4xl font-bold text-foreground-primary mb-8">
      {props.value}
    </h1>
  );
};

export default Header;
