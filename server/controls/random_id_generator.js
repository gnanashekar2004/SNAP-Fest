export const getRandomId = (min, max, exclude)=>{
    let randomNum;
    let excludeSet = new Set(exclude.map(item => item.id));
    do {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludeSet.has(randomNum));
    return randomNum;
}