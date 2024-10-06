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
                <h2>detail task</h2>
                  <div className={classes.detailtasks}>
                    <ul>
                      <li>title</li>
                      <p>hoge</p>
                      <li>content</li>
                      <p>
                        hoge <br/>
                        hoge 
                      
                      </p>
                      <li>state</li>
                      <p>hoge</p>
                      <li>create at</li>
                      <p>2024/10/10 09:00:00</p>
                      <li>update ad</li>
                      <p>2024/10/10 09:00:00</p>
                    </ul>
                  </div>
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