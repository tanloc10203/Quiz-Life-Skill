import { all, call, put, takeLatest } from "redux-saga/effects";
import gameAPI from "~/apis/gameAPI";
import { getMessageErrorAxios } from "~/utils/handleError";
import { gameActions } from "./gameSlice";

function* fetchGetGame({ payload }) {
  try {
    const response = yield call(gameAPI.get, payload);

    yield put(gameActions.fetchGameSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);

    yield put(gameActions.fetchGameFailed(message));
  } finally {
    // yield put(appActions.setLoading(false));
  }
}

function* watchFetchGame() {
  yield takeLatest(gameActions.fetchGameStart.type, fetchGetGame);
}

function* gameSaga() {
  yield all([watchFetchGame()]);
}

export default gameSaga;
