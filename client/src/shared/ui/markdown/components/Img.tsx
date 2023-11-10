export const Img = (props: any) => {
  const { node, ...other } = props;
  return (
    <span className="block">
      <img className="rounded-md mb-2 max-h-[28rem] w-full object-cover object-center" {...other} />
      {other.title && (
        <span className="text-center text-foreground-secondary block">
          {other.title}
        </span>
      )}
    </span>
  );
};
