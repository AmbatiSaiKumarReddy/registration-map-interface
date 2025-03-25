<template>
  <div class="email-form">
    <h2>Forward your bid invitations to your custom email address</h2>
    
    <ol class="instructions">
      <li>Select your custom @hyperwaterbids.com email address below</li>
      <li>
        Keep the email account you currently use to receive bid invitations from any GC.
        <ol type="a">
          <li>Now you will want to "auto forward" all bid invites to your custom address.</li>
          <li>You can't send from this address, only receive as it helps populate your custom Bid Board</li>
          <li>Google how to autoforward emails from any email service. It is free and easy to set up.</li>
          <li>Here is a PDF you can download if your company uses Outlook, a Gmail server, Apple mail or Yahoo</li>
        </ol>
      </li>
      <li>HyperWater AI will only be able to recommend a go/no-go bid for invites sent to this address.</li>
    </ol>

    <div class="email-input-container">
      <input 
        type="text" 
        v-model="companyName" 
        placeholder="companyname"
        class="company-name-input"
      />
      <span class="email-domain">@hyperwaterbids.com</span>
    </div>
    
    <div class="navigation-buttons">
      <button class="go-back-btn" @click="goBack">Go Back</button>
      <button class="finished-btn" @click="proceed">Finished</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailForm',
  data() {
    return {
      companyName: ''
    }
  },
  methods: {
    goBack() {
      this.$emit('navigate', 'prev');
    },
    proceed() {
      if (this.companyName.trim()) {
        // Here you would typically save the email or proceed to next step
        this.$emit('navigate', 'next');
      } else {
        alert('Please enter a company name');
      }
    }
  }
}
</script>

<style scoped>
.email-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}

h2 {
  color: #4169e1;
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
}

.instructions {
  margin-bottom: 30px;
  line-height: 1.6;
  padding-left: 25px;
}

.instructions li {
  margin-bottom: 10px;
}

.instructions ol[type="a"] {
  padding-left: 25px;
}

.instructions ol[type="a"] li {
  margin-bottom: 5px;
}

.email-input-container {
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 30px auto 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.company-name-input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  font-size: 16px;
  outline: none;
}

.company-name-input::placeholder {
  color: #aaa;
  font-style: italic;
}

.email-domain {
  background-color: #f0f0f0;
  padding: 12px 15px;
  color: #666;
  font-size: 16px;
  white-space: nowrap;
  border-left: 1px solid #ddd;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.go-back-btn, .finished-btn {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.go-back-btn {
  background-color: transparent;
  border: 1px solid #4169e1;
  color: #4169e1;
}

.go-back-btn:hover {
  background-color: rgba(65, 105, 225, 0.1);
}

.finished-btn {
  background-color: #4169e1;
  border: none;
  color: white;
}

.finished-btn:hover {
  background-color: #3056c9;
}
</style>
