import { useNavigate, useParams } from 'react-router-dom';
import Form from "../../components/common/Form";
import { Input } from "../../components/common/Input";
import useNotification from "../../hooks/useNotification";
import { addTask, fetchTasks, updateTask } from "../../store/task/taskSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Textarea from "../../components/common/Textarea";
import InputCheckbox from "../../components/common/InputCheckbox";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().min(1).required()  
});

const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();; // extract the item's ID from the URL query
  const dispatch = useDispatch();
  const notification = useNotification();
  const items = useSelector((state) => state.task.tasks);  
  const item = items.find((item) => item.id === Number(id));
  const defaultFormValues = {
    title: item && item.title,
    description: item && item.description,
    is_completed: item ? item.is_completed : false
  };

  useEffect(() => {
    if (!item && id) {
      dispatch(fetchTasks()); // Fetch items if they haven't been loaded yet
    }
  }, []);

  const handleUpdate = (updatedData) => {
    console.log(updatedData);
    if (id) {
      dispatch(updateTask({ id, updatedData })).then((action) => {
        if (updateTask.fulfilled.match(action)) {
          notification("Task has been updated successfully", "success");
          navigate(-1);
        } else if (updateTask.rejected.match(action)) {
          notification("Failed to update task", "error");
          // handle error here
        }
      });
    } else {
      dispatch(addTask(updatedData)).then((action) => {
        if (addTask.fulfilled.match(action)) {          
          notification("Task has been created successfully", "success");
          navigate(-1);
        } else if (addTask.rejected.match(action)) {          
          notification("Failed to create task", "error");
          // handle error here
        }
      });
    }
  };

  return (
    <div className="p-10 md:p-[70px] lg:p-14 xl:p-[70px]">
      <h2 className="mb-5 text-[28px] font-bold text-black">
        {id ? "Edit Item" : "Create Item"}
      </h2>
      <Form
        onSubmit={handleUpdate}
        schema={schema}
        defaultFormValues={defaultFormValues}
      >
        <div className="tw--mx-3 tw-flex tw-flex-wrap">
          <div className="tw-w-full tw-px-3 md:tw-w-1/2">
            <Input
              label="Title"
              name="title"
              type="text"
              icon={
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.72039 12.8864C4.50179 12.105 5.5616 11.666 6.66667 11.666H13.3333C14.4384 11.666 15.4982 12.105 16.2796 12.8864C17.061 13.6678 17.5 14.7276 17.5 15.8327V17.4993C17.5 17.9596 17.1269 18.3327 16.6667 18.3327C16.2064 18.3327 15.8333 17.9596 15.8333 17.4993V15.8327C15.8333 15.1696 15.5699 14.5338 15.1011 14.0649C14.6323 13.5961 13.9964 13.3327 13.3333 13.3327H6.66667C6.00363 13.3327 5.36774 13.5961 4.8989 14.0649C4.43006 14.5338 4.16667 15.1696 4.16667 15.8327V17.4993C4.16667 17.9596 3.79357 18.3327 3.33333 18.3327C2.8731 18.3327 2.5 17.9596 2.5 17.4993V15.8327C2.5 14.7276 2.93899 13.6678 3.72039 12.8864Z"
                      fill="#637381"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.9987 3.33268C8.61799 3.33268 7.4987 4.45197 7.4987 5.83268C7.4987 7.21339 8.61799 8.33268 9.9987 8.33268C11.3794 8.33268 12.4987 7.21339 12.4987 5.83268C12.4987 4.45197 11.3794 3.33268 9.9987 3.33268ZM5.83203 5.83268C5.83203 3.5315 7.69751 1.66602 9.9987 1.66602C12.2999 1.66602 14.1654 3.5315 14.1654 5.83268C14.1654 8.13387 12.2999 9.99935 9.9987 9.99935C7.69751 9.99935 5.83203 8.13387 5.83203 5.83268Z"
                      fill="#637381"
                    />
                  </g>
                </svg>
              }
            />
          </div>
          <div className="tw-w-full tw-px-3 md:tw-w-1/2">
            <Textarea label="Description" name="description" rows={5}
              icon={
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity={0.8}>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.56622 3.23223C2.03506 2.76339 2.67094 2.5 3.33398 2.5H9.16732C9.62755 2.5 10.0006 2.8731 10.0006 3.33333C10.0006 3.79357 9.62755 4.16667 9.16732 4.16667H3.33398C3.11297 4.16667 2.90101 4.25446 2.74473 4.41074C2.58845 4.56702 2.50065 4.77899 2.50065 5V16.6667C2.50065 16.8877 2.58845 17.0996 2.74473 17.2559C2.90101 17.4122 3.11297 17.5 3.33398 17.5H15.0006C15.2217 17.5 15.4336 17.4122 15.5899 17.2559C15.7462 17.0996 15.834 16.8877 15.834 16.6667V10.8333C15.834 10.3731 16.2071 10 16.6673 10C17.1276 10 17.5006 10.3731 17.5006 10.8333V16.6667C17.5006 17.3297 17.2373 17.9656 16.7684 18.4344C16.2996 18.9033 15.6637 19.1667 15.0006 19.1667H3.33398C2.67094 19.1667 2.03506 18.9033 1.56622 18.4344C1.09738 17.9656 0.833984 17.3297 0.833984 16.6667V5C0.833984 4.33696 1.09738 3.70107 1.56622 3.23223Z"
                      fill="#9CA3AF"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.6673 2.39909C16.4195 2.39909 16.1818 2.49754 16.0066 2.67278L8.25314 10.4262L7.81264 12.1882L9.57463 11.7477L17.3281 3.99427C17.5033 3.81903 17.6018 3.58135 17.6018 3.33352C17.6018 3.0857 17.5033 2.84802 17.3281 2.67278C17.1528 2.49754 16.9152 2.39909 16.6673 2.39909ZM14.8281 1.49427C15.3159 1.00647 15.9775 0.732422 16.6673 0.732422C17.3572 0.732422 18.0188 1.00647 18.5066 1.49427C18.9944 1.98207 19.2684 2.64367 19.2684 3.33352C19.2684 4.02338 18.9944 4.68498 18.5066 5.17278L10.5899 13.0894C10.4831 13.1962 10.3493 13.272 10.2028 13.3086L6.86945 14.142C6.58547 14.213 6.28506 14.1298 6.07808 13.9228C5.8711 13.7158 5.78789 13.4154 5.85888 13.1314L6.69222 9.79808C6.72885 9.65155 6.80461 9.51773 6.91141 9.41093L14.8281 1.49427Z"
                      fill="#9CA3AF"
                    />
                  </g>
                </svg>
              }
            />
          </div>
          <div className="tw-w-full tw-px-3 md:tw-w-1/2 mb-[30px]">
            <div style={{width:"fit-content"}}>
              <label
                htmlFor="is_completed"
                className="flex cursor-pointer select-none items-center"
              >
                <span className="block text-base font-medium text-black mr-10">
                  Completed
                </span>
                <InputCheckbox name="is_completed" id="is_completed"/>
                
              </label>   
            </div>
         
          </div>
        </div>
        <div className="w-full">
          <button
            type="button"
            className="rounded bg-primary py-3 px-9 text-base font-medium text-white transition hover:bg-opacity-90 sm:mr-4"
            onClick={()=>{navigate(-1)}}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-primary py-3 px-9 text-base font-medium text-white transition hover:bg-opacity-90"
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default TaskDetail;
