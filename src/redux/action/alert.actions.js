import { alertConstants } from '../_constants';
import swal from 'sweetalert'

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    swal(
        `${message}`
      );
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    swal(
        `${message}`
      );
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}