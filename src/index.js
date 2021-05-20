import "./styles.css";

const onClickAdd = () => {
  // 入力画面で入力した値を取得する
  const inputText = document.getElementById("add-text").value;
  // 追加ボタンが押下されたら、入力蘭内の値を空にする。
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// htmlのidを紐付けて、クリック処理が発生した場合onClickAdd()関数が呼ばれるように処理する。
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target, id) => {
  // removeChild:親に紐づく子要素を削除できる
  document.getElementById(id).removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", (listName) => {
    // 押された完了ボタンの親タグ（div）を未完了リストから削除
    // parentNode:指定した要素の親タグを取得する
    deleteFromIncompleteList(completeButton.parentNode, "incomplete-list");

    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode;
    // Todo内容テキストを取得
    // firstElementChild：要素の一番目を取得
    const text = addTarget.firstElementChild.innerText;
    // div 以下を初期化する
    addTarget.textContent = null;
    // liタグを生成
    const li = document.createElement("li");
    li.innerText = text;
    // buttonタグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ（div）を完了リストから削除
      deleteFromIncompleteList(backButton.parentNode, "complete-list");
      // テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    // divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ（div）を未完了リストから削除
    // parentNode:指定した要素の親タグを取得する
    deleteFromIncompleteList(deleteButton.parentNode, "incomplete-list");
  });

  // divタグの子要素に各要素を設定する
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(div);
};
