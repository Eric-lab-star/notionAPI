console.log("heelo");
const div = document.getElementById("div");

const getInfos = async () => {
  const res = await fetch("http://localhost:4000/infos");
  const data = await res.json();
  return data;
};

const addData = async () => {
  const infos = await getInfos();
  infos.forEach((info) => {
    const notionInfo = document.createElement("div");
    notionInfo.innerHTML = `
            <h3>${info.Name}</h3>

        `;
    div.appendChild(notionInfo);
  });
};

addData();
