<template>
  <div class="us-map-container">
    <object
      type="image/svg+xml"
      :data="svgUrl"
      class="map-svg"
      @load="onSvgLoaded"
      ref="svgObject"
    ></object>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'USMap',
  props: {
    selectedStates: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const svgObject = ref(null);
    const svgUrl = '/us.svg';
    let stateElements = null;
    const stateNameMapping = {};

    const getStateNameFromId = (stateId) => {
      // Map of state abbreviations to full names
      const stateMap = {
        'AL': 'Alabama',
        'AK': 'Alaska',
        'AZ': 'Arizona',
        'AR': 'Arkansas',
        'CA': 'California',
        'CO': 'Colorado',
        'CT': 'Connecticut',
        'DE': 'Delaware',
        'DC': 'District of Columbia',
        'FL': 'Florida',
        'GA': 'Georgia',
        'HI': 'Hawaii',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'IA': 'Iowa',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'ME': 'Maine',
        'MD': 'Maryland',
        'MA': 'Massachusetts',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MS': 'Mississippi',
        'MO': 'Missouri',
        'MT': 'Montana',
        'NE': 'Nebraska',
        'NV': 'Nevada',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NY': 'New York',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': 'Oregon',
        'PA': 'Pennsylvania',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VT': 'Vermont',
        'VA': 'Virginia',
        'WA': 'Washington',
        'WV': 'West Virginia',
        'WI': 'Wisconsin',
        'WY': 'Wyoming'
      };
      return stateMap[stateId.toUpperCase()] || stateId;
    };

    const onSvgLoaded = () => {
      const svgDoc = svgObject.value.contentDocument;
      if (!svgDoc) return;
      
      const svgElement = svgDoc.querySelector('svg');
      if (!svgElement) return;
      
      // Find state elements - they usually have state codes as IDs
      stateElements = svgDoc.querySelectorAll('path, polygon');
      
      // Add click events to each state element
      stateElements.forEach(element => {
        const stateId = element.getAttribute('id');
        if (!stateId) return;
        
        // Append CSS for styling
        element.style.transition = 'fill 0.2s ease';
        element.style.stroke = 'white';
        element.style.strokeWidth = '1';
        element.style.cursor = 'pointer';
        element.style.fill = '#d3d3d3';
        
        // Map state abbreviation to full name
        stateNameMapping[stateId] = getStateNameFromId(stateId);
        
        // Add hover effect
        element.addEventListener('mouseover', () => {
          if (!element.classList.contains('selected')) {
            element.style.fill = '#b3b3b3';
          }
        });
        
        element.addEventListener('mouseout', () => {
          if (!element.classList.contains('selected')) {
            element.style.fill = '#d3d3d3';
          }
        });
        
        // Add click event listener
        element.addEventListener('click', () => {
          if (stateNameMapping[stateId]) {
            emit('toggle-state', stateNameMapping[stateId]);
          }
        });
        
        // Set initial selected state styles
        updateStateStyles(element, stateId);
      });
    };

    const updateStateStyles = (element, stateId) => {
      const stateName = stateNameMapping[stateId];
      if (!stateName) return;
      
      const isSelected = props.selectedStates.includes(stateName);
      
      // Apply styles based on selection state
      if (isSelected) {
        element.classList.add('selected');
        element.style.fill = '#1e52de';
      } else {
        element.classList.remove('selected');
        element.style.fill = '#d3d3d3';
      }
    };

    // Watch for changes in selectedStates
    onMounted(() => {
      // Create a watcher to update state styles when selectedStates changes
      watch(() => [...props.selectedStates], () => {
        if (stateElements) {
          stateElements.forEach(element => {
            const stateId = element.getAttribute('id');
            if (stateId) {
              updateStateStyles(element, stateId);
            }
          });
        }
      }, { deep: true });
    });
    
    return {
      svgObject,
      svgUrl,
      onSvgLoaded
    };
  }
}
</script>

<style scoped>
.us-map-container {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  border-radius: 5px;
  overflow: hidden;
}

.map-svg {
  width: 100%;
  height: 400px;
  display: block;
}
</style>
