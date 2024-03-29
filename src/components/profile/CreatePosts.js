import React, {useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { bufferReducer } from '../../store/slices/BufferSlice';

const Posts = ({username,userImage}) => {
  const dispatch = useDispatch();
  
  return (
    <div className="bg-white m-2">
      <div className="p-1 border-2">
        <div
          className="flex items-center"
          onClick={() => dispatch(bufferReducer(true))}
        >
          <div className="">
            <img
              src={userImage}
              alt="icons"
              className="md:w-10 md:h-10 h-9 w-9 rounded-full overflow-hidden"
            />
          </div>
          <div className="h-[30px] w-full">
            <input
              type="text"
              className="bg-slate-200 w-full outline-none h-full rounded-full text-[8px] md:text-[13px] pl-3"
              placeholder={`Hi ${username} , Whats in your mind !`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts