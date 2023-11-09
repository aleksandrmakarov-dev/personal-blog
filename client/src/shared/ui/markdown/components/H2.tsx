export const H2 = (props: any) => {
  const { node, ...other } = props;
  return <h2 className="text-[2rem] font-semibold mb-2 pt-5" {...other} />;
};
