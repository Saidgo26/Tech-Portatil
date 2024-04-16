const navBar = document.querySelector('#nav-bar')
const  createNavHome = () => {
navBar.innerHTML = `
<div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
<a href="/">
<p class="font-bold text-xl text-white" >TechPortatil</p>
</a>
<!-- Movil -->
<svg id="nav-btn"
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" viewBox="0 0 24 24" 
  stroke-width="1.5" stroke="currentColor" 
  class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-[#116b54] rounded-lg"
>
  <path stroke-linecap="round"
   stroke-linejoin="round"
   d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
  

<!-- escritorio -->
  <div class="hidden md:flex flex-row gap-4 ">
    <a href="/login/" class="transition ease-in-out text-white hover:bg-[#116b54] py-2 px-4 rounded-lg font-bold">Login</a>
    <a href="/signup/"class="transition ease-in-out bg-indigo-800 text-white hover:bg-indigo-900 py-2 px-4 rounded-lg font-bold">Registro</a>
   
  </div>
<!-- menu-movil -->
  <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
    <a href="/login/" class="transition ease-in-out text-white hover:bg-[#116b54] py-2 px-4 rounded-lg font-bold">Login</a>
    <a href="/signup/"class="transition ease-in-out bg-indigo-800 text-white hover:bg-indigo-900 py-2 px-4 rounded-lg font-bold">Registro</a>
</div>

</div>
`;
};
const  createNavSignup = () => {
  navBar.innerHTML = `
  <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
  <a href="/">
<p class="font-bold text-xl text-white" >TechPortatil</p>
</a>
  <!-- Movil -->
  <svg id="nav-btn"
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24" 
    stroke-width="1.5" stroke="currentColor" 
    class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-[#116b54] rounded-lg"
  >
    <path stroke-linecap="round"
     stroke-linejoin="round"
     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  
  <!-- escritorio -->
    <div class="hidden md:flex flex-row gap-4 ">
      <a href="/login/" class="transition ease-in-out text-white hover:bg-[#116b54] py-2 px-4 rounded-lg font-bold">Login</a>
     
    </div>
  <!-- menu-movil -->
    <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
      <a href="/login/" class="transition ease-in-out text-white hover:bg-[#116b54] py-2 px-4 rounded-lg font-bold">Login</a>
     
  </div>
  
  </div>
  `;
};
  const  createNavLogin = () => {
    navBar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
    <a href="/">
<p class="font-bold text-xl text-white" >TechPortatil</p>
</a>
    <!-- Movil -->
    <svg id="nav-btn"
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" viewBox="0 0 24 24" 
      stroke-width="1.5" stroke="currentColor" 
      class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-[#116b54] rounded-lg"
    >
      <path stroke-linecap="round"
       stroke-linejoin="round"
       d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    
    <!-- escritorio -->
      <div class="hidden md:flex flex-row gap-4 ">
        <a href="/signup/" class="transition ease-in-out text-white hover:bg-[#116b54] py-2 px-4 rounded-lg font-bold">Registro</a>
       
      </div>
    <!-- menu-movil -->
      <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
        <a href="/signup/" class="transition ease-in-out text-white hover:bg-[#116b54] py-2 px-4 rounded-lg font-bold">Registro</a>
       
    </div>
    
    </div>
    `;
};
const  createNavStore = () => {
      navBar.innerHTML = `<div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
      <a href="/store/">
      <p class="font-bold text-xl text-white" >TechPortatil</p>
      </a>
        <button id="nav-btn-store" class="w-16 h-12 bg-gray-200 font-bold cursor-pointer transition-all duration-[0.3s] ease-[ease-in] text-neutral-400 p-2 rounded-lg hover:text-[blueviolet]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full" fill="currentColor" >
             <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
            </svg>
        </button>
        <section id="section-cart" class="absolute w-full  bg-indigo-300 flex-col justify-between overflow-auto transition-all duration-[0.3s] ease-[ease-in] right-0 top-16 md:w-1/2 rounded-lg hidden ">
          <table class="table-fixed text-center border-collapse">
              <thead class="h-8 border-b-[rgb(107,106,106)] border-b border-solid">
                  <tr>
                      <th class="table-title">Nombre</th>
                      <th class="table-title">Precio</th>
                      <th class="table-title">Cantidad</th>
                      <th class="table-title">Eliminar</th>
                  </tr>
              </thead>
              <tbody id="table-body">
                  <tr> 
                      <td>Nombre</td>
                      <td>200$</td>
                      <td>1</td>
                      <td>Eliminar</td>
                  </tr>
                  <tr> 
                      <td>Nombre</td>
                      <td>200$</td>
                      <td>1</td>
                      <td>Eliminar</td>
                  </tr>
              </tbody>
          </table>
          <button type"submit" class="cursor-pointer bg-blue-900 font-bold text-[white] transition-all duration-[0.3s] ease-[ease-in] mt-4 p-4 rounded-lg hover:bg-blue-950">Vaciar Carrito</button>
        </section>
  </div>
      `;
};    
const  createNavAdmin = () => {
  navBar.innerHTML = `
  <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
  <a href="/admin/">
  <p class="font-bold text-xl text-white" >TechPortatil</p>
  </a>
  <!-- Movil -->
  <svg id="nav-btn"
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24" 
    stroke-width="1.5" stroke="currentColor" 
    class="w-10 h-10 md:hidden text-white cursor-pointer p-2 hover:bg-[#116b54] rounded-lg"
  >
    <path stroke-linecap="round"
     stroke-linejoin="round"
     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
    
    
    </div>
    `;
    // <!-- escritorio -->
    //     <div class="hidden md:flex flex-row gap-4 ">
    //       <button id="close-btn" class="transition ease-in-out text-white hover:bg-[#116b54] py-2 px-4 rounded-lg font-bold">Cerrar Sesion</button>
         
    //     </div>
    //   <!-- menu-movil -->
    //     <div class="bg-slate-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
    //     <button id="close-btn" class="transition ease-in-out text-white hover:bg-[#116b54] py-2 px-4 rounded-lg font-bold">Cerrar Sesion</button>
         
    //   </div>
  };

if (window.location.pathname === '/') {
    createNavHome();    
} else if (window.location.pathname === '/signup/'){
createNavSignup();
} else if (window.location.pathname === '/login/'){
createNavLogin();
}else if (window.location.pathname === '/store/'){
  createNavStore();
}else if (window.location.pathname === '/admin/'){
  createNavAdmin();
}

const navBtn = document.querySelector('#nav-btn')

const toggleMobileMenu = () => {
  navBtn.addEventListener('click', e =>{

    const menuMobile = navBar.children[0].children[3];
    if (!navBtn.classList.contains('active')) {
      navBtn.classList.add('active');
      navBtn.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />`; 
      menuMobile.classList.remove('hidden');
      menuMobile.classList.add('flex');
    } else {
      navBtn.classList.remove('active');
      navBtn.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />`;
      menuMobile.classList.add('hidden');
      menuMobile.classList.remove('flex');
    } 
  })};

  // const closeBtnDesktop = navBar.children[0].children[2].children[0];
  // const closeBtnMobile = navBar.children[0].children[3].children[0];
  
  // closeBtnDesktop.addEventListener('click',async e =>{
  //   console.log(e.target);
   
  // try {
  //   await axios.get('/api/logout');
  //   console.log('sesion cerrada');
  //   window.location.pathname === '/signup';
    
  // } catch (error) {
  //   console.log('error');
    
  // }
  // });
  
  
  // closeBtnMobile.addEventListener('click',async e =>{
  //   console.log(e.target);
    
   
  //   try {
  //     await axios.get('/api/logout');
  //     window.location.pathname == '/login';
      
  //   } catch (error) {
  //     console.log('error');
      
  //   }
  //   });
  

const navBtnStore = document.querySelector('#nav-btn-store')

const toggleCartSection = () => {
  navBtnStore.addEventListener('click', e =>{

    const sectionCart = document.querySelector('#section-cart');
    if (!navBtnStore.classList.contains('active')){
      navBtnStore.classList.add('active');
      sectionCart.classList.remove('hidden')
      sectionCart.classList.add('flex');
    } else {
      navBtnStore.classList.remove('active');
      sectionCart.classList.add('hidden')
      sectionCart.classList.remove('flex');
    }
  })
};

const handleNavigation = () => {
  if (window.location.pathname === '/' || window.location.pathname === '/login/' || window.location.pathname === '/signup/' || window.location.pathname === '/admin/') {
    toggleMobileMenu();
  } else if (window.location.pathname === '/store/') {
    toggleCartSection();
  }
};

handleNavigation();