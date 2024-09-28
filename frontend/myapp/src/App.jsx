import { useEffect, useState } from 'react';
import './App.css';
import { CreateModal } from './compornents/CreateModal';
import { DetailModal } from './compornents/DetailModal';


export const App = ()=> {
  const [showCreateModal,setShowCreateModal] = useState(false);
  const [showDetailModal,setShowDetailModal] = useState(false);
  const [inCompTask,setInCompTask] = useState([]);
  const [finishTask,setFinishTask] = useState([]);
  const apipath_env = process.env.REACT_APP_BACKEND_PATH;
  const [error, setError] = useState(null);

  const listpath  = apipath_env + "/task";

  //モーダル参照用のコード
  const ShowCreateModal =()=> {
    setShowCreateModal(true);
  };

  const ShowDetailModal =()=> {
    setShowDetailModal(true);
  };

  //リストをAPIから取得するためのコード
  useEffect( ()=>{
    fetch(listpath)
      .then(response => {
        if (!response.ok){
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data =>{
        const inpro = data.filter(task => task.state === "Inprogress");
        const fin = data.filter(task => task.state === "Finished");
        setInCompTask(inpro);
        setFinishTask(fin);
      })
      .catch(error => {
        setError(error); // エラーがあればエラーメッセージをセット
      });
  },[]);  

  

  //以下HTML表示
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
        {inCompTask.map(task => (
          <li key={task.id}>
          <p>
            {task.title}
          </p>
            <button className="comp-button">complete</button>
            <button onClick={ShowDetailModal} className="detail-button">detail</button>
            <DetailModal showFlag={showDetailModal} setShowDetailModal={setShowDetailModal}/>


          </li>

        ))}
      </ul>
    </div>
    <div className='finishedtask'>
      <p>finishedtask</p>
      <ul>
        {/*ここにタスクリストが一覧表示*/}
        {finishTask.map(task => (
        <li key={task.id}>
        <p>
          {task.title}
          </p>
          <button className="restore-button">restore</button>
          <button onClick={ShowDetailModal} className="detail-button">detail</button>
          <DetailModal  showFlag={showDetailModal} setShowDetailModal={setShowDetailModal}/>


        </li>
      ))}
      </ul>

    </div>


    </main>
    <footer>
      
    </footer>
    </>
  );
}


