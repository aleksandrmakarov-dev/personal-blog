export const Img = (props: any) => {
  const { node, ...other } = props;

  return (
    <a target="_blank" href={props.src}>
      <span className="block">
        <img
          className="rounded-md mb-2 max-h-[28rem] max-w-full mx-auto"
          {...other}
        />
        {other.alt && (
          <span className="text-center text-foreground-secondary block">
            {other.alt}
          </span>
        )}
      </span>
    </a>
  );
};
