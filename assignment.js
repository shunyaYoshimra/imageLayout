// div#js-photosを取得
const jsPhotos = document.getElementById("js-photos");
//  div#js-photosの子要素を取得
let items = jsPhotos.children;
// imgタグを取得
const img = document.getElementsByTagName("img");
// 空の配列imgPropotionsを作成
const imgPropotions = [];



// 画像の形によって配置場所を変更
const changeLayoutByPropotion = () => {

  // 画像の縦横比を取得
  for (i = 0; i < img.length; i++) {
    imgPropotions.push(img[i].height / img[i].width)
  }

  // 画像が４枚の時、一番縦長のものがbig-itemになるように指定
  if (items.length === 4) {
    // 最も縦長なもののインデックスを取得
    const aryMax = function (a, b) { return Math.max(a, b); }
    let max = imgPropotions.reduce(aryMax);
    for (i = 0; i < imgPropotions.length; i++) {
      if ((img[i].height / img[i].width) === max) {
        maxIndex = i;
      }
    }
    // 最も縦長の画像の親要素を、#js-photosの最初の子要素に指定
    let maxItem = items[maxIndex];
    jsPhotos.insertBefore(maxItem, items[0])

    // 画像が5枚の時、横長のものを２つの要素がbig-itemになるように指定
  } else if (items.length === 5) {
    // 一番横長の物を取得
    const aryMin = function (a, b) { return Math.min(a, b); }
    const min = imgPropotions.reduce(aryMin);
    for (i = 0; i < imgPropotions.length; i++) {
      if ((img[i].height / img[i].width) === min) {
        minIndex = i;
      }
    }
    // 一番横長の物を配列から削除
    imgPropotions.splice(minIndex, 1);
    // ２番目に横長の物を取得
    const arySecondMin = function (a, b) { return Math.min(a, b); }
    const secondMin = imgPropotions.reduce(arySecondMin);
    for (i = 0; i < imgPropotions.length; i++) {
      if ((img[i].height / img[i].width) === secondMin) {
        secondMinIndex = i;
      }
    }
    const minItem = items[minIndex];
    const secondMinItem = items[secondMinIndex];
    jsPhotos.insertBefore(secondMinItem, items[0]);
    jsPhotos.insertBefore(minItem, secondMinItem);

  }
}

changeLayoutByPropotion();

// 画像が４つの時、全てが正方形に近ければ、レイアウトを調整
const squareLayout = () => {
  jsPhotos.classList.add("container-square");
  for (i = 0; i < items.length; i++) {
    items[i].classList.add("item");
  }
}

// #js-photosコンテナとその子要素にクラスを付与
const addClass = () => {
  if (items.length <= 5) {
    jsPhotos.classList.add("container" + (items.length));
  } else {
    jsPhotos.classList.add("container5");
  }
  for (i = 0; i < items.length; i++) {
    items[i].classList.add("item");
  }
}

// js-photosの子要素の数によってレイアウトを変更
const imageLayout = () => {

  if (items.length === 1) {
    addClass();
  } else if (items.length === 2) {
    addClass();
  } else if (items.length === 3) {
    addClass();
    items[0].classList.add("big-item");
  } else if (items.length === 4) {
    // 画像の形による切り替え
    console.log(imgPropotions.every(v => v >= 0.9 && v <= 1.1));
    if (imgPropotions.every(v => v >= 0.9 && v <= 1.1)) {
      squareLayout();
    } else {

      addClass();
      items[0].classList.add("big-item");
    }
  } else if (items.length == 5) {
    addClass();
    items[0].classList.add("big-item");
    items[1].classList.add("big-item");
  } else if (items.length >= 6) {
    addClass();
    items[0].classList.add("big-item");
    items[1].classList.add("big-item");
    for (i = 5; i < items.length; i++) {
      items[i].classList.add("not-active");
    }
    // div.more-than-sixを追加。
    let moreThanSix = document.createElement("div");
    moreThanSix.classList.add("more-than-six")
    moreThanSix.textContent = "+" + (items.length - 5);
    jsPhotos.insertBefore(moreThanSix, items[0])
  }
}

imageLayout()




