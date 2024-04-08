import { all, call, put, takeLatest } from "redux-saga/effects";
import categoryAPI from "~/apis/categoryAPI";
import { getMessageErrorAxios } from "~/utils/handleError";
import { categoryActions } from "./categorySlice";

function* fetchCategory({ payload }) {
  try {
    const response = yield call(categoryAPI.get, payload);

    yield put(categoryActions.fetchCategorySuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);

    yield put(categoryActions.fetchCategoryFailed(message));
  } finally {
    // yield put(appActions.setLoading(false));
  }
}

function* watchFetchCategory() {
  yield takeLatest(categoryActions.fetchCategoryStart.type, fetchCategory);
}

function* categorySaga() {
  yield all([watchFetchCategory()]);
}

export default categorySaga;
