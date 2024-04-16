const textInfo = document.querySelector('#text-info');


(async ()=>{
    try {
        const id = window.location.pathname.split('/')[2];
        const token = window.location.pathname.split('/')[3];
        await axios.patch(`/api/users/${id}/${token}`);
        window.location.pathname = '/login/';
        
    } catch (error) {
        console.log(error.response.data.error);
        textInfo.innerHTML = error.response.data.error;

        
    }
})()