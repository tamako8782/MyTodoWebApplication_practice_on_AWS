import React from "react";
import classes from "./Modalstyle.module.scss"


export const DetailModal = (props) => {

    const closeDetailModal =()=> {
        props.setShowDetailModal(false);
    };

    return (
      <>
        {props.showFlag ? (
            <div className={classes.overlay}>
              <div className={classes.modalcontent}>
                <p>This is a detail task</p>
                  <p>title</p>
                  <p>content</p>
                  <p>state</p>
                  <p>createat</p>
                  <p>updateat</p>
                  <button onClick={closeDetailModal}>complete</button>
                <button onClick={closeDetailModal}>back</button>
                <button onClick={closeDetailModal}>edit</button>
                <button onClick={closeDetailModal}>delete</button>
              </div>
            </div>
        ):(
            <></>
        )}
      </>
    )
  }