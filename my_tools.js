export function kaprekar(n){
  let count = 0
  let steps = []
  const digits = String(n).length

  //3-digit and 4-digit only
  if (digits != 3 && digits != 4){
    return ["<p>This tool only checks for 3-digit and 4-digit numbers because for every numbers of other digit lengths, they either collapse to zero or get trapped in complex multi-number loops.</p>", false]
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
    result += `<p>${step}</p>`
  }
  result += `<p>It takes ${count} routines to reach the Kaprekar's constant ${target}.</p>`
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
