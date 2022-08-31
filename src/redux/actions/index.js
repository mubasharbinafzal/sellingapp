
import * as NotiActions from "./notistack";

const exportsObj = {
  notistack: {
    snackbar: NotiActions.snackBar,
    closeSnackbar: NotiActions.closeSnackbar,
    removeSnackbar: NotiActions.removeSnackbar,
    enqueueSnackbar: NotiActions.enqueueSnackbar,
  },
};

export default exportsObj;