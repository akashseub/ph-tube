const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    // console.log(data.data);
    result = data.data;
    // console.log(result);

    const categorySection = document.getElementById('category-section');

    result.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <button onclick = "allData(${category.category_id})" class="btn">${category.category}</button>
            </div>
        `;
        
        categorySection.appendChild(div);
    });

}

loadCategory();

const allData = async (category) => {
    console.log(category);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`);
    const data = await res.json();
    console.log(data);
    // result = data.data;

    if (data.status === false) {
        const notFound = document.getElementById('not-found');
        notFound.innerHTML = `
            <div class="flex justify-center mt-40">
                <img class = "" src="./image/icon.png" alt="">
            </div>
        `;
        return;
    }
    
    result = data.data;


    const contentContainer = document.getElementById('content-container');
    contentContainer.textContent = '';

    result.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card w-96 bg-base-100">
                <figure class="pb-4">
                    <img src="${data.thumbnail}" alt="Shoes" class="h-60 rounded-xl relative" />
                    ${data.others.posted_date !== '' ? `
                    <div class="absolute right-4 bottom-28 text-white text-xs bg-black p-1 rounded-lg">
                        <p>${convertSecondsToTime(data.others.posted_date)}</p>
                    </div>` : ''}
                </figure>
                <div class="flex space-x-2">
                    <div>
                        <img class = 'h-12 w-12 rounded-full' src="${data.authors[0].profile_picture}" alt="">
                    </div>
                    <div class = "space-y-2">
                        <div>
                            <h1 class = "text-xl font-bold">${data.title}</h1>
                        </div>
                        <div class = "flex space-x-4">
                            <div>
                                <h4 class = "text-gray-500">${data.authors[0].profile_name}</h4>
                            </div>
                            <div>
                                ${data.authors[0].verified === true ?  `
                                    <i class="fa-solid fa-certificate text-[#2568ef]"></i>`
                                   :
                                   ""
                                
                                }
                            </div>
                        </div>
                        <div>
                            <p class = "text-gray-500">${data.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contentContainer.appendChild(div);
    });
}

function convertSecondsToTime(seconds) {
    if (seconds === "") {
        return '';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}hrs ${minutes}min ago`;
}

allData(1000);