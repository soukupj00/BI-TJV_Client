const mainSVG = ({fillColor}) => {
    return (
        <svg
            height="42"
            viewBox="0 0 512 512"
            width="42"
            xmlns="http://www.w3.org/2000/svg"
            fill={fillColor}
        >
            <img src="homePic.svg" alt="Logo"/>
        </svg>
    );
};

export default mainSVG;