import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ModalAddNew({ show, handleClose }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleAddUser = () => {
    console.log("name = ", name, "job = ", job);
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
