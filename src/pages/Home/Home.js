// @ts-nocheck
// import React from 'react';

import Header from "../../comp/header";
import Footer from "../../comp/footer";
import { Helmet } from "react-helmet-async";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/confing";
import "./Home.css";
import { useState } from "react";
import { db } from "../../firebase/confing";
import { and, doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
import HomeModel from "./model";

import AllTaskSection from "./allTaskSection";

//! loding
//! Not sign-in
//! Not sign-in Email verification
//! Not sign-in && verified email => nav(/)

const Home = () => {
  
  const [array, setarray] = useState([]);
  const [detalis, setdetalis] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [addTitle, setaddTitle] = useState("");
  const [showFomr, setshowFomr] = useState(false);
  const [showSpin, setshowSpin] = useState(false);
  const [showMessage, setshowMessage] = useState(false);

  // func
  const showModal = () => {
    setshowFomr(showFomr);
    setshowFomr(true);
  };
  const closeModel = () => {
    setshowFomr(false);
  };
  const titleInput = (eo) => {
    setaddTitle(eo.target.value);
  };
  const detailsInput = (eo) => {
    setdetalis(eo.target.value);
  };
  const addBTN = (eo) => {
    eo.preventDefault();
    if (!array.includes(detalis)) {
      array.push(detalis);
    }
    setdetalis("");
  };
  const submitBTN = async (eo) => {
    const taskId = new Date().getTime();
    eo.preventDefault();
    setshowSpin(true);
    await setDoc(doc(db, user.uid, `${taskId}`), {
      userName: addTitle,
      detalis: array,
      id: taskId,
      completed: false,
    });
    setshowSpin(false);
    setdetalis("");
    setarray([]);
    setshowFomr(false);
    setshowMessage(true);
    setTimeout(() => {
      setshowMessage(false);
    }, 3500);
  };

  if (loading) {
    return (
      <>
        <main>
          <h3>Lodaing ............</h3>
        </main>
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Home Page</title>
          </Helmet>
          <Header />
          {user && (
            <main>
              welcome {user.displayName} ... 🧡
              <br />
              <h3>من فضلك قم بتأكيد الحساب </h3>
            </main>
          )}

          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Home Page</title>
          </Helmet>
          <Header />
          <main className="home">
            {/* option */}
          

            {/* all task  */}
              <AllTaskSection user={user}/>
            {/* add btn new task */}
            <section className="mt">
              <button
                onClick={() => {
                  setshowFomr(true);
                }}
                className="add-new-task"
              >
                add new task <b>+</b>
              </button>
            </section>
            {showFomr && (
              <HomeModel
                closeModel={closeModel}
                titleInput={titleInput}
                detailsInput={detailsInput}
                addBTN={addBTN}
                submitBTN={submitBTN}
                detalis={detalis}
                array={array}
                showSpin={showSpin}
              />
            )}
            <p
              style={{ right: showMessage ? "22px" : "-100vw" }}
              className="show-mess"
            >
              Task Add Successfully{" "}
              <i className="fa-regular fa-circle-check"></i>
            </p>
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default Home;
