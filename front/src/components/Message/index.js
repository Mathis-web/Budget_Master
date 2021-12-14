import './style.scss';
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

function Message({text, isError, endAnimationFunc}) {
    const messageAnimRef = useRef(null);
    const handleEndAnimation = () => {
        endAnimationFunc();
    }

    useEffect(() => {
        messageAnimRef.current.addEventListener('animationend', handleEndAnimation);
    }, []);

    return (
        <>
            {text === ''
                ? <div ref={messageAnimRef}></div>
                : <div ref={messageAnimRef} className={isError ? 'message error' : 'message success'}>
                    <p className="message__text">
                        {text}
                    </p>
                </div>
            }
        </>
    );
}

Message.propTypes = {
    text: PropTypes.string,
    isError: PropTypes.bool,
    endAnimationFunc: PropTypes.func.isRequired
}

Message.defaultProps = {
    text: '',
    isError: false
}


export default Message;