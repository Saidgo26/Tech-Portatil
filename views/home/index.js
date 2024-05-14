const btnStart = document.querySelector('#start-btn');
const header = document.querySelector('header');

console.log(header, btnStart);

header.addEventListener('click', e =>{

    if (e.target.closest('#start-btn')) {
        Swal.fire({
            title: "Comencemos!!",
            icon: "info",
            html: `
                <p>No sin antes Iniciar/Registrarte primero</p>
                <p>¿Qué deseas hacer?</p>
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `Login`,
            cancelButtonText: `Signup`,
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigir a la página de login
                window.location.href = '/login/';
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Redirigir a la página de signup
                window.location.href = '/signup/';
            }
        });
 

    }

});




