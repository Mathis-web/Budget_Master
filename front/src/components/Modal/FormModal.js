import {Button, Modal, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function CreateModal({isOpen, onSubmitForm, onClickNegative, content, children}) {
    return (
        <Modal
        size="small"
        open={isOpen}
        >
            <Modal.Header>
                <p>{content}</p>
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmitForm}>
                    <Form.Field>
                        {children}
                    </Form.Field>
                    <Modal.Actions style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button positive type="submit">
                            Valider
                        </Button>
                        <Button negative onClick={onClickNegative}>
                            Annuler
                        </Button>
                    </Modal.Actions>
                </Form>
            </Modal.Content>
      </Modal>
    );  
};

CreateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    onClickNegative: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
}

export default CreateModal;