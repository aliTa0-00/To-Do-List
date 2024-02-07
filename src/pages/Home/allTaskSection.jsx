import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { and, collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/confing";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useState } from "react";

const AllTaskSection = ({ user }) => {
  const [selectValue, setselectValue] = useState("allTasks");
  const [initiaal, setinitiaal] = useState(
    query(collection(db, user.uid), orderBy("id", "asc"))
  );
  const [opacity, setopacity] = useState(false);

  const [value, loading, error] = useCollection(initiaal);
  
  if (error) {
    return <h1>Error</h1>;
  }
  if (loading) {
    return (
      <div className="mttt">
        <ReactLoading type={"spin"} color={"red"} height={20} width={20} />
      </div>
    );
  }

  if (value) {
    return (
      <div>
        <section style={{justifyContent: "center"}} className="parent-of-btns flex mt">
          <button style={{opacity: opacity ? "1" : "0.3"}} onClick={() => {
            setopacity(true)
            setinitiaal(query(collection(db, user.uid), orderBy("id", "desc")))
          }}>Newest first</button>
          <button  style={{opacity: opacity ? "0.3" : "1"}} onClick={() => {
            setopacity(false)
            setinitiaal(query(collection(db, user.uid), orderBy("id", "asc")))
          }}>oldest first</button>

          <select value={selectValue} onChange={(eo) => {
              console.log(eo.target.value)
            if (eo.target.value === 'allTasks') {
              setselectValue("allTasks")
              setinitiaal(query(collection(db, user.uid)))
            } else if (eo.target.value === 'completed') {
              setselectValue("completed")
              setinitiaal(query(collection(db, user.uid), where("completed", "==", true)))

            }else {
              setselectValue("not-completed")
              setinitiaal(query(collection(db, user.uid), where("completed", "==", false)))
            }
          }} id="opt">
            <option value="allTasks">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="not-completed ">Not Completed</option>
          </select>
        </section>

        <section className="all-task flex">
          {value.docs.map((item) => {
            return (
              <article dir="auto" className="one-task">
                <Link to={`/edit-task/${item.data().id}`}>
                  <h2>{item.data().userName}</h2>
                  <ul>
                    {item.data().detalis.map((item, index) => {
                      if (index < 2) {
                        return <li>{item}</li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>
                  <p className="time">
                    <Moment fromNow date={item.data().id}></Moment>
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AllTaskSection;
