<template>
  <b-modal :active.sync="currentModalState">
    <div class="box">
      <h2 class="title">Book Time Off</h2>
      <form action="submitLeave">
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
            <b-field label="Start Date">
              <b-datepicker
                v-model="leaveStartDate"
                icon="calendar-today"
                :min-date="minDate"
                :max-date="maxDate"
              >
              </b-datepicker>
            </b-field>
          </div>
          <div
            class="field"
            style="flex: 1; margin-left: 5px;"
          >
            <b-field label="End Date">
              <b-datepicker
                v-model="leaveEndDate"
                icon="calendar-today"
                position="is-bottom-left"
                :min-date="minDate"
                :max-date="maxDate"
              >
              </b-datepicker>
            </b-field>

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
          <button @click.prevent type="submit" class="button is-primary">Submit Request</button>
        </div>
      </form>
    </div>
  </b-modal>
</template>

<script>
import { startOfYear, endOfYear } from "date-fns";
export default {
  data() {
    return {
      minDate: startOfYear(new Date()),
      maxDate: endOfYear(new Date())
    };
  },
  computed: {
    currentModalState: {
      get() {
        return this.$store.state.leaveModalActive;
      },
      set(value) {
        this.$store.state.leaveModalActive = value;
      }
    },
    leaveStartDate: {
      get() {
        return new Date(this.$store.state.leaveStartDate);
      },
      set(value) {
        this.$store.state.leaveStartDate = value;
      }
    },
    leaveEndDate: {
      get() {
        return new Date(this.$store.state.leaveEndDate);
      },
      set(value) {
        this.$store.state.leaveEndDate = value;
      }
    }
  }
};
</script>

<style>
</style>
