import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalEditUser({ show, handleClose, dataUserEdit, handlePutUser }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if (res && res.updatedAt) {
      handlePutUser({
        first_name: name,
        id: dataUserEdit.id,
      });

      handleClose();
      toast.success("Update success");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={name}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                type="text"
                value={job}
                className="form-control"
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEditUser;
