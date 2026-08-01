export function kaprekar(n){
  let count = 0
  let steps = []
  const digits = String(n).length

  //check if all digits are the same
  if (String(n).split(String(n)[0]).length - 1 >= digits){
    return [`All of the digits in ${n} are the same, so the routine will always end in 0.`, false]
  }
  
  let target = 495
  target = digits == 4 ? 6174 : target
  
  while (n != target) {
    count++
    let splitN = String(n).split("")

    while (splitN.length < digits){
      splitN.push("0")
    }

    let largest = Number(splitN.sort((a, b) => b - a).join(""))
    let smallest = Number(splitN.sort((a, b) => a - b).join(""))
    let diff = largest - smallest
    steps.push(`${largest} - ${smallest} = ${diff}`)

    n = diff
  }

  //format result
  let result = ""
  for (let step of steps){
    result += `${step}\n`
  }
  result += `It takes ${count} routines to reach the Kaprekar's constant ${target}.`
  return [result, true]
}

export function isPronic(n){
  if (n == 0){
    return ["0 x 1 = 0", true]
  }

  for (let i = 1; i <= n/2; i++){
    if (n/i == i + 1){
      return [`${i} x ${i + 1} = ${n}`, true]
    } else if (n/i == i - 1){
      return [`${i - 1} x ${i} = ${n}`, true]
    }
  }

  return [`${n} is not a pronic number.`, false]
}

export function palindrome(str) {
  //remove spaces and punctuations
  const symbolRegex = /[\W_]/gi
  str = str.replaceAll(symbolRegex, "")

  //find the middle char(s)
  let firstHalf, secondHalf

  if (str.length%2 == 0){
    let midIndex = (str.length/2) //and this -1 as well
    firstHalf = str.slice(0, midIndex).toLowerCase()
    secondHalf = str.slice(midIndex).toLowerCase() 
  } else {
    let midIndex = (str.length - 1)/2
    firstHalf = str.slice(0, midIndex).toLowerCase()
    secondHalf = str.slice(midIndex + 1).toLowerCase()
    
  }

  let modifiedSecond = secondHalf.split("").reverse().join("")
  
  //check
  if (firstHalf == modifiedSecond){
    return [`${str} is a palindrome`, true]
  } else {
    return [`${str} is not a palindrome`, false]
  }
}

export function factorial(n) {
  let product = n
  let result = `${n}! = ${n}`

  if (n == 0){
    result += `\n0! returns 0 due to the pattern of factorials.` +
      "\nSince the formula for factorial is //n! = n(n-1)!//, we would reverse the formula to find a lower factorial:" +
      "\n//(n-1)! = n!/n//"+
      "\nIf we subsitute 1 into the formula above, we can find the factorial of 0:" +
      "\n//0! = 1!/1 = 1//"

    return [result, true]
  }
  
  for (let i = n - 1; i > 0; i--){
    product *= i
    result += ` x ${i}`
  }
  
  result += n == 1 ? ` x 1` : ""
  result += `\n = ${product}`

  return [result, true]
}

export function morseCode(input, inputType) {
  const morse = {
    ".-": "A", "-.": "N",
    "-...": "B", "---": "O",
    "-.-.": "C", ".--.": "P",
    "-..": "D", "--.-": "Q",
    ".": "E", ".-.": "R",
    "..-.": "F", "...": "S",
    "--.": "G", "-": "T",
    "....": "H", "..-": "U",
    "..": "I", "...-": "V",
    ".---": "J", ".--": "W",
    "-.-": "K", "-..-": "X",
    ".-..": "L", "-.--": "Y",
    "--": "M", "--..": "Z",
    ".----": "1", "..---": "2",
    "...--": "3", "....-": "4",
    ".....": "5", "-....": "6",
    "--...": "7", "---..": "8",
    "----.": "9", "-----": "0"
  }
  let result = ""
  
  if (inputType == "code"){
    //code to chars
    input = input.split(" ")
    let lastChar = ""
    
    for (let c of input){
      //non-morse code
      if (!morse.hasOwnProperty(c)){
        if (lastChar != ""){
          lastChar = ""
          result += " "
          continue
        }
      }
      lastChar = c
      result += morse[c]
    }
  } else {
    //chars to code
    input = input.split("")
    let lastChar = ""
    
    loop1: for (let c of input){
      for (let [k,v] of Object.entries(morse)){
        //find the code for char
        if (c.toUpperCase() == v){
          lastChar = c
          result += k + " "
          continue loop1
        }
      }
      //no code found
      if (lastChar != ""){
        lastChar = ""
        result += " "
      } 
    }
    
    result = result.trim()
  }

  return [result, true]
}
