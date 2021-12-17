const nameDisplay = document.getElementById('name')
const buttonElement = document.getElementById('btn')
const genderLabel = document.getElementById('gender')
const errorMsg = document.getElementById('error')
const female = document.forms.form.elements.female
const male = document.forms.form.elements.male
const lastname = document.forms.form.elements.lastname
const language = document.forms.form.elements.language
const number = document.forms.form.elements.number
let names = {}
let lastnames = {}
let nameList = []
let randomName = ""
let lastName = ""

const getRandomName = () => {
  for (let i = 0; i < number.value; i++){
    const random = Math.floor(Math.random() * names.length)
    randomName = names[random].charAt(0).toUpperCase() + names[random].slice(1)
    nameList.push(randomName)
    if (lastname.checked) lastName = ` ${lastnames[random]}`
  }
  const firstNames = [...new Set(nameList)]
  return nameDisplay.textContent = firstNames.join(' ') + lastName
}

buttonElement.addEventListener('click', handleSubmit = (e) => {
  e.preventDefault()
  nameList = []
  lastName = []
  genderLabel.classList.remove('error')
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      if (female.checked){
        if (language.value === "EN") names = data.ENfemale, lastnames = data.ENlastname
        if (language.value === "FI") names = data.FIfemale, lastnames = data.FIlastname
        if (language.value === "FR") names = data.FRfemale, lastnames = data.FRlastname
        if (language.value === "IT") names = data.ITfemale, lastnames = data.ITlastname
        if (language.value === "JP") names = data.JPfemale, lastnames = data.JPlastname
        if (language.value === "SE") names = data.SEfemale, lastnames = data.SElastname
        nameDisplay.classList.add('female')
        nameDisplay.classList.remove('male')
        getRandomName()
      } else if (male.checked){
        if (language.value === "EN") names = data.ENmale, lastnames = data.ENlastname
        if (language.value === "FI") names = data.FImale, lastnames = data.FIlastname
        if (language.value === "FR") names = data.FRmale, lastnames = data.FRlastname
        if (language.value === "IT") names = data.ITmale, lastnames = data.ITlastname
        if (language.value === "JP") names = data.JPmale, lastnames = data.JPlastname
        if (language.value === "SE") names = data.SEmale, lastnames = data.SElastname
        nameDisplay.classList.add('male')
        nameDisplay.classList.remove('female')
        getRandomName()
      } else {
        genderLabel.classList.add('error')
      }
    })
    .catch(error => {
      errorMsg.textContent = "An error occurred."
      nameDisplay.textContent = ""
      setTimeout(() => {
        errorMsg.textContent = ""
      }, 5000)
    })
})