/**
 * 敵クラス
 */
//ダミー評価値
const DUMMY = -999;
//評価値の初期化
const HYOKATI_HYO = new Array(
		  120, -20,  20,   5,   5,  20, -20, 120,
		  -20, -40,  -5,  -5,  -5,  -5, -40, -20,
		   20,  -5,  15,   3,   3,  15,  -5,  20,
		    5,  -5,   3,   3,   3,   3,  -5,   5,
		    5,  -5,   3,   3,   3,   3,  -5,   5,
		   20,  -5,  15,   3,   3,  15,  -5,  20,
		  -20, -40,  -5,  -5,  -5,  -5, -40, -20,
		  120, -20,  20,   5,   5,  20, -20, 120
		);

/**
 * 置ける場所を調査し、置く処理
 * @param putId 敵が置く場所のID
 */
function checkAllBoard(turnPlayer) {
    //置ける場所を調査
	var max = DUMMY;
	var putId;

	for (y = 0; y < MAX_ROW; y++) {
		for (x = 0; x < MAX_COL; x++) {
			//空白以外なら何もしない
			if(getBord(x, y) != NOTHING) {
				continue;
			}

			//返すことができなければ何もしない
			if(checkBoard(x, y, turnPlayer, false) == 0) {
				continue;
			}

			const id = getId(x, y);
			const hyoka = getHyoka(x, y);

			if (max < hyoka) {
				max = hyoka;
				putId = id;
			}
		}
	}

	return putId;
}

/**
 * 座標から評価値を取得
 * @param x x座標
 * @param y y座標
 * @returns 評価値
 */
function getHyoka(x, y) {
	return HYOKATI_HYO[(y-1)*(MAX_COL-2)+x-1];
}
