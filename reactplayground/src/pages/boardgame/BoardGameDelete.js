import React from 'react';
import { useDispatch } from 'react-redux';
import { callDeleteBoardGameAPI } from '../../apis/BoardGameAPICalls';

function BoardGameDelete({ id }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(callDeleteBoardGameAPI(id));
    };

    return (
        <button onClick={handleDelete}>삭제</button>
    );
}

export default BoardGameDelete;
