import React from "react";
import ListMessages from "../components/ListMessages";
import MessageForm from "../components/forms/MessageForm";
import UserForm from "../components/forms/UserForm";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <div style={{ display: "flex" }}>
      <div>
        <ListMessages />
        {user && <MessageForm />}
      </div>
      <div>
        {!user && <UserForm />}
        {user && <span>hi, {user.login}</span>}
        {user && <button>log out</button>}
      </div>
    </div>
  );
};

export default HomePage;
