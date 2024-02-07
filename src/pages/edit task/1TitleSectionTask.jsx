   
import { useDocument } from "react-firebase-hooks/firestore";
import { and, doc , updateDoc } from "firebase/firestore";
import { db } from "../../firebase/confing";
import { useRef } from "react";

const TitleSectionTask = ({user ,id , titleInput}) => {
  const inputElement = useRef(null);

  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  if (value) {
      console.log()
      return (
        <section className="title center ">
          <h1>
            <input
            style={{textDecoration: value.data().completed ?  "line-through wavy red" : null}}
            ref={inputElement}
            onChange={ (eo) => {
              titleInput(eo)
              
            }}
            defaultValue={value.data().title} className="title-input center" type="text" />
            <i onClick={() => {
              inputElement.current.focus()
            }} className="fa-regular fa-pen-to-square"></i>
          </h1>
        </section>
      );
    }
};

export default TitleSectionTask;
