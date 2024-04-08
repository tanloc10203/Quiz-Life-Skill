import { all } from "redux-saga/effects";
import achievementSaga from "~/features/achievement/achievementSaga";
import authSaga from "~/features/auth/authSaga";
import categorySaga from "~/features/category/categorySaga";
import favoriteSaga from "~/features/favorite/favoriteSaga";
import gameSaga from "~/features/game/gameSaga";
import skillSaga from "~/features/skill/skillSaga";

function* rootSaga() {
  yield all([
    authSaga(),
    categorySaga(),
    skillSaga(),
    gameSaga(),
    achievementSaga(),
    favoriteSaga(),
  ]);
}

export default rootSaga;
