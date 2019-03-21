import axios from 'axios';
import { GET_ERRORS } from './types';

export const sendMail = (email, history) => dispatch => {
    axios.post('/api/send-message', email)
        .then( () => {
            history.push('/');
            console.log('Email send!');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
