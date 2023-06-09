export const randomNumBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

//삼각형 빗변의 길이(화면너비에 따른 반지름 구하기 위헤)
export const hypotenuse = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
