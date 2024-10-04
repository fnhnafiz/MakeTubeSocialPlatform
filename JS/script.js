function mainTimes(time) {
  const hours = Math.floor(time / 3600);
  const min = Math.floor((time % 3600) / 60);
  const seconds = (time % 3600) % 60;
  return `${hours} Hours ${min} Minutes ${seconds} Seconds Ago`;
}

// Load CataGories Load on HTMl
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displaCatagories(data.categories))
    .catch((err) => console.log(err));
};
const removeActiveClassList = () => {
  const removeClass = document.getElementsByClassName("acitveBtn");

  for (let button of removeClass) {
    button.classList.remove("active");
  }
};
const loadCatagoriesVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${id}`);
      removeActiveClassList();
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((err) => console.log(err));
};
const displaCatagories = (categories) => {
  const catagoriesContainer = document.getElementById("catagories");
  categories.forEach((i) => {
    const buttonContainer = document.createElement("div");
    // button.classList = "btn font-semibold text-xl";
    // button.innerText = i.category;
    buttonContainer.innerHTML = `
    <button id="btn-${i.category_id}" onclick="loadCatagoriesVideos(${i.category_id})"  class ="btn acitveBtn">
    ${i.category}
    </button>
    `;
    catagoriesContainer.appendChild(buttonContainer);
  });
};

// Load to videos in HTML
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};
// Dispkay Videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = "";
  if (videos.length === 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="min-h-[400px] flex flex-col justify-center items-center gap-5">
    <img src="./assets/Icon.png"/>
    <h1 class="font-bold text-2xl text-center">
    Ooppss Sorry!!! </br>
    Here is No Videos
    </h1>
    </div>
    `;
  } else {
    videosContainer.classList.add("grid");
  }
  videos.forEach((v) => {
    // console.log(v);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    
     <figure class = "h-[200px] relative">
    <img class = "h-full w-full object-cover"
      src="${v.thumbnail}"
      alt="Shoes" />
      ${
        v.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute right-2 bottom-2 bg-black text-white text-sm p-1 rounded">${mainTimes(
              v.others.posted_date
            )}</span>`
      }
      
  </figure>
  <div class="px= 0 py-2">
    <div class = "flex gap-4"> 
    <div>
    <img class = "w-8 h-8 object-cover rounded-full" src = "${
      v.authors[0].profile_picture
    }"/>
    </div>
    <div>
    <h2> ${v.title}</h2>
    <div class="flex gap-3 items-center">
    <p> ${v.authors[0].profile_name}</p>
    <p> ${
      v.authors[0].verified === true
        ? `<img class="w-8" src ="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
        : ""
    }
    
    </p> 
    </div>
    <p> ${v.others.views} views</p>
    </div>
    
    </div>

  </div>
    `;
    videosContainer.appendChild(card);
  });
};
loadCatagories();
loadVideos();
