export const H1 = (props: any) => {
  const { node, ...other } = props;
  return <h1 className="text-[2.5rem] font-semibold mb-2 pt-5" {...other} />;
};
