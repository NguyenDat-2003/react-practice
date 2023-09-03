import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { postCreateUser } from "../services/UserService";

function ModalAddNew({ show, handleClose, handleUpdatTable }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleAddUser = async () => {
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Create Success");
      handleUpdatTable({ first_name: name, id: res.id });
    } else {
      toast.error("Songthing Wrong !!!");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
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
          <Button variant="primary" onClick={handleAddUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddNew;
