import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import authAPI from "~/apis/authAPI";
import { getMessageErrorAxios } from "~/utils/handleError";
import { navigate } from "~/utils/navigation.root";
import { appActions } from "../app/appSlice";
import { authActions } from "./authSlice";

function* loginSaga({ payload }) {
  try {
    yield put(appActions.setLoading(true));

    const response = yield call(authAPI.login, payload);

    yield delay(1000);

    yield put(authActions.loginSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(
      appActions.setToast({
        showToast: true,
        toastMessage: message,
        toastType: "error",
      })
    );
    yield put(authActions.loginFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchLoginSaga() {
  yield takeLatest(authActions.loginStart.type, loginSaga);
}

function* registerSaga({ payload }) {
  try {
    yield put(appActions.setLoading(true));

    const response = yield call(authAPI.register, payload);

    yield delay(1000);

    yield put(
      appActions.setToast({
        showToast: true,
        toastMessage: "Register successfully.",
        toastType: "success",
      })
    );

    yield put(authActions.registerSuccess(response));

    yield call(navigate, "Login");
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(
      appActions.setToast({
        showToast: true,
        toastMessage: message,
        toastType: "error",
      })
    );
    yield put(authActions.loginFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchRegisterSaga() {
  yield takeLatest(authActions.registerStart.type, registerSaga);
}

function* getCurrentUserSaga() {
  try {
    // yield put(appActions.setLoading(true));

    const response = yield call(authAPI.currentUser);

    yield delay(1000);

    yield put(authActions.getCurrentUserSuccess(response));
  } catch (error) {
    const status = error?.response?.status;
    if (status === 403 || status === 404) {
      yield put(authActions.reset());
      return;
    }

    let message = getMessageErrorAxios(error);

    yield put(authActions.getCurrentUserFailed(message));
  } finally {
    // yield put(appActions.setLoading(false));
  }
}

function* watchGetCurrentUserSaga() {
  yield takeLatest(authActions.getCurrentUserStart.type, getCurrentUserSaga);
}

function* fetchLogout() {
  try {
    yield call(authAPI.logout);
    yield put(authActions.loginSuccess());
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(authActions.loginFailed(message));
  }
}

function* watchFetchLogout() {
  yield takeLatest(authActions.logoutStart.type, fetchLogout);
}

function* fetchChangeProfile({ payload }) {
  try {
    const response = yield call(authAPI.changeProfile, payload);

    yield put(
      appActions.setToast({
        showToast: true,
        toastMessage: response.message,
        toastType: "success",
      })
    );

    yield put(authActions.fetchChangeProfileSuccess(response.metadata));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(
      appActions.setToast({
        showToast: true,
        toastMessage: message,
        toastType: "error",
      })
    );
    yield put(authActions.fetchChangeProfileFailed(message));
  }
}

function* watchFetchChangeProfile() {
  yield takeLatest(authActions.fetchChangeProfileStart.type, fetchChangeProfile);
}

function* fetchChangePassword({ payload }) {
  try {
    const response = yield call(authAPI.changePassword, payload);

    yield put(
      appActions.setToast({
        showToast: true,
        toastMessage: response.message,
        toastType: "success",
      })
    );

    yield put(authActions.fetchChangePasswordSuccess());
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(
      appActions.setToast({
        showToast: true,
        toastMessage: message,
        toastType: "error",
      })
    );
    yield put(authActions.fetchChangeProfileFailed(message));
  }
}

function* watchFetchChangePassword() {
  yield takeLatest(authActions.fetchChangePasswordStart.type, fetchChangePassword);
}

function* authSaga() {
  yield all([
    watchLoginSaga(),
    watchGetCurrentUserSaga(),
    watchRegisterSaga(),
    watchFetchLogout(),
    watchFetchChangePassword(),
    watchFetchChangeProfile(),
  ]);
}

export default authSaga;
