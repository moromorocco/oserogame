/**
 * ボード
 */
// ボードの状態
var myBoard;

// 初期化
function initBord() {
	myBoard = new Array(MAX_ROW);
	for (y = 0; y < MAX_ROW; y++) {
		myBoard[y] = new Array(MAX_COL);
		for (x = 0; x < MAX_COL; x++) {
			if (y == 0 || y == MAX_ROW - 1 || x == 0 || x == MAX_COL - 1) {
				myBoard[y][x] = WALL;
				putBord(x, y, WALL);
			} else {
				myBoard[y][x] = NOTHING;
				putBord(x, y, NOTHING);
			}
		}
	}

	putBord(4, 4, WHITE);
	putBord(5, 5, WHITE);
    putBord(4, 5, BLACK);
	putBord(5, 4, BLACK);
	// パス機能チェック
// putBord(3, 4, BLACK);
// putBord(2, 4, BLACK);

	changeWhite($('#44'));
	 changeWhite($('#55'));
     changeBlack($('#54'));
     changeBlack($('#45'));
	// パス機能チェック
// changeBlack($('#43'));
// changeBlack($('#42'));
}

// 値を取得
function getBord(x, y) {
	return myBoard[y][x];
}

// 指定した色の石を置く処理
function putBord(x, y, color) {
	myBoard[y][x] = color;
}

// 置ける場所をハイライトにする
function doHilightBord(color) {
	for (let y = 1; y < MAX_ROW - 1; y++) {
		for (let x = 1; x < MAX_COL - 1; x++) {
			// NOTHING以外なら何もしない
			if (myBoard[y][x] != NOTHING) {
				continue;
			}

			// 反転できる石の数をチェック
			const count = checkBoard(x, y, color, false);
			if (count > 0) {
				const id = "#" + getId(x, y);
				doHilight(id);
			}
		}
	}
}

// ハイライトを戻す
function doBackHilightBord(color) {
	for (var y = 1; y < MAX_ROW-1; y++) {
		for (var x = 1; x < MAX_COL-1; x++) {
			const id = "#" + getId(x, y);
			doNotHilight(id);
		}
	}
}

// 置ける場所があるかチェックする
function checkPutable(color) {
	for (let y = 1; y < MAX_ROW - 1; y++) {
		for (let x = 1; x < MAX_COL - 1; x++) {
			// NOTHING以外なら何もしない
			if (myBoard[y][x] != NOTHING) {
				continue;
			}

			// 反転できる石の数をチェック
			const count = checkBoard(x, y, color, false);
			if (count > 0) {
				return true;
			}
		}
	}

	return false;
}

// ひっくり返すことができる石の数を数える
function checkBoard(x, y, color, turnFlg) {
	let count = 0;

	for (xi = -1; xi <= 1; xi++) {
		for (yj = -1; yj <= 1; yj++) {
			if (xi == 0 && yj == 0) {
				// 無限ループ防止のため、中心は何もしない
				continue;
			}

			count += checkBoardLine(x, y, xi, yj, color, turnFlg);
		}
	}

	// ひっくり返すことができる石の数を返す
	return count;
}

// １方向に対してひっくり返すことができるか調べる
function checkBoardLine(x, y, xi, yj, color, turnFlag) {
	var count = 0;
	var newX = x + xi;
	var newY = y + yj;
	var enemyColor = getEnemyColor(color);

	// 敵色が続く間、座標を進める
	while (myBoard[newY][newX] == enemyColor) {
		newX += xi;
		newY += yj;
		count++;
	}

	// 敵色の先に自分の色がない場合、カウンタをリセット
	if (myBoard[newY][newX] != color) {
		return 0;
	}

	// 反転フラグがtrueの場合、反転する。
	if (turnFlag == true) {
		if (myBoard[newY][newX] == color) {
			 var turnX = x;
			 var turnY = y;

			while (true) {
				 turnX += xi;
				 turnY += yj;

				if (turnX == newX && turnY == newY) {
					break;
				}

				// ボードの色変更
				myBoard[turnY][turnX] = color;

				const id = getId(turnX, turnY);
				changeColor($("#" + id), color);
			}
		}
	}

	return count;
}

// 座標からIDを取得
function getId(x, y) {
	return y * MAX_COL + x;
}

/**
 * 指定した色の数を数える
 * @param color 色
 * @returns 個数
 */
function getColorCount(color) {
	var count = 0;
	for (let y = 1; y < MAX_ROW - 1; y++) {
		for (let x = 1; x < MAX_COL - 1; x++) {
			if(myBoard[y][x] == color ) {
				count++;
			}
		}
	}

	return count;
}
