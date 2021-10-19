import { useEffect, useState } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import BASE_URL from "../utils";
import AddRoutine from "./AddRoutine";

const Routines = (props) => {
  const [routines, setRoutines] = useState([]);
  const [routineId, setRoutineId] = useState("");

  const fetchRoutines = async () => {
    const resp = await fetch(`${BASE_URL}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setRoutines(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const deleteRoutine = async (routineId) => {
    const resp = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    fetchRoutines();
  };
  return (
    <div>
      {props.user && (
        <>
          <Link to="/routines/new">ADD ROUTINE</Link>
          <Route path="/routines/new">
            <AddRoutine
              routines={routines}
              token={props.user.token}
              setRoutines={setRoutines}
            />
          </Route>
        </>
      )}

      {routines.map((routine) => {
        return (
          <>
            <div key={routine._id}>
              <h3 key={routine._id}>NAME: {routine.name}</h3>
              <br></br>
              <b key={routine._id}>GOAL: {routine.goal}</b>
              <br></br>
              <b key={routine._id}>BY: {routine.creatorName}</b>
              <br></br>
              <button
                onClick={() => {
                  setRoutineId(routine._id);
                  deleteRoutine(routineId);
                }}
              >
                DELETE ROUTINE
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Routines;

// import { useEffect, useState } from "react";
// import { Link, Route } from "react-router-dom";
// import BASE_URL from "../utils";
// import AddRoutine from "./AddRoutine";

// const Routines = (props) => {
//   const [routines, setRoutines] = useState([]);

//   const fetchRoutines = async () => {
//     await fetch(`${BASE_URL}/routines`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         setRoutines(result);
//       })
//       .catch(console.error);
//   };

//   useEffect(() => {
//     fetchRoutines();
//   }, []);

//   return (
//     <div>
//       {props.user && (
//         <>
//           <Link to="/routines/new">Add Routine</Link>
//           <Route path="/routines/new">
//             <AddRoutine
//               token={props.user.token}
//               setRoutines={setRoutines}
//               routines={routines}
//             />
//           </Route>
//         </>
//       )}
//       {routines.map((routine, i) => {
//         return (
//           <>
//             <div key={routine.id}>
//               <h3 key={routine.id + i}>NAME: {routine.name}</h3>
//               <br></br>
//               <h3 key={routine.id + i}>GOAL: {routine.goal}</h3>
//               <br></br>
//               <h3 key={routine.id + i}>BY: {routine.creatorName}</h3>
//             </div>
//           </>
//         );
//       })}
//     </div>
//   );
// };

// export default Routines;
