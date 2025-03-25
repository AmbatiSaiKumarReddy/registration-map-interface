<template>
  <div class="registration-container">
    <ProgressIndicator :currentStep="clampedStep" />
    <div class="content-area">
      <AreaSelector v-if="currentStep === 3" @navigate="handleNavigation" />
      <EmailForm v-if="currentStep === 4" @navigate="handleNavigation" />
    </div>
  </div>
</template>

<script>
import ProgressIndicator from './components/ProgressIndicator.vue';
import AreaSelector from './components/AreaSelector.vue';
import EmailForm from './components/EmailForm.vue';

export default {
  name: 'App',
  components: {
    ProgressIndicator,
    AreaSelector,
    EmailForm
  },
  computed: {
  clampedStep() {
    return Math.min(this.currentStep, 4);
  }
},
  data() {
    return {
      currentStep: 3 // Start at the Areas Served step
    }
  },
  methods: {
    handleNavigation(direction) {
      if (direction === 'next') {
        this.currentStep = Math.min(this.currentStep + 1, 4);
      } else if (direction === 'prev') {
        this.currentStep = Math.max(this.currentStep - 1, 0);
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.registration-container {
  max-width: 1000px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.content-area {
  padding: 20px;
  position: relative;
}
</style>
