<template>
  <div>
    <AddLeaveModal />
    <Menu />
    <div class="container">
      <table style="margin: 0 auto;">
        <thead>
          <tr>
            <td></td>
            <td>
              <div class="monthHeading">
                <a @click="changeMonth(-1)">
                  <b-icon icon="arrow-left-bold-circle-outline"></b-icon>

                </a>
                <span
                  style="flex: 1; text-align: center;"
                  id="selectedMonth"
                >{{monthToString()}} {{this.currentYear}}</span>
                <a @click="changeMonth(1)">
                  <b-icon icon="arrow-right-bold-circle-outline"></b-icon>

                </a>

              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td style="padding-bottom: 10px;">
              <table>
                <thead>
                  <tr>
                    <th
                      class="day-heading"
                      v-for="(day, index) in headingData"
                      :key="index"
                    >
                      <a href="">{{day}}</a>
                    </th>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            :data-userid="person.id"
            :data-username='person.name'
            v-for="(person, index) in staff"
            :key="index"
          >
            <th class="person">

              <div>
                <span class="staffName">
                  <a>{{person.name}}</a>
                </span>
              </div>

              <span class="staffTitle">{{person.title}}</span>
            </th>
            <td>
              <MonthDays
                :currentYear="currentYear"
                :selectedMonth="selectedMonth"
              />
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>

</template>

<script>
import Vue from 'Vue'
import Menu from "@/components/Menu";
import MonthDays from "@/components/MonthDays";
import AddLeaveModal from "@/components/AddLeaveModal";
import db from "@/firebaseInit";
import {
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  eachDay,
  format,
  getYear,
  addDays,
  getMonth
} from "date-fns";
export default {
  data() {
    return {
      headingData: [],
      staff: [],
      currentYear: getYear(new Date()),
      month: 1,
      selectedMonth: getMonth(new Date())
    };
  },
  created() {
    this.updateTableHeadings()
    db.collection("staff")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            name: doc.data().name,
            level: doc.data().level,
            title: doc.data().title,
            id: doc.id
          };
          this.staff.push(data);
        });
      });
  },
  methods: {
    monthToString: function() {
      return format(new Date(this.currentYear, this.selectedMonth), "MMMM");
    },
    changeMonth(value) {
      this.selectedMonth += value;
      this.updateTableHeadings()
      this.getLeaveData()
      this.getPublicHolidays()
    },
    updateTableHeadings() {
      // Create day headings e.g sat, sun ,mon
      this.headingData = [];
      const days = [];

      const monthStartDate = startOfMonth(
        new Date(this.currentYear, this.selectedMonth)
      );
      const monthEndDate = endOfMonth(
        new Date(this.currentYear, this.selectedMonth)
      );
      const monthDays = eachDay(monthStartDate, monthEndDate);
      monthDays.forEach(day => {
        days.push(format(`${day}`, "dd"));
      });
      this.headingData.push(...days);
    },
    getLeaveData(){
      db.collection("leave").where("month", "==", this.selectedMonth)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            duration: doc.data().duration,
            id: doc.id
          };
          console.log(data);
        });
      });
    },
    getPublicHolidays(){
      db.collection("publicHolidays").where("month", "==", this.selectedMonth)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const day = format(doc.data().date, "D") - 1
          const data = {
            name: doc.data().name,
            date: doc.data().date,
            day: format(doc.data().date, "D") - 1,
            id: doc.id
          };
          console.log(data);
          Vue.set(this.$store.state.tableData[day], 'publicHoliday', true)
          this.$store.state.publicHolidays.push(data)
        });
      });
    }
  },
  components: {
    Menu,
    MonthDays,
    AddLeaveModal
  }
};
</script>

<style>
.table td,
.table th {
  border: none !important;
}

td {
  font-size: 12px;
  padding: 0;
  overflow: hidden;
}

th.person {
  font-size: 14px;
  width: 200px;
  font-weight: 500;
  padding-bottom: 15px;
}

.staffTitle {
  color: #747478;
}

.table .staffName {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
}

.day-heading {
  width: 30px !important;
  min-width: 30px !important;
  max-width: 30px !important;
  text-align: center;
}

.monthHeading {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

#selectedMonth {
  font-size: 18px;
}
</style>
