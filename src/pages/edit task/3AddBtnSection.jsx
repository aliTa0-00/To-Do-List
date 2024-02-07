import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
 import { collection } from "firebase/firestore";
import { db } from "../../firebase/confing";



const AddBtnSection = ({user , id , removeData}) => {
 const [value, loading, error] = useCollection(collection(db, user.uid));
  if (value) {
    return (
      <section className="center mt">
      
        <div>
          <button onClick={() => {
            removeData()
          }} className="delete mt">Delete task</button>
        </div>
      </section>
    );
  }
};

export default AddBtnSection;
