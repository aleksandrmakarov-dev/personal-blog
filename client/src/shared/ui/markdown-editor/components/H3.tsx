export const H3 = (props: any) => {
  const { node, ...other } = props;
  return <h3 className="text-[1.75rem] font-semibold mb-2 pt-5" {...other} />;
};
