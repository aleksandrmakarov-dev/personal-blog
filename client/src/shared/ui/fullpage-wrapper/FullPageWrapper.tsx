const FullPageWrapper = (props:React.PropsWithChildren<{}>) => {
    const {children} = props;
    return(
        <div className="min-h-screen flex items-center justify-center">
            {children}
        </div>
    )
}

export default FullPageWrapper;