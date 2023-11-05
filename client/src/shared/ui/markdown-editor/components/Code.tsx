export const Code = (props: any) => {
  const { node, ...other } = props;
  return (
    <code
      className="bg-primary-100 rounded-md px-1 py-[1px] text-blue-600"
      {...other}
    />
  );
};
