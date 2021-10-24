import './styles.css'

function ControlButton({label, onClickHandler}) {

    return(

        <div className = "control-button">
            <button onClick={onClickHandler}>
            <h1>{label}</h1>
            </button>

        </div>

    );
}

export default ControlButton;
