export const Ul = (props: any) => {
  const { node, ...other } = props;
  return <ul className="list-inside list-[square] mb-4 pl-10" {...other} />;
};
