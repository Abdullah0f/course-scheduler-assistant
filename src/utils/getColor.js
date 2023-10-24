import { ref } from 'vue';
import { LECTURES_COLORS } from './constants';

const titleToColorMapping = ref({});
let availableColors = [...LECTURES_COLORS];  

export const getColor = (title) => {
  if (!titleToColorMapping.value[title]) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);

    titleToColorMapping.value[title] = availableColors[randomIndex];

    availableColors.splice(randomIndex, 1);     // remove used color
    
    if (availableColors.length === 0) {
      return "#f4f4f4"        // the previous grey color 
    }
  }
  return titleToColorMapping.value[title];
}
