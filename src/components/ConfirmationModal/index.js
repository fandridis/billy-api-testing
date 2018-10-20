import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

class ConfirmationModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.props.text}</Modal.Body>

          <Modal.Footer>
            <Button onClick={()=>this.props.onClose(false)}>Maybe not</Button>
            <Button onClick={()=>this.props.onClose(true)} bsStyle="primary">Sure thing</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool
};

ConfirmationModal.defaultProps = {
  title: 'Confirm your action',
  text: 'Are you sure?'
}

export default ConfirmationModal;