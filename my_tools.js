export function kaprekar(n) {
  let count = 1
  let steps = []
  const digits = String(n).length

  //3-digit and 4-digit only
  if (digits != 3 && digits != 4){
    return
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

  return [steps, count]
}

export function isPronic(n) {
  if (n == 0){
    return ["0 x 1 = 0"]
  }

  for (let i = 1; i <= n/2; i++){
    if (n/i == i + 1){
      return [`${i} x ${i + 1} = ${n}`]
    } else if (n/i == i - 1){
      return [`${i - 1} x ${i} = ${n}`]
    }
  }
}
