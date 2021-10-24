import './styles.css'

function ControlButton({label, onClickHandler}) {
    return(
        <div className = "control-button">
            <button onClick={onClickHandler}>
                <span>{label}</span>
            </button>
        </div>
    );
}

export default ControlButton;
