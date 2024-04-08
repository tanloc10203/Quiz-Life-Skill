import { all, call, put, takeLatest } from "redux-saga/effects";
import skillAPI from "~/apis/skillAPI";
import { getMessageErrorAxios } from "~/utils/handleError";
import { skillActions } from "./skillSlice";

function* fetchGetSkill({ payload }) {
  try {
    const response = yield call(skillAPI.get, payload);

    yield put(skillActions.fetchSkillSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);

    yield put(skillActions.fetchSkillFailed(message));
  } finally {
    // yield put(appActions.setLoading(false));
  }
}

function* watchFetchCategory() {
  yield takeLatest(skillActions.fetchSkillStart.type, fetchGetSkill);
}

function* skillSaga() {
  yield all([watchFetchCategory()]);
}

export default skillSaga;
