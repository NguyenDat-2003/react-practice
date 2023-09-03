import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalConfirm({
  show,
  handleClose,
  dataUserDelete,
  handleDeleteUserFromModal,
}) {
  const handleConfirm = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res.statusCode == 204) {
      toast.success("Delete user success");
      handleDeleteUserFromModal(dataUserDelete.id);
      handleClose();
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Do you want to delete this user? <br />
            <b>email: {dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalConfirm;
