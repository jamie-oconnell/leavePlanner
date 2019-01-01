<template>
  <b-modal :active.sync="currentModalState">
    <div class="box">
      <h2 class="title">Book Time Off</h2>
      <form action="">
        <div class="field">
          <label class="label">Type</label>
          <div class="select">
            <select>
              <option>Annual Leave</option>
              <option>Learning & Development</option>
              <option>Unpaid Leave</option>
              <option>Maternity Leave</option>
              <option>Special Leave</option>
            </select>
          </div>
        </div>
        <div style="display: flex">
          <div
            class="field"
            style="flex : 1; margin-right: 5px;"
          >
            <label class="label">Start Date</label>
            <div class="control">
              <input
                id="startDate"
                v-model="leaveStartDate"
                class="input"
                type="date"
              >
            </div>
          </div>
          <div
            class="field"
            style="flex: 1; margin-left: 5px;"
          >
            <label class="label">End Date</label>
            <div class="control">
              <input
                v-model="leaveEndDate"
                class="input"
                type="date"
              >
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Reason <small>(Optional)</small></label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Reason for leave..."
            ></textarea>
          </div>
        </div>
        <div
          class="control"
          style="margin-top: 3rem;"
        >
          <button class="button is-primary">Submit Request</button>
        </div>
      </form>
    </div>
  </b-modal>
</template>

<script>
import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min.js";
export default {
  data() {
    return {
    };
  },
  computed: {
    currentModalState: {
        get() {
            return this.$store.state.leaveModalActive
        },
        set(value) {
            this.$store.state.leaveModalActive = value
        }
    },
    leaveStartDate: {
        get(){
            return this.$store.state.leaveStartDate
        },
        set(value) {
            this.$store.state.leaveStartDate = value
        }
    },
    leaveEndDate: {
        get(){
            return this.$store.state.leaveEndDate
        },
        set(value) {
            this.$store.state.leaveEndDate = value
        }
    }
  },
  mounted() {
    // // Initialize all input of date type.
    // const calendars = bulmaCalendar.attach('#startDate');
    // console.log(calendars)
    // console.log(calendars);

    // // Loop on each calendar initialized
    // calendars.forEach(calendar => {
    //   // Add listener to date:selected event
    //   calendar.on("date:selected", date => {
    //     console.log(date);
    //   });
    // });
  }
};
</script>

<style>
</style>
