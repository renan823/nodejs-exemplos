
const form = document.querySelector("form")

form.addEventListener("submit", (e)=>{
  e.preventDefault()
  let input = document.querySelector("input")
  let name = input.value
  input.value = ""
  $.ajax({
    type: "post",
    url: `http://localhost:3000/login`,
    data:{nome: name},
    success: (data)=>{
      window.location.href = "http://localhost:3000/"
    }
  })
})
