const div = document.querySelector('#notification');


export const createNotification = (isError, message)=>{
    
    if (isError){
    div.innerHTML= `
        <div class=" max-w-7xl mx-auto  flex justify-end ">
            <p class="bg-red-600 p-4 w-2/4 rounded-lg font-semibold text-white">${message}</p>
        </div> 
    `;
    }else {
    div.innerHTML= `
        <div class=" max-w-7xl mx-auto flex justify-end ">
            <p class="bg-green-600 p-4 w-2/4 rounded-lg font-semibold text-white">${message}</p>
        </div> 
    `;
    };
    

};



