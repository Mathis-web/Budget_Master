import {Button, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function showModal({isOpen, onClickPositive, onClickNegative, content}) {
    return (
        <Modal
        size="mini"
        open={isOpen}
        >
            <Modal.Content>
                <p>{content}</p>
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={onClickNegative}>
                Non
            </Button>
            <Button positive onClick={onClickPositive}>
                Oui
            </Button>
            </Modal.Actions>
      </Modal>
    );  
};

showModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickPositive: PropTypes.func.isRequired,
    onClickNegative: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
}

export default showModal;