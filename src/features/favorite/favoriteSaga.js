import { all, call, put, takeLatest } from "redux-saga/effects";
import favoriteAPI from "~/apis/favoriteAPI";
import { getMessageErrorAxios } from "~/utils/handleError";
import { appActions } from "../app/appSlice";
import { favoriteActions } from "./favoriteSlice";

function* fetchGetFavorite({ payload }) {
  try {
    const response = yield call(favoriteAPI.get, payload);
    yield put(favoriteActions.fetchFavoriteSuccess(response));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(favoriteActions.fetchFavoriteFailed(message));
  }
}

function* watchFetchFavorite() {
  yield takeLatest(favoriteActions.fetchFavoriteStart.type, fetchGetFavorite);
}

function* fetchAddFavorite({ payload }) {
  try {
    yield put(appActions.setLoading(true));
    const response = yield call(favoriteAPI.post, payload);
    yield put(favoriteActions.fetchAddFavoriteSuccess(response));
    yield put(
      appActions.setToast({
        showToast: true,
        toastMessage: response.message,
        toastType: "success",
      })
    );
    yield put(favoriteActions.fetchFavoriteStart({ userId: payload.userId }));
  } catch (error) {
    let message = getMessageErrorAxios(error);
    yield put(favoriteActions.fetchFavoriteFailed(message));
  } finally {
    yield put(appActions.setLoading(false));
  }
}

function* watchFetchAddFavorite() {
  yield takeLatest(favoriteActions.fetchAddFavoriteStart.type, fetchAddFavorite);
}

function* favoriteSaga() {
  yield all([watchFetchFavorite(), watchFetchAddFavorite()]);
}

export default favoriteSaga;
