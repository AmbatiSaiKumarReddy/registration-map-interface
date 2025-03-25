// Simplified US Map data with focus on key states shown in the image
export const usMapData = {
  TX: {
    name: 'Texas',
    path: 'M282.1,330.6l0.4-18.3l0.5-19.9l0.2-16.7l4.8-0.5l30.3-2.8l32.1-3.5l0.3,9.5l0.7,9.7l0.6,8.3l0.4,15l0.8,13.1 l0.2,10.7L364.4,346l1.1,29.1l-29.6,2.5l-30.4,1.3l-32,1.3l-0.6-11.2l-0.4-12.8L282.1,330.6z'
  },
  WY: {
    name: 'Wyoming',
    path: 'M354.3,143.7l-27.9,2.8l-29.3,2.5l-27.7,1.7l-28.9,1.2l-1.9-22.7l-3.8-44l-5.4-62.8l7.9-0.7 l31.3-2.8l28.3-2.5l30.9-3.3l27.4-3.2l2.4,22.7l3.5,35.8l4.9,50.6l0.9,8.9z'
  },
  AL: {
    name: 'Alabama',
    path: 'M405.8,335l-1.7,14.2l-2.4,19.2l-0.3,16l7.6-0.3l11.4-1.5l19.7-2l9.7-1.5l-0.3,2.7l2.8,18.7l2.8,16 l-5.3,3l-2.5,5.5l-0.3,3.7l-1.7,2.8l1,2.3l-0.7,5.3l-2.3,1.2l-1.5,5.5l-2.8-0.2l-5.5-2.5l-6.3,2l-6.5,2.3l-15.5-2.2l-9.7-0.7 l-0.2-2.8l1.7-1.8l2.5-9.9l-1.5-3.5l0.5-3.7l2.3-5.7l-0.5-7.1l-1.7-5.5l-0.7-8.1l-3-7.6l-2.3-1.8l-1.5-5.3l-2.7-5.8l-12.5-2.7 l-5.7-1.3l-5.5-5.1l-2.5-5.3l-2-1.5l-1.3-10.1l-2.5-9.9L405.8,335z'
  },
  // Add more states as needed...
};

export const allStateIds = Object.keys(usMapData);
export const allStateNames = Object.values(usMapData).map(state => state.name);
