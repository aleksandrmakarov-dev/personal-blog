export const H5 = (props: any) => {
  const { node, ...other } = props;
  return <h5 className="text-[1.25rem] font-semibold mb-2 pt-5" {...other} />;
};
