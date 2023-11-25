interface PostImageProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
}

export function PostImage(props: PostImageProps) {
  const { image, ...other } = props;
  return (
    <div {...other}>
      <img
        className="mb-2 h-96 w-full rounded-lg object-cover object-center"
        alt="Post image"
        src={image}
      />
    </div>
  );
}
