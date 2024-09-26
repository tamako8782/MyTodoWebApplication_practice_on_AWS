import { useEffect, useState } from 'react';
import './App.css';
import { CreateModal } from './compornents/CreateModal';
import { DetailModal } from './compornents/DetailModal';


export const App = ()=> {
  const [showCreateModal,setShowCreateModal] = useState(false);
  const [showDetailModal,setShowDetailModal] = useState(false);
  const [inCompTask,setInCompTask] = useState([]);
  const apipath_env = process.env.REACT_APP_BACKEND_PATH;

  const ShowCreateModal =()=> {
    setShowCreateModal(true);
  };

  const ShowDetailModal =()=> {
    setShowDetailModal(true);
  };

  useEffect( ()=>{
    fetch(apipath_env)
      .then(response => {
        if (response.ok)

      })
      .then(data ={

      })
      .catch(error =>{

      });
  },[]);  


  return (
    <>
    <header>
      <div className='title'>
        <h1>My<span className='titlespan'>Todo</span>Application</h1>
        <p>Optimize your tasks with this todo list!</p>
      </div>
    </header>
    <main>
    <div className='createtask'>
        <button onClick={ShowCreateModal}>Create your task</button>
        <CreateModal showFlag={showCreateModal} setShowCreateModal={setShowCreateModal}/>

      </div>

    <div className='incompletetask'>
      <p>incompletetask</p>
      <ul>
        {/*ここにタスクリストが一覧表示*/}
        <li>
          <p>
            test
            </p>
            <button className="comp-button">complete</button>
            <button onClick={ShowDetailModal} className="detail-button">detail</button>
            <DetailModal showFlag={showDetailModal} setShowDetailModal={setShowDetailModal}/>


        </li>
      </ul>
    </div>
    <div className='finishedtask'>
      <p>finishedtask</p>
      <ul>
        {/*ここにタスクリストが一覧表示*/}
        <li>
        <p>test</p>
          <button className="restore-button">restore</button>
          <button onClick={ShowDetailModal} className="detail-button">detail</button>
          <DetailModal  showFlag={showDetailModal} setShowDetailModal={setShowDetailModal}/>


        </li>
      </ul>

    </div>

    </main>
    <footer>
      
    </footer>
    </>
  );
}


