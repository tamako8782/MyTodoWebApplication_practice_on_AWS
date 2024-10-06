import React from "react";
import classes from "./Modalstyle.module.scss"


export const CreateModal = (props) => {

  //閉じる用
    const closeCreateModal =()=> {
        props.setShowCreateModal(false);
    };

    return (
      <>
        {props.showFlag ? (
            <div className={classes.overlay}>
              <div className={classes.modalcontent}>
              
                <h2>task input here</h2>
                <div className={classes.tasktitle}>
                  <p>task title</p>
                  <input type="text" /><br/>
                </div>
                <div className={classes.taskcontent}>
                <p>task content</p>
                <textarea rows="10" name="" id=""></textarea><br/>
                </div>
                <div className={classes.taskstate}>
                  <p>state</p>
                  <select>
                    <option value="incomplete">today task</option>
                    <option value="complete">not do task</option>
                  </select><br/>
                </div>


                <button className={classes.cancelbutton} onClick={closeCreateModal}>Cancel</button>
                <button className={classes.submitbutton}  onClick={closeCreateModal}>Submit</button>

              </div>
            </div>
        ):(
            <></>
        )}
      </>
    )
  }