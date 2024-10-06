import { createContext, useEffect, useState } from 'react';
import './App.css';
import { CreateModal } from './compornents/CreateModal';
import { DetailModal } from './compornents/DetailModal';

export const TaskContext = createContext();

export const App = () => {
  //モーダル制御用
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  //タスクリスト制御用
  const [inCompTask, setInCompTask] = useState([]);
  const [finishTask, setFinishTask] = useState([]);
  const [notDoTask, setNotDoTask] = useState([]);

  //エラー制御用
  const [error, setError] = useState(null);

  //apiパス定義用
  const apipath_env = process.env.REACT_APP_BACKEND_PATH;
  const listpath = apipath_env + "/task";
  const createpath = apipath_env + "/task/create";

  //モーダル参照用のコード(新規作成)
  const ShowCreateModal = () => {
    setShowCreateModal(true);
  };
  
  //モーダル参照用のコード(詳細閲覧)
  const ShowDetailModal = () => {
    setShowDetailModal(true);
  };

  //リストをAPIから取得するためのコード
  const fetchTaskList = () => {
    fetch(listpath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const inpro = data.filter(task => task.state === "InComplete");
        const notDo = data.filter(task => task.state === "NotDoTask");
        const fin = data.filter(task => task.state === "Finished");
        setInCompTask(inpro);
        setFinishTask(fin);
        setNotDoTask(notDo);
      })
      .catch(error => {
        setError(error); // エラーがあればエラーメッセージをセット
      });
  };

  // 初回ロード時にタスクリストを取得
  useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <TaskContext.Provider value={createpath}>
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

            {/* CreateModalにonTaskCreatedを渡す */}
            <CreateModal
              showFlag={showCreateModal}
              setShowCreateModal={setShowCreateModal}
              onTaskCreated={fetchTaskList}  // タスク作成後にタスクリストを更新
            />
          </div>

          <div className='incompletetask'>
            <p>Today's 6 Tasks</p>
            <ul>
              {inCompTask.map(task => (
                <li key={task.id}>
                  <p>{task.title}</p>
                  <button className="comp-button">complete</button>
                  <button className="edit-button">edit</button>
                  <button onClick={ShowDetailModal} className="detail-button">detail</button>
                  <DetailModal showFlag={showDetailModal} setShowDetailModal={setShowDetailModal} />
                </li>
              ))}
            </ul>
          </div>

          <div className='lower-task'>
            <div className='not-do-tasks'>
              <p>not do this tasks</p>
              <ul>
                {notDoTask.map(task => (
                  <li key={task.id}>
                    <p>{task.title}</p>
                    <button className="dotoday-button">do today!</button>
                    <button className="edit-button">edit</button>
                    <button onClick={ShowDetailModal} className="detail-button">detail</button>
                    <DetailModal showFlag={showDetailModal} setShowDetailModal={setShowDetailModal} />
                  </li>
                ))}
              </ul>
            </div>

            <div className='finishedtask'>
              <p>finished task</p>
              <ul>
                {finishTask.map(task => (
                  <li key={task.id}>
                    <p>{task.title}</p>
                    <button className="restore-button">restore</button>
                    <button className="edit-button">edit</button>
                    <button onClick={ShowDetailModal} className="detail-button">detail</button>
                    <DetailModal showFlag={showDetailModal} setShowDetailModal={setShowDetailModal} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        <footer></footer>
      </>
    </TaskContext.Provider>
  );
}
