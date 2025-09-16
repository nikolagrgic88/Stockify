const sortKeys = (keys: string[]) => {
  return keys.sort((a: string, b: string) => {
    const [_, a1, a2, a3, a4] = a.split("-");
    const [__, b1, b2, b3, b4] = b.split("-");

    const reverse = a1.charCodeAt(1) % 2 !== 0;

    const aVals = reverse
      ? [-a1.charCodeAt(1), -+a2, -a3.charCodeAt(1), -+a4]
      : [a1.charCodeAt(1), +a2, a3.charCodeAt(1), +a4];

    const bVals = reverse
      ? [-b1.charCodeAt(1), -+b2, -b3.charCodeAt(1), -+b4]
      : [b1.charCodeAt(1), +b2, b3.charCodeAt(1), +b4];

   
    for (let i = 0; i < 4; i++) {
      if (aVals[i] !== bVals[i]) return aVals[i] - bVals[i];
    }
    return 0;
  });
};
