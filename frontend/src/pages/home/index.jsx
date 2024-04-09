import React from "react";
import useNotification from "../../hooks/useNotification";
import { deleteTask, fetchTasks, fetchTasksWithLink, taskActions} from "../../store/task/taskSlice";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskGrid from "./components/TaskGrid";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks: items, orderByField, orderAscending, searchTerm, filterCompleted, nextLink, prevLink } = useSelector((state) => state.task);
  const notification = useNotification();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [orderByField, orderAscending, searchTerm, filterCompleted, dispatch]);

  const handleAdd = useCallback(() => {
    navigate('/create/')
  },[navigate]);

  const handleEdit = useCallback((itemId) => {
    navigate(`/edit/${itemId}`)
  },[navigate]);

  const handleDelete = useCallback((itemId) => {
    dispatch(deleteTask(itemId)).then(()=>{
      notification("Item has been deleted successfully", "success");
    })
  },[dispatch,notification]);

  const handleSearch = useCallback((searchTerm) => {
    console.log(searchTerm)
    dispatch(taskActions.setSearchTerm(searchTerm));
  },[dispatch]);

  const handleSort = useCallback((fieldName, asc="asc") => {
    dispatch(taskActions.setSortField({ field: fieldName, asc }));
  },[dispatch]);

  const handlePrevPagination = useCallback(()=>{
    dispatch(fetchTasksWithLink(prevLink));
  }, [dispatch, prevLink])

  const handleNextPagination = useCallback(()=>{
    dispatch(fetchTasksWithLink(nextLink));
  }, [dispatch, nextLink])

  return (
    <>
      <TaskGrid
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={handleSearch}
        onAdd={handleAdd}
        onSort={handleSort}
        nextLink={nextLink}
        prevLink={prevLink}
        onPrev={handlePrevPagination}
        onNext={handleNextPagination}
      />
    </>
  );
}

export default Home;
