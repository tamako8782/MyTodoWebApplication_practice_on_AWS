import { createContext, useEffect, useState } from 'react';
import './App.css';
import { CreateModal } from './compornents/CreateModal';
import { DetailModal } from './compornents/DetailModal';
import { EditModal } from './compornents/EditModal';  // EditModalをインポート

export const TaskContext = createContext();

export const App = () => {
  /////////////モーダル制御用
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);  // EditModalを表示制御するための状態
  const [selectedTask, setSelectedTask] = useState(null); // 選択されたタスクの詳細を保存

  /////////////タスクリスト制御用
  const [inCompTask, setInCompTask] = useState([]);
  const [finishTask, setFinishTask] = useState([]);
  const [notDoTask, setNotDoTask] = useState([]);

  /////////////エラー制御用
  const [error, setError] = useState(null);

  /////////////apiパス定義用
  const apipath_env = process.env.REACT_APP_BACKEND_PATH;
  const listpath = apipath_env + "/task";
  const createpath = apipath_env + "/task/create";
  const detailpath = apipath_env + "/task"; // 詳細情報用のパス
  const editpath = apipath_env + "/task"; // 編集用のパス

  ///////////// モーダル参照用のコード(新規作成)
  const ShowCreateModal = () => {
    setShowCreateModal(true);
  };

  ///////////// タスク詳細を取得して詳細モーダルを表示する関数
  const ShowDetailModal = (id) => {
    setShowDetailModal(true);  // DetailModalを表示

    // APIからデータを取得
    fetch(`${detailpath}/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch task details. Please try again later.");
        }
        return response.json();
      })
      .then(data => {
        setSelectedTask(data);  // 正常にデータを取得し、selectedTaskに保存
      })
      .catch(error => {
        console.error("Error fetching task details:", error);
        alert("Error: Unable to fetch task details. Please try again later.");
        setShowDetailModal(false);  // エラー時にモーダルを閉じる
      });
  };

  ///////////// 編集モーダルを表示する関数
  const ShowEditModal = (id) => {
    setShowEditModal(true);  // EditModalを表示
  };

  ///////////////リストをAPIから取得するためのコード
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
        setError(error);
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
                  <button className="edit-button" onClick={() => ShowEditModal(task.id)}>edit</button>  {/* editボタンにイベントハンドラを追加 */}
                  <button onClick={() => ShowDetailModal(task.id)} className="detail-button">detail</button>
                </li>
              ))}
            </ul>
          </div>

          <div className='lower-task'>
            <div className='not-do-tasks'>
              <p>Not Do Tasks</p>
              <ul>
                {notDoTask.map(task => (
                  <li key={task.id}>
                    <p>{task.title}</p>
                    <button className="dotoday-button">do today!</button>
                    <button className="edit-button" onClick={() => ShowEditModal(task.id)}>edit</button>  {/* editボタンにイベントハンドラを追加 */}
                    <button onClick={() => ShowDetailModal(task.id)} className="detail-button">detail</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className='finishedtask'>
              <p>Finished Tasks</p>
              <ul>
                {finishTask.map(task => (
                  <li key={task.id}>
                    <p>{task.title}</p>
                    <button className="restore-button">restore</button>
                    <button className="edit-button" onClick={() => ShowEditModal(task.id)}>edit</button>  {/* editボタンにイベントハンドラを追加 */}
                    <button onClick={() => ShowDetailModal(task.id)} className="detail-button">detail</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DetailModalにeditモーダル表示の関数を渡す */}
          {selectedTask && (
            <DetailModal
              showFlag={showDetailModal}
              setShowDetailModal={setShowDetailModal}
              task={selectedTask}
              onEdit={() => {
                setShowDetailModal(false); // DetailModalを閉じる
                ShowEditModal(selectedTask.id); // EditModalを表示する
              }}
            />
          )}

          {/* EditModalの表示 */}
          {selectedTask && (
            <EditModal
              showFlag={showEditModal}
              setShowEditModal={setShowEditModal}
              task={selectedTask}  // タスクの詳細をEditModalに渡す
              onTaskUpdated={fetchTaskList}  // タスク更新後にリストを再取得
            />
          )}
        </main>

        <footer></footer>
      </>
    </TaskContext.Provider>
  );
};
