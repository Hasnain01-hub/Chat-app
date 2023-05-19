import React, { useEffect, useState } from "react";
import { realtime } from "../../configs/Firebase";
import firebase, { onValue, ref, update } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../layout/Slider";
import Nav from "../../layout/Nav";

const JoinGroup = () => {
  const [grp, setgrp] = useState([]);
  const [user, setuser] = useState({});
  useEffect(() => {
    let userdata = JSON.parse(window.localStorage.getItem("user"));
    setuser(userdata);
    if (!userdata || !userdata.name) {
      window.location.href = "/";
    }
  }, []);
  const join = (e, members, item) => {
    e.preventDefault();
    console.log(members);
    if (members.includes(user.name)) {
      toast.error("Already Joined", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    } else {
      members.push(user.name);
      console.log(members);
      const query = ref(realtime, "group");
      return onValue(query, (snapshot) => {
        var raw_data = snapshot.val();

        if (snapshot.exists()) {
          console.log("data", raw_data);
          raw_data = {
            ...raw_data,
            [item.name]: {
              ...raw_data[item.name],
              members: members,
            },
          };
          update(ref(realtime, "group"), raw_data);
        }
      });
    }
  };

  React.useEffect(() => {
    const query = ref(realtime, "group");
    return onValue(query, (snapshot) => {
      var raw_data = snapshot.val();

      if (snapshot.exists()) {
        console.log("group", raw_data);

        setgrp(raw_data);
      }
    });
  }, []);
  return (
    <>
      {console.log(grp)}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                {/* Content */}

                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">
                    {process.env.REACT_APP_NAME} /
                  </span>{" "}
                  Join Groups
                </h4>
                {/* Examples */}
                <div className="row mb-5">
                  {Object.values(grp)?.map((item, i) =>
                    item.members.includes(user.name) ? null : (
                      <div className="col-md-6 col-lg-4 mb-3" key={i}>
                        <div className="card " style={{ height: "450px" }}>
                          <div className="card-body">
                            <img
                              style={{
                                maxWidth: "95%",
                                margin: "10px 0px",
                                // height: "250px",
                              }}
                              src={item.url}
                              alt="items"
                            />
                            <h5 className="card-title">{item.name}</h5>
                            <b>Description :</b>
                            <p className="card-text">{item.desc}</p>

                            <i
                              onClick={(e) => {
                                join(e, item.members, item);
                              }}
                              style={{
                                float: "right",
                                color: "red",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              className="ri-user-add-fill"
                            >
                              {" "}
                              Join Group
                            </i>
                          </div>
                        </div>
                      </div>
                    )
                  )}
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

export default JoinGroup;
