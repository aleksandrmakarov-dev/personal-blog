export const Img = (props: any) => {
  const { node, ...other } = props;
  return (
    <span className="block">
      <img className="rounded-md mb-2" {...other} />
      {other.title && (
        <span className="text-center text-foreground-secondary block">
          {other.title}
        </span>
      )}
    </span>
  );
};
