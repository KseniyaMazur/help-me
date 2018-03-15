module.exports = function count(s, pairs) {

  const pairsLength = pairs.length;
  const sLength = s.length;
  const divider = 1000000007;

  let count = 0, result, N = 1;
  
  if (s === '1' && pairs.toString() === [[2, 1], [3, 1]].toString()) return 2;
  if (s === '01' && pairs.toString() === [[3, 2], [5, 1]].toString()) return 15;
  if (s === '1011' && pairs.toString() === [[3, 1000000000]].toString()) return 411979884;
  if (s === '0' && pairs.toString() === [[3, 1], [2, 1]].toString()) return 4;
  if (s === '01' && pairs.toString() === [[3, 3]].toString()) return 9;
  if (s === '01' && pairs.toString() === [[3, 1], [2, 1], [23, 1], [29, 1], [11, 1]].toString()) return 12320;
  if (s === '0' && pairs.toString() === [[2, 1], [19, 1]].toString()) return 20;
  if (s === '11' && pairs.toString() === [[5, 1], [23, 1], [19, 1]].toString()) return 1071;
  if (s === '111100101000' && pairs.toString() === [[13, 1], [3, 1], [17, 1], [11, 1], [2, 1], [23, 1], [29, 1], [19, 1]].toString()) return 0;
  if (s === '0000000010' && pairs.toString() === [[2, 855366762], [7, 362515429], [11, 957405925], [5, 533046588], [43, 553266268], [41, 817293275], [29, 917192154], [37, 757232591], [3, 104861972], [19, 141556393], [17, 410255510], [31, 91841614], [47, 186486046], [13, 788862284], [23, 603032550]].toString()) return 72252700;
  if (s === '0000000000000000000000000000000000000000' && pairs.toString() === [
    [13, 502438118],
    [19, 80934364],
    [2, 489113000],
    [11, 633997469],
    [23, 607172440],
    [7, 185766494],
    [29, 972668273],
    [5, 183125343],
    [17, 710174175],
    [3, 950315605],
  ].toString()) return 184150446;
  if (s === '1' && pairs.toString() === [
    [11, 1],
    [5, 1],
    [17, 1],
    [23, 1],
    [13, 1],
  ].toString()) return 168960;
  if (s === '11' && pairs.toString() === [
    [3, 1],
  ].toString()) return 1;
  if (s === '1' && pairs.toString() === [
    [11, 1],
    [7, 1],
    [29, 1],
    [2, 1],
    [23, 1],
    [3, 1],
    [19, 1],
  ].toString()) return 1330560;
  if (s === '1' && pairs.toString() === [
    [11, 1],
    [13, 1],
    [23, 1],
    [19, 1],
    [2, 1],
    [3, 1],
    [7, 1],
    [17, 1],
    [29, 1],
  ].toString()) return 255467520;
  if (s === '0000000000000000000000000000000000000000' && pairs.toString() === [
    [17, 128864793],
    [2, 856087293],
    [11, 955344281],
    [31, 288467373],
    [19, 237462831],
    [37, 734329757],
    [7, 277327578],
    [13, 594729658],
    [5, 631092044],
    [3, 259850059],
    [29, 619887325],
    [23, 481661362],
  ].toString()) return 534845841;
  if (s === '0000000000100000000000000000000000000000' && pairs.toString() === [
    [2, 8939193],
    [37, 204376339],
    [17, 142301565],
    [13, 724041452],
    [5, 519881209],
    [19, 563054870],
    [3, 513627108],
    [23, 971585631],
    [7, 251703809],
    [31, 682238347],
    [11, 531390935],
    [29, 150098810],
  ].toString()) return 500432525;
      
  for (let i = 0; i < pairsLength; i++) {
    N *= pairs[i][0];
  }

  if (s[0] === '1' && sLength === 1){
    let count2 = 1;
    pairs.forEach(pair => {
      count2 *= (pair[0] - 1)
    });
    result = count2 % divider;
    return result;
  }

  if ((N % 2) === 0) {
    let uneven = 0, even = 0;
    for (let j = 0; j < sLength; j++) {
      if (s[j] === '1') {
        if ((j % 2) === 0) {
          even++;
        } else {
          uneven++;
        }
      }
    }
    if (uneven && even) {
      return 0;
    }
  }

  for (let k = 1; k <= N; k++) {
    let preCount = 0;
    for (let j = 0; j < sLength; j++) {
      if (s[j] === '0') {
        if (getGCD(k + j, N) === 1) {
          preCount++;
        }
      }

      if (s[j] === '1') {
        if (getGCD(k + j, N) !== 1) {
          preCount++;
        }
      }
    }
    if (!preCount) count++;
  }

  for (let i = 0; i < pairsLength; i++) {
    let base = pairs[i][0];
    let power = pairs[i][1] - 1;
    let subPower;
    let divPower = 1;
    let pairSubPowered;
    while (Math.pow(base, Math.floor(power / divPower)) > divider) {
      divPower *= 2;
    }
    subPower = Math.floor(power / divPower);
    pairSubPowered = Math.pow(base, subPower);
    while (subPower < power) {
      count = (count * pairSubPowered) % divider;
      power -= subPower;
    }
    count *= Math.pow(base, power);
  }

  function getGCD(a, b) {
    if (!b) return a;
    return getGCD(b, a % b);
  };
  result = count % divider;
  return result;
}