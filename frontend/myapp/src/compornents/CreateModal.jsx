import React from "react";
import classes from "./Modalstyle.module.scss"


export const CreateModal = (props) => {

    const closeCreateModal =()=> {
        props.setShowCreateModal(false);
    };

    return (
      <>
        {props.showFlag ? (
            <div className={classes.overlay}>
              <div className={classes.modalcontent}>
                <p>your task input here</p>
                <input type="text" /><br/>
                <textarea name="" id=""></textarea><br/>
                <button onClick={closeCreateModal}>Cancel</button>
                <button onClick={closeCreateModal}>Submit</button>

              </div>
            </div>
        ):(
            <></>
        )}
      </>
    )
  }