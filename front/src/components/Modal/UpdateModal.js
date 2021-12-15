import {Button, Modal, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function UpdateModal({isOpen, onSubmitForm, onClickNegative, content, value}) {
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
                        <label>Nom</label>
                        <input type="text" placeholder="Nom de la catégorie" defaultValue={value} name="name"/>
                    </Form.Field>
                    <Modal.Actions style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button positive type="submit">
                            Modifier
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

UpdateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    onClickNegative: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}

export default UpdateModal;