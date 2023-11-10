interface PostImageProps extends React.HTMLAttributes<HTMLDivElement>{
    image?:string;
    description?:string;
}

export function PostImage(props:PostImageProps){
    const {image,description,...other} = props;
    return(
        <div {...other}>
            <img className="mb-2 h-96 w-full rounded-lg object-cover object-center" alt="Post image" src={image}/>
            {description && <p className="text-foreground-secondary text-center">{description}</p>}
        </div>
    )
}