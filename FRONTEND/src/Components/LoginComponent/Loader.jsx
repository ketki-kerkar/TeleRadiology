const Loader = ({ customText }) => {
    return (
        <span>
            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            {customText}
        </span>
    )
}

export default Loader;
