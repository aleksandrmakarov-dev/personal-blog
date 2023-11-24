export const Img = (props: any) => {
  const { node, ...other } = props;
  return (
    <span className="block">
      <img
        className="rounded-md mb-2 max-h-[28rem] max-w-full mx-auto"
        {...other}
      />
      {other.title && (
        <span className="text-center text-foreground-secondary block">
          {other.title}
        </span>
      )}
    </span>
  );
};
