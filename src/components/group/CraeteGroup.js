import React, { useEffect, useState } from "react";
import Header from "../../layout/Slider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "../../layout/Nav";
import firebase, { onValue, ref, update } from "firebase/database";
import { realtime } from "../../configs/Firebase";
const CraeteGroup = () => {
  const initobj = {
    name: "",
    desc: ",",
    url: "",
  };
  const [user, setuser] = useState({});
  useEffect(() => {
    let userdata = JSON.parse(window.localStorage.getItem("user"));
    setuser(userdata);
    if (!userdata || !userdata.name) {
      window.location.href = "/";
    }
  }, []);
  const [group, setgroup] = useState(initobj);
  const handleChange = (e) => {
    setgroup({ ...group, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(group);

    const query = ref(realtime, "group");
    return onValue(query, (snapshot) => {
      var raw_data = snapshot.val();

      if (snapshot.exists()) {
        console.log("data", raw_data);
        if (!raw_data[group.name]) {
          console.log("not exist");

          raw_data = {
            ...raw_data,
            [group.name]: {
              name: group.name,
              owner: user.name,
              members: [user.name],
              desc: group.desc,
              url: group.url,
              chats: [
                {
                  name: "john doe",
                  chat_length: 0,
                  messages: [
                    {
                      message: "hello",
                      sender: "bob",
                      time: "12:00",
                    },
                  ],
                },
              ],
            },
          };
          setgroup(initobj);
          // ref(realtime,"allusers").set();
          update(ref(realtime, "group"), raw_data);

          return;
        }
      }
    });
  };
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">
                    {process.env.REACT_APP_NAME} /
                  </span>{" "}
                  Create Groups
                </h4>
                <div className="row">
                  <div className="col-xl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Group Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Fire on sky"
                            name="name"
                            value={group.name}
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Group Description
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={group.desc}
                            placeholder="We are here to help you"
                            name="desc"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Group Image Url
                          </label>
                          <input
                            value={group.url}
                            type="text"
                            className="form-control"
                            placeholder="httops://image.jpg"
                            name="url"
                            required
                            onChange={handleChange}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CraeteGroup;
