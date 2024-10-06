import { useEffect, useState } from 'react';
import './App.css';
import { CreateModal } from './compornents/CreateModal';
import { DetailModal } from './compornents/DetailModal';


export const App = ()=> {
  //モーダル制御用
  const [showCreateModal,setShowCreateModal] = useState(false);
  const [showDetailModal,setShowDetailModal] = useState(false);
  //タスクリスト制御用
  const [inCompTask,setInCompTask] = useState([]);
  const [finishTask,setFinishTask] = useState([]);
  const [notDoTask,setNotDoTask] = useState([]);
  
  //エラー制御用
  const [error, setError] = useState(null);
  
  //apiパス定義用
  const apipath_env = process.env.REACT_APP_BACKEND_PATH;
  const listpath  = apipath_env + "/task";

  //モーダル参照用のコード(新規作成)
  const ShowCreateModal =()=> {
    setShowCreateModal(true);
  };
//モーダル参照用のコード(詳細閲覧)
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
        const inpro = data.filter(task => task.state === "InComplete");
        const notDo = data.filter(task => task.state === "NotDoTask");
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
      {/*今日やる6つのタスクの枠*/}
      <p>Today's 6 Tasks</p>
      <ul>
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
    <div className='lower-task'>
      <div className='not-do-tasks'>
        {/*今日は手をつけないタスクの枠*/}
        <p>not do this tasks</p>
        <ul>
          <li>
          <p>test</p>
          <button className="restore-button">restore</button>
            <button onClick={ShowDetailModal} className="detail-button">detail</button>
            <DetailModal  showFlag={showDetailModal} setShowDetailModal={setShowDetailModal}/>

          </li>
          
          {/*notDoTask.map(task => (
          <li key={task.id}>
          <p>
            {task.title}
            </p>
            <button className="restore-button">restore</button>
            <button onClick={ShowDetailModal} className="detail-button">detail</button>
            <DetailModal  showFlag={showDetailModal} setShowDetailModal={setShowDetailModal}/>


          </li>
        ))*/}
        </ul>

      </div>
      <div className='finishedtask'>
        {/*完了済みタスクの枠*/}
        <p>finished task</p>
        <ul>
        
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
    </div>


    </main>
    <footer>
      
    </footer>
    </>
  );
}


