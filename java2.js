let weightEl = document.getElementById("weight")
let ageEl = document.getElementById("Age")
let heightEL = document.getElementById("height")
let daysEL = document.getElementById("days")
let bmr = document.getElementById("result")
let caloriesperday = document.getElementById("cal")
let wresEl = document.getElementById("wres")
let aresEl = document.getElementById("ares")
let hresEl = document.getElementById("hres")
let radiomale = document.getElementById("male")
let radiofemale = document.getElementById("female")
let netbmr = 0
let netcalories = 0
let dayscal = 0

function button()
{
    if (radiomale.checked) 
    {
        bmr_for_male()
        
    }
    else if (radiofemale.checked) 
    {
        bmr_for_female()
    }
    else
    {
        alert ("Please select your gender!")
    }
    
    checking()
    training()
}



function training()
{
    if (daysEL.value == 0)
        {
            dayscal = 1.2
        }
    else if (daysEL.value >= 1 && daysEL.value < 3)
        {
            dayscal = 1.375
        }
    else if (daysEL.value >= 3 && daysEL.value <= 5)
        {
            dayscal = 1.55
        }
    else if (daysEL.value == 6 || daysEL.value == 7)
        {
            dayscal = 1.725
        }

    netcalories = bmr.innerText * dayscal
    caloriesperday.innerText = netcalories * 1
}

function checking()
{
    if(weightEl.value <= 0)
    {
        alert("Please Enter your weight")
    }
    else if(ageEl.value <= 0)
    {
        alert("Please Enter your Age")
    }
    else if(heightEL.value <= 0)
    {
        alert("Please Enter your height")
    }
}
function bmr_for_male()
{
    bmr.innerText = (10 * weightEl.value) + (6.25 * heightEL.value) - (5 * ageEl.value) + 5
    wresEl.innerText = weightEl.value * 1
    aresEl.innerText = ageEl.value * 1
    hresEl.innerText = heightEL.value * 1
}

function bmr_for_female()
{
    bmr.innerText = (10 * weightEl.value) + (6.25 * heightEL.value) - (5 * ageEl.value) - 161
    wresEl.innerText = weightEl.value * 1
    aresEl.innerText = ageEl.value * 1
    hresEl.innerText = heightEL.value * 1   
}
function reset()
{
    weightEl.value = null
    heightEL.value = null
    ageEl.value = null
    daysEL.value = null
    bmr.innerText = 0
    wresEl.innerText = 0
    aresEl.innerText = 0
    hresEl.innerText = 0 
    caloriesperday.innerText = 0
    radiofemale.checked = null  
    radiomale.checked = null  
}


