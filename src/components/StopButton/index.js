import './styles.css'

function StopButton(props) {

    return(

        <div className = "stop-button">
            <button onClick={props.onClickStopHandler}>
            <h1>STOP</h1>
            </button>

        </div>

    );
}

export default StopButton;
