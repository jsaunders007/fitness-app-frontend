import { useEffect, useState } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import BASE_URL from "../utils";
import AddActivity from "./AddActivity";

const Activities = (props) => {
  const [activities, setActivities] = useState([]);

  const [activityId, setActivityId] = useState("");

  const fetchActivities = async () => {
    const resp = await fetch(`${BASE_URL}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setActivities(result);
      })
      .catch(console.error);
  };

  const deleteActivity = async (activityId) => {
    const resp = await fetch(`${BASE_URL}/activities/${activityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Autorization: `Bearer ${props.token}`,
      },
    });
    fetchActivities();
  };
  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <div>
      {props.user && (
        <>
          <Link to="/activities/new">ADD ACTIVITY</Link>
          <Route path="/activities/new">
            <AddActivity
              activities={activities}
              token={props.user.token}
              setActivities={setActivities}
            />
          </Route>
        </>
      )}

      {activities.map((activity) => {
        return (
          <>
            <div key={activity._id}>
              <h3 key={activity._id}>NAME: {activity.name}</h3>
              <br></br>
              <b key={activity._id}>DESCRIPTION: {activity.description}</b>
              <br></br>

              <button
                onClick={() => {
                  setActivityId(activity._id);
                  deleteActivity(activityId);
                }}
              >
                DELETE ACTIVITY
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Activities;
