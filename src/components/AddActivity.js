import { useState } from "react";
import BASE_URL from "../utils";

const AddActivity = (props) => {
  const token = props.token;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleAddActivity = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const info = await resp.json();
    if (info.isPublic === true) {
      props.setActivities([info, ...props.activites]);
    }
  };
  return (
    <>
      <form onSubmit={handleAddActivity}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="checkbox"
          defaultChecked={isPublic}
          onChange={() => {
            setIsPublic(!isPublic);
          }}
        ></input>
        <br></br>
        <button type="submit">ADD ACTIVITY</button>
      </form>
    </>
  );
};
export default AddActivity;
