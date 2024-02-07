import { Helmet } from "react-helmet-async";
import "./editTask.css";
import Header from "comp/header";
import Footer from "comp/footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/confing";
import TitleSectionTask from "./1TitleSectionTask";
import SunTitleSection from "./2SunTitleSection";
import AddBtnSection from "./3AddBtnSection";
import { useParams } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactLoading from "react-loading";

const EditTask = () => {
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  let { id } = useParams();

  // titleInput section
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, id), {
      title: eo.target.value,
    });
  };
  // Completed section
  const completedCheckBox = async (eo) => {
    await updateDoc(doc(db, user.uid, id), {
      completed: eo.target.checked === true ? true : false,
    });
  };

  // trash icon
  const trasshIcon = async (item) => {
    await updateDoc(doc(db, user.uid, id), {
      detalis: arrayRemove(item),
    });
  };

  // Add more btn
  const addMoreBtn = async () => {
    await updateDoc(doc(db, user.uid, id), {
      details: arrayUnion(),
    });
  };

  // remove data form firebase
  const [showTask, setshowTask] = useState(false);
  const removeData = async () => {
    setshowTask(true);
    await deleteDoc(doc(db, user.uid, id));
    navigate("/" , { replace: true });
  };

  if (user) {
    return (
      <div>
        <Helmet>
          <title>Edit Task</title>
        </Helmet>
        <Header />
        {showTask ? (
          <main>
            
            <ReactLoading type={"spin"} color={"red"} height={60} width={60} />

          </main>
        ) : (
          <div className="edit-task">
            {/* title */}
            <TitleSectionTask user={user} id={id} titleInput={titleInput} />

            {/* sub tasks sec */}

            <SunTitleSection
              user={user}
              id={id}
              completedCheckBox={completedCheckBox}
              trasshIcon={trasshIcon}
            />

            {/* add more btn && delete btn */}

            <AddBtnSection user={user} id={id} removeData={removeData} />
          </div>
        )}
        <Footer />
      </div>
    );
  }
};

export default EditTask;
