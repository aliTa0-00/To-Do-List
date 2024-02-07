import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { and, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/confing";
import Moment from "react-moment";

const SunTitleSection = ({ user, id, completedCheckBox, trasshIcon }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  console.log(id)
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [subTitle, setsubTitle] = useState('');
  if (value) {
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            {" "}
            <Moment fromNow date={value.data().id}></Moment>
          </p>
          <div className="input-check">
            <input
              onChange={(eo) => {
                completedCheckBox(eo);
              }}
              checked={value.data().completed}
              type="checkbox"
              id="checkbox"
            />
            <label htmlFor="checkbox">Completed</label>
          </div>
        </div>

        <ul>
          {value.data().detalis.map((item) => {
            return (
              <li key={item} className="cart-task flex">
                <p>{item}</p>
                <i
                  onClick={() => {
                    trasshIcon(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>

        {showAddNewTask && (
          <div className="add-new-task flex ">
            <input value={subTitle} onChange={(eo) => {
              setsubTitle(eo.target.value)
            }} type="text" className="Add-task" />
            <button className="add" 
              onClick={ async() => {
                await updateDoc(doc(db, user.uid, id), {
                  detalis: arrayUnion(subTitle),
                });
                setsubTitle('')
                
              }}
              
            >Add</button>
            <button
              className="cancel"
              onClick={() => {
                setshowAddNewTask(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="center mt">
          <button
            className="add-more-task"
            onClick={() => {
              setshowAddNewTask(true);
            }}
          >
            Add more <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
};

export default SunTitleSection;
