<template>
  <div class="progress-indicator">
    <div class="progress-steps">
      <!-- Static gray base line -->
      <div class="progress-line"></div>

<!-- ✅ FIXED: Golden line inside trimmed area -->
<div
  class="progress-line-filled"
  :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"


></div>


      

      <!-- Steps -->
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="progress-step"
        :class="{
                  completed: index < currentStep,
                  active: index === currentStep,
                  upcoming: index > currentStep
                }"


      >
        <div class="step-circle"></div>
        <div class="step-label">{{ step }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressIndicator",
  computed: {
  clampedStep() {
    return Math.min(this.currentStep, this.steps.length - 1);
  }
}
,
  props: {
    currentStep: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      steps: [
        "Tell Us About You",
        "Market Segment",
        "Trades Selection",
        "Areas Served",
        "Your Email",
      ],
    };
  },
};
</script>

<style scoped>
.progress-indicator {
  padding: 20px 20px 30px;
  background: linear-gradient(135deg, #1e90ff, #4169e1);
  color: white;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 20px;
  padding: 0 14px;
}

/* Base line */
.progress-line {
  position: absolute;
  top: 14px;
  left: 10%;
  right: 10%;
  height: 2px;
  background-color: #cccccc;
  z-index: 1;
}

/* Golden filled line */
.progress-line-filled {
  position: absolute;
  top: 14px;
  left: 10%;
  height: 2px;
  background-color: #f5c542;
  z-index: 2;
  transition: width 0.4s ease-in-out;
  max-width: 100%;
}

/* Step */
.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 3;
  width: 20%;
  padding: 0 14px;
}

.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.step-label {
  font-size: 14px;
  white-space: nowrap;
  text-align: center;
  opacity: 0.6;
  color: white;
}

/* Completed step */
.progress-step.completed .step-circle {
  background-color: #888888;
  border: 2px solid #888888;
}
.progress-step.completed .step-label {
  opacity: 1;
}

/* Active step */
.progress-step.active .step-circle {
  background-color: #f5c542;
  border: 2px solid #f5c542;
  box-shadow: 0 0 0 4px rgba(245, 197, 66, 0.3);
}
.progress-step.active .step-label {
  font-weight: bold;
  opacity: 1;
}

/* Upcoming step – FULL WHITE CIRCLE */
.progress-step.upcoming .step-circle {
  background-color: #ffffff;
  border: 2px solid #ffffff;
}
.progress-step.upcoming .step-label {
  opacity: 0.5;
}
</style>
