let select = document.querySelectorAll('.currency')
let btn = document.getElementById('btn')
let input = document.getElementById('input').value;
let error = document.querySelector('.error')

//fetch API
fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
.then(res=>displayDropDown(res))

//Display the countries 
function displayDropDown(res){
  let curr = Object.entries(res)
  for(let i=0;i<curr.length;i++){
    let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`
    select[0].innerHTML += opt
    select[1].innerHTML += opt
  }
}

//get from & to values
btn.addEventListener('click',()=>{
  let fromvalue = select[0].value
  let tovalue = select[1].value
  if(fromvalue===tovalue){
    //errormessage showing
      error.innerHTML = 'Choose different currencies';
      error.classList.add('.error');
}
  else{
    convert(fromvalue,tovalue,input)
  }
});

//conversation
function convert(fromvalue,tovalue,input){
  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=${input}&from=${fromvalue}&to=${tovalue}`)
  .then(resp => resp.json())
  .then((data) => {
    document.getElementById('result').value = `${input} ${fromvalue} = ${Object.values(data.rates)[0]} ${tovalue}`
  });
}