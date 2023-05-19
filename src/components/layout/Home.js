import React from "react";
import { realtime } from "../../configs/Firebase";
import firebase, { onValue, ref, update } from "firebase/database";
import "./helper.css";

// Force firebase database to use long polling instead of websockets
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Slider";
import Nav from "../../layout/Nav";

const Home = () => {
  const [userdata, setuserdata] = React.useState([]);
  const [messages_inp, setmessages_inp] = React.useState([]);
  const [curr_user, setuser] = React.useState({});
  const [global_data, setglobal_data] = React.useState({});
  const nav = useNavigate();
  React.useEffect(() => {
    let user = JSON.parse(window.localStorage.getItem("user"));
    if (user && user.name) {
      setuser(user);
      const query = ref(realtime, "allusers");
      return onValue(query, (snapshot) => {
        var raw_data = snapshot.val();

        if (snapshot.exists()) {
          console.log("data", raw_data["bob"]);
          if (!raw_data[user.name]) {
            console.log("not exist");
            var email = user.email;
            raw_data = {
              ...raw_data,
              [user.name]: {
                name: user.name,
                token: user.token,
                chats: [
                  {
                    name: user.name,
                    url: user.url,
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
            // ref(realtime,"allusers").set();
            update(ref(realtime, "allusers"), raw_data);
          }
          setglobal_data(raw_data);
          setuserdata(raw_data);
        }
      });
    }
  }, []);
  const pushmessage = (e) => {
    e.preventDefault();
    let data = {
      message: messages_inp,
      sender: curr_user.name,
      time: Date.now(),
    };
    message.messages.push(data);
    setglobal_data({
      ...global_data,
      [curr_user.name]: {
        ...global_data[curr_user.name],
        chats: [
          ...global_data[curr_user.name].chats,
          {
            ...global_data[curr_user.name].chats[0],
            messages: [...global_data[curr_user.name].chats[0].messages, data],
          },
        ],
      },
    });

    update(ref(realtime, "allusers"), global_data);
    setmessages_inp("");
  };
  const [message, setmessage] = React.useState({});
  const setMessageScreen = (e, data) => {
    e.preventDefault();
    setmessage(data);
    console.log("data", data);
  };
  return (
    <>
      {console.log("jsjsjsjsj", Object.values(userdata))}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />

            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-12 col-md-4 order-1">
                  <div>
                    <div className="contacts">
                      <i className="fas fa-bars fa-2x"></i>
                      <h2>Chats</h2>
                      <div className="contact">
                        {Object.values(userdata).map((item, id) => {
                          return item.name != curr_user.name
                            ? (console.log("hsiahhyx", item.chats[0]["name"]),
                              (
                                <>
                                  <div
                                    key={id}
                                    onClick={(e) =>
                                      setMessageScreen(e, item.chats[0])
                                    }
                                    className="pic rogers"
                                    style={{
                                      backgroundImage: `url(${item.chats[0]["url"]})`,
                                    }}
                                    // data-message={item.url}
                                  ></div>

                                  <div className="badge">1</div>
                                  <div className="name">{item.name}</div>
                                  <div className="message">
                                    {item.chats[0]["messages"][0]["message"]}
                                  </div>
                                </>
                              ))
                            : null;
                        })}
                      </div>
                    </div>
                    {message.name ? (
                      <div className="chat">
                        <div className="contact bar">
                          <div
                            className="pic "
                            style={{ backgroundImage: `url(${message.url})` }}
                          ></div>
                          <div className="name">{message.name}</div>
                          <div className="seen">Today at 12:56</div>
                        </div>
                        <div className="messages" id="chat">
                          <div className="time">{message.messages[0].time}</div>

                          {message.messages?.map((item) => {
                            return (
                              <>
                                {item.sender == curr_user.name ? (
                                  <div className="message parker">
                                    {item.message}<br/>
                                    <span>{item.sender}</span>
                                  </div>
                                ) : (
                                  <div className="message stark">
                                    {item.message}
                                    <br/>
                                    <span>{item.sender}</span>
                                    
                                  </div>
                                )}
                              </>
                            );
                          })}
                          <div className="message stark">
                            <div className="typing typing-1"></div>
                            <div className="typing typing-2"></div>
                            <div className="typing typing-3"></div>
                          </div>
                        </div>
                        <div className="input">
                          <i className="fas fa-camera"></i>
                          <i className="far fa-laugh-beam"></i>
                          <input
                            onChange={(e) => setmessages_inp(e.target.value)}
                            placeholder="Type your message here!"
                            type="text"
                          />
                          <i
                            onClick={pushmessage}
                            className="ri-send-plane-fill"
                          ></i>
                        </div>
                      </div>
                    ) : (
                      <div className="chat contact">
                        <div className="name startchat">
                          Click on a chat to start messaging{" "}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
