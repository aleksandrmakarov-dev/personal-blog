export const Ol = (props: any) => {
  const { node, ...other } = props;
  return <ol className="list-inside list-decimal mb-4 pl-10" {...other} />;
};
