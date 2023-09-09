import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";

import { useEffect, useState } from "react";
import _ from "lodash";
import { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";

import { fetchAllUser } from "../services/UserService";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import "./TableUsers.scss";
import { toast } from "react-toastify";

function TableUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchUser, setSearchUser] = useState("");
  const [dataExport, setDataExport] = useState([]);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (e) => {
    getUsers(e.selected + 1);
  };

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdatTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEdit = (user) => {
    setIsShowModalEdit(true);
    setDataUserEdit(user);
  };

  const handlePutUser = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDeleteUserFromModal = (id) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== id);
    setListUsers(cloneListUsers);
  };

  const handleSearchUser = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 1000);

  // const csvData = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  // ];

  const getUsersExport = (event, done) => {
    let result = [];
    result.push(["ID", "Email", "Fisrt Name", "Last Name"]);
    if (listUsers && listUsers.length) {
      listUsers.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (e) => {
    if (e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept CSV files !");
      }

      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format header CSV file !");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setListUsers(result);
              }
            } else {
              toast.error("Wrong format CSV file !");
            }
          } else {
            toast.error("Not found data on CSV files !");
          }
        },
      });
    }
  };
  return (
    <>
      <div className="my-3 add-new d-sm-flex">
        <span>
          <b>List Users: </b>
        </span>
        <div className="d-flex mt-sm-0 mt-2">
          <label
            htmlFor="test"
            className="d-flex  align-items-center btn btn-warning px-12 py-6 label-test"
          >
            <i className="pe-1 fa-solid fa-file-import"></i> Import
          </label>
          <input
            id="test"
            type="file"
            hidden
            onChange={(e) => handleImportCSV(e)}
          ></input>

          <CSVLink
            data={dataExport}
            filename={"user.csv"}
            className="btn btn-primary mx-3"
            target="_blank"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-arrow-down"></i> Export
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add New
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search user by Email"
          // value={searchUser}
          onChange={(e) => handleSearchUser(e)}
        />
      </div>
      <div className="customize-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="sort-header">
                <div>
                  <span className="me-3">ID</span>
                  <span>
                    <i className="fa-solid fa-arrow-down-long"></i>
                    <i className="fa-solid fa-arrow-up-long mx-2"></i>
                  </span>
                </div>
              </th>
              <th>Email</th>
              <th>
                <div>
                  <span className="me-3">First Name</span>
                  <span>
                    <i className="fa-solid fa-arrow-down-long"></i>
                    <i className="fa-solid fa-arrow-up-long mx-2"></i>
                  </span>
                </div>
              </th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listUsers &&
              listUsers.length > 0 &&
              listUsers.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdatTable={handleUpdatTable}
      />

      <ModalEditUser
        show={isShowModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handlePutUser={handlePutUser}
      />

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
}

export default TableUsers;
