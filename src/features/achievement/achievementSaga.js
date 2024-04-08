import { all, call, put, takeLatest } from "redux-saga/effects";
import achievementAPI from "~/apis/achievementAPI";
import { getMessageErrorAxios } from "~/utils/handleError";
import { achievementActions } from "./achievementSlice";

function* fetchGetAchievement({ payload }) {
  try {
    const response = yield call(achievementAPI.get, payload);

    yield put(achievementActions.fetchAchievementSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);

    yield put(achievementActions.fetchAchievementFailed(message));
  } finally {
    // yield put(appActions.setLoading(false));
  }
}

function* watchFetchAchievement() {
  yield takeLatest(achievementActions.fetchAchievementStart.type, fetchGetAchievement);
}

function* fetchCreateAchievement({ payload }) {
  try {
    const response = yield call(achievementAPI.post, payload);

    yield put(achievementActions.fetchAchievementSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);

    yield put(achievementActions.fetchAchievementFailed(message));
  } finally {
    // yield put(appActions.setLoading(false));
  }
}

function* watchFetchCreateAchievement() {
  yield takeLatest(achievementActions.fetchCreateAchievementStart.type, fetchCreateAchievement);
}

function* achievementSaga() {
  yield all([watchFetchAchievement(), watchFetchCreateAchievement()]);
}

export default achievementSaga;
