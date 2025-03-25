<template>
  <div class="area-selector">
    <div class="content-area">
      <h1>Tell Us The Areas You Serve</h1>
      <p class="description">
        The more accurate you define the geographies you serve, the more accurate our
        recommendations. You can modify this at anytime in Company Preferences found in Settings
      </p>

      <div class="selection-options">
        <h3>How do you want to select the areas you serve?</h3>
        <div class="radio-options">
          <label class="radio-label">
            <input type="radio" v-model="selectionType" value="state">
            <span class="custom-radio"></span>
            By State
          </label>
          <label class="radio-label">
            <input type="radio" v-model="selectionType" value="radius">
            <span class="custom-radio"></span>
            By Radius
          </label>
        </div>
      </div>

      <!-- State Selection View -->
      <div v-if="selectionType === 'state'" class="state-selection">
        <div class="map-controls">
          <button class="control-button" @click="selectContiguous">
            Contiguous 48
          </button>
          <button class="control-button" @click="selectAll">
            All 50 + Wash. DC
          </button>
          <button class="control-button clear" @click="clearAll">
            Clear All
          </button>
          <div class="legend">
            <span class="legend-color"></span>
            <span>Selected States</span>
          </div>
        </div>

        <div class="map-container">
          <USMap :selectedStates="selectedStates" @toggle-state="toggleState" />
        </div>

        <div class="selected-states" v-if="selectedStates.length > 0">
          <h3>Currently Selected:</h3>
          <ul>
            <li v-for="state in selectedStates" :key="state">{{ state }}</li>
          </ul>
        </div>
      </div>

      <!-- Radius Selection View -->
      <div v-if="selectionType === 'radius'" class="radius-selection">
        <div class="radius-inputs">
          <div class="input-group">
            <label for="zipCode">Enter Your Office Zip Code</label>
            <input type="text" id="zipCode" v-model="zipCode" placeholder="e.g. 75201" class="form-input" />
          </div>

          <div class="input-group">
            <label for="radiusMiles">Enter The Radius in Miles</label>
            <input type="text" id="radiusMiles" v-model="radiusMiles" placeholder="e.g. 300 Miles" class="form-input" />
          </div>
        </div>

        <!-- Just empty space here -->
        
      </div>

      <!-- Navigation buttons placeholder -->
      <div class="navigation-placeholder"></div>

    </div>

    <div class="navigation-buttons">
      <button class="back-button" @click="goBack">Go Back</button>
      <button class="finish-button" 
              @click="finish" 
              :disabled="selectedStates.length === 0">
        Finished
      </button>
    </div>
  </div>
</template>

<script>
import USMap from './USMap.vue';

export default {
  name: 'AreaSelector',
  components: {
    USMap
  },
  data() {
    return {
      selectionType: '', 
      selectedStates: [], 
      zipCode: '',
      radiusMiles: '',
      allStates: [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
        'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
        'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ]
    }
  },
  watch: {
    // Watch for changes in selected states and update the display
    selectedStates: {
      handler() {
        // Trigger any UI updates needed when selectedStates changes
        // This ensures the currently selected list stays in sync with map selections
      },
      deep: true
    }
  },
  methods: {
    toggleState(state) {
      const index = this.selectedStates.indexOf(state);
      if (index === -1) {
        this.selectedStates.push(state);
      } else {
        this.selectedStates.splice(index, 1);
      }
    },
    selectContiguous() {
      // Select all 48 contiguous states (excluding Alaska and Hawaii)
      const contiguousStates = this.allStates.filter(state =>
        !['Alaska', 'Hawaii'].includes(state)
      );
      this.selectedStates = contiguousStates;
    },
    selectAll() {
      // Select all 50 states plus DC
      this.selectedStates = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
        'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
        'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ];
    },
    clearAll() {
      this.selectedStates = [];
    },
    goBack() {
      this.$emit('navigate', 'prev');
    },
    finish() {
      this.$emit('navigate', 'next');
    }
  }
}
</script>

<style scoped>
.area-selector {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.navigation-placeholder {
  height: 80px; /* Match the height of navigation buttons */
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 20px;
  background: transparent;
  box-shadow: none;
  position: relative;
  z-index: 1;
}

.area-selector h1 {
  color: var(--Primary-Surface-Lighter, #4571C6);
  font-family: "Nunito Sans";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.114px;
}

.description {
  color: var(--Gray-Text-Body, #363A40);
  font-family: "Nunito Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.064px;
}

.selection-options h3 {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: normal;
}

.radio-options {
  display: flex;
  gap: 30px;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  color: #363A40;
  font-family: "Nunito Sans";
}

input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-radio {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 22px;
  width: 22px;
  background-color: #fff;
  border: 2px solid #4169E1;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.custom-radio:after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: transparent;
  transition: all 0.2s ease;
}

.custom-radio:hover {
  border-color: #3152C6;
}

input[type="radio"]:checked + .custom-radio {
  border-color: #4169E1;
}

input[type="radio"]:checked + .custom-radio:after {
  background: #4169E1;
}

.selection-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.map-controls {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
}

.control-button {
  background-color: #e0e0e0;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.control-button:hover {
  background-color: #d0d0d0;
}

.control-button.clear {
  background-color: #f0f0f0;
}

.legend {
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 14px;
}

.legend-color {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #1e52de;
  margin-right: 5px;
}

.map-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  height: 400px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
}

.selected-states {
  margin-bottom: 30px;
}

.selected-states h3 {
  margin-bottom: 10px;
  font-size: 16px;
}

.selected-states ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.selected-states li {
  padding: 8px;
  display: flex;
  margin-bottom: 5px;
}

/* Radius Selection Styles */
.radius-inputs {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
}

.form-input {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #666;
  background-color: #f9f9f9;
}

.form-input::placeholder {
  color: #bbb;
}

.empty-space {
  height: 1px;
}

.back-button {
  color: #4169e1;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 15px;
  text-decoration: underline;
}

.finish-button {
  color: #fff;
  background-color: #4169e1;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.finish-button:hover {
  background-color: #3152c6;
}

.finish-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
