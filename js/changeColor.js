/**
 * 色を変えるスクリプト
 */
const NOTHING="0";
const WHITE = "1";
const BLACK = "2";
const WALL="3";

//置ける場所をハイライトにする
function doHilight(bord) {
	$(bord).toggleClass('hilight', true);
	$(bord).toggleClass('notHilight', false);
}

//ハイライトを戻す
function doNotHilight(bord) {
	$(bord).toggleClass('hilight', false);
	$(bord).toggleClass('notHilight', true);
}

//色を変える処理
function changeColor(bordId, color) {
	if(color == WHITE) {
		changeWhite(bordId);
	} else {
		changeBlack(bordId);
	}
}

// 白色にする処理
function changeWhite(bord) {
	$(bord).val(WHITE);
	$(bord).animate({
		'color' : 'White'
	}, 200);
}

// 黒色にする処理
function changeBlack(bord) {
	$(bord).val(BLACK);
	$(bord).animate({
		'color' : 'Black'
	}, 200);
}
