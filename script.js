const members = [

// 人ごとのエリアの干渉をなくすために、枠は気持ち小さめに設定する。

    {
    name: "おじいちゃん",
    message: "みんな、ありがとう！\nこれからも元気で楽しい時間を過ごしていきたいと思います。\nこれからもよろしくお願いします！",
  top: 48.68,
  left: 39.83,
  width: 8.17,
  height: 10.07
    },
    {
    name: "おばあちゃん",
    message: "私はおばあちゃんです。\nおじいちゃんと一緒に過ごす毎日がとても幸せです。\nこれからも仲良く、楽しい時間をたくさん作っていきたいと思います。",
  top: 51.07,
  left: 55.50,
  width: 8.17,
  height: 8.75
    },    
    {
    name: "寿郎",
    message: "記念日おめでとうございます！これからもお二人らしい素敵な時間を重ねていってください。",
  top: 18.89,
  left: 70.33,
  width: 7.33,
  height: 7.92
    },
    {
    name: "よし子",
    message: "大切な記念日おめでとう！これからも笑顔あふれる毎日が続きますように心から願っています。",
  top: 29.62,
  left: 57.17,
  width: 8.17,
  height: 8.25
    },
    {
    name: "駿太",
    message: "記念日おめでとうございます！これから先も幸せな思い出をたくさん作っていってくださいね。",
  top: 42.82,
  left: 70.83,
  width: 7.33,
  height: 7.43
    },
    {
    name: "明子",
    message: "素敵な記念日おめでとう！これからもお互いを大切に、温かい日々を過ごしてください。",
  top: 54.54,
  left: 81.67,
  width: 6.67,
  height: 8.09
    },
    {
    name: "みく",
    message: "おじいちゃん、おばあちゃん、おめでとでちゅ。",
    top: 61.30,
    left: 69.17,
    width: 8.83,
    height: 9.74
    },
    {
    name: "幾三郎",
    message: "大切な節目の日、おめでとうございます！これからも笑顔と幸せにあふれる日々になりますように。",
  top: 27.97,
  left: 28.67,
  width: 6.83,
  height: 9.41
    },
    {
    name: "順子",
    message: "おめでとうございます！これからもお互いを支え合いながら、幸せな日々を築いてください。",
    top: 30.28,
    left: 12.83,
    width: 8.33,
    height: 10.07
    },
    {
    name: "詩織",
    message: "記念日おめでとう！これからも楽しいことも嬉しいことも分かち合える毎日でありますように。",
    top: 44.97,
    left: 24.17,
    width: 8.33,
    height: 10.56
    },
    {
    name: "康太",
    message: "大切な記念日おめでとうございます！これからも温かく幸せな時間がずっと続きますように。",
    top: 59.57,
    left: 14.50,
    width: 6.83,
    height: 9.41
    },
    {
    name: "毅",
    message: "世界一のおじいちゃん、おばあちゃん！",
    top: 65.10,
    left: 33.33,
    width: 8.83,
    height: 9.90
    },
    {
    name: "ごう",
    message: "ばぶぅ、ばぁぁばぁぶぅっ！！（二人ともおめでとう）",
    top: 72.52,
    left: 23.17,
    width: 7.00,
    height: 6.27
    }

];

let isEditMode = true;

const container = document.getElementById("container");
const output = document.getElementById("output");
const toggleBtn = document.getElementById("toggleBtn");


// ----------------
// 描画処理
// ----------------
function renderMembers() {
  document.querySelectorAll(".person").forEach(el => el.remove());

  members.forEach(member => {
    const person = document.createElement("div");
    person.className = "person";

    person.style.top = member.top + "%";
    person.style.left = member.left + "%";
    person.style.width = member.width + "%";
    person.style.height = member.height + "%";

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
tooltip.innerText = `【${member.name}】\n${member.message}`;

    person.appendChild(tooltip);
    container.appendChild(person);
  });
}

renderMembers();



// ----------------
// モード切替
// ----------------
toggleBtn.addEventListener("click", () => {
  isEditMode = !isEditMode;
  toggleBtn.innerText = `座標取得モード: ${isEditMode ? "ON" : "OFF"}`;

  document.querySelectorAll(".person").forEach(el => {
    el.style.pointerEvents = isEditMode ? "none" : "auto";

    if (isEditMode) {
      el.classList.add("edit-mode");
    } else {
      el.classList.remove("edit-mode");
    }
  });
});



// ----------------
// 座標取得（ドラッグで範囲）
// ----------------
let startX, startY, box;


container.addEventListener("mousedown", (e) => {
  if (!isEditMode) return;

  const rect = container.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;

  box = document.createElement("div");
  box.className = "selection-box";
  box.style.left = startX + "px";
  box.style.top = startY + "px";

  container.appendChild(box);
});

container.addEventListener("mousemove", (e) => {
  if (!isEditMode || !box) return;

  const rect = container.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  box.style.width = Math.abs(currentX - startX) + "px";
  box.style.height = Math.abs(currentY - startY) + "px";
});

container.addEventListener("mouseup", (e) => {
  if (!isEditMode || !box) return;

  const rect = container.getBoundingClientRect();
  const endX = e.clientX - rect.left;
  const endY = e.clientY - rect.top;

  const left = Math.min(startX, endX);
  const top = Math.min(startY, endY);
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  const leftP = (left / rect.width) * 100;
  const topP = (top / rect.height) * 100;
  const widthP = (width / rect.width) * 100;
  const heightP = (height / rect.height) * 100;

  const result = `
{
  name: "名前",
  message: "メッセージ",
  top: ${topP.toFixed(2)},
  left: ${leftP.toFixed(2)},
  width: ${widthP.toFixed(2)},
  height: ${heightP.toFixed(2)}
}
`;

  output.innerText = result;
  console.log(result);

  box.remove();
  box = null;

});

