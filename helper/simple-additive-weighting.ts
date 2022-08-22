const percent = [30, 40, 10, 10, 10];

function count(arr: any) {
  let hasil: any[] = [];

  arr.forEach((element: any, index: any) => {
    index++;

    if (index === 6) {
      return;
    }

    if (index === 1 || index === 2 || index === 4 || index === 5) {
      let min = Math.min(...arr[index]);
      hasil.push(arr[index].map((e: any) => min / e));
    } else {
      let max = Math.max(...arr[index]);
      hasil.push(arr[index].map((e: any) => e / max));
    }
  });

  let output = [];
  let real = 0;

  for (let i = 0; i < hasil[0].length; i++) {
    real = 0;
    for (let j = 0; j < hasil.length; j++) {
      // if (j === 0) {
      //   real = real - hasil[j][i] * percent[j];
      // } else {
      real = real + hasil[j][i] * percent[j];
      // }
    }
    if (real < 0) {
      real = 0;
    }
    // output.push({ name: arr[0][i], score: Math.round(real) });
    output.push({ name: arr[0][i], score: real });
  }

  return output.sort((a, b) => {
    return b.score - a.score;
  });
}

export default function processArray(arr: any) {
  const result: any[] = [];

  Object.keys(arr[0]).forEach((element, i) => {
    result.push(arr.map((e: any) => e[element]));
  });

  const output = count(result);

  return output;
}
