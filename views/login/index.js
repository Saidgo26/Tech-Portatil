
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');


form.addEventListener('submit', async e =>{
e.preventDefault();

try {
  
  const user = {
    email : emailInput.value,
    password: passwordInput.value,
  };
  const { data } = await axios.post('/api/login', user)

console.log(data);

if (data.role === 'admin') {
  window.location.pathname = `/admin/`
}else{
  window.location.pathname = `/store/`
}

} catch (error) {
  console.log(error);    
  errorText.innerHTML = error.response.data.error
}
});