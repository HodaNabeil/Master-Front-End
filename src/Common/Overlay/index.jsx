export default function WithOverLay({ children, ...rest }) {
    return (
        <div className="OverLay" {...rest}>
            {children}
        </div>
    );
}
